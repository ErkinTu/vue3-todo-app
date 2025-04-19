<script setup>
import NavBar from './NavBar.vue'
</script>

<template>
  <header class="bg-blue-500 text-white shadow-md dark:bg-blue-600 dark:text-gray-100">
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <router-link to="/" class="text-2xl font-bold hover:underline dark:hover:text-white">
          Vue ToDo
        </router-link>
        <NavBar />
      </div>
    </div>
  </header>
</template>