import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import './styles/design-tokens.css'
import './styles/layout.css'
import './styles/typography.css'
import './styles/animations.css'
import './styles/dark-theme.css'
import './styles/mobile.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // 可以在这里添加全局组件、指令、插件等
    // app.component('CustomComponent', CustomComponent)
  }
} satisfies Theme