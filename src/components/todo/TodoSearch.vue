<script setup>
import {ref, watch} from 'vue'
import BaseInput from '../common/BaseInput.vue'

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  },
  totalResults: {
    type: Number,
    default: 0
  },
  totalTodos: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:searchQuery', 'clearSearch'])

const localSearchQuery = ref(props.searchQuery)

// Обновляем локальное значение при изменении props
watch(() => props.searchQuery, (newValue) => {
  localSearchQuery.value = newValue
})

// Отправляем изменения наверх с небольшой задержкой для улучшения UX
function updateSearch(event) {
  emit('update:searchQuery', event.target.value)
}

function handleClear() {
  localSearchQuery.value = ''
  emit('clearSearch')
}

// Функция для отображения статуса поиска
function getSearchStatus() {
  if (!props.searchQuery) return null

  if (props.totalResults === 0) {
    return 'Нет совпадений'
  } else if (props.totalResults < props.totalTodos) {
    return `Найдено: ${props.totalResults}`
  }

  return null
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-4 dark:bg-gray-800 dark:text-gray-100">
    <div class="flex flex-col sm:flex-row gap-3">
      <div class="relative flex-grow">
        <BaseInput
            v-model="localSearchQuery"
            @input="updateSearch"
            placeholder="Поиск задач..."
            class="w-full pl-10 dark:bg-gray-700 dark:text-gray-100"
        />
        <div class="absolute left-3 top-2.5 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <button
            v-if="localSearchQuery"
            @click="handleClear"
            class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div v-if="props.searchQuery && getSearchStatus()" class="text-sm flex items-center px-3 bg-gray-100 rounded-md dark:bg-gray-700">
        {{ getSearchStatus() }}
      </div>
    </div>

    <div v-if="props.searchQuery && props.totalResults === 0" class="mt-2 text-sm text-gray-500 dark:text-gray-400">
      Попробуйте изменить запрос или очистить поиск
    </div>
  </div>
</template>