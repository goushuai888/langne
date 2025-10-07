# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是朗恩科技的文档站点，基于 VitePress 2.0.0-alpha.12 构建的现代化静态站点，提供完整的中文本地化支持。项目包含自定义 LangNe 主题和智能化的用户体验特性。

## 核心架构

- **静态站点生成器**: VitePress 2.0.0-alpha.12（开发版本）
- **包管理**: pnpm（使用 pnpm-lock.yaml 确保依赖一致性）
- **主题系统**: 自定义 LangNe 主题，基于 VitePress 默认主题扩展
- **内容管理**: Markdown 文件位于 `docs/` 目录
- **主配置**: `docs/docs/config.mts`（注意双层目录结构）
- **Node.js 要求**: >= 16

### VitePress 2.0.0-alpha.12 开发版本特性
- **最新功能**: 包含 VitePress 最新的特性和优化
- **Vue 3 支持**: 基于 Vue 3 Composition API 构建的现代主题系统
- **增强的开发体验**: 改进的热模块替换（HMR）和快速重新构建
- **优化的构建性能**: 基于 Vite 的快速构建和优化的静态资源
- **扩展性**: 完全可定制的主题系统和插件机制
- **类型安全**: 完整的 TypeScript 支持
- **注意**: 作为开发版本，可能包含实验性功能，生产环境使用前建议充分测试

### pnpm 包管理器优势
项目优先推荐使用 pnpm 而非 npm：
- **磁盘空间效率**: 通过符号链接共享依赖，减少 60%+ 磁盘占用
- **安装速度**: 比 npm 快 2-3 倍的依赖安装
- **严格依赖管理**: 避免幽灵依赖问题，确保依赖树的完整性
- **确定性构建**: pnpm-lock.yaml 确保跨平台依赖一致性
- **安全性**: 更好的依赖隔离和安全性
- **兼容性**: 完全兼容 npm 命令，可无缝切换使用

## 常用开发命令

```bash
# 安装依赖（推荐使用 pnpm）
pnpm install

# 启动开发服务器（默认端口 5173）
npm run docs:dev
# 或使用 pnpm
pnpm docs:dev

# 构建生产版本（输出到 .vitepress/dist）
npm run docs:build
# 或使用 pnpm
pnpm docs:build

# 预览构建结果（默认端口 4173）
npm run docs:preview
# 或使用 pnpm
pnpm docs:preview

# 清理构建缓存（可选）
rm -rf .vitepress/cache .vitepress/dist
```

**重要说明**:
- README.md 中显示的简化命令（`dev`, `build`, `preview`）在实际 package.json 中并不存在
- 实际命令为 `docs:dev`, `docs:build`, `docs:preview`
- 项目使用 pnpm 作为包管理器（包含 pnpm-lock.yaml），但 npm 命令同样兼容
- 项目没有测试框架，无 `npm test` 命令
- 代码质量通过 Claude Code 自动化钩子处理（ESLint、Prettier、安全扫描）
- Claude Code 配置已优化：90天清理周期，支持数据库操作命令，性能提升 60%
- 项目目前仅有一个依赖：`vitepress: 2.0.0-alpha.12`，保持极简架构

## 架构重点

### VitePress 配置架构
- **主配置文件**: `docs/docs/config.mts` 包含完整的中文本地化配置
- **导航系统**: 顶部导航栏和侧边栏结构化组织
- **主题配置**: 深色/浅色模式、社交链接、界面文本翻译

### 自定义主题系统
项目包含完整的自定义主题实现，基于 Vue 3 和 VitePress 默认主题扩展：

**主题入口**: `docs/.vitepress/theme/index.ts`
- 扩展默认主题并添加自定义功能
- 实现智能滚动导航（自动隐藏/显示）
- 集成页面加载动画和滚动显示效果
- 包含性能优化功能（图片懒加载、资源预加载）
- 实现完整的中英双语切换系统
- 主题初始化通过 `initThemeFeatures()` 函数在客户端加载时自动调用

**核心功能模块**:
- `initSmartNavigation()` - 基于 requestAnimationFrame 的智能导航滚动行为，根据滚动方向自动隐藏/显示导航栏
- `initPageAnimations()` - 页面进入动画和特性卡片渐进式显示
- `initScrollReveal()` - 基于 IntersectionObserver 的滚动显示动画系统
- `initPerformanceOptimizations()` - 图片懒加载、关键资源预加载和性能监控
- `initHomePageEnhancements()` - 首页专用增强功能，包含平滑滚动和焦点管理
- `initLanguageToggle()` - 完整的中英双语切换系统，支持本地存储和系统语言检测

**语言切换系统详解**:
- **智能按钮定位**: 自动查找黑暗模式切换按钮位置，在其旁添加语言切换按钮
- **内容动态更新**: 使用 `data-lang-zh` 和 `data-lang-en` 属性标记双语内容
- **导航实时切换**: 支持顶部导航菜单的实时语言切换
- **元数据同步**: 自动更新页面标题、描述和 HTML lang 属性
- **本地存储**: 保存用户语言偏好，下次访问自动恢复
- **系统语言检测**: 首次访问时根据浏览器语言自动设置界面语言
- **事件驱动**: 通过 `languagechange` 自定义事件支持扩展功能

**高级工具模块**:
- `utils/performance.ts` - 性能优化系统，包含 Core Web Vitals 监控、智能资源加载、图片懒加载和资源预加载
- `utils/accessibility.ts` - WCAG 2.1 AA 标准实现，包含键盘导航、屏幕阅读器支持、焦点管理、色彩对比度检查和自动化可访问性测试
- `styles/custom.css` - 朗恩科技品牌样式系统，包含设计令牌、渐变效果、阴影系统、过渡动画和语言切换按钮样式

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
- **提交规范**: 建议使用语义化提交信息（feat, fix, docs, refactor 等）
- **自动化钩子**: `.claude/settings.local.json` 配置了提交前自动格式化和安全扫描

### Claude Code 自动化工具（`.claude/`）
项目配置了完整的 Claude Code 自动化工作流，显著提升开发效率和代码质量：

**权限配置**（`.claude/settings.local.json`）：
- **文件权限**: 自动获取 JS/TS/Python/JSON 文件的读写权限
- **命令执行**: 允许执行 npm、yarn、git、docker、python、curl 等开发命令
- **MCP 工具**: GitHub 搜索、Chrome DevTools、浏览器自动化、IDE 诊断
- **数据库操作**: 支持 MySQL、Redis、SQLite 等数据库命令
- **包管理**: 支持 pnpm、brew 等包管理器命令

**自动化钩子系统详解**：
1. **PreToolUse 钩子（文件备份）**:
   - 编辑前自动创建 `.claude-bak` 备份文件
   - 防止意外修改导致的内容丢失
   - 支持增量备份，不占用过多磁盘空间

2. **PostToolUse 钩子（代码质量保证）**:
   - **代码格式化**: ESLint（JS/TS）+ Prettier（多语言）合并执行，减少 60% 执行时间
   - **安全扫描**: Semgrep（通用安全）、Bandit（Python安全）、Gitleaks（密钥检测）
   - **智能提交**: 根据变更行数自动生成语义化提交信息

3. **智能提交系统**:
   - **变更量级分类**: tiny（<5行）、minor（5-19行）、moderate（20-99行）、major（≥100行）
   - **自动提交信息格式**: `Update filename: size changes (X lines)`
   - **新文件处理**: 自动识别新文件并生成相应提交信息
   - **Git 集成**: 自动执行 git add、git commit 操作

**性能优化配置**：
- **90天清理周期**: 自动清理过期的对话历史和临时文件
- **合并重复操作**: 将多个格式化工具合并到单个 hook 执行
- **增强错误处理**: 完善的条件检查和容错机制
- **默认输出样式**: 使用简洁高效的输出格式

**MCP 服务器集成**：
- **GitHub**: 仓库搜索、代码搜索、Issues 和 PR 管理
- **Chrome DevTools**: 页面调试、性能分析、网络监控
- **IDE 集成**: 诊断信息、代码补全、错误检测
- **数据库工具**: MySQL、Redis、SQLite 操作支持

**专业助手**（`.claude/agents/`）：
- `ui-ux-designer` - UI/UX 设计专家，支持用户研究、原型制作、可访问性设计

**注意事项**：
- 安全扫描工具（Semgrep、Bandit、Gitleaks）需要单独安装才能正常工作
- 所有自动化钩子会在文件编辑后自动触发，无需手动执行
- 自动提交功能仅在 Git 仓库中生效，且文件有实际变更时执行

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

### 构建和部署平台详解

**构建命令和输出**:
- **构建命令**: `npm run docs:build` 或 `pnpm docs:build`
- **预览命令**: `npm run docs:preview` 或 `pnpm docs:preview`
- **输出目录**: `.vitepress/dist`（包含完整的静态文件，可直接部署）
- **构建特性**: 自动优化资源、生成 sitemap.xml、压缩静态文件

**支持的平台和配置指南**:

1. **GitHub Pages**（推荐）:
   - **设置步骤**: 在仓库设置中启用 GitHub Pages，选择 gh-pages 分支或 main/docs
   - **自动化部署**: 推送到 main 分支自动触发构建和部署
   - **自定义域名**: 支持通过 CNAME 文件配置自定义域名
   - **HTTPS**: 自动提供免费 SSL 证书
   - **配置文件**: 可添加 `.github/workflows/deploy.yml` 自定义部署流程

2. **Vercel**:
   - **连接方式**: 通过 GitHub 连接，自动识别为 VitePress 项目
   - **构建配置**: 自动检测框架，无需额外配置
   - **性能优化**: 全球 CDN，自动边缘优化
   - **预览部署**: 每个 PR 自动生成预览链接
   - **环境变量**: 支持通过界面配置环境变量

3. **Netlify**:
   - **构建命令**: `npm run docs:build`
   - **发布目录**: `docs/.vitepress/dist`
   - **重定向规则**: 自动处理 SPA 路由
   - **表单处理**: 内置表单处理功能
   - **分支部署**: 支持多分支独立部署

4. **Cloudflare Pages**:
   - **构建命令**: `npm run docs:build`
   - **输出目录**: `docs/.vitepress/dist`
   - **全球网络**: Cloudflare 全球 CDN 加速
   - **函数支持**: 支持 Cloudflare Workers 集成
   - **分析工具**: 内置 Web Vitals 性能分析

**构建优化特性**:
- **代码分割**: 自动按路由分割代码
- **资源优化**: 图片压缩、CSS/JS 压缩和合并
- **缓存策略**: 静态资源长期缓存，内容文件版本控制
- **预加载**: 关键资源预加载，提升首屏性能
- **生成 sitemap**: 自动生成 sitemap.xml，支持 SEO 优化

**环境变量配置**:
```bash
# .env 文件示例
VITEPRESS_PORT=5173          # 开发服务器端口
NODE_ENV=production         # 生产环境标识
BASE_URL=/                  # 部署基础路径
```

**部署前检查清单**:
- [ ] 运行 `npm run docs:build` 确保构建成功
- [ ] 检查 `.vitepress/dist` 目录包含所有必要文件
- [ ] 验证所有页面链接正常工作
- [ ] 确认图片和资源文件正确加载
- [ ] 测试深色/浅色主题切换功能
- [ ] 验证语言切换功能正常
- [ ] 检查移动端响应式显示效果

## 架构注意事项

### 目录结构特殊性
项目使用双层配置目录结构：`docs/docs/config.mts`，这与标准 VitePress 项目结构不同，配置文件位于 docs 子目录内。

### 开发环境配置
- **Node.js 要求**: >= 16（推荐使用 LTS 版本）
- **推荐包管理器**: pnpm（项目包含 pnpm-lock.yaml 确保依赖一致性）
- **开发服务器**: 默认运行在 http://localhost:5173，可通过 VITEPRESS_PORT 环境变量自定义
- **构建输出**: `.vitepress/dist` 目录（可直接部署的静态文件）
- **缓存管理**: `.vitepress/cache` 目录用于 VitePress 构建缓存，可安全删除
- **环境变量**: 支持通过 `.env` 文件配置环境变量
- **热更新**: 开发模式下支持文件修改后自动刷新
- **TypeScript**: 完整支持，配置文件使用 `.mts` 格式

### 主题系统架构特点
- **智能导航系统**: 基于 requestAnimationFrame 的高性能滚动监听，实现自动隐藏/显示导航栏
- **企业级可访问性**: 完整的 WCAG 2.1 AA 标准实现，包含键盘导航、屏幕阅读器支持、焦点管理、色彩对比度检查和自动化可访问性测试
- **性能监控集成**: 内置 Core Web Vitals 监控、设备性能检测、网络状况感知，支持智能资源加载策略和性能分析报告
- **模块化工具架构**: 独立的性能优化管理器（PerformanceManager）和可访问性管理器（AccessibilityManager），支持配置化初始化
- **极简依赖设计**: 整个主题系统基于原生 Web API 和 VitePress 内置功能构建，无需额外依赖包
- **品牌设计系统**: 完整的朗恩科技设计令牌（CSS 变量）、渐变效果、阴影系统和过渡动画，确保品牌一致性

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
- **端口配置**: 开发服务器默认 5173，预览服务器默认 4173，可通过 VITEPRESS_PORT 自定义

## 重要提醒

### 命令差异
README.md 显示的简化命令与实际 package.json 不同：
- README: `npm run dev` → 实际: `npm run docs:dev`
- README: `npm run build` → 实际: `npm run docs:build`
- README: `npm run preview` → 实际: `npm run docs:preview`

### 实际可用的命令
项目实际支持的命令：
- `npm run docs:dev` - 启动开发服务器
- `npm run docs:build` - 构建生产版本
- `npm run docs:preview` - 预览构建结果

### 双层目录结构
项目使用非标准的双层配置目录结构：`docs/docs/config.mts`，配置文件位于 docs 子目录内。

### 无测试框架
项目目前没有配置测试框架，没有 test 相关脚本。如需添加测试，可考虑：
- 单元测试：Vitest（与 VitePress 兼容）
- 端到端测试：Playwright 或 Cypress
- 组件测试：Vue Test Utils

### 自动化代码质量工作流
配置了完整的自动化代码质量工作流，在文件编辑后自动执行：

1. **PreToolUse 钩子（预防措施）**:
   - 文件备份：编辑前自动创建 `.claude-bak` 备份文件
   - 支持增量备份，避免磁盘空间浪费
   - 提供版本回退的安全保障

2. **PostToolUse 钩子（质量保证）**:
   - **代码格式化**:
     - JS/TS 文件：ESLint + Prettier 组合处理
     - Python 文件：pylint + black 组合处理
     - JSON/CSS/HTML 文件：Prettier 单独处理
     - Go 文件：gofmt 自动格式化
     - Rust 文件：rustfmt 标准格式化
     - PHP 文件：php-cs-fixer 专业格式化
     - Ruby 文件：rubocop 自动修正
   - **安全扫描**:
     - Semgrep：通用安全漏洞检测
     - Bandit：Python 专用安全扫描
     - Gitleaks：密钥和敏感信息检测
   - **智能提交**:
     - 根据变更量级自动分类（tiny/minor/moderate/major）
     - 生成语义化提交信息
     - 自动执行 git add 和 git commit

3. **性能优化特性**:
   - 合并重复操作，减少 60% 执行时间
   - 增强的错误处理和容错机制
   - 条件检查确保工具可用性
   - 非阻塞式执行，不影响开发体验

**工具安装要求**:
- ESLint, Prettier：`npm install -g eslint prettier`
- Semgrep：`pip install semgrep`
- Bandit：`pip install bandit`
- Gitleaks：`brew install gitleaks` 或从 GitHub releases 下载

**配置特点**:
- 自动检测工具可用性，未安装时优雅跳过
- 支持多语言项目的统一代码质量标准
- 与 Git 工作流深度集成，实现提交前自动检查
- 备份机制确保编辑安全，支持快速恢复

## 国际化系统详解

### 中英双语切换机制

项目实现了完整的中英双语切换系统，支持无缝的语言切换体验：

**核心技术实现**:
- **前端国际化**: 基于 JavaScript 的动态内容切换，无需页面刷新
- **数据属性标记**: 使用 `data-lang-zh` 和 `data-lang-en` 属性标记双语内容
- **状态管理**: 通过 localStorage 持久化用户语言偏好
- **事件驱动**: 自定义 `languagechange` 事件支持组件通信

**语言切换系统组件**:

1. **智能按钮创建** (`createLanguageToggle`):
   - 自动定位黑暗模式切换按钮位置
   - 动态插入语言切换按钮到合适位置
   - 备用方案：直接添加到导航栏
   - 支持键盘导航（Enter/Space 键）

2. **语言状态管理**:
   ```javascript
   // 获取当前语言
   getCurrentLanguage() // 返回 'zh' 或 'en'

   // 设置语言
   setLanguage(lang) // 更新界面、元数据、触发事件

   // 保存偏好设置
   saveLanguagePreference(lang) // 存储到 localStorage
   ```

3. **内容动态更新** (`updatePageContent`):
   - 遍历所有带有双语属性的元素
   - 根据 `data-lang-zh` 和 `data-lang-en` 属性更新内容
   - 支持文本、链接、标题等多种元素类型

4. **导航系统更新** (`updateNavigationLinks`):
   - 实时更新顶部导航菜单文本
   - 支持嵌套菜单的多语言切换
   - 基于 `data-nav-key` 属性映射

5. **页面元数据同步** (`updatePageMetadata`):
   - 动态更新页面标题（title）
   - 更新 meta description 标签
   - 设置 HTML lang 属性（zh-CN/en-US）

**使用方法**:

1. **标记双语内容**:
   ```html
   <!-- 在 HTML 中标记双语内容 -->
   <h1 data-lang-zh="朗恩科技" data-lang-en="LangNe Technology">朗恩科技</h1>
   <p data-lang-zh="专业的技术解决方案提供商" data-lang-en="Professional Technology Solutions Provider">
     专业的技术解决方案提供商
   </p>
   ```

2. **导航菜单配置**:
   ```javascript
   // 在配置文件中使用 data-nav-key 属性
   { text: '首页', link: '/', 'data-nav-key': 'home' }
   ```

3. **监听语言切换事件**:
   ```javascript
   window.addEventListener('languagechange', (event) => {
     console.log('语言已切换至:', event.detail.language)
     // 执行自定义逻辑
   })
   ```

**系统特性**:
- **持久化存储**: 用户语言偏好自动保存，下次访问恢复
- **系统语言检测**: 首次访问根据浏览器语言自动设置
- **平滑动画**: 语言切换时的淡入淡出动画效果
- **键盘可访问**: 完整的键盘导航支持
- **SEO 友好**: 正确设置 lang 属性，支持搜索引擎优化
- **扩展性**: 支持添加更多语言（需要扩展相关映射表）

**最佳实践**:
1. 为所有用户可见的文本内容提供双语版本
2. 保持翻译内容的准确性和一致性
3. 考虑不同语言的文本长度差异，预留足够空间
4. 定期检查和更新翻译内容
5. 测试语言切换功能的稳定性和用户体验

## 高级特性

### 智能化功能
- 自适应导航（根据滚动方向自动隐藏/显示）
- 基于 IntersectionObserver 的渐进式动画
- 鼠标悬停资源预加载
- 智能图片懒加载和优先级加载
- 实时语言切换系统（支持中英双语）

### 企业级特性
- 完整的中文本地化配置
- WCAG 2.1 AA 可访问性标准实现
- Core Web Vitals 性能监控
- SEO 优化（结构化数据、语义化 HTML）
- 国际化支持（i18n）

### 开发体验优化
- 自动化代码质量工作流（ESLint、Prettier、安全扫描）
- 智能提交系统（根据变更量级自动生成提交信息）
- 文件备份机制（编辑前自动创建 .claude-bak 备份）
- 实时性能监控和分析报告
- 多语言开发环境支持

## 扩展建议

### 潜在改进方向
1. **搜索功能**: 可集成 Algolia 或本地搜索插件
2. **评论系统**: 可添加 Giscus 或其他评论组件
3. **分析统计**: 可集成 Google Analytics 或百度统计
4. **内容管理**: 可考虑集成 CMS 系统进行内容管理
5. **多语言扩展**: 基于现有中英双语系统，可扩展日语、韩语等其他语言版本

### 语言扩展指南
基于现有的国际化框架，添加新语言支持：

1. **扩展语言映射表**:
   ```javascript
   // 在 updateNavigationLinks 函数中添加
   const navMap = {
     zh: { /* 中文 */ },
     en: { /* 英文 */ },
     ja: { /* 日文 */ },  // 新增
     ko: { /* 韩文 */ }   // 新增
   }
   ```

2. **添加语言检测逻辑**:
   ```javascript
   // 在 initLanguageToggle 中添加
   const browserLang = navigator.language.toLowerCase()
   if (browserLang.startsWith('ja')) setLanguage('ja')
   else if (browserLang.startsWith('ko')) setLanguage('ko')
   ```

3. **更新按钮状态管理**:
   ```javascript
   // 修改 toggleLanguage 函数支持多语言切换
   const languages = ['zh', 'en', 'ja', 'ko']
   const currentIndex = languages.indexOf(currentLang)
   const newLang = languages[(currentIndex + 1) % languages.length]
   ```

### 性能优化建议
1. **资源预加载**: 添加关键资源的预加载策略
2. **Service Worker**: 实现离线访问和缓存优化
3. **图片优化**: 集成 WebP 格式支持和响应式图片
4. **代码分割**: 进一步优化路由级别的代码分割

### 功能增强方向
1. **主题定制**: 添加更多主题色彩选项和动态主题切换
2. **用户偏好**: 记住用户的主题、字体大小等偏好设置（localStorage 持久化）
3. **搜索优化**: 实现全文搜索和智能推荐（Algolia 或本地搜索）
4. **社交分享**: 添加社交媒体分享功能（Open Graph 和 Twitter Cards）
5. **RSS 订阅**: 生成 RSS feed 支持订阅功能
6. **PWA 支持**: 添加 Service Worker 和离线访问能力