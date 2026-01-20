---
title: 竞品与定位
---

本页用于回答三个问题：

1. 现在是否已有类似项目？
2. 这个项目和它们的核心差异、优劣是什么？
3. 是否属于重复造轮子？重复的部分在哪里，价值在哪里？

## 一句话定位

`react-canvas-fiber` 是一个把 React 的声明式 UI + 调度能力，映射到 Canvas2D 的自定义渲染器：它维护自己的 scene graph，并在每次 commit 后执行 `layout -> draw`。其中 layout 采用 Yoga 风格的 flexbox 语义，目标更偏向“应用 UI”，而不是“绘图/游戏引擎封装”。

## 类似项目有哪些

### react-three-fiber（R3F）

- 方向：React 自定义 renderer，用 JSX 描述 three.js 的 3D scene graph。
- 适用：3D/WebGL 场景，模型/材质/灯光/相机/后期等。
- 结论：理念同源（React reconciler + scene graph），但渲染后端与交互/性能模型完全不同（WebGL vs Canvas2D）。

参考：

- https://github.com/pmndrs/react-three-fiber

### react-konva

- 方向：React 绑定 Konva（Canvas2D 的对象模型与事件系统）。
- 适用：图形编辑器、拖拽、形状绘制、可视化等（Konva 生态强）。
- 结论：它的“场景与事件”来自 Konva，布局不以 Yoga 风格为核心，更多是图形库对象属性驱动。

参考：

- https://github.com/konvajs/react-konva
- https://konvajs.org/docs/react/index.html

### Flipboard/react-canvas

- 方向：把 React 组件渲染到 Canvas，强调“UI 性能”。
- 现状：历史项目，维护活跃度较低（大量 issue 长期未处理）。
- 结论：方向最接近（Canvas 做 UI），但年代久远、生态与现代 React/工具链集成成本高。

参考：

- https://github.com/Flipboard/react-canvas

### Pixi React（@pixi/react / react-pixi-fiber）

- 方向：React renderer 绑定 PixiJS（偏 2D 游戏/渲染引擎）。
- 适用：精灵、粒子、滤镜、复杂 2D 动效、GPU 加速 UI/游戏。
- 结论：同样是“React + scene graph”，但 Pixi 是引擎级抽象，布局语义通常不走 Yoga 风格，更多是以引擎对象树为中心。

参考：

- https://react.pixijs.io/
- https://github.com/michalochman/react-pixi-fiber

## 核心差异与优劣

### 本项目的优势

- Yoga 风格布局：对于“应用 UI”这种以 flexbox 为主的排版更顺手。
- 轻量：不依赖大型图形引擎（Konva/Pixi/Three），成本更可控。
- React 语义一致：状态驱动、diff、合帧（rAF）等模型与 React 更贴合。
- 内置 DevTools 面板：直接围绕“scene tree + 节点高亮 + props”做开发体验闭环。

### 本项目的劣势/成本

- 生态缺口：对比 Konva/Pixi/Three，内置图元、滤镜、文本排版、命中测试、动画系统等都需要自己补齐或引入外部实现。
- 可访问性与输入法等问题：Canvas UI 天生会绕开 DOM 的大量系统能力（文本选择/复制/IME/无障碍等），需要额外方案补齐。
- 对齐浏览器能力的边角：比如文字测量、字体渲染差异、离屏缓存策略等，工程细节很多。

## 是否重复造轮子

结论分两层：

1. 重复的部分：React reconciler + scene graph + canvas draw 这条路线不是新路线（R3F、react-konva、react-canvas、Pixi React 都在做“React 到非 DOM 渲染目标”的映射）。
2. 不重复的部分（价值点）：本项目把“应用 UI 的 Yoga 风格布局 + Canvas2D 渲染 + 专用 DevTools”作为一个完整闭环来做，目标是更小更聚焦的 UI 方案，而不是绑定一个成熟引擎或库。

如果你的目标是“图形编辑器/复杂形状与事件/成熟生态”，react-konva 往往性价比更高；如果你的目标是“2D 引擎/大量动效与 GPU 加速”，Pixi React 更合适；如果你的目标是“3D”，R3F 基本是事实标准；如果你的目标是“用 flexbox 思维写 UI，并把最终输出放到 canvas（并接受 canvas 的平台代价）”，本项目才更匹配。
