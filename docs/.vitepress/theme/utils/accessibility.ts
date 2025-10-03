/**
 * 朗恩科技 VitePress 主题 - 可访问性工具
 *
 * 实现 WCAG 2.1 AA 标准的可访问性功能，包括：
 * - 键盘导航支持
 * - 屏幕阅读器支持
 * - 焦点管理
 * - 色彩对比度检查
 * - ARIA 属性管理
 * - 可访问性测试工具
 */

// 可访问性配置接口
interface AccessibilityConfig {
  enableKeyboardNavigation: boolean
  enableFocusManagement: boolean
  enableAriaSupport: boolean
  enableContrastChecking: boolean
  enableScreenReaderSupport: boolean
  enableAccessibilityTesting: boolean
  skipLinkText: string
  contrastThreshold: number
}

// 默认配置
const defaultConfig: AccessibilityConfig = {
  enableKeyboardNavigation: true,
  enableFocusManagement: true,
  enableAriaSupport: true,
  enableContrastChecking: true,
  enableScreenReaderSupport: true,
  enableAccessibilityTesting: false, // 仅在开发模式启用
  skipLinkText: '跳转到主内容',
  contrastThreshold: 4.5 // WCAG AA 标准
}

// 可访问性管理器
class AccessibilityManager {
  private config: AccessibilityConfig
  private focusableElements: string[]
  private currentFocusIndex: number = -1
  private skipLink?: HTMLAnchorElement
  private screenReaderAnnouncer?: HTMLElement
  private contrastIssues: Array<{ element: Element; ratio: number }> = []

  constructor(config: Partial<AccessibilityConfig> = {}) {
    this.config = { ...defaultConfig, ...config }

    // 可聚焦元素选择器
    this.focusableElements = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      'details[open] summary',
      '[contenteditable="true"]'
    ]

    this.init()
  }

  // 初始化可访问性功能
  private init(): void {
    if (typeof window === 'undefined') return

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupAccessibility()
      })
    } else {
      this.setupAccessibility()
    }
  }

  // 设置所有可访问性功能
  private setupAccessibility(): void {
    if (this.config.enableKeyboardNavigation) {
      this.setupKeyboardNavigation()
    }

    if (this.config.enableFocusManagement) {
      this.setupFocusManagement()
    }

    if (this.config.enableAriaSupport) {
      this.setupAriaSupport()
    }

    if (this.config.enableScreenReaderSupport) {
      this.setupScreenReaderSupport()
    }

    if (this.config.enableContrastChecking) {
      this.setupContrastChecking()
    }

    if (this.config.enableAccessibilityTesting) {
      this.setupAccessibilityTesting()
    }

    // 创建跳转链接
    this.createSkipLink()

    // 设置语言属性
    this.setupLanguageAttributes()

    // 增强表单可访问性
    this.enhanceFormAccessibility()

    // 增强导航可访问性
    this.enhanceNavigationAccessibility()
  }

  // 设置键盘导航
  private setupKeyboardNavigation(): void {
    // 全局键盘事件监听
    document.addEventListener('keydown', (e) => {
      this.handleGlobalKeyboard(e)
    })

    // 为所有可聚焦元素添加键盘支持
    this.enhanceKeyboardSupport()

    // 设置Tab键顺序
    this.setupTabOrder()
  }

  // 处理全局键盘事件
  private handleGlobalKeyboard(e: KeyboardEvent): void {
    switch (e.key) {
      case 'Escape':
        this.handleEscape(e)
        break
      case 'Tab':
        this.handleTab(e)
        break
      case 'Enter':
      case ' ':
        this.handleActivation(e)
        break
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        this.handleArrowKeys(e)
        break
      case 'Home':
      case 'End':
        this.handleHomeEnd(e)
        break
    }
  }

  // 处理 Escape 键
  private handleEscape(e: KeyboardEvent): void {
    // 关闭模态框、下拉菜单等
    const activeElement = document.activeElement

    // 关闭侧边栏
    const sidebar = document.querySelector('.VPSidebar')
    if (sidebar?.classList.contains('open')) {
      const closeButton = sidebar.querySelector('[aria-label="关闭侧边栏"]')
      if (closeButton) {
        (closeButton as HTMLElement).click()
        e.preventDefault()
      }
    }

    // 关闭搜索框
    const searchBox = document.querySelector('[role="search"]')
    if (searchBox && searchBox.contains(activeElement)) {
      (searchBox as HTMLElement).blur()
      e.preventDefault()
    }
  }

  // 处理 Tab 键
  private handleTab(e: KeyboardEvent): void {
    const focusableElements = this.getFocusableElements()
    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement)

    // 确保焦点在可见区域内
    if (currentIndex >= 0) {
      const currentElement = focusableElements[currentIndex]
      if (!this.isElementVisible(currentElement)) {
        e.preventDefault()
        this.focusNextVisibleElement(focusableElements, currentIndex, !e.shiftKey)
      }
    }
  }

  // 处理激活键（Enter/Space）
  private handleActivation(e: KeyboardEvent): void {
    const target = e.target as HTMLElement

    // 为非按钮元素添加点击行为
    if (target.getAttribute('role') === 'button' && target.tagName !== 'BUTTON') {
      target.click()
      e.preventDefault()
    }

    // 处理可展开元素
    if (target.hasAttribute('aria-expanded')) {
      const expanded = target.getAttribute('aria-expanded') === 'true'
      target.setAttribute('aria-expanded', (!expanded).toString())
      e.preventDefault()
    }
  }

  // 处理方向键
  private handleArrowKeys(e: KeyboardEvent): void {
    const target = e.target as HTMLElement
    const role = target.getAttribute('role')

    // 在菜单中使用方向键导航
    if (role === 'menuitem' || target.closest('[role="menu"]')) {
      this.handleMenuNavigation(e)
    }

    // 在选项卡中使用方向键导航
    if (role === 'tab' || target.closest('[role="tablist"]')) {
      this.handleTabNavigation(e)
    }
  }

  // 处理 Home/End 键
  private handleHomeEnd(e: KeyboardEvent): void {
    const target = e.target as HTMLElement
    const container = target.closest('[role="menu"], [role="tablist"], [role="listbox"]')

    if (container) {
      const items = container.querySelectorAll('[role="menuitem"], [role="tab"], [role="option"]')
      if (items.length > 0) {
        const targetItem = e.key === 'Home' ? items[0] : items[items.length - 1]
        ;(targetItem as HTMLElement).focus()
        e.preventDefault()
      }
    }
  }

  // 菜单导航
  private handleMenuNavigation(e: KeyboardEvent): void {
    const menuItems = Array.from(document.querySelectorAll('[role="menuitem"]'))
    const currentIndex = menuItems.indexOf(e.target as Element)

    if (currentIndex === -1) return

    let nextIndex: number
    switch (e.key) {
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % menuItems.length
        break
      case 'ArrowUp':
        nextIndex = (currentIndex - 1 + menuItems.length) % menuItems.length
        break
      default:
        return
    }

    ;(menuItems[nextIndex] as HTMLElement).focus()
    e.preventDefault()
  }

  // 选项卡导航
  private handleTabNavigation(e: KeyboardEvent): void {
    const tabs = Array.from(document.querySelectorAll('[role="tab"]'))
    const currentIndex = tabs.indexOf(e.target as Element)

    if (currentIndex === -1) return

    let nextIndex: number
    switch (e.key) {
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
        break
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % tabs.length
        break
      default:
        return
    }

    const nextTab = tabs[nextIndex] as HTMLElement
    nextTab.focus()
    nextTab.click() // 激活选项卡
    e.preventDefault()
  }

  // 增强键盘支持
  private enhanceKeyboardSupport(): void {
    // 为所有交互元素添加键盘支持
    const interactiveElements = document.querySelectorAll('.VPFeature, .VPButton:not(button), [onclick]:not(button)')

    interactiveElements.forEach(element => {
      const htmlElement = element as HTMLElement

      // 确保可聚焦
      if (!htmlElement.hasAttribute('tabindex')) {
        htmlElement.setAttribute('tabindex', '0')
      }

      // 添加角色
      if (!htmlElement.hasAttribute('role')) {
        htmlElement.setAttribute('role', 'button')
      }

      // 添加键盘事件监听
      htmlElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          htmlElement.click()
          e.preventDefault()
        }
      })
    })
  }

  // 设置Tab顺序
  private setupTabOrder(): void {
    // 确保跳转链接是第一个可Tab的元素
    if (this.skipLink) {
      this.skipLink.setAttribute('tabindex', '1')
    }

    // 设置主要导航的Tab顺序
    const mainNav = document.querySelector('.VPNav')
    if (mainNav) {
      const navLinks = mainNav.querySelectorAll('a, button')
      navLinks.forEach((link, index) => {
        (link as HTMLElement).setAttribute('tabindex', (index + 2).toString())
      })
    }
  }

  // 设置焦点管理
  private setupFocusManagement(): void {
    // 焦点指示器增强
    this.enhanceFocusIndicators()

    // 管理焦点陷阱（用于模态框等）
    this.setupFocusTrapping()

    // 页面导航时的焦点管理
    this.setupNavigationFocus()
  }

  // 增强焦点指示器
  private enhanceFocusIndicators(): void {
    const style = document.createElement('style')
    style.textContent = `
      /* 增强焦点指示器 */
      *:focus-visible {
        outline: 3px solid var(--ln-primary, #1a73e8) !important;
        outline-offset: 2px !important;
        border-radius: 2px !important;
      }

      /* 键盘用户焦点样式 */
      .keyboard-user *:focus {
        outline: 3px solid var(--ln-primary, #1a73e8) !important;
        outline-offset: 2px !important;
      }

      /* 隐藏鼠标用户的焦点样式 */
      .mouse-user *:focus {
        outline: none !important;
      }

      /* 跳转链接样式 */
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--vp-c-bg);
        color: var(--vp-c-text-1);
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 4px;
        border: 2px solid var(--ln-primary, #1a73e8);
        z-index: 1000;
        transition: top 0.2s ease;
      }

      .skip-link:focus {
        top: 6px;
      }
    `
    document.head.appendChild(style)

    // 检测输入方式
    this.detectInputMethod()
  }

  // 检测输入方式（键盘vs鼠标）
  private detectInputMethod(): void {
    let isUsingKeyboard = false

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        isUsingKeyboard = true
        document.body.classList.add('keyboard-user')
        document.body.classList.remove('mouse-user')
      }
    })

    document.addEventListener('mousedown', () => {
      isUsingKeyboard = false
      document.body.classList.add('mouse-user')
      document.body.classList.remove('keyboard-user')
    })
  }

  // 设置焦点陷阱
  private setupFocusTrapping(): void {
    // 为模态框等元素设置焦点陷阱
    const trapContainers = document.querySelectorAll('[data-focus-trap]')

    trapContainers.forEach(container => {
      this.createFocusTrap(container as HTMLElement)
    })
  }

  // 创建焦点陷阱
  private createFocusTrap(container: HTMLElement): void {
    const focusableElements = container.querySelectorAll(this.focusableElements.join(','))
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    container.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    })
  }

  // 页面导航焦点管理
  private setupNavigationFocus(): void {
    // 监听路由变化
    window.addEventListener('popstate', () => {
      this.manageFocusOnNavigation()
    })

    // 监听内部链接点击
    document.addEventListener('click', (e) => {
      const link = (e.target as Element).closest('a[href^="/"], a[href^="./"], a[href^="../"]')
      if (link) {
        // 延迟执行，等待页面更新
        setTimeout(() => {
          this.manageFocusOnNavigation()
        }, 100)
      }
    })
  }

  // 管理导航时的焦点
  private manageFocusOnNavigation(): void {
    // 将焦点移动到主内容区域
    const main = document.querySelector('main, [role="main"], .VPContent')
    if (main) {
      (main as HTMLElement).setAttribute('tabindex', '-1')
      ;(main as HTMLElement).focus()

      // 移除临时的tabindex
      setTimeout(() => {
        (main as HTMLElement).removeAttribute('tabindex')
      }, 1000)
    }
  }

  // 设置ARIA支持
  private setupAriaSupport(): void {
    this.enhanceNavigationAria()
    this.enhanceContentAria()
    this.enhanceFormAria()
    this.setupLiveRegions()
  }

  // 增强导航ARIA
  private enhanceNavigationAria(): void {
    // 主导航
    const mainNav = document.querySelector('.VPNav')
    if (mainNav) {
      mainNav.setAttribute('role', 'navigation')
      mainNav.setAttribute('aria-label', '主导航')
    }

    // 侧边栏导航
    const sidebar = document.querySelector('.VPSidebar')
    if (sidebar) {
      sidebar.setAttribute('role', 'navigation')
      sidebar.setAttribute('aria-label', '侧边栏导航')
    }

    // 面包屑导航
    const breadcrumb = document.querySelector('.VPDocOutline')
    if (breadcrumb) {
      breadcrumb.setAttribute('role', 'navigation')
      breadcrumb.setAttribute('aria-label', '文档大纲')
    }
  }

  // 增强内容ARIA
  private enhanceContentAria(): void {
    // 主内容区域
    const main = document.querySelector('.VPContent')
    if (main) {
      main.setAttribute('role', 'main')
      main.setAttribute('aria-label', '主要内容')
    }

    // 文章内容
    const article = document.querySelector('.VPDoc')
    if (article) {
      article.setAttribute('role', 'article')
    }

    // 标题层级检查和修复
    this.fixHeadingHierarchy()

    // 为图片添加alt属性检查
    this.checkImageAltText()
  }

  // 修复标题层级
  private fixHeadingHierarchy(): void {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    let currentLevel = 0

    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1))

      // 检查标题层级跳跃
      if (level > currentLevel + 1) {
        console.warn(`标题层级跳跃：从 h${currentLevel} 跳到 h${level}`, heading)
      }

      currentLevel = level

      // 确保标题有适当的ID（用于锚点）
      if (!heading.id) {
        const text = heading.textContent || ''
        const id = text.replace(/\s+/g, '-').toLowerCase()
        heading.id = id
      }
    })
  }

  // 检查图片alt属性
  private checkImageAltText(): void {
    const images = document.querySelectorAll('img')

    images.forEach(img => {
      if (!img.alt) {
        // 装饰性图片
        if (img.closest('.VPFeature .icon, .decoration, [data-decorative]')) {
          img.setAttribute('alt', '')
          img.setAttribute('role', 'presentation')
        } else {
          console.warn('图片缺少alt属性:', img.src)
          // 尝试从周围内容推断alt文本
          const caption = img.closest('figure')?.querySelector('figcaption')?.textContent
          if (caption) {
            img.alt = caption
          }
        }
      }
    })
  }

  // 增强表单ARIA
  private enhanceFormAria(): void {
    const forms = document.querySelectorAll('form')

    forms.forEach(form => {
      // 表单标题
      if (!form.getAttribute('aria-label') && !form.getAttribute('aria-labelledby')) {
        const title = form.querySelector('h1, h2, h3, h4, h5, h6')
        if (title) {
          form.setAttribute('aria-labelledby', title.id || 'form-title')
        }
      }

      // 表单控件
      const inputs = form.querySelectorAll('input, select, textarea')
      inputs.forEach(input => {
        this.enhanceFormControl(input as HTMLElement)
      })
    })
  }

  // 增强表单控件
  private enhanceFormControl(control: HTMLElement): void {
    const id = control.id || `control-${Math.random().toString(36).substr(2, 9)}`
    control.id = id

    // 查找标签
    let label = document.querySelector(`label[for="${id}"]`)
    if (!label) {
      label = control.closest('label')
    }

    // 如果没有标签，查找附近的文本
    if (!label) {
      const labelText = this.findLabelText(control)
      if (labelText) {
        control.setAttribute('aria-label', labelText)
      }
    }

    // 错误消息
    const errorElement = document.querySelector(`[data-error-for="${id}"]`)
    if (errorElement) {
      control.setAttribute('aria-describedby', errorElement.id)
      control.setAttribute('aria-invalid', 'true')
    }

    // 帮助文本
    const helpElement = document.querySelector(`[data-help-for="${id}"]`)
    if (helpElement) {
      const describedBy = control.getAttribute('aria-describedby')
      const newDescribedBy = describedBy ? `${describedBy} ${helpElement.id}` : helpElement.id
      control.setAttribute('aria-describedby', newDescribedBy)
    }
  }

  // 查找标签文本
  private findLabelText(control: HTMLElement): string {
    // 查找前面的文本节点
    let prev = control.previousSibling
    while (prev) {
      if (prev.nodeType === Node.TEXT_NODE) {
        const text = prev.textContent?.trim()
        if (text && text.length > 2) {
          return text.replace(/:$/, '')
        }
      } else if (prev.nodeType === Node.ELEMENT_NODE) {
        const text = (prev as Element).textContent?.trim()
        if (text && text.length > 2) {
          return text.replace(/:$/, '')
        }
      }
      prev = prev.previousSibling
    }

    return ''
  }

  // 设置实时区域
  private setupLiveRegions(): void {
    // 创建屏幕阅读器公告区域
    if (!this.screenReaderAnnouncer) {
      this.screenReaderAnnouncer = document.createElement('div')
      this.screenReaderAnnouncer.setAttribute('aria-live', 'polite')
      this.screenReaderAnnouncer.setAttribute('aria-atomic', 'true')
      this.screenReaderAnnouncer.className = 'sr-only'
      this.screenReaderAnnouncer.style.cssText = `
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      `
      document.body.appendChild(this.screenReaderAnnouncer)
    }
  }

  // 设置屏幕阅读器支持
  private setupScreenReaderSupport(): void {
    this.setupLiveRegions()
    this.addScreenReaderHelpers()
    this.handleDynamicContent()
  }

  // 添加屏幕阅读器辅助
  private addScreenReaderHelpers(): void {
    // 为视觉元素添加屏幕阅读器文本
    const visualElements = document.querySelectorAll('.icon, .emoji, [data-visual]')

    visualElements.forEach(element => {
      if (!element.getAttribute('aria-label') && !element.textContent?.trim()) {
        element.setAttribute('aria-hidden', 'true')
      }
    })

    // 为复杂组件添加描述
    const complexComponents = document.querySelectorAll('.VPFeature')
    complexComponents.forEach((component, index) => {
      const title = component.querySelector('.title')?.textContent
      const description = component.querySelector('.details')?.textContent

      if (title) {
        component.setAttribute('aria-label', `特性${index + 1}: ${title}`)
      }
      if (description) {
        component.setAttribute('aria-description', description)
      }
    })
  }

  // 处理动态内容
  private handleDynamicContent(): void {
    // 监听DOM变化
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            this.enhanceNewElement(element)
          }
        })
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
  }

  // 增强新元素
  private enhanceNewElement(element: Element): void {
    // 检查并修复可访问性问题
    if (element.tagName === 'IMG' && !element.getAttribute('alt')) {
      this.checkImageAltText()
    }

    // 为新的交互元素添加键盘支持
    if (element.matches('.VPFeature, .VPButton:not(button), [onclick]:not(button)')) {
      this.enhanceKeyboardSupport()
    }

    // 为新的表单控件添加ARIA
    if (element.matches('input, select, textarea')) {
      this.enhanceFormControl(element as HTMLElement)
    }
  }

  // 创建跳转链接
  private createSkipLink(): void {
    this.skipLink = document.createElement('a')
    this.skipLink.href = '#main-content'
    this.skipLink.textContent = this.config.skipLinkText
    this.skipLink.className = 'skip-link'
    this.skipLink.setAttribute('tabindex', '1')

    document.body.insertBefore(this.skipLink, document.body.firstChild)

    // 确保主内容有ID
    const main = document.querySelector('main, [role="main"], .VPContent')
    if (main && !main.id) {
      main.id = 'main-content'
    }
  }

  // 设置语言属性
  private setupLanguageAttributes(): void {
    // 确保html元素有lang属性
    if (!document.documentElement.lang) {
      document.documentElement.lang = 'zh-CN'
    }

    // 为不同语言的内容添加lang属性
    const englishPatterns = [/^[a-zA-Z\s\.,!?]+$/]
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, td, th')

    textElements.forEach(element => {
      const text = element.textContent?.trim()
      if (text && englishPatterns.some(pattern => pattern.test(text))) {
        element.setAttribute('lang', 'en')
      }
    })
  }

  // 增强表单可访问性
  private enhanceFormAccessibility(): void {
    const searchInputs = document.querySelectorAll('input[type="search"], .DocSearch-Input')

    searchInputs.forEach(input => {
      const htmlInput = input as HTMLInputElement

      if (!htmlInput.getAttribute('aria-label')) {
        htmlInput.setAttribute('aria-label', '搜索文档')
      }

      htmlInput.setAttribute('role', 'searchbox')
      htmlInput.setAttribute('aria-autocomplete', 'both')
    })
  }

  // 增强导航可访问性
  private enhanceNavigationAccessibility(): void {
    // 当前页面链接
    const currentPageLinks = document.querySelectorAll('a[aria-current="page"], .router-link-active')
    currentPageLinks.forEach(link => {
      link.setAttribute('aria-current', 'page')
    })

    // 外部链接
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])')
    externalLinks.forEach(link => {
      const text = link.textContent || link.getAttribute('aria-label') || ''
      link.setAttribute('aria-label', `${text} (在新标签页中打开)`)
      link.setAttribute('rel', 'noopener noreferrer')
    })

    // 下载链接
    const downloadLinks = document.querySelectorAll('a[download], a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"]')
    downloadLinks.forEach(link => {
      const text = link.textContent || link.getAttribute('aria-label') || ''
      const extension = link.getAttribute('href')?.split('.').pop()?.toUpperCase()
      link.setAttribute('aria-label', `${text} (${extension} 文件下载)`)
    })
  }

  // 设置对比度检查
  private setupContrastChecking(): void {
    if (process.env.NODE_ENV === 'development') {
      this.checkColorContrast()
    }
  }

  // 检查颜色对比度
  private checkColorContrast(): void {
    const textElements = document.querySelectorAll('*')

    textElements.forEach(element => {
      const htmlElement = element as HTMLElement
      const computedStyle = window.getComputedStyle(htmlElement)
      const color = computedStyle.color
      const backgroundColor = computedStyle.backgroundColor

      if (color && backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
        const ratio = this.calculateContrastRatio(color, backgroundColor)
        if (ratio < this.config.contrastThreshold) {
          this.contrastIssues.push({ element, ratio })
          console.warn(`对比度不足 (${ratio.toFixed(2)}:1):`, element, { color, backgroundColor })
        }
      }
    })
  }

  // 计算对比度比例
  private calculateContrastRatio(color1: string, color2: string): number {
    // 简化的对比度计算（实际应该使用更精确的算法）
    const rgb1 = this.parseColor(color1)
    const rgb2 = this.parseColor(color2)

    if (!rgb1 || !rgb2) return 21 // 假设最高对比度

    const l1 = this.getLuminance(rgb1)
    const l2 = this.getLuminance(rgb2)

    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)

    return (lighter + 0.05) / (darker + 0.05)
  }

  // 解析颜色
  private parseColor(color: string): [number, number, number] | null {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    ctx.fillStyle = color
    ctx.fillRect(0, 0, 1, 1)
    const data = ctx.getImageData(0, 0, 1, 1).data

    return [data[0], data[1], data[2]]
  }

  // 获取亮度
  private getLuminance([r, g, b]: [number, number, number]): number {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  // 设置可访问性测试
  private setupAccessibilityTesting(): void {
    if (process.env.NODE_ENV === 'development') {
      this.runAccessibilityAudit()
    }
  }

  // 运行可访问性审计
  private runAccessibilityAudit(): void {
    const issues: string[] = []

    // 检查缺少alt属性的图片
    const imagesWithoutAlt = document.querySelectorAll('img:not([alt]), img[alt=""]')
    if (imagesWithoutAlt.length > 0) {
      issues.push(`${imagesWithoutAlt.length} 张图片缺少有意义的alt属性`)
    }

    // 检查标题层级
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    let hasH1 = false
    headings.forEach(heading => {
      if (heading.tagName === 'H1') hasH1 = true
    })
    if (!hasH1) {
      issues.push('页面缺少 H1 标题')
    }

    // 检查表单标签
    const inputsWithoutLabels = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])')
    const unlabeledInputs = Array.from(inputsWithoutLabels).filter(input => {
      const id = input.id
      return !id || !document.querySelector(`label[for="${id}"]`)
    })
    if (unlabeledInputs.length > 0) {
      issues.push(`${unlabeledInputs.length} 个表单控件缺少标签`)
    }

    // 检查链接文本
    const linksWithoutText = document.querySelectorAll('a:not([aria-label]):not([aria-labelledby]):empty, a[aria-label=""], a[title=""]:not([aria-label])')
    if (linksWithoutText.length > 0) {
      issues.push(`${linksWithoutText.length} 个链接缺少描述文字`)
    }

    // 输出审计结果
    if (issues.length > 0) {
      console.group('♿ 可访问性问题')
      issues.forEach(issue => console.warn(issue))
      console.groupEnd()
    } else {
      console.log('♿ 可访问性检查：未发现问题')
    }

    // 输出对比度问题
    if (this.contrastIssues.length > 0) {
      console.group('♿ 颜色对比度问题')
      this.contrastIssues.forEach(({ element, ratio }) => {
        console.warn(`对比度 ${ratio.toFixed(2)}:1 (建议 ≥ ${this.config.contrastThreshold}:1)`, element)
      })
      console.groupEnd()
    }
  }

  // 工具方法

  // 获取可聚焦元素
  private getFocusableElements(): HTMLElement[] {
    return Array.from(document.querySelectorAll(this.focusableElements.join(','))) as HTMLElement[]
  }

  // 检查元素是否可见
  private isElementVisible(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect()
    const style = window.getComputedStyle(element)

    return (
      rect.width > 0 &&
      rect.height > 0 &&
      style.visibility !== 'hidden' &&
      style.display !== 'none' &&
      parseFloat(style.opacity) > 0
    )
  }

  // 聚焦下一个可见元素
  private focusNextVisibleElement(elements: HTMLElement[], currentIndex: number, forward: boolean): void {
    const direction = forward ? 1 : -1
    let nextIndex = currentIndex + direction

    while (nextIndex >= 0 && nextIndex < elements.length) {
      const element = elements[nextIndex]
      if (this.isElementVisible(element)) {
        element.focus()
        break
      }
      nextIndex += direction
    }
  }

  // 公共API

  // 公告消息给屏幕阅读器
  public announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (this.screenReaderAnnouncer) {
      this.screenReaderAnnouncer.setAttribute('aria-live', priority)
      this.screenReaderAnnouncer.textContent = message

      // 清除消息
      setTimeout(() => {
        if (this.screenReaderAnnouncer) {
          this.screenReaderAnnouncer.textContent = ''
        }
      }, 1000)
    }
  }

  // 获取可访问性问题报告
  public getAccessibilityReport(): {
    contrastIssues: Array<{ element: Element; ratio: number }>
    totalIssues: number
  } {
    return {
      contrastIssues: this.contrastIssues,
      totalIssues: this.contrastIssues.length
    }
  }

  // 清理资源
  public cleanup(): void {
    this.contrastIssues = []
    if (this.skipLink) {
      this.skipLink.remove()
    }
    if (this.screenReaderAnnouncer) {
      this.screenReaderAnnouncer.remove()
    }
  }
}

// 导出可访问性管理器
let accessibilityManager: AccessibilityManager

export function initAccessibility(config?: Partial<AccessibilityConfig>): AccessibilityManager {
  if (!accessibilityManager) {
    accessibilityManager = new AccessibilityManager(config)
  }
  return accessibilityManager
}

export function getAccessibilityManager(): AccessibilityManager | undefined {
  return accessibilityManager
}

// 工具函数

// 检查用户是否偏好减少动画
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// 检查用户是否偏好高对比度
export function prefersHighContrast(): boolean {
  return window.matchMedia('(prefers-contrast: high)').matches
}

// 检查是否为辅助技术用户
export function isUsingAssistiveTechnology(): boolean {
  return (
    'speechSynthesis' in window ||
    'webkitSpeechSynthesis' in window ||
    navigator.userAgent.includes('NVDA') ||
    navigator.userAgent.includes('JAWS') ||
    navigator.userAgent.includes('VoiceOver')
  )
}

export default AccessibilityManager