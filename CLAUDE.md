# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是朗恩科技的文档站点，基于 VitePress 2.0.0-alpha.12 构建的现代化静态站点，提供完整的中文本地化支持。项目包含自定义 LangNe 主题和智能化的用户体验特性。

## 核心架构

- **静态站点生成器**: VitePress 2.0.0-alpha.12
- **包管理**: npm（使用 pnpm-lock.yaml 确保依赖一致性）
- **主题系统**: 自定义 LangNe 主题，基于 VitePress 默认主题扩展
- **内容管理**: Markdown 文件位于 `docs/` 目录
- **主配置**: `docs/docs/config.mts`（注意双层目录结构）

## 常用开发命令

```bash
# 启动开发服务器（默认端口 5173）
npm run docs:dev

# 构建生产版本（输出到 .vitepress/dist）
npm run docs:build

# 预览构建结果
npm run docs:preview

# 安装依赖（推荐使用 pnpm）
pnpm install
# 或
npm install
```

**重要**: README.md 中显示的简化命令（`dev`, `build`, `preview`）在实际 package.json 中并不存在，实际命令为 `docs:dev`, `docs:build`, `docs:preview`

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
- 主题初始化通过 `initThemeFeatures()` 函数在客户端加载时自动调用

**核心功能模块**:
- `initSmartNavigation()` - 智能导航滚动行为
- `initPageAnimations()` - 页面进入和特性卡片动画
- `initScrollReveal()` - 基于 IntersectionObserver 的滚动显示动画
- `initPerformanceOptimizations()` - 图片懒加载和关键资源预加载

**高级工具模块**:
- `utils/performance.ts` - 企业级性能优化系统，包含 Core Web Vitals 监控、智能图片懒加载、资源预加载、设备性能检测和性能分析报告
- `utils/accessibility.ts` - WCAG 2.1 AA 标准完整实现，包含键盘导航、屏幕阅读器支持、焦点管理、色彩对比度检查和可访问性自动化测试
- `styles/custom.css` - 朗恩科技品牌样式系统和响应式设计框架

### 内容结构和导航
- **首页**: `docs/index.md` - 使用 `layout: home` frontmatter 的主页
- **核心页面**: `about.md`（公司介绍）、`contact.md`（联系我们）
- **示例页面**: `markdown-examples.md`（Markdown 语法）、`api-examples.md`（Vue 组件嵌入示例）
- **服务目录**: `docs/services/` - 架构、解决方案、开发服务、技术咨询
- **文档目录**: `docs/docs/` - 快速开始、最佳实践
- **配置文件**: `docs/docs/config.mts` - 双层目录结构的 VitePress 主配置

### 导航系统
- **顶部导航**: 包含产品、服务、案例、文档、博客等主要分类
- **侧边栏**: 按目录路径自动组织的结构化导航
- **中文本地化**: 完整的界面文本翻译和 RTL 支持

### 性能和可访问性
- **性能优化**: 智能导航、图片懒加载、资源预加载、GPU 加速动画
- **可访问性**: 遵循 WCAG 2.1 AA 标准，包含完整的键盘导航和屏幕阅读器支持
- **响应式设计**: 移动端、平板、桌面端完整适配

## 开发工作流和代码质量

### Git 工作流程
- **主分支**: main（用于生产环境代码）
- **当前状态**: 存在未提交的修改（CLAUDE.md 已更新）
- **提交规范**: 建议使用语义化提交信息（feat, fix, docs, refactor 等）

### 自动化代码质量工具（`.claude/settings.local.json`）
项目配置了完整的自动化代码质量工作流：
- **文件读写权限**: 自动获取对 JavaScript、TypeScript、Python、JSON 文件的读写权限
- **包管理命令**: 允许执行 npm、yarn、node、python、pip、git、docker 等命令
- **高级工具集成**: 集成 GitHub 搜索、Chrome DevTools、浏览器自动化等 MCP 工具
- **安全扫描**: 支持密钥泄露检测和环境变量读取
- **多语言支持**: Python、JavaScript、TypeScript、Shell 脚本等的全面支持

### 关键文件路径说明
- **主题文件**: `docs/.vitepress/theme/index.ts` - 自定义主题入口，包含智能导航、动画效果和性能优化
- **性能优化**: `docs/.vitepress/theme/utils/performance.ts` - Core Web Vitals 优化、图片懒加载、资源预加载、性能监控
- **可访问性**: `docs/.vitepress/theme/utils/accessibility.ts` - WCAG 2.1 AA 标准实现、键盘导航、屏幕阅读器支持、焦点管理
- **样式系统**: `docs/.vitepress/theme/styles/custom.css` - 朗恩科技品牌色彩和现代化设计系统

## 依赖和构建信息

### 核心依赖
- **VitePress**: 2.0.0-alpha.12（开发依赖），提供静态站点生成功能
- **包管理器**: pnpm（推荐）或 npm，项目使用 pnpm-lock.yaml 确保依赖一致性
- **依赖安装**: `pnpm install` 或 `npm install`

### 构建和部署平台
- **静态托管**: GitHub Pages, Vercel, Netlify, Cloudflare Pages
- **构建命令**: `npm run docs:build`
- **预览命令**: `npm run docs:preview`
- **输出目录**: `.vitepress/dist`（可直接部署的静态文件）

## 架构注意事项

### 目录结构特殊性
项目使用双层配置目录结构：`docs/docs/config.mts`，这与标准 VitePress 项目结构不同，配置文件位于 docs 子目录内。

### 开发环境配置
- **Node.js 要求**: >= 16
- **推荐包管理器**: pnpm（项目包含 pnpm-lock.yaml 确保依赖一致性）
- **开发服务器**: 默认运行在 http://localhost:5173
- **构建输出**: `.vitepress/dist` 目录
- **缓存管理**: `.vitepress/cache` 目录用于 VitePress 构建缓存

### 主题系统架构特点
- **智能导航系统**: 基于 requestAnimationFrame 的高性能滚动监听，实现自动隐藏/显示导航栏
- **模块化工具架构**: 独立的性能优化管理器（PerformanceManager）和可访问性管理器（AccessibilityManager），支持配置化初始化
- **企业级可访问性**: 完整的 WCAG 2.1 AA 标准实现，包含键盘导航、屏幕阅读器支持、焦点管理、色彩对比度检查和自动化可访问性测试
- **性能监控集成**: 内置 Core Web Vitals 监控、设备性能检测、网络状况感知，支持智能资源加载策略和性能分析报告

## 依赖和版本信息

### package.json 结构
项目采用极简的依赖配置：
- **devDependencies**: 仅包含 `vitepress: 2.0.0-alpha.12`
- **scripts**: 标准 VitePress 命令（docs:dev, docs:build, docs:preview）
- **包管理器**: 使用 pnpm-lock.yaml 确保依赖一致性

### VitePress 版本特性
- **版本**: 2.0.0-alpha.12（开发版本，包含最新特性）
- **构建输出**: 静态 HTML/CSS/JS，支持 SPA 导航
- **开发体验**: HMR（热模块替换）、快速重新构建
- **主题系统**: 基于 Vue 3 的可扩展主题架构