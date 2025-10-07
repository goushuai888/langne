import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './styles/custom.css'

// 主题集成和配置
const LangNeTheme: Theme = {
  ...DefaultTheme,
  enhanceApp(ctx) {
    // 调用默认主题的 enhanceApp
    DefaultTheme.enhanceApp(ctx)

    // 添加自定义增强
    const { app } = ctx

    // 注册全局组件或插件
    // app.component('CustomComponent', CustomComponent)

    // 添加全局属性
    app.config.globalProperties.$theme = 'LangNe'

    // 设置全局配置
    if (typeof window !== 'undefined') {
      // 初始化主题相关功能
      initThemeFeatures()
    }
  }
}

// 初始化主题特性
function initThemeFeatures() {
  // 智能滚动导航
  initSmartNavigation()

  // 页面加载动画
  initPageAnimations()

  // 滚动显示动画
  initScrollReveal()

  // 性能优化
  initPerformanceOptimizations()

  // 首页增强功能
  initHomePageEnhancements()

  // 语言切换功能
  initLanguageToggle()
}

// 首页增强功能
function initHomePageEnhancements() {
  // 仅在首页执行
  if (!document.querySelector('.VPHero')) return

  // 添加平滑滚动
  addSmoothScrolling()

  // 增强焦点管理
  enhanceFocusManagement()

  // 添加加载状态指示器
  addLoadingIndicators()
}

// 添加平滑滚动
function addSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href') || '')
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })
}

// 增强焦点管理
function enhanceFocusManagement() {
  // 为特性卡片添加键盘导航
  const featureCards = document.querySelectorAll('.VPFeature')
  featureCards.forEach((card, index) => {
    const link = card.querySelector('a')
    if (link) {
      link.addEventListener('focus', () => {
        card.classList.add('focused')
      })
      link.addEventListener('blur', () => {
        card.classList.remove('focused')
      })
    }
  })

  // 添加跳转链接（可访问性）
  const skipLink = document.createElement('a')
  skipLink.href = '#main-content'
  skipLink.textContent = '跳转到主内容'
  skipLink.className = 'skip-link'
  document.body.insertBefore(skipLink, document.body.firstChild)
}

// 添加加载状态指示器
function addLoadingIndicators() {
  // 为外部链接添加加载状态
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
      link.classList.add('loading')
      setTimeout(() => {
        link.classList.remove('loading')
      }, 2000)
    })
  })
}

// 智能导航滚动行为
function initSmartNavigation() {
  let lastScrollY = 0
  let ticking = false

  const nav = document.querySelector('.VPNav') as HTMLElement
  if (!nav) return

  function updateNav() {
    const currentScrollY = window.scrollY

    if (currentScrollY > 100) {
      nav.classList.add('scrolled')
    } else {
      nav.classList.remove('scrolled')
    }

    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      nav.classList.add('hide-on-scroll')
      nav.classList.remove('show-on-scroll')
    } else {
      nav.classList.add('show-on-scroll')
      nav.classList.remove('hide-on-scroll')
    }

    lastScrollY = currentScrollY
    ticking = false
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateNav)
      ticking = true
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
}

// 页面加载动画
function initPageAnimations() {
  // 页面进入动画
  const content = document.querySelector('.VPContent')
  if (content) {
    content.classList.add('page-enter')
  }

  // 特性卡片动画
  const features = document.querySelectorAll('.VPFeature')
  features.forEach((feature, index) => {
    (feature as HTMLElement).style.animationDelay = `${0.1 + index * 0.1}s`
  })
}

// 滚动显示动画
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-reveal')
      }
    })
  }, observerOptions)

  // 观察需要动画的元素
  const animateElements = document.querySelectorAll('.VPFeature, .VPDoc h2, .VPDoc h3')
  animateElements.forEach(el => observer.observe(el))
}

// 性能优化
function initPerformanceOptimizations() {
  // 图片懒加载
  const images = document.querySelectorAll('img[data-src]')
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        img.src = img.dataset.src!
        img.removeAttribute('data-src')
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach(img => imageObserver.observe(img))

  // 预加载关键资源
  const criticalLinks = document.querySelectorAll('a[href^="/"]')
  criticalLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const href = (link as HTMLAnchorElement).href
      const prefetchLink = document.createElement('link')
      prefetchLink.rel = 'prefetch'
      prefetchLink.href = href
      document.head.appendChild(prefetchLink)
    }, { once: true })
  })
}

// 语言切换功能
function initLanguageToggle() {
  // 创建语言切换按钮
  createLanguageToggle()

  // 从本地存储恢复语言设置
  const savedLanguage = localStorage.getItem('preferred-language') || 'zh'
  setLanguage(savedLanguage)

  // 监听系统语言变化
  if ('language' in navigator) {
    // 可以根据系统语言偏好设置默认语言
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith('en') && !localStorage.getItem('preferred-language')) {
      setLanguage('en')
    }
  }
}

// 创建语言切换按钮
function createLanguageToggle() {
  // 查找黑暗模式切换按钮的位置
  const darkModeToggle = document.querySelector('.VPSwitchAppearance') ||
                         document.querySelector('[title*="深色"]') ||
                         document.querySelector('[title*="Dark"]')

  if (!darkModeToggle) {
    console.warn('未找到黑暗模式切换按钮，语言切换按钮将添加到导航栏')
    addLanguageToggleToNav()
    return
  }

  // 创建语言切换容器
  const langToggleContainer = document.createElement('div')
  langToggleContainer.className = 'VP-lang-toggle'
  langToggleContainer.setAttribute('aria-label', '语言切换')

  // 创建语言切换按钮
  const langToggle = document.createElement('button')
  langToggle.className = 'lang-switch-btn'
  langToggle.setAttribute('type', 'button')
  langToggle.setAttribute('aria-label', '切换语言')
  langToggle.innerHTML = `
    <span class="lang-icon">🌐</span>
    <span class="lang-text">中</span>
  `

  // 添加点击事件
  langToggle.addEventListener('click', toggleLanguage)

  // 添加键盘事件
  langToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleLanguage()
    }
  })

  // 组装容器
  langToggleContainer.appendChild(langToggle)

  // 插入到黑暗模式切换按钮旁边
  const parent = darkModeToggle.parentNode
  if (parent) {
    parent.insertBefore(langToggleContainer, darkModeToggle.nextSibling)
  }

  // 添加样式类
  document.body.classList.add('has-lang-toggle')
}

// 添加语言切换到导航栏（备用方案）
function addLanguageToggleToNav() {
  const navBar = document.querySelector('.VPNavBarTitle') ||
                document.querySelector('.VPNav')

  if (!navBar) return

  const langToggle = document.createElement('button')
  langToggle.className = 'lang-switch-btn nav-position'
  langToggle.setAttribute('type', 'button')
  langToggle.setAttribute('aria-label', '切换语言')
  langToggle.innerHTML = `
    <span class="lang-icon">🌐</span>
    <span class="lang-text">中</span>
  `

  langToggle.addEventListener('click', toggleLanguage)

  if (navBar.classList.contains('VPNavBarTitle')) {
    navBar.appendChild(langToggle)
  } else {
    navBar.appendChild(langToggle)
  }
}

// 切换语言
function toggleLanguage() {
  const currentLang = getCurrentLanguage()
  const newLang = currentLang === 'zh' ? 'en' : 'zh'

  setLanguage(newLang)
  saveLanguagePreference(newLang)

  // 添加切换动画
  const btn = document.querySelector('.lang-switch-btn')
  if (btn) {
    btn.classList.add('switching')
    setTimeout(() => {
      btn.classList.remove('switching')
    }, 300)
  }
}

// 获取当前语言
function getCurrentLanguage(): string {
  const html = document.documentElement
  const lang = html.getAttribute('lang') || html.lang || 'zh'
  return lang.startsWith('en') ? 'en' : 'zh'
}

// 设置语言
function setLanguage(lang: 'zh' | 'en') {
  const html = document.documentElement

  // 更新 HTML lang 属性
  html.setAttribute('lang', lang === 'en' ? 'en-US' : 'zh-CN')
  html.lang = lang === 'en' ? 'en-US' : 'zh-CN'

  // 更新按钮文本
  const langText = document.querySelector('.lang-switch-btn .lang-text')
  if (langText) {
    langText.textContent = lang === 'en' ? 'EN' : '中'
  }

  // 更新页面内容
  updatePageContent(lang)

  // 更新 body 类名
  document.body.classList.toggle('lang-en', lang === 'en')
  document.body.classList.toggle('lang-zh', lang === 'zh')

  // 触发自定义事件
  window.dispatchEvent(new CustomEvent('languagechange', {
    detail: { language: lang }
  }))
}

// 保存语言偏好
function saveLanguagePreference(lang: string) {
  localStorage.setItem('preferred-language', lang)
}

// 更新页面内容
function updatePageContent(lang: 'zh' | 'en') {
  // 更新有 data-lang 属性的元素
  const elements = document.querySelectorAll('[data-lang-zh][data-lang-en]')

  elements.forEach(element => {
    const htmlElement = element as HTMLElement
    const zhText = htmlElement.getAttribute('data-lang-zh')
    const enText = htmlElement.getAttribute('data-lang-en')

    if (lang === 'en' && enText) {
      htmlElement.textContent = enText
    } else if (lang === 'zh' && zhText) {
      htmlElement.textContent = zhText
    }
  })

  // 更新链接和导航
  updateNavigationLinks(lang)

  // 更新标题和描述
  updatePageMetadata(lang)
}

// 更新导航链接
function updateNavigationLinks(lang: 'zh' | 'en') {
  const navMap = {
    zh: {
      home: '首页',
      products: '产品',
      services: '服务',
      cases: '案例',
      docs: '文档',
      blog: '博客',
      about: '关于我们',
      contact: '联系我们'
    },
    en: {
      home: 'Home',
      products: 'Products',
      services: 'Services',
      cases: 'Cases',
      docs: 'Docs',
      blog: 'Blog',
      about: 'About',
      contact: 'Contact'
    }
  }

  const currentNavMap = navMap[lang]

  // 更新导航菜单文本
  Object.entries(currentNavMap).forEach(([key, text]) => {
    const elements = document.querySelectorAll(`[data-nav-key="${key}"]`)
    elements.forEach(element => {
      element.textContent = text
    })
  })
}

// 更新页面元数据
function updatePageMetadata(lang: 'zh' | 'en') {
  const titleMap = {
    zh: {
      home: '朗恩科技 - 专业的技术解决方案提供商',
      about: '关于我们 - 朗恩科技',
      contact: '联系我们 - 朗恩科技'
    },
    en: {
      home: 'LangNe Technology - Professional Technology Solutions Provider',
      about: 'About Us - LangNe Technology',
      contact: 'Contact Us - LangNe Technology'
    }
  }

  const path = window.location.pathname
  let pageKey = 'home'

  if (path.includes('/about')) pageKey = 'about'
  else if (path.includes('/contact')) pageKey = 'contact'

  const newTitle = titleMap[lang][pageKey as keyof typeof titleMap.zh]
  if (newTitle) {
    document.title = newTitle
  }

  // 更新描述
  const descriptionMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement
  if (descriptionMeta) {
    const descriptionMap = {
      zh: '朗恩科技文档站点，提供专业的技术解决方案和文档',
      en: 'LangNe Technology documentation site, providing professional technology solutions and documentation'
    }
    descriptionMeta.content = descriptionMap[lang]
  }
}

export default LangNeTheme