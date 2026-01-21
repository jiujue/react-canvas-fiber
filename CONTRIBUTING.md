# Contributing / 参与贡献

Thanks for considering contributing to **react-canvas-fiber**!

欢迎你来参与 **react-canvas-fiber** 的贡献。

## Setup / 本地开发

Prerequisites: Node.js + pnpm

```bash
pnpm install
```

### Run demo / 运行 demo

```bash
pnpm dev
```

### Run docs / 运行文档站点

```bash
pnpm -C apps/dumi-docs dev
```

### Run DevTools extension / 运行 DevTools 扩展

```bash
pnpm -C apps/devtools-extension dev
```

## Code Style / 代码风格

- Run lint: `pnpm lint`
- Format: `pnpm format`

## Commit Message / 提交信息

This repo uses Conventional Commits and provides an interactive helper:

```bash
pnpm commit
```

## Changesets (Releases) / Changesets（发版）

If your change affects the published package `packages/react-canvas-fiber`, add a changeset:

```bash
pnpm changeset
```

## Pull Requests / PR

- Keep PRs focused and small when possible
- Include a short description, screenshots or a minimal reproduction when relevant
- Make sure `pnpm build` and `pnpm lint` pass
