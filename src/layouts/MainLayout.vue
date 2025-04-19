<script setup>
import {onMounted} from "vue";

import TheHeader from '../components/layout/TheHeader.vue'
import TheFooter from '../components/layout/TheFooter.vue'
import { useThemeStore } from '../stores/theme.js'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />
    <main class="flex-grow container mx-auto px-4 py-6">
      <slot></slot>
    </main>
    <TheFooter />
  </div>
</template>