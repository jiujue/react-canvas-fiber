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

### 5.2 降低 draw 指令数量（减少 overdraw / state switch）

- **减少深层嵌套**：降低 `ctx.save/restore` 链路长度
- **减少 clip 使用**：clip 会增加后续 raster 成本；优先用剔除（scroll culling）替代“先画后裁”
- **避免无意义的半透明叠加**：透明叠加是典型 overdraw 放大器
- **对静态子树做离屏缓存**（后续能力规划）
  - 适用：复杂但不变的 UI 片段（阴影/圆角/大量路径）
  - 方案：用 `OffscreenCanvas` 或隐藏 canvas 作为缓存位图，变化时才重绘

### 5.3 图片与带宽

- **按需缩放解码**：避免把远大于显示尺寸的图片直接解码后频繁 drawImage
- **控制 DPR**：对非关键画面可降低 dpr（典型换带宽换清晰度）

## 6. 指标对照表（你关心的 KPI 如何在本项目落地）

- **帧率（FPS）**：`getPerformanceReport().fps` / `frames[i].fps`
- **渲染时间（Render Time）**：`layoutMs/drawMs/overlayMs/totalMs`
- **Draw Call 数量（近似）**：`ctx.fill + ctx.stroke + ctx.fillText + ctx.drawImage`
- **三角形数量**：Canvas2D 不可得（由浏览器内部 Path/Text raster 决定）
- **着色器复杂度**：Canvas2D 不可得（需 WebGL 或特定 tracing）
- **CPU/GPU 负载分布**：
  - CPU：本 profiling 的 layout/draw 时间 + Performance 中 Main thread
  - GPU/Raster：Performance 中 Raster/GPU/Compositor 线程时间
