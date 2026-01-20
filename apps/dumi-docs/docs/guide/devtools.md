---
title: DevTools
---

本项目提供一个 Chrome DevTools 面板，用于查看 canvas renderer 的场景树、选择节点并高亮、查看节点属性。

## 准备

```bash
pnpm install
```

## 启动 Demo

```bash
pnpm dev
```

## 启动 DevTools 扩展（Plasmo）

```bash
pnpm -C apps/devtools-extension dev
```

在 Chrome 打开 `chrome://extensions`，开启开发者模式，然后选择「加载已解压的扩展程序」，目录指向：

- `apps/devtools-extension/build/chrome-mv3-dev`

## 使用

- 打开 Demo 页面，按 `F12` 或右键「检查」打开 DevTools
- 切换到 `Canvas` 面板
- 如果页面里存在多个 `<Canvas />`，用下拉框选择要检查的 Root
- 在树上 hover 节点：画布上会显示 hover 高亮
- 点击树节点：画布上会显示 selected 高亮，并在右侧展示 props
- 点击「取点」：进入选取模式，在画布上移动鼠标/点击即可选中节点（按 `Esc` 取消）

## 排查

- `Canvas` 面板显示「未发现 Canvas Root」：
  - 确认页面已渲染至少一个 `<Canvas />`
  - 确认使用的是当前仓库版本的 `react-canvas-fiber`（renderer 需要内置 DevTools 注册表）
