<template>
  <section class="ln-hero">
    <div class="ln-hero__container">
      <div class="ln-hero__content">
        <div class="ln-hero__badge">
          <span class="ln-hero__badge-text">🚀 专业技术解决方案</span>
        </div>

        <h1 class="ln-hero__title">
          <span class="ln-hero__title-primary">朗恩科技</span>
          <span class="ln-hero__title-secondary">LangNe Technology</span>
        </h1>

        <p class="ln-hero__description">
          致力于为企业和个人提供创新的技术解决方案，通过前沿技术推动数字化转型，
          让科技创造更大价值，让服务成就美好未来。
        </p>

        <div class="ln-hero__actions">
          <a href="/about" class="ln-hero__button ln-hero__button--primary">
            了解我们
            <svg class="ln-hero__button-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </a>
          <a href="/markdown-examples" class="ln-hero__button ln-hero__button--secondary">
            查看文档
          </a>
        </div>

        <div class="ln-hero__stats">
          <div class="ln-hero__stat">
            <div class="ln-hero__stat-number">50+</div>
            <div class="ln-hero__stat-label">成功项目</div>
          </div>
          <div class="ln-hero__stat">
            <div class="ln-hero__stat-number">100+</div>
            <div class="ln-hero__stat-label">满意客户</div>
          </div>
          <div class="ln-hero__stat">
            <div class="ln-hero__stat-number">5年+</div>
            <div class="ln-hero__stat-label">行业经验</div>
          </div>
        </div>
      </div>

      <div class="ln-hero__visual">
        <div class="ln-hero__visual-bg"></div>
        <div class="ln-hero__visual-orbs">
          <div class="ln-hero__orb ln-hero__orb--1"></div>
          <div class="ln-hero__orb ln-hero__orb--2"></div>
          <div class="ln-hero__orb ln-hero__orb--3"></div>
        </div>
        <div class="ln-hero__visual-grid"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const heroRef = ref<HTMLElement>()

onMounted(() => {
  // 添加进入动画
  if (heroRef.value) {
    heroRef.value.classList.add('ln-hero--animated')
  }

  // 视差效果
  const handleScroll = () => {
    const scrolled = window.pageYOffset
    const visual = document.querySelector('.ln-hero__visual')
    if (visual) {
      (visual as HTMLElement).style.transform = `translateY(${scrolled * 0.3}px)`
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
.ln-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg,
    var(--ln-color-bg-primary) 0%,
    var(--ln-color-bg-secondary) 50%,
    var(--ln-color-bg-primary) 100%
  );
  overflow: hidden;
  padding: var(--ln-space-20) 0 var(--ln-space-16);
}

.ln-hero__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--ln-space-6);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--ln-space-12);
  align-items: center;
  position: relative;
  z-index: 2;
}

.ln-hero__content {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s ease-out 0.3s forwards;
}

.ln-hero__badge {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg,
    var(--ln-color-brand-primary),
    var(--ln-color-brand-secondary)
  );
  color: white;
  padding: var(--ln-space-2) var(--ln-space-4);
  border-radius: var(--ln-radius-full);
  font-size: var(--ln-font-size-sm);
  font-weight: var(--ln-font-weight-medium);
  margin-bottom: var(--ln-space-6);
  box-shadow: var(--ln-shadow-md);
  animation: pulse 2s ease-in-out infinite;
}

.ln-hero__title {
  margin: 0 0 var(--ln-space-6) 0;
  line-height: var(--ln-line-height-tight);
}

.ln-hero__title-primary {
  display: block;
  font-size: var(--ln-font-size-5xl);
  font-weight: var(--ln-font-weight-bold);
  background: linear-gradient(135deg,
    var(--ln-color-brand-primary),
    var(--ln-color-brand-secondary)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--ln-space-2);
}

.ln-hero__title-secondary {
  display: block;
  font-size: var(--ln-font-size-xl);
  color: var(--ln-color-text-secondary);
  font-weight: var(--ln-font-weight-medium);
  font-style: italic;
}

.ln-hero__description {
  font-size: var(--ln-font-size-lg);
  line-height: var(--ln-line-height-relaxed);
  color: var(--ln-color-text-secondary);
  margin-bottom: var(--ln-space-8);
  max-width: 500px;
}

.ln-hero__actions {
  display: flex;
  gap: var(--ln-space-4);
  margin-bottom: var(--ln-space-12);
}

.ln-hero__button {
  display: inline-flex;
  align-items: center;
  gap: var(--ln-space-2);
  padding: var(--ln-space-4) var(--ln-space-8);
  border-radius: var(--ln-radius-lg);
  font-weight: var(--ln-font-weight-medium);
  font-size: var(--ln-font-size-base);
  text-decoration: none;
  transition: all var(--ln-transition-base);
  position: relative;
  overflow: hidden;
}

.ln-hero__button--primary {
  background: linear-gradient(135deg,
    var(--ln-color-brand-primary),
    var(--ln-color-brand-secondary)
  );
  color: white;
  box-shadow: var(--ln-shadow-lg);
}

.ln-hero__button--primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--ln-shadow-xl);
}

.ln-hero__button--secondary {
  background: var(--ln-color-bg-primary);
  color: var(--ln-color-text-primary);
  border: 2px solid var(--ln-color-border-primary);
}

.ln-hero__button--secondary:hover {
  border-color: var(--ln-color-brand-primary);
  color: var(--ln-color-brand-primary);
  transform: translateY(-2px);
}

.ln-hero__button-icon {
  width: 16px;
  height: 16px;
  transition: transform var(--ln-transition-base);
}

.ln-hero__button--primary:hover .ln-hero__button-icon {
  transform: translateX(4px);
}

.ln-hero__stats {
  display: flex;
  gap: var(--ln-space-8);
}

.ln-hero__stat {
  text-align: center;
}

.ln-hero__stat-number {
  font-size: var(--ln-font-size-2xl);
  font-weight: var(--ln-font-weight-bold);
  color: var(--ln-color-brand-primary);
  line-height: 1;
  margin-bottom: var(--ln-space-1);
}

.ln-hero__stat-label {
  font-size: var(--ln-font-size-sm);
  color: var(--ln-color-text-tertiary);
}

.ln-hero__visual {
  position: relative;
  height: 500px;
  opacity: 0;
  animation: fadeIn 1s ease-out 0.6s forwards;
}

.ln-hero__visual-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle,
    rgba(26, 115, 232, 0.1) 0%,
    rgba(52, 168, 83, 0.05) 50%,
    transparent 100%
  );
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: float 6s ease-in-out infinite;
}

.ln-hero__orb {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg,
    var(--ln-color-brand-primary),
    var(--ln-color-brand-secondary)
  );
  opacity: 0.6;
  animation: orbit 10s linear infinite;
}

.ln-hero__orb--1 {
  width: 60px;
  height: 60px;
  top: 20%;
  right: 20%;
  animation-delay: 0s;
}

.ln-hero__orb--2 {
  width: 40px;
  height: 40px;
  bottom: 30%;
  right: 10%;
  animation-delay: -3s;
}

.ln-hero__orb--3 {
  width: 80px;
  height: 80px;
  top: 60%;
  right: 40%;
  animation-delay: -6s;
}

.ln-hero__visual-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(rgba(26, 115, 232, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 115, 232, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: gridMove 20s linear infinite;
  opacity: 0.3;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: translate(-50%, -50%) translateY(0px);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-20px);
  }
}

@keyframes orbit {
  0% {
    transform: rotate(0deg) translateX(100px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(100px) rotate(-360deg);
  }
}

@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(40px, 40px);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .ln-hero {
    min-height: 90vh;
    padding: var(--ln-space-12) 0 var(--ln-space-8);
  }

  .ln-hero__container {
    grid-template-columns: 1fr;
    gap: var(--ln-space-8);
    text-align: center;
  }

  .ln-hero__title-primary {
    font-size: var(--ln-font-size-3xl);
  }

  .ln-hero__title-secondary {
    font-size: var(--ln-font-size-lg);
  }

  .ln-hero__description {
    font-size: var(--ln-font-size-base);
    max-width: none;
  }

  .ln-hero__actions {
    flex-direction: column;
    align-items: center;
  }

  .ln-hero__button {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }

  .ln-hero__stats {
    justify-content: center;
    gap: var(--ln-space-6);
  }

  .ln-hero__visual {
    height: 300px;
    order: -1;
  }

  .ln-hero__orb {
    display: none;
  }
}

/* Dark theme adjustments */
html.dark .ln-hero {
  background: linear-gradient(135deg,
    var(--ln-color-bg-primary) 0%,
    var(--ln-color-bg-secondary) 50%,
    var(--ln-color-bg-primary) 100%
  );
}

html.dark .ln-hero__button--secondary {
  background: var(--ln-color-bg-tertiary);
  border-color: var(--ln-color-border-primary);
}

html.dark .ln-hero__visual-bg {
  background: radial-gradient(circle,
    rgba(88, 166, 255, 0.1) 0%,
    rgba(63, 185, 80, 0.05) 50%,
    transparent 100%
  );
}
</style>