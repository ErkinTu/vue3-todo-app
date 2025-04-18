<template>
  <div class="p-4 max-w-md mx-auto min-h-screen flex flex-col">
    <div class="flex flex-col justify-between min-h-[400px]">
      <!-- Заголовок -->
      <div>
        <h2 class="text-xl font-bold mb-4">📋 Список элементов (пагинация)</h2>
          <ul class="space-y-2 mb-4 grow">
            <li
                v-for="item in paginatedItems"
                :key="item.id"
                class="p-3 bg-gray-100 rounded shadow-sm"
            >
              {{ item.name }}
            </li>
          </ul>
      </div>

      <!-- Навигация по страницам -->
      <div class="mt-auto">
        <div class="flex justify-between items-center">
          <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            ⬅ Назад
          </button>

          <span class="font-semibold">Страница {{ currentPage }} из {{ totalPages }}</span>

          <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Вперёд ➡
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import {ref, computed} from 'vue'

const items = ref([
  {id: 1, name: '📌 Задача 1'},
  {id: 2, name: '💡 Идея 2'},
  {id: 3, name: '🔨 Работа 3'},
  {id: 4, name: '📅 План 4'},
  {id: 5, name: '💬 Обсуждение 5'},
  {id: 6, name: '🚀 Проект 6'},
  {id: 7, name: '📝 Заметка 7'},
  {id: 8, name: '📚 Учёба 8'},
  {id: 9, name: '🎯 Цель 9'},
  {id: 10, name: '📈 Статистика 10'},
  {id: 11, name: '💻 Разработка 11'},
  {id: 12, name: '📖 Книга 12'},
  {id: 13, name: '🎨 Дизайн 13'}
])

const itemsPerPage = 5
const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.ceil(items.value.length / itemsPerPage)
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return items.value.slice(start, start + itemsPerPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<style scoped>
/* Немного красоты */
</style>
