# 渲染性能分析报告（Canvas2D 渲染管线）

本报告面向当前仓库的 `@jiujue/react-canvas-fiber`（React 自定义渲染器 + Yoga 布局 + Canvas2D 绘制），目标是“识别并评估主要渲染管线的实际执行情况”，输出可采集的关键指标、瓶颈定位方法与可落地的优化方案。

> 说明：本项目使用 Canvas2D，不是 WebGL。浏览器内部的“几何处理 / 光栅化 / 像素着色”等 GPU 管线阶段无法像 WebGL 一样直接拿到三角形数、shader 指标。本报告将其映射为：
>
> - JS 侧可测：React commit、Yoga 布局、Canvas2D API 调用数量与耗时（CPU 主线程）
> - 浏览器可观测：Canvas 光栅化与合成（GPU/Raster/Compositor 线程，需 DevTools/Tracing）

## 1. 渲染管线拆解（本项目真实执行路径）

渲染主链路在 [root.ts](..//packages/react-canvas-fiber/src/runtime/root.ts)：

- **React commit 阶段**：reconciler 把 JSX intrinsic elements 映射为场景树节点
  - [reconciler.ts](..//packages/react-canvas-fiber/src/runtime/reconciler.ts)
- **合帧（rAF batching）**：commit 后触发 invalidate，合并到下一帧统一做 layout + draw
  - [root.ts](..//packages/react-canvas-fiber/src/runtime/root.ts#L389-L760)
- **Layout Pass（Yoga WASM）**：同步 Yoga 树、`calculateLayout`、把 computed layout 回写到节点
  - [layoutTree.ts](..//packages/react-canvas-fiber/src/layout/layoutTree.ts)
- **Draw Pass（Canvas2D）**：DFS 遍历节点，生成 Canvas2D 命令（fill/stroke/drawImage/clip/transform）
  - [drawTree.ts](..//packages/react-canvas-fiber/src/render/drawTree.ts)
- **Overlay（hover/selected 高亮）**：调试覆盖层绘制（可视化命中与选择）
  - [root.ts](..//packages/react-canvas-fiber/src/runtime/root.ts#L430-L510)

对应浏览器内部阶段（不可直接插桩）：

- **Canvas 记录/提交**：Canvas2D API 调用 → 内部 display list/recording
- **几何处理与光栅化**：Path/Rect/Text/Image 在栅格线程或 GPU 上被 rasterize
- **合成（Compositor）**：最终 frame 合成、呈现到屏幕

## 2. 已落地的“可开关性能采样”（CPU 侧 + 近似资源指标）

当前已在渲染器运行时内置轻量 profiling（默认关闭），实现文件：

- [profiler.ts](..//packages/react-canvas-fiber/src/runtime/profiler.ts)：帧级采样、统计与 P50/P95 汇总
- [root.ts](..//packages/react-canvas-fiber/src/runtime/root.ts)：围绕 rAF 的 layout/draw/overlay 计时与场景快照
- [drawTree.ts](..//packages/react-canvas-fiber/src/render/drawTree.ts)：Canvas2D 关键调用计数（状态切换/clip/transform/drawImage 等）

### 2.1 如何开启

在 `<Canvas />` 传入：

```tsx
<Canvas width={800} height={600} dpr={window.devicePixelRatio || 1} profiling />
```

或指定采样窗口：

```tsx
<Canvas width={800} height={600} profiling={{ maxFrames: 300, sceneSampleEveryNFrames: 10 }} />
```

对应类型位于：

- [CanvasProps](..//packages/react-canvas-fiber/src/types/canvas.ts)
- [CanvasRootOptions](..//packages/react-canvas-fiber/src/types/runtime.ts)

### 2.2 如何读取报告（浏览器 Console）

运行时会把每个 root 注册到全局 `window.__REACT_CANVAS_FIBER_DEVTOOLS__`（已有 devtools registry 机制）。

示例：

```js
const reg = window.__REACT_CANVAS_FIBER_DEVTOOLS__
const roots = reg.listRoots()
const id = roots[0]?.id
const devtools = reg.getRootDevtools(id)

devtools.getPerformanceReport()
devtools.getPerformanceFrames()
```

推荐用 table 方式快速扫指标：

```js
const frames = devtools.getPerformanceFrames() || []
console.table(
	frames.slice(-60).map((f) => ({
		frame: f.frameIndex,
		fps: f.fps.toFixed(1),
		layoutMs: f.layoutMs.toFixed(2),
		drawMs: f.drawMs.toFixed(2),
		overlayMs: f.overlayMs.toFixed(2),
		totalMs: f.totalMs.toFixed(2),
		nodes: f.counts['node.total'] || 0,
		fill: f.counts['ctx.fill'] || 0,
		stroke: f.counts['ctx.stroke'] || 0,
		drawImage: f.counts['ctx.drawImage'] || 0,
		clip: f.counts['ctx.clip'] || 0,
		setTransform: f.counts['ctx.setTransform'] || 0,
		save: f.counts['ctx.save'] || 0,
		restore: f.counts['ctx.restore'] || 0,
		cullSkip: f.counts['cull.skip'] || 0,
	})),
)
```

### 2.3 采样输出包含哪些关键指标

帧级（`CanvasPerfFrame`）：

- **fps / dtMs**：相邻帧间隔与换算 FPS（观察抖动与掉帧）
- **layoutMs**：Yoga 布局耗时（含 Yoga WASM 调用与树同步）
- **drawMs**：Canvas2D 命令生成耗时（JS 侧遍历与 Canvas API 调用）
- **overlayMs**：调试 overlay 绘制耗时
- **counts（关键计数）**：
  - `node.total`、`node.View`/`node.Text`…：实际遍历并绘制的节点数量（近似“Draw Call 驱动因子”）
  - `ctx.fill` / `ctx.stroke` / `ctx.fillText` / `ctx.drawImage`：近似“绘制指令数量”
  - `ctx.fillStyle.set` / `ctx.strokeStyle.set` / `ctx.lineWidth.set` / `ctx.setTransform`：近似“状态切换/绑定频度”
  - `ctx.clip`：裁剪开销信号（clip 一般会影响后续 raster）
  - `sort.root.zIndex`：发生 zIndex 排序（O(n log n)）的信号
  - `cull.skip`：滚动容器内的裁剪剔除命中数量（越大代表越多子节点被跳过）
- **scene（近似资源占用）**：
  - `canvasBytes`：canvas backing store 估算（width*height*4）
  - `decodedImageBytes`：当前已加载图片按 RGBA 解码的体积估算（sum(naturalWidth*naturalHeight*4)）
  - `nodesTotal / nodesByType`：场景规模快照

汇总（`CanvasPerfReport`）：

- **avg/p50/p95/min/max**：FPS 与各阶段耗时的统计摘要，适合做“是否达标/是否抖动”的结论

## 3. 渲染瓶颈识别（如何读这些数据）

### 3.1 CPU 主线程：Layout vs Draw

- **layoutMs 高**：说明 Yoga 树同步、Text 测量、复杂层级 flex 计算是主要瓶颈
  - 重点观察：`pass.layout` 出现频率、`node.Text` 数量、交互/动画是否触发布局
- **drawMs 高**：说明 Canvas2D 命令过多、状态切换频繁、clip/transform 多、图片绘制多
  - 重点观察：`node.total`、`ctx.fillText`、`ctx.clip`、`ctx.drawImage`、`ctx.setTransform`

经验阈值（以 60fps 为例）：

- 单帧预算约 **16.67ms**；`layoutMs + drawMs + overlayMs` 持续逼近预算会掉帧
- `p95` 比 `avg` 高很多 → 抖动明显（GC、图片解码、偶发的大布局/大绘制）

### 3.2 过度绘制（Overdraw）与裁剪/剔除

Canvas2D 无法直接获得像素级 overdraw heatmap，但可用信号：

- `ctx.fill`/`ctx.fillRect`/`ctx.stroke` 数量远高于可见元素数量
- `overflow: hidden`、scroll clip 引入大量 `ctx.clip`
- scroll 容器 `cull.skip` 低（说明剔除没起作用，很多不可见节点仍在绘制）

建议：

- 大列表/长内容必须放进 scroll 容器并让 culling 生效（当前实现已对 scroll 子节点做 AABB 剔除）
- 尽量减少“全屏背景 + 多层半透明叠加”这类典型 overdraw 场景

### 3.3 不必要的状态切换 / 资源绑定

关注这些计数：

- `ctx.setTransform`：频繁 transform 会增大状态切换成本，尤其叠加 clip 时
- `ctx.fillStyle.set` / `ctx.strokeStyle.set`：如果同色连续元素没被聚合，会显著增加切换次数
- `ctx.save`/`ctx.restore`：保存/恢复过多会放大指令数量

建议：

- 把具有相同 paint 状态的元素尽量放在相邻层级（减少 style 震荡）
- 减少深层 Group/View 嵌套导致的 save/restore 链路膨胀

### 3.4 内存与带宽（近似可测 + DevTools 验证）

近似可测：

- `canvasBytes`：DPR 与尺寸上去后呈平方增长（典型“带宽/填充率”风险源）
- `decodedImageBytes`：大图 decode 后常驻内存，且 drawImage 会引入较高带宽读写

DevTools 验证：

- **Performance**：观察 Raster / GPU / Compositor 线程是否饱和
- **Memory**：观察 JS heap、图片解码与纹理占用（更偏系统层）

### 3.5 当前实现中“性能不佳”的常见直接原因（代码级）

这一节把“为什么慢”落到当前代码的真实路径上，便于你对照 profiling 与 DevTools 录制快速锁定问题：

#### 3.5.1 每次 React commit 都默认触发布局 + 全量重绘

- `reconciler.ts` 的 `resetAfterCommit` 直接调用 `container.invalidate()`（而不是按变化类型决定 `invalidateDrawOnly()` 或 `invalidate()`）
- `root.ts` 的 `invalidate()` 会把 `dirtyLayout=true` 且 `dirtyDraw=true`，下一帧必然执行 `layoutTree -> drawTree`

影响：

- 任何小的 props 变化（例如颜色、透明度）都会付出 Yoga + 全 Canvas 清屏重绘的成本
- 对动画/拖拽/高频交互尤其不友好（每帧都在跑 Yoga）

#### 3.5.2 Yoga 布局阶段做了“整棵树”的结构重建与样式重刷

- `layoutTree.ts` 的 `syncYogaTree` 当前策略是：
  - 先递归 `clearLinks`，把整棵树所有 yoga parent-child 关系 detach 掉
  - 再 DFS 重新 `insertChild` 并对每个节点 `applyYogaStyle`

影响：

- 即使只改了一个节点样式，也会对整棵树做一次结构层面的 O(N) 操作
- Yoga 内部的增量能力很难发挥（因为关系每次都被整体拆掉重建）

#### 3.5.3 Text 测量与 Text 绘制都存在“父链向上查找”的重复开销

- `layoutTree.ts` Text 的 `setMeasureFunc` 每次测量都会 `resolveInheritedTextStyle` 向上找字体相关属性
- `drawTree.ts` 绘制 Text 时也会 `resolveInheritedTextStyle` 再走一遍父链

影响：

- 大量 Text 节点 + 深层嵌套时，CPU 开销按 `Text 数量 * 树深度` 放大
- 测量还会触发 `ctx.measureText`（主线程同步调用）

#### 3.5.4 draw pass 全量遍历与高频状态切换

- `drawTree.ts` 每帧默认 `clearRect/fillRect` 清屏，再从 root DFS 全量绘制
- 每个节点会 `ctx.save/restore`、`translate`、可选 `transform`、可选 `clip`

影响：

- 节点多时，`save/restore/clip` 的数量会快速膨胀
- Canvas2D 的 clip/路径栅格化会影响浏览器内部 raster 成本（这部分不在 JS profile 里，但会在 Performance 的 Raster/GPU 线程表现出来）

#### 3.5.5 pointermove 命中测试与 hover enter/leave 的额外代价

- `root.ts` 的命中测试是 DFS；Path 命中在需要时会走 `ctx.isPointInPath / isPointInStroke`
- hover enter/leave 的链差分使用 `includes`（链长大时是 O(n^2) 级别的比较）

影响：

- 鼠标移动频繁时，事件侧 CPU 抢占主线程预算，间接拖慢渲染

#### 3.5.6 大尺寸 + 高 DPR 直接放大带宽与清屏成本

- canvas backing store 大小为 `(width*dpr) * (height*dpr)`，像素数按 dpr 的平方增长
- 每帧清屏 + 大面积半透明覆盖会造成明显的 overdraw 与带宽压力

## 4. 浏览器侧“几何/光栅化/像素级”验证方法（推荐流程）

由于 Canvas2D 的几何细分、光栅化、像素处理都在浏览器内部完成，推荐用以下方法拿到“实际执行情况”：

- Chrome DevTools → **Performance** 录制（勾选 Screenshots）
  - 重点看：Main thread（脚本 + layout/draw）、Raster/GPU/Compositor thread（栅格与合成）
- `chrome://tracing` / `about://tracing`（需要更深入时）
  - 关键词：canvas / raster / cc / compositor
  - 目标：定位某些帧 Raster 时间异常，验证是否“填充率/overdraw”导致

## 5. 针对性优化建议与可落地改进方案

### 5.1 减少 layout 频率与 layout 成本

- **把“仅绘制变化”与“布局变化”分离**
  - 现状：invalidate 默认会触发布局 + 绘制
  - 方案：引入“dirtyLayout 的精细判定”（例如仅 style/布局相关 props 变化才置 dirtyLayout）
- **Text 测量缓存与批量测量**
  - 现状：Text 的 Yoga measure 会频繁调用 `ctx.measureText`
  - 方案：按 `(text,font,maxWidth)` 做 LRU 缓存；对大段文本做分段/惰性测量

### 5.1.1（高收益）把“布局变化”与“绘制变化”做细粒度区分

目标：让绝大多数“仅绘制变化”的更新不再跑 Yoga。

建议落地方式：

- 在 reconciler 的 `prepareUpdate` 做轻量 diff，输出 `UpdatePayload`：
  - `needsLayout: boolean`（style 中影响布局的字段变了、Text 的 text/maxWidth 变了、结构变更）
  - `needsDraw: boolean`（颜色/opacity/stroke/image src/transform 等）
- 在 `commitUpdate` / `resetAfterCommit` 按 payload 调用：
  - `container.invalidate()`（needsLayout）
  - `container.invalidateDrawOnly()`（仅 needsDraw）

这一步通常是“显著提升性能”的第一杠杆：把 layout pass 从每帧/每次 commit 降到真正需要时才执行。

### 5.1.2（高收益）避免每次 layout 都重建整棵 Yoga 树

目标：让 Yoga 的结构与样式更新尽可能“增量化”。

可选路径（从易到难）：

- **路径 A：结构增量、样式增量**
  - 在 `appendChild/insertBefore/removeChild` 时同步维护 `yogaNode` 的 parent-child 关系
  - 在 `commitUpdate` 里只对该节点 `applyYogaStyle`（必要时 markDirty）
  - layout 时不再做 `detachAll + 重新 insert`，只 `calculateLayout` 与回写 computed layout
- **路径 B：保留现有 sync，但加入版本/跳过机制**
  - 维护节点/子树的“结构版本号”和“样式版本号”
  - layout 时只对发生结构变化的子树做 detach/insert，对无变化子树跳过

### 5.2 降低 draw 指令数量（减少 overdraw / state switch）

### 5.2 降低 draw 指令数量（减少 overdraw / state switch）

- **减少深层嵌套**：降低 `ctx.save/restore` 链路长度
- **减少 clip 使用**：clip 会增加后续 raster 成本；优先用剔除（scroll culling）替代“先画后裁”
- **避免无意义的半透明叠加**：透明叠加是典型 overdraw 放大器
- **对静态子树做离屏缓存**（后续能力规划）
  - 适用：复杂但不变的 UI 片段（阴影/圆角/大量路径）
  - 方案：用 `OffscreenCanvas` 或隐藏 canvas 作为缓存位图，变化时才重绘

### 5.2.1（高收益）引入“层级缓存 / 位图缓存”提升上限

Canvas2D 的全量重绘在节点规模上去后会很快到瓶颈。要显著提升上限，通常需要引入缓存：

- **Layer 作为缓存边界**：把 `Layer` 视为“离屏缓冲区”
  - Layer 内部重绘到 offscreen canvas（或普通 canvas）
  - 主画布只需 `drawImage(layerCanvas, ...)` 合成
  - 仅当 Layer 子树发生 dirty 时才重绘该 Layer
- **静态子树缓存**：对不变的 Group/View 子树做 bitmap cache

这样做的核心收益是：把“每帧 O(全树节点数)”变成“每帧 O(变化子树节点数 + Layer 合成数)”。

### 5.2.2（中收益）缓存 transform / border / pattern 等解析结果

可直接降低 JS 侧开销与 GC 压力：

- `parseTransform(style.transform)`：按引用或按字符串缓存
- `resolveInheritedTextStyle`：把继承结果缓存到节点（在父字体相关属性变化时失效）
- `resolveBorder(border)`：从“字符串解析”改成预解析结构，或把解析结果缓存到节点
- 背景图 pattern：避免每帧 `createPattern + DOMMatrix`（可按 image+size+repeat 缓存）

### 5.3 图片与带宽

### 5.3 图片与带宽

- **按需缩放解码**：避免把远大于显示尺寸的图片直接解码后频繁 drawImage
- **控制 DPR**：对非关键画面可降低 dpr（典型换带宽换清晰度）

### 5.4（高收益）事件与命中测试优化（交互场景）

当交互频繁且节点多时，事件侧优化能明显降低掉帧：

- **先 AABB 再精确命中**：对 Path/Line 等精确命中前先用包围盒快速排除
- **空间索引**：为可交互节点建立 grid/quadtree，pointermove 只查局部候选
- **hover 链差分优化**：把 `includes` 改为基于 `Set` 的差分，避免 O(n^2)

### 5.5 推荐的优化实施优先级（显著提升）

按“改动成本 / 收益”排序：

1. **细粒度 dirty（layout vs draw）**：让绝大多数更新不跑 Yoga
2. **Yoga 增量同步**：去掉 `syncYogaTree` 的全树重建
3. **Layer/静态子树缓存**：把全量重绘变成局部重绘 + 合成
4. **Text 测量与字体继承缓存**：降低 Text 密集场景 CPU
5. **事件命中与 hover 优化**：提升交互稳定性
6. **自适应 DPR**：在性能不足时平滑降分辨率维持流畅

## 6. 指标对照表（你关心的 KPI 如何在本项目落地）

- **帧率（FPS）**：`getPerformanceReport().fps` / `frames[i].fps`
- **渲染时间（Render Time）**：`layoutMs/drawMs/overlayMs/totalMs`
- **Draw Call 数量（近似）**：`ctx.fill + ctx.stroke + ctx.fillText + ctx.drawImage`
- **三角形数量**：Canvas2D 不可得（由浏览器内部 Path/Text raster 决定）
- **着色器复杂度**：Canvas2D 不可得（需 WebGL 或特定 tracing）
- **CPU/GPU 负载分布**：
  - CPU：本 profiling 的 layout/draw 时间 + Performance 中 Main thread
  - GPU/Raster：Performance 中 Raster/GPU/Compositor 线程时间
