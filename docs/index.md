---
layout: home

hero:
  name: "朗恩科技"
  text: "企业数字化转型的技术伙伴"
  tagline: "用前沿技术赋能企业创新，用专业服务保障项目成功"
  image:
    src: /hero-image.svg
    alt: 朗恩科技 - 企业数字化转型专家
  actions:
    - theme: brand
      text: 免费咨询
      link: /contact
    - theme: alt
      text: 查看案例
      link: /cases/success
    - theme: alt
      text: 技术方案
      link: /services/solutions

features:
  - icon: 🏗️
    title: 企业级技术架构
    details: "基于云原生的微服务架构，支持高并发、高可用的企业级应用。具备完善的监控、日志、安全体系，确保业务稳定运行。"
    link: /services/architecture
  - icon: 📱
    title: 全平台应用开发
    details: "覆盖Web、移动端、小程序的全渠道开发能力。采用React Native、Flutter等跨平台技术，一次开发多端部署。"
    link: /services/development
  - icon: 🚀
    title: 智能化解决方案
    details: "集成AI、大数据、物联网等前沿技术，为企业提供智能化升级方案。助力企业实现数字化转型，提升核心竞争力。"
    link: /services/solutions
  - icon: 🔧
    title: 技术咨询服务
    details: "资深技术团队提供专业的技术咨询、架构设计、项目管理等服务。根据企业需求，量身定制最适合的技术方案。"
    link: /services/consulting
  - icon: 📊
    title: 数据可视化平台
    details: "专业的数据可视化解决方案，将复杂数据转化为直观的图表和报告。支持实时监控、多维度分析，助力数据驱动决策。"
    link: /products/dataviz
  - icon: 🛡️
    title: 企业管理系统
    details: "定制化的企业管理系统，涵盖ERP、CRM、OA等核心业务系统。采用模块化设计，灵活配置，满足不同行业需求。"
    link: /products/enterprise
---

<div class="language-toggle-content">
  <h2 data-lang-zh="为什么选择朗恩科技？" data-lang-en="Why Choose LangNe Technology?">为什么选择朗恩科技？</h2>

  <div class="reason-grid">
    <div class="reason-card">
      <div class="reason-icon">💡</div>
      <h3 data-lang-zh="技术创新" data-lang-en="Technical Innovation">技术创新</h3>
      <p data-lang-zh="始终走在技术前沿，采用最新的架构和技术栈，确保解决方案的先进性和可持续性。"
         data-lang-en="Always at the forefront of technology, adopting the latest architectures and tech stacks to ensure advanced and sustainable solutions.">
        始终走在技术前沿，采用最新的架构和技术栈，确保解决方案的先进性和可持续性。
      </p>
    </div>

    <div class="reason-card">
      <div class="reason-icon">🎯</div>
      <h3 data-lang-zh="量身定制" data-lang-en="Tailored Solutions">量身定制</h3>
      <p data-lang-zh="深入理解每个企业的独特需求，提供个性化的解决方案，而非标准化的产品。"
         data-lang-en="Deep understanding of each enterprise's unique needs, providing personalized solutions rather than standardized products.">
        深入理解每个企业的独特需求，提供个性化的解决方案，而非标准化的产品。
      </p>
    </div>

    <div class="reason-card">
      <div class="reason-icon">🤝</div>
      <h3 data-lang-zh全程服务" data-lang-en="Full-Service Support">全程服务</h3>
      <p data-lang-zh="从需求分析到项目交付，再到后期维护，提供全生命周期的专业服务支持。"
         data-lang-en="From requirements analysis to project delivery and post-maintenance, providing professional support throughout the entire lifecycle.">
        从需求分析到项目交付，再到后期维护，提供全生命周期的专业服务支持。
      </p>
    </div>
  </div>
</div>

<style>
.language-toggle-content {
  margin-top: 3rem;
  padding: 2rem;
  background: var(--vp-c-bg-alt);
  border-radius: 16px;
  border: 1px solid var(--vp-c-border);
}

.reason-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.reason-card {
  text-align: center;
  padding: 2rem;
  background: var(--vp-c-bg);
  border-radius: 12px;
  border: 1px solid var(--vp-c-border);
  transition: var(--ln-transition);
}

.reason-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--ln-shadow-lg);
  border-color: var(--ln-primary);
}

.reason-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.reason-card h3 {
  color: var(--ln-primary);
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.reason-card p {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .language-toggle-content {
    margin-top: 2rem;
    padding: 1.5rem;
  }

  .reason-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .reason-card {
    padding: 1.5rem;
  }
}
</style>