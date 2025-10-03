/**
 * 朗恩科技 VitePress 主题 - 性能优化工具
 *
 * 提供网站性能优化功能，包括：
 * - 关键资源优先加载
 * - 图片懒加载
 * - 资源预加载
 * - 性能监控
 * - Core Web Vitals 优化
 */

// 性能监控配置
interface PerformanceConfig {
  enableResourcePriorities: boolean
  enableImageLazyLoading: boolean
  enableLinkPrefetching: boolean
  enablePerformanceMonitoring: boolean
  criticalResourceTimeout: number
  imageLoadingThreshold: number
  prefetchDelay: number
}

// 默认配置
const defaultConfig: PerformanceConfig = {
  enableResourcePriorities: true,
  enableImageLazyLoading: true,
  enableLinkPrefetching: true,
  enablePerformanceMonitoring: true,
  criticalResourceTimeout: 3000,
  imageLoadingThreshold: 0.1,
  prefetchDelay: 1000
}

// 性能优化管理器
class PerformanceManager {
  private config: PerformanceConfig
  private imageObserver?: IntersectionObserver
  private linkObserver?: IntersectionObserver
  private performanceObserver?: PerformanceObserver
  private metrics: Map<string, number> = new Map()

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = { ...defaultConfig, ...config }
    this.init()
  }

  // 初始化性能优化
  private init(): void {
    if (typeof window === 'undefined') return

    // 等待 DOM 加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupOptimizations()
      })
    } else {
      this.setupOptimizations()
    }
  }

  // 设置所有优化功能
  private setupOptimizations(): void {
    if (this.config.enableResourcePriorities) {
      this.setupResourcePriorities()
    }

    if (this.config.enableImageLazyLoading) {
      this.setupImageLazyLoading()
    }

    if (this.config.enableLinkPrefetching) {
      this.setupLinkPrefetching()
    }

    if (this.config.enablePerformanceMonitoring) {
      this.setupPerformanceMonitoring()
    }

    // 优化字体加载
    this.optimizeFontLoading()

    // 优化CSS加载
    this.optimizeCSSLoading()

    // 设置资源提示
    this.setupResourceHints()
  }

  // 设置关键资源优先级
  private setupResourcePriorities(): void {
    // 预加载关键CSS
    const criticalCSS = document.querySelector('link[href*="custom.css"]')
    if (criticalCSS) {
      criticalCSS.setAttribute('importance', 'high')
      criticalCSS.setAttribute('fetchpriority', 'high')
    }

    // 预加载关键字体
    const fontLinks = document.querySelectorAll('link[href*="font"]')
    fontLinks.forEach(link => {
      link.setAttribute('importance', 'high')
      link.setAttribute('crossorigin', 'anonymous')
    })

    // 延迟非关键资源
    setTimeout(() => {
      this.loadNonCriticalResources()
    }, this.config.criticalResourceTimeout)
  }

  // 加载非关键资源
  private loadNonCriticalResources(): void {
    // 延迟加载第三方脚本
    const deferredScripts = [
      // 可以在这里添加第三方脚本URL
    ]

    deferredScripts.forEach(src => {
      const script = document.createElement('script')
      script.src = src
      script.defer = true
      script.loading = 'lazy'
      document.head.appendChild(script)
    })
  }

  // 设置图片懒加载
  private setupImageLazyLoading(): void {
    if (!('IntersectionObserver' in window)) {
      // 降级处理：立即加载所有图片
      this.loadAllImages()
      return
    }

    this.imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            this.loadImage(img)
            this.imageObserver!.unobserve(img)
          }
        })
      },
      {
        threshold: this.config.imageLoadingThreshold,
        rootMargin: '50px 0px'
      }
    )

    // 观察所有带有 data-src 的图片
    const lazyImages = document.querySelectorAll('img[data-src]')
    lazyImages.forEach(img => {
      this.imageObserver!.observe(img)
    })

    // 观察动态添加的图片
    this.observeNewImages()
  }

  // 加载单个图片
  private loadImage(img: HTMLImageElement): void {
    const src = img.dataset.src
    const srcset = img.dataset.srcset

    if (src) {
      img.src = src
      img.removeAttribute('data-src')
    }

    if (srcset) {
      img.srcset = srcset
      img.removeAttribute('data-srcset')
    }

    // 添加加载完成的类
    img.addEventListener('load', () => {
      img.classList.add('loaded')
      // 移除占位符效果
      img.classList.remove('loading-shimmer')
    }, { once: true })

    // 处理加载错误
    img.addEventListener('error', () => {
      img.classList.add('error')
      console.warn('Image failed to load:', src)
    }, { once: true })
  }

  // 观察新添加的图片
  private observeNewImages(): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            const lazyImages = element.querySelectorAll('img[data-src]')
            lazyImages.forEach(img => {
              this.imageObserver!.observe(img)
            })
          }
        })
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
  }

  // 降级处理：加载所有图片
  private loadAllImages(): void {
    const lazyImages = document.querySelectorAll('img[data-src]')
    lazyImages.forEach(img => {
      this.loadImage(img as HTMLImageElement)
    })
  }

  // 设置链接预加载
  private setupLinkPrefetching(): void {
    if (!('IntersectionObserver' in window)) return

    this.linkObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement
            setTimeout(() => {
              this.prefetchLink(link.href)
            }, this.config.prefetchDelay)
            this.linkObserver!.unobserve(link)
          }
        })
      },
      { threshold: 0.1 }
    )

    // 观察内部链接
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]')
    internalLinks.forEach(link => {
      this.linkObserver!.observe(link)
    })
  }

  // 预加载链接
  private prefetchLink(href: string): void {
    // 避免重复预加载
    if (document.querySelector(`link[href="${href}"]`)) return

    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = href
    link.as = 'document'
    document.head.appendChild(link)
  }

  // 设置性能监控
  private setupPerformanceMonitoring(): void {
    if (!('PerformanceObserver' in window)) return

    // 监控 Core Web Vitals
    this.monitorCoreWebVitals()

    // 监控长任务
    this.monitorLongTasks()

    // 监控导航性能
    this.monitorNavigationTiming()
  }

  // 监控 Core Web Vitals
  private monitorCoreWebVitals(): void {
    // LCP (Largest Contentful Paint)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]
      this.metrics.set('LCP', lastEntry.startTime)
    }).observe({ entryTypes: ['largest-contentful-paint'] })

    // FID (First Input Delay) - 使用 event timing API
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      entries.forEach(entry => {
        if (entry.name === 'first-input') {
          const fid = entry.processingStart - entry.startTime
          this.metrics.set('FID', fid)
        }
      })
    }).observe({ entryTypes: ['event'] })

    // CLS (Cumulative Layout Shift)
    let clsValue = 0
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value
        }
      }
      this.metrics.set('CLS', clsValue)
    }).observe({ entryTypes: ['layout-shift'] })
  }

  // 监控长任务
  private monitorLongTasks(): void {
    if (!('PerformanceObserver' in window)) return

    new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach(entry => {
        if (entry.duration > 50) {
          console.warn('Long task detected:', entry)
          this.metrics.set('longTaskCount', (this.metrics.get('longTaskCount') || 0) + 1)
        }
      })
    }).observe({ entryTypes: ['longtask'] })
  }

  // 监控导航性能
  private monitorNavigationTiming(): void {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

      // 记录关键性能指标
      this.metrics.set('TTFB', navigation.responseStart - navigation.requestStart)
      this.metrics.set('DOMContentLoaded', navigation.domContentLoadedEventEnd - navigation.navigationStart)
      this.metrics.set('Load', navigation.loadEventEnd - navigation.navigationStart)
    })
  }

  // 优化字体加载
  private optimizeFontLoading(): void {
    // 预加载关键字体
    const criticalFonts = [
      'PingFang SC',
      'Helvetica Neue',
      'Fira Code'
    ]

    criticalFonts.forEach(fontFamily => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'font'
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
      // 注意：实际使用时需要提供正确的字体文件URL
      // link.href = `/fonts/${fontFamily}.woff2`
    })

    // 设置字体显示策略
    const style = document.createElement('style')
    style.textContent = `
      @font-face {
        font-family: 'PingFang SC';
        font-display: swap;
      }
    `
    document.head.appendChild(style)
  }

  // 优化CSS加载
  private optimizeCSSLoading(): void {
    // 将非关键CSS标记为低优先级
    const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])')
    nonCriticalCSS.forEach(link => {
      link.setAttribute('importance', 'low')
    })

    // 预加载下一页面的CSS
    const nextPageLinks = document.querySelectorAll('a[href^="/"]')
    const prefetchedCSS = new Set<string>()

    nextPageLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const href = (link as HTMLAnchorElement).href
        if (!prefetchedCSS.has(href)) {
          // 预测下一页面可能需要的CSS
          const prefetchLink = document.createElement('link')
          prefetchLink.rel = 'prefetch'
          prefetchLink.href = '/assets/style.css' // 根据实际情况调整
          document.head.appendChild(prefetchLink)
          prefetchedCSS.add(href)
        }
      }, { once: true })
    })
  }

  // 设置资源提示
  private setupResourceHints(): void {
    // DNS预解析
    const externalDomains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com'
    ]

    externalDomains.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'dns-prefetch'
      link.href = `//${domain}`
      document.head.appendChild(link)
    })

    // 预连接关键第三方资源
    const preconnectDomains = [
      'fonts.gstatic.com'
    ]

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = `//${domain}`
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })
  }

  // 获取性能指标
  public getMetrics(): Record<string, number> {
    const metricsObj: Record<string, number> = {}
    this.metrics.forEach((value, key) => {
      metricsObj[key] = value
    })
    return metricsObj
  }

  // 清理资源
  public cleanup(): void {
    this.imageObserver?.disconnect()
    this.linkObserver?.disconnect()
    this.performanceObserver?.disconnect()
    this.metrics.clear()
  }

  // 报告性能指标
  public reportMetrics(): void {
    const metrics = this.getMetrics()
    console.group('🚀 Performance Metrics')

    if (metrics.LCP) {
      console.log(`LCP (Largest Contentful Paint): ${metrics.LCP.toFixed(2)}ms`)
    }

    if (metrics.FID) {
      console.log(`FID (First Input Delay): ${metrics.FID.toFixed(2)}ms`)
    }

    if (metrics.CLS) {
      console.log(`CLS (Cumulative Layout Shift): ${metrics.CLS.toFixed(3)}`)
    }

    if (metrics.TTFB) {
      console.log(`TTFB (Time to First Byte): ${metrics.TTFB.toFixed(2)}ms`)
    }

    if (metrics.DOMContentLoaded) {
      console.log(`DOM Content Loaded: ${metrics.DOMContentLoaded.toFixed(2)}ms`)
    }

    if (metrics.Load) {
      console.log(`Page Load: ${metrics.Load.toFixed(2)}ms`)
    }

    if (metrics.longTaskCount) {
      console.warn(`Long Tasks: ${metrics.longTaskCount}`)
    }

    console.groupEnd()

    // 可以发送到分析服务
    // this.sendToAnalytics(metrics)
  }

  // 发送性能数据到分析服务（示例）
  private sendToAnalytics(metrics: Record<string, number>): void {
    // 实际实现时可以发送到Google Analytics、百度统计等
    // navigator.sendBeacon('/api/analytics', JSON.stringify(metrics))
  }
}

// 导出性能管理器实例
let performanceManager: PerformanceManager

export function initPerformance(config?: Partial<PerformanceConfig>): PerformanceManager {
  if (!performanceManager) {
    performanceManager = new PerformanceManager(config)
  }
  return performanceManager
}

export function getPerformanceManager(): PerformanceManager | undefined {
  return performanceManager
}

// 工具函数

// 检查是否为慢速连接
export function isSlowConnection(): boolean {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection
    return connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g'
  }
  return false
}

// 检查是否为数据节省模式
export function isDataSaverMode(): boolean {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection
    return connection.saveData === true
  }
  return false
}

// 获取设备内存信息
export function getDeviceMemory(): number {
  if ('deviceMemory' in navigator) {
    return (navigator as any).deviceMemory
  }
  return 4 // 默认假设4GB内存
}

// 获取硬件并发数
export function getHardwareConcurrency(): number {
  return navigator.hardwareConcurrency || 4
}

// 设备性能等级评估
export function getPerformanceLevel(): 'low' | 'medium' | 'high' {
  const memory = getDeviceMemory()
  const cores = getHardwareConcurrency()
  const isSlowNet = isSlowConnection()
  const isDataSaver = isDataSaverMode()

  if (memory <= 2 || cores <= 2 || isSlowNet || isDataSaver) {
    return 'low'
  } else if (memory <= 4 || cores <= 4) {
    return 'medium'
  } else {
    return 'high'
  }
}

export default PerformanceManager