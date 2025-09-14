# 朗恩科技文档站点

基于 VitePress 构建的现代化文档站点，提供完整的中文支持和优雅的用户体验。

## 🚀 特性

- ✨ **现代化设计** - 基于 VitePress 构建，具有优雅的界面设计
- 🌏 **完整中文支持** - 包含中文界面本地化和中文内容
- 📱 **响应式布局** - 完美适配桌面端和移动端
- 🎨 **主题切换** - 支持浅色/深色主题切换
- ⚡ **快速加载** - 静态站点生成，加载速度极快

## 📦 安装

确保你的环境中已安装 Node.js (推荐版本 >= 16)。

```bash
# 克隆项目
git clone https://github.com/goushuai888/langne.git
cd langne

# 安装依赖
npm install
# 或使用 pnpm
pnpm install
```

## 🛠 开发

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
langne/
├── docs/                   # 文档内容
│   ├── index.md           # 首页
│   ├── about.md           # 关于我们
│   ├── markdown-examples.md
│   └── api-examples.md
├── .vitepress/            # VitePress 配置
│   └── config.mts         # 站点配置文件
├── package.json
└── README.md
```

## ⚙️ 配置说明

主要配置文件位于 `.vitepress/config.mts`，包含：

- 站点基本信息（标题、描述、语言）
- 导航菜单配置
- 侧边栏配置
- 中文本地化设置
- 主题相关配置

## 📝 内容编辑

- 所有文档内容使用 Markdown 格式编写
- 文件位于 `docs/` 目录下
- 支持 VitePress 的扩展 Markdown 语法
- 可以在 Markdown 中使用 Vue 组件

## 🌐 部署

本项目支持多种部署方式：

### GitHub Pages
项目已配置好，推送到 GitHub 即可自动部署。

### Vercel
1. 连接你的 GitHub 仓库到 Vercel
2. Vercel 会自动识别为 VitePress 项目
3. 自动部署完成

### 其他平台
支持部署到 Netlify、Cloudflare Pages 等静态站点托管平台。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。

## 📄 许可证

本项目采用 MIT 许可证。

---

**朗恩科技** - 专业的技术解决方案提供商

让技术创造价值，让服务成就未来