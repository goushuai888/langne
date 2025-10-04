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
# 启动开发服务器
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览构建结果
npm run docs:preview
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

### 内容结构
- `docs/index.md` - 首页（使用 `layout: home` frontmatter）
- `docs/about.md` - 公司介绍页面
- `docs/contact.md` - 联系我们页面
- `docs/markdown-examples.md` - Markdown 语法示例
- `docs/api-examples.md` - 运行时 API 示例，包含 Vue 组件嵌入
- `docs/services/` - 服务项目目录（架构、解决方案、开发服务、技术咨询）
- `docs/docs/` - 文档目录（快速开始、最佳实践）

### 性能和可访问性
- **性能优化**: 智能导航、图片懒加载、资源预加载、GPU 加速动画
- **可访问性**: 遵循 WCAG 2.1 AA 标准，包含完整的键盘导航和屏幕阅读器支持
- **响应式设计**: 移动端、平板、桌面端完整适配

## 开发工作流和代码质量

### 自动化代码质量工具（`.claude/settings.local.json`）
项目配置了完整的自动化代码质量工作流：
- **ESLint**: JavaScript/TypeScript 代码检查和自动修复
- **Prettier**: 代码格式化，支持多种语言
- **安全扫描**: semgrep（通用安全扫描）、bandit（Python安全）、gitleaks（密钥泄露检测）
- **自动化代码提交**: PostToolUse hooks 自动执行 git add 和 commit，基于变更大小生成提交消息
- **多语言支持**: Python (pylint, black), Go (gofmt), Rust (rustfmt), PHP (php-cs-fixer), Ruby (rubocop)

**关键问题**: 当前配置存在严重重复 - ESLint、Prettier、git commit hooks 各重复了4-6次，需要立即清理以避免性能问题和冲突。

### 关键文件路径说明
- **主题文件**: `docs/.vitepress/theme/index.ts` - 自定义主题入口，包含智能导航、动画效果和性能优化
- **性能优化**: `docs/.vitepress/theme/utils/performance.ts` - Core Web Vitals 优化、图片懒加载、资源预加载、性能监控
- **可访问性**: `docs/.vitepress/theme/utils/accessibility.ts` - WCAG 2.1 AA 标准实现、键盘导航、屏幕阅读器支持、焦点管理
- **样式系统**: `docs/.vitepress/theme/styles/custom.css` - 朗恩科技品牌色彩和现代化设计系统

## 依赖和构建信息

### 包管理和依赖
- **包管理器**: npm（项目包含 pnpm-lock.yaml 确保依赖一致性）
- **核心依赖**: VitePress 2.0.0-alpha.12（开发依赖）
- **依赖安装**: `npm install` 或 `pnpm install`

### 构建和部署
- **开发服务器**: `npm run docs:dev`（默认端口 5173）
- **生产构建**: `npm run docs:build`（输出到 `.vitepress/dist`）
- **构建预览**: `npm run docs:preview`
- **支持平台**: GitHub Pages, Vercel, Netlify, Cloudflare Pages

## 架构注意事项

### 目录结构特殊性
项目使用双层配置目录结构：`docs/docs/config.mts`，这与标准 VitePress 项目结构不同，配置文件位于 docs 子目录内。

### 自动化工具配置问题
- `.claude/settings.local.json` 中存在严重的 hooks 重复配置问题
- ESLint 重复4次、Prettier 重复4次、git commit hooks 重复6次
- **必须清理**：保留每种 hook 的一个实例，删除所有重复项

### 主题系统架构特点
- **智能导航系统**: 基于 requestAnimationFrame 的高性能滚动监听，实现自动隐藏/显示导航栏
- **模块化工具架构**: 独立的性能优化管理器（PerformanceManager）和可访问性管理器（AccessibilityManager），支持配置化初始化
- **企业级可访问性**: 完整的 WCAG 2.1 AA 标准实现，包含键盘导航、屏幕阅读器支持、焦点管理、色彩对比度检查和自动化可访问性测试
- **性能监控集成**: 内置 Core Web Vitals 监控、设备性能检测、网络状况感知，支持智能资源加载策略和性能分析报告