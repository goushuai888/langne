# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是朗恩科技的文档站点，基于 VitePress 2.0.0-alpha.12 构建的现代化静态站点，提供完整的中文本地化支持。项目包含自定义 LangNe 主题和智能化的用户体验特性。

## 核心架构

- **静态站点生成器**: VitePress 2.0.0-alpha.12
- **包管理**: pnpm（通过 node_modules/.pnpm 管理）
- **主题系统**: 自定义 LangNe 主题，基于 VitePress 默认主题扩展
- **内容管理**: Markdown 文件位于 `docs/` 目录
- **主配置**: `docs/docs/config.mts`（注意双层目录结构）

## 常用开发命令

```bash
# 启动开发服务器
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览构建结果
npm run docs:preview
```

**命令别名**: README.md 中显示的简化命令（`dev`, `build`, `preview`）在实际 package.json 中对应 `docs:dev`, `docs:build`, `docs:preview`

## 架构重点

### VitePress 配置架构
- **主配置文件**: `docs/docs/config.mts` 包含完整的中文本地化配置
- **导航系统**: 顶部导航栏和侧边栏结构化组织
- **主题配置**: 深色/浅色模式、社交链接、界面文本翻译

### 自定义主题系统
项目包含完整的自定义主题实现：

**主题入口**: `docs/.vitepress/theme/index.ts`
- 扩展默认主题并添加自定义功能
- 实现智能滚动导航（自动隐藏/显示）
- 集成页面加载动画和滚动显示效果
- 包含性能优化功能（图片懒加载、资源预加载）

**核心功能模块**:
- `initSmartNavigation()` - 智能导航滚动行为
- `initPageAnimations()` - 页面进入和特性卡片动画
- `initScrollReveal()` - 基于 IntersectionObserver 的滚动显示动画
- `initPerformanceOptimizations()` - 图片懒加载和关键资源预加载

### 内容结构
- `docs/index.md` - 首页（使用 `layout: home` frontmatter）
- `docs/about.md` - 公司介绍页面
- `docs/markdown-examples.md` - Markdown 语法示例
- `docs/api-examples.md` - 运行时 API 示例，包含 Vue 组件嵌入

### 性能和可访问性
- **性能优化**: 智能导航、图片懒加载、资源预加载、GPU 加速动画
- **可访问性**: 遵循 WCAG 2.1 AA 标准，包含完整的键盘导航和屏幕阅读器支持
- **响应式设计**: 移动端、平板、桌面端完整适配

## 代码质量工具

项目配置了自动化代码质量工具（在 `.claude/settings.local.json` 中）：
- **ESLint**: JavaScript/TypeScript 代码检查和自动修复
- **Prettier**: 代码格式化，支持多种语言
- **Python**: pylint 和 black 支持
- **其他语言**: Go (gofmt), Rust (rustfmt), PHP (php-cs-fixer)

## 部署信息
- **构建输出**: `.vitepress/dist` 目录
- **支持平台**: GitHub Pages, Vercel, Netlify, Cloudflare Pages
- **依赖管理**: 使用 pnpm-lock.yaml 确保依赖一致性