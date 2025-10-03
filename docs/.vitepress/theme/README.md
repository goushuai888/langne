# 朗恩科技 VitePress 主题文档

## 概述

朗恩科技自定义 VitePress 主题是一个现代化、专业的文档主题，专为朗恩科技量身定制。主题在 VitePress 默认主题基础上进行了大幅优化和定制，提供了更好的用户体验、视觉效果和功能特性。

## 主要特性

### 🎨 现代化设计
- **品牌色彩系统**：采用朗恩科技专属品牌色彩
- **渐变设计**：现代化的渐变色彩应用
- **响应式布局**：完美适配所有设备屏幕
- **深色主题**：完整的深色主题支持

### 🚀 性能优化
- **智能导航**：自动隐藏/显示导航栏
- **图片懒加载**：提升页面加载速度
- **资源预加载**：智能预加载关键资源
- **CSS 优化**：模块化样式管理

### 📱 移动端优化
- **触控优化**：44px 最小触控目标
- **手势支持**：流畅的滚动体验
- **自适应布局**：针对移动设备优化的布局
- **横屏适配**：完整的横屏模式支持

### 🎭 动画系统
- **页面过渡**：平滑的页面切换动画
- **元素动画**：丰富的元素进入动画
- **微交互**：精致的用户交互反馈
- **性能友好**：尊重用户的动画偏好设置

### ♿ 可访问性
- **WCAG 2.1 AA**：完整的无障碍访问支持
- **键盘导航**：完整的键盘操作支持
- **屏幕阅读器**：友好的屏幕阅读器支持
- **对比度优化**：符合标准的颜色对比度

## 文件结构

```
docs/.vitepress/theme/
├── index.ts              # 主题入口文件
├── styles/
│   └── custom.css        # 主题样式文件
├── components/           # 自定义组件目录
└── README.md            # 本文档
```

## 安装和使用

### 基础使用

主题已经完全集成到项目中，直接使用即可：

```bash
npm run docs:dev    # 开发模式
npm run docs:build  # 生产构建
npm run docs:preview # 预览构建结果
```

### 主题配置

主题的主要配置在 `docs/.vitepress/config.mts` 文件中：

```typescript
export default defineConfig({
  title: "朗恩科技",
  description: "朗恩科技文档站点",
  lang: 'zh-CN',
  // 其他配置...
})
```

## 设计令牌系统

### 颜色系统

```css
:root {
  /* 朗恩科技品牌色彩 */
  --ln-primary: #1a73e8;      /* 主色 */
  --ln-secondary: #34a853;    /* 辅助色 */
  --ln-accent: #fbbc04;       /* 强调色 */
  --ln-gradient: linear-gradient(135deg, var(--ln-primary), var(--ln-secondary));
}
```

### 间距系统

```css
:root {
  /* 现代化间距 */
  --ln-space-sm: 0.5rem;  /* 8px */
  --ln-space-md: 1rem;    /* 16px */
  --ln-space-lg: 1.5rem;  /* 24px */
  --ln-space-xl: 2rem;    /* 32px */
}
```

### 阴影系统

```css
:root {
  /* 阴影系统 */
  --ln-shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --ln-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
  --ln-shadow-lg: 0 8px 24px rgba(26, 115, 232, 0.2);
}
```

## 样式定制

### 自定义颜色

要自定义主题颜色，修改 CSS 变量即可：

```css
:root {
  --ln-primary: #your-color;
  --ln-secondary: #your-secondary-color;
  --ln-accent: #your-accent-color;
}
```

### 添加自定义样式

在 `custom.css` 文件中添加自定义样式：

```css
/* 自定义样式示例 */
.custom-element {
  background: var(--ln-gradient);
  border-radius: 8px;
  box-shadow: var(--ln-shadow-md);
}
```

## 组件系统

### 内置组件优化

主题对以下 VitePress 内置组件进行了优化：

- **VPHero**：英雄区域组件，添加了渐变背景和动画效果
- **VPFeatures**：特性卡片组件，增强了悬停效果和视觉样式
- **VPNav**：导航栏组件，添加了智能滚动行为
- **VPSidebar**：侧边栏组件，优化了移动端体验
- **VPDoc**：文档内容组件，改进了排版和可读性

### 扩展组件

可以在 `theme/index.ts` 中注册自定义组件：

```typescript
import CustomComponent from './components/CustomComponent.vue'

const LangNeTheme: Theme = {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    const { app } = ctx

    // 注册自定义组件
    app.component('CustomComponent', CustomComponent)
  }
}
```

## 响应式断点

主题使用以下响应式断点：

```css
/* 移动端 */
@media (max-width: 768px) { }

/* 小屏移动端 */
@media (max-width: 480px) { }

/* 平板 */
@media (min-width: 769px) and (max-width: 1024px) { }

/* 横屏手机 */
@media (max-width: 896px) and (orientation: landscape) { }

/* 触控设备 */
@media (pointer: coarse) { }
```

## 性能优化

### 已实现的优化

1. **智能导航**：根据滚动位置自动显示/隐藏导航栏
2. **图片懒加载**：延迟加载页面图片
3. **资源预加载**：鼠标悬停时预加载链接资源
4. **动画性能**：使用 GPU 加速的 CSS 变换
5. **减少重绘**：优化动画触发机制

### 性能监控

可以使用浏览器开发者工具监控性能：

1. **Lighthouse**：检查整体性能评分
2. **Performance**：分析运行时性能
3. **Network**：监控资源加载

## 可访问性指南

### WCAG 2.1 AA 合规性

主题确保符合以下可访问性标准：

1. **颜色对比度**：所有文本颜色对比度 ≥ 4.5:1
2. **键盘导航**：所有交互元素可通过键盘操作
3. **焦点指示器**：清晰的焦点状态样式
4. **语义化标记**：正确的 HTML 语义结构
5. **屏幕阅读器**：友好的 ARIA 标签

### 测试工具

推荐使用以下工具测试可访问性：

- **axe DevTools**：浏览器扩展
- **WAVE**：Web 可访问性评估工具
- **Lighthouse**：包含可访问性审核
- **色彩对比度检查器**：验证颜色对比度

## 浏览器支持

### 支持的浏览器

- **Chrome** 90+
- **Firefox** 90+
- **Safari** 14+
- **Edge** 90+

### 降级策略

对于不支持的浏览器特性，主题提供了优雅的降级：

1. **CSS Grid**：降级到 Flexbox 布局
2. **CSS 变量**：提供静态颜色值
3. **现代动画**：在不支持的浏览器中禁用
4. **IntersectionObserver**：提供 polyfill 或降级处理

## 维护指南

### 日常维护

1. **依赖更新**：定期更新 VitePress 版本
2. **样式检查**：定期检查样式是否正常
3. **性能监控**：监控网站性能指标
4. **可访问性测试**：定期进行可访问性测试

### 故障排除

#### 样式不生效

1. 检查 CSS 文件路径是否正确
2. 确认浏览器缓存已清除
3. 验证 CSS 语法是否正确

#### 动画性能问题

1. 检查是否启用了过多动画
2. 验证是否尊重了用户的动画偏好
3. 使用性能工具分析瓶颈

#### 移动端适配问题

1. 使用浏览器开发者工具测试不同设备
2. 检查触控目标大小是否符合标准
3. 验证横屏模式下的布局

### 代码规范

#### CSS 规范

1. **BEM 命名**：遵循 BEM 命名规范
2. **模块化**：按功能模块组织样式
3. **注释**：为复杂样式添加注释
4. **一致性**：保持代码风格一致

#### TypeScript 规范

1. **类型安全**：确保所有代码都有正确的类型
2. **错误处理**：合理处理可能的错误情况
3. **性能考虑**：避免不必要的 DOM 操作

## 更新日志

### v1.0.0 (2024-12-16)

#### 新功能
- ✨ 完整的朗恩科技品牌主题
- 🎨 现代化设计系统
- 📱 移动端优化
- 🌙 深色主题支持
- 🚀 性能优化
- ♿ 可访问性支持

#### 优化改进
- 🔧 智能导航行为
- ⚡ 图片懒加载
- 🎭 丰富的动画系统
- 📝 优化的内容排版

## 技术支持

### 联系方式

- **技术支持**：请创建 GitHub Issue
- **功能建议**：通过 GitHub Discussions 讨论
- **紧急问题**：联系项目维护团队

### 常见问题

#### Q: 如何修改主题颜色？

A: 修改 CSS 变量 `--ln-primary`、`--ln-secondary`、`--ln-accent` 即可。

#### Q: 如何添加自定义组件？

A: 在 `theme/index.ts` 的 `enhanceApp` 函数中注册组件。

#### Q: 如何禁用动画？

A: 主题自动识别用户的 `prefers-reduced-motion` 设置，或可通过 CSS 变量控制。

#### Q: 如何优化性能？

A: 主题已内置多项性能优化，可通过 Lighthouse 检测具体性能指标。

## 贡献指南

### 开发环境

1. 克隆项目
2. 安装依赖：`npm install`
3. 启动开发服务器：`npm run docs:dev`

### 提交规范

请遵循 [Conventional Commits](https://conventionalcommits.org/) 规范：

- `feat`: 新功能
- `fix`: 修复问题
- `docs`: 文档更新
- `style`: 样式调整
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关

### 代码审查

所有改动都需要通过代码审查：

1. 确保代码符合项目规范
2. 测试功能是否正常
3. 检查性能和可访问性
4. 更新相关文档

---

**版本**: 1.0.0
**最后更新**: 2024-12-16
**维护者**: 朗恩科技开发团队