<script setup>
import { ref } from 'vue'
import { useTodos } from '@/composables/useTodos'

const { todoStats } = useTodos()
const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <nav>
    <!-- Desktop Navigation -->
    <div class="hidden md:flex items-center space-x-6">
      <router-link to="/" class="hover:text-blue-200 transition-colors">Главная</router-link>
      <router-link to="/todos" class="hover:text-blue-200 transition-colors flex items-center">
        Задачи
        <span
            v-if="todoStats.total > 0"
            class="ml-2 bg-white text-blue-600 rounded-full text-xs px-2 py-0.5"
        >
          {{ todoStats.total }}
        </span>
      </router-link>
    </div>

    <!-- Mobile Menu Button -->
    <button
        @click="toggleMobileMenu"
        class="md:hidden text-white focus:outline-none"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>

    <!-- Mobile Menu -->
    <div
        v-if="isMobileMenuOpen"
        class="md:hidden absolute top-16 right-4 left-4 bg-blue-500 rounded-md shadow-md p-4 z-10"
    >
      <div class="flex flex-col space-y-3">
        <router-link
            @click="isMobileMenuOpen = false"
            to="/"
            class="hover:text-blue-200 transition-colors"
        >
          Главная
        </router-link>
        <router-link
            @click="isMobileMenuOpen = false"
            to="/todos"
            class="hover:text-blue-200 transition-colors flex items-center"
        >
          Задачи
          <span
              v-if="todoStats.total > 0"
              class="ml-2 bg-white text-blue-600 rounded-full text-xs px-2 py-0.5"
          >
            {{ todoStats.total }}
          </span>
        </router-link>
      </div>
    </div>
  </nav>
</template>