# 朗恩科技文档站点

> 基于 LangNe 构建的现代化文档站点，提供完整的中文支持和优雅的用户体验。

## ✨ 特性

- **🎨 现代化设计** - 基于 LangNe 构建，具有优雅的界面设计
- **🌏 完整中文支持** - 包含中文界面本地化和中文内容
- **📱 响应式布局** - 完美适配桌面端和移动端
- **🌓 主题切换** - 支持浅色/深色主题切换
- **⚡ 快速加载** - 静态站点生成，加载速度极快

## 📦 环境要求

- Node.js >= 16
- npm 或 pnpm

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/goushuai888/langne.git
cd langne

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

> 访问 [http://localhost:5173](http://localhost:5173) 查看站点

## 🛠 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 代码检查（如果配置了）
npm run lint
```

## 📁 项目结构

```
langne/
├── docs/                   # 📚 文档内容
│   ├── index.md           # 🏠 首页
│   ├── about.md           # ℹ️ 关于我们
│   ├── markdown-examples.md  # 📝 Markdown 示例
│   ├── api-examples.md    # 🔧 API 示例
│   └── docs/              # ⚙️ 配置文件目录
│       └── config.mts     # 📄 主配置文件
├── .vitepress/            # 🗂️ VitePress 缓存
├── package.json           # 📦 项目依赖
└── README.md              # 📖 项目说明
```

## ⚙️ 配置说明

> 主要配置文件位于 `docs/docs/config.mts`，包含：

- **🏷️ 站点基本信息** - 标题、描述、语言设置
- **🧭 导航菜单** - 顶部导航栏配置
- **📋 侧边栏** - 文档结构组织
- **🌏 中文本地化** - 界面文本翻译
- **🎨 主题设置** - 外观和交互配置

## 📝 内容编辑指南

### 文件规范
- 所有文档内容使用 Markdown 格式编写
- 文件位于 `docs/` 目录下，自动生成对应页面路由

### 支持功能
- ✅ VitePress 扩展 Markdown 语法
- ✅ 在 Markdown 中嵌入 Vue 组件
- ✅ 代码语法高亮
- ✅ 数学公式支持
- ✅ 自定义容器和提示框

## 🚀 部署

### 🟢 GitHub Pages
> 项目已配置好，推送到 GitHub 即可自动部署

### 🔵 Vercel
1. 连接你的 GitHub 仓库到 Vercel
2. Vercel 会自动识别为 VitePress 项目
3. 自动部署完成

### 🟡 其他平台
支持部署到 Netlify、Cloudflare Pages 等静态站点托管平台。

### 📦 构建输出
- 构建命令：`npm run build`
- 输出目录：`.vitepress/dist`
- 静态文件：可直接部署到任何静态托管服务

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 🐛 报告问题
- 在 [Issues](https://github.com/goushuai888/langne/issues) 中提交 bug 报告
- 请详细描述问题复现步骤

### 💡 功能建议
- 提出新功能想法和改进建议
- 参与讨论和需求分析

### 🔧 代码贡献
1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/AmazingFeature`
3. 提交更改：`git commit -m 'Add some AmazingFeature'`
4. 推送分支：`git push origin feature/AmazingFeature`
5. 提交 Pull Request

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 📞 联系我们

---

**🏢 朗恩科技** - 专业的技术解决方案提供商

> 让技术创造价值，让服务成就未来

- 📧 邮箱：contact@langne.com
- 🌐 官网：[www.langne.com](https://www.langne.com)