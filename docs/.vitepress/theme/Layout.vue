<template>
  <Layout>
    <template #home-hero-before>
      <HeroSection v-if="frontmatter.layout === 'home'" />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import HeroSection from './components/HeroSection.vue'

const Layout = DefaultTheme.Layout
const { frontmatter } = useData()
</script>