<script setup>
import { ref } from 'vue'
import { useTodos } from '@/composables/useTodos'
import ThemeToggle from "@/components/common/ThemeToggle.vue";

const { todoStats } = useTodos()
const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <nav>
    <!-- Desktop Navigation -->
    <div class="hidden md:flex items-center space-x-6 text-white dark:text-gray-100">
      <router-link to="/" class="hover:text-blue-200 transition-colors">Главная</router-link>

      <router-link to="/todos" class="hover:text-blue-200 transition-colors flex items-center">
        Задачи
        <span
            v-if="todoStats.total > 0"
            class="ml-2 bg-white text-blue-600 rounded-full text-xs px-2 py-0.5 dark:bg-gray-200 dark:text-blue-700"
        >
        {{ todoStats.total }}
      </span>
      </router-link>

      <router-link to="/easy-pagination-example" class="hover:text-blue-200 transition-colors">
        Пагинация
      </router-link>

      <ThemeToggle />
    </div>

    <!-- Mobile Menu Button -->
    <div class="md:hidden flex items-center space-x-2">
      <!-- Добавляем переключатель темы рядом с кнопкой меню -->
      <ThemeToggle />

      <button
          @click="toggleMobileMenu"
          class="text-white dark:text-gray-100 focus:outline-none"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
              v-if="!isMobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
          />
          <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
        v-if="isMobileMenuOpen"
        class="md:hidden absolute top-16 right-4 left-4 bg-blue-500 dark:bg-blue-600 rounded-md shadow-md p-4 z-10 text-white dark:text-gray-100"
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
              class="ml-2 bg-white text-blue-600 rounded-full text-xs px-2 py-0.5 dark:bg-gray-200 dark:text-blue-700"
          >
          {{ todoStats.total }}
        </span>
        </router-link>

        <router-link
            @click="isMobileMenuOpen = false"
            to="/easy-pagination-example"
            class="hover:text-blue-200 transition-colors"
        >
          Пагинация
        </router-link>
      </div>
    </div>
  </nav>
</template>