# ROADMAP

本文档记录了 `react-canvas-fiber` 项目的基础组件与核心能力补齐规划。

## 1. 现状盘点 (Current State)

目前项目已支持以下基础组件与能力：

- **核心节点**: `Canvas`, `View`, `Rect`, `Circle`, `Path`, `Line`, `Text`, `Image`
- **布局系统**: 基于 Yoga WASM 的 Flexbox 布局子集
- **交互系统**:
  - 支持 `pointerdown`, `pointermove`, `pointerup`, `pointerenter`, `pointerleave`, `click` 等事件
  - 支持 `pointerEvents: 'auto' | 'none'` 属性
  - View 组件内置滚动支持（scrollX/scrollY）与滚动条交互
- **渲染引擎**: 基于 Canvas2D 的声明式渲染，支持高 DPR 适配

## 2. 未来规划 (Future Planning)

根据通用 UI 框架与 Canvas 渲染器的标准，建议分阶段补齐以下能力：

### P0: 核心骨架能力 (Infrastructure)

_这些能力是构建复杂 UI 系统的基础。_

- **Transform / Group**: 支持子树的位移 (translate)、缩放 (scale) 与旋转 (rotate)。
- **Clip / Overflow**: 增强 View 的裁剪能力，支持 `overflow: hidden` 以满足圆角容器裁剪内容的需求。
- **zIndex / Layer**: 引入层级管理机制，支持浮层 (Popups)、提示 (Tooltips) 与拖拽态置顶。
- **Opacity**: 引入节点与子树级的透明度控制，用于实现淡入淡出动画与禁用态。

### P1: 视觉表达增强 (Visual Enhancements)

_提升视觉丰富度，使输出更接近现代 UI 标准。_

- **Paint (Gradients/Patterns)**: 支持线性渐变 (LinearGradient) 与径向渐变 (RadialGradient) 作为 `fill` 或 `background`。
- **Shadow**: 为 View, Rect, Text 引入阴影支持。
- **StrokeDash**: 为 Path 与 Line 引入虚线支持。
- **Text 排版增强**: 支持 `textAlign`, 自动换行, `maxLines` 与 `ellipsis` (省略号)。
- **Image 扩展**:
  - `srcRect`: 支持 Sprite 图或局部渲染。
  - `nineSlice`: 支持九宫格拉伸，用于实现气泡与按钮背景。
  - 统一缓存策略：优化大尺寸图片的加载与渲染开销。

### P2: 复合组件与工具 (Components & Tooling)

_基于基础节点封装的高级 UI 抽象。_

- **Pressable / Button**: 封装 hover/pressed/disabled 状态机的交互组件。
- **ScrollView**: 对 View 滚动能力的二次封装，内置可配置的滚动条样式与动效。
- **UI Kit**: 提供 Spacer, Divider, Avatar, Badge 等常用小组件。

---

## 3. 落地建议 (Execution Priority)

优先推进 **P0** 阶段的 **Transform** 与 **Clip**，这将直接决定项目在复杂动效与布局裁剪场景下的上限。
