import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "朗恩科技",
  description: "朗恩科技文档站点",
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/', 'data-nav-key': 'home' },
      {
        text: '产品',
        'data-nav-key': 'products',
        items: [
          { text: 'LangNe 文档平台', link: '/products/langne' },
          { text: '企业管理系统', link: '/products/enterprise' },
          { text: '数据可视化平台', link: '/products/dataviz' },
          { text: '移动应用开发', link: '/products/mobile' }
        ]
      },
      {
        text: '服务',
        'data-nav-key': 'services',
        items: [
          { text: '技术架构', link: '/services/architecture' },
          { text: '解决方案', link: '/services/solutions' },
          { text: '开发服务', link: '/services/development' },
          { text: '技术咨询', link: '/services/consulting' }
        ]
      },
      {
        text: '案例',
        'data-nav-key': 'cases',
        items: [
          { text: '成功案例', link: '/cases/success' },
          { text: '客户故事', link: '/cases/stories' },
          { text: '行业解决方案', link: '/cases/industry' }
        ]
      },
      {
        text: '文档',
        'data-nav-key': 'docs',
        items: [
          { text: '快速开始', link: '/docs/getting-started' },
          { text: 'API 参考', link: '/api-examples' },
          { text: '开发指南', link: '/markdown-examples' },
          { text: '最佳实践', link: '/docs/best-practices' }
        ]
      },
      {
        text: '博客',
        'data-nav-key': 'blog',
        items: [
          { text: '技术文章', link: '/blog/tech' },
          { text: '行业动态', link: '/blog/industry' },
          { text: '公司新闻', link: '/blog/news' }
        ]
      },
      { text: '关于我们', link: '/about', 'data-nav-key': 'about' },
      { text: '联系我们', link: '/contact', 'data-nav-key': 'contact' }
    ],

    sidebar: {
      '/products/': [
        {
          text: '产品中心',
          items: [
            { text: 'LangNe 文档平台', link: '/products/langne' },
            { text: '企业管理系统', link: '/products/enterprise' },
            { text: '数据可视化平台', link: '/products/dataviz' },
            { text: '移动应用开发', link: '/products/mobile' }
          ]
        }
      ],
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
      '/cases/': [
        {
          text: '案例展示',
          items: [
            { text: '成功案例', link: '/cases/success' },
            { text: '客户故事', link: '/cases/stories' },
            { text: '行业解决方案', link: '/cases/industry' }
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
      '/blog/': [
        {
          text: '博客文章',
          items: [
            { text: '技术文章', link: '/blog/tech' },
            { text: '行业动态', link: '/blog/industry' },
            { text: '公司新闻', link: '/blog/news' }
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