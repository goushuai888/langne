import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "朗恩科技",
  description: "朗恩科技文档站点",
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        text: '服务',
        items: [
          { text: '技术架构', link: '/services/architecture' },
          { text: '解决方案', link: '/services/solutions' },
          { text: '开发服务', link: '/services/development' },
          { text: '技术咨询', link: '/services/consulting' }
        ]
      },
      {
        text: '文档',
        items: [
          { text: '快速开始', link: '/docs/getting-started' },
          { text: 'API 参考', link: '/api-examples' },
          { text: '开发指南', link: '/markdown-examples' },
          { text: '最佳实践', link: '/docs/best-practices' }
        ]
      },
      { text: '关于我们', link: '/about' },
      { text: '联系我们', link: '/contact' }
    ],

    sidebar: {
      '/services/': [
        {
          text: '服务项目',
          items: [
            { text: '技术架构', link: '/services/architecture' },
            { text: '解决方案', link: '/services/solutions' },
            { text: '开发服务', link: '/services/development' },
            { text: '技术咨询', link: '/services/consulting' }
          ]
        }
      ],
      '/docs/': [
        {
          text: '文档中心',
          items: [
            { text: '快速开始', link: '/docs/getting-started' },
            { text: '开发指南', link: '/markdown-examples' },
            { text: 'API 参考', link: '/api-examples' },
            { text: '最佳实践', link: '/docs/best-practices' }
          ]
        }
      ],
      '/': [
        {
          text: '快速导航',
          items: [
            { text: '关于我们', link: '/about' },
            { text: '联系我们', link: '/contact' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/langne' }
    ],

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})