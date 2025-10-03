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

export default LangNeTheme