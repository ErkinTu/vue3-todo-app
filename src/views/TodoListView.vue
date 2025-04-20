<script setup>
import { ref } from 'vue'
import { useTodos } from '../composables/useTodos'
import BaseInput from '../components/common/BaseInput.vue'
import BaseButton from '../components/common/BaseButton.vue'
import TodoItem from '../components/todo/TodoItem.vue'
import TodoFilter from '../components/todo/TodoFilter.vue'
import Pagination from '../components/todo/Pagination.vue'

// Используем обновленный composable с опциями пагинации
const {
  addTodo,
  filter,
  importanceFilter,
  paginatedTodos,
  currentPage,
  totalPages,
  setPage
} = useTodos({ perPage: 10 })

const newTodoTitle = ref('')
const newTodoDescription = ref('')
const newTodoImportance = ref('normal')
const showAdvancedOptions = ref(false)

// Обработчик создания новой задачи
function handleAddTodo() {
  if (newTodoTitle.value.trim()) {
    addTodo(
        newTodoTitle.value.trim(),
        newTodoDescription.value.trim(),
        newTodoImportance.value
    )
    newTodoTitle.value = ''
    newTodoDescription.value = ''
    newTodoImportance.value = 'normal'
    showAdvancedOptions.value = false
  }
}

function updateFilter(newFilter) {
  filter.value = newFilter
  // Сбрасываем страницу при изменении фильтра
  setPage(1)
}

function updateImportanceFilter(newFilter) {
  importanceFilter.value = newFilter
  // Сбрасываем страницу при изменении фильтра
  setPage(1)
}

function handlePageChange(page) {
  setPage(page)
}

function toggleAdvancedOptions() {
  showAdvancedOptions.value = !showAdvancedOptions.value
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-8 dark:text-gray-100">Мои задачи</h1>

    <div class="bg-white rounded-lg shadow-md p-6 mb-8 dark:bg-gray-800 dark:text-gray-200">
      <h2 class="text-lg font-semibold mb-4 dark:text-gray-100">Добавить новую задачу</h2>

      <div class="space-y-4">
        <div class="flex flex-col md:flex-row gap-4">
          <BaseInput
              v-model="newTodoTitle"
              placeholder="Что нужно сделать?"
              @keyup.enter="handleAddTodo"
              class="flex-grow dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          />

          <BaseButton
              @click="toggleAdvancedOptions"
              variant="secondary"
              size="md"
          >
            {{ showAdvancedOptions ? 'Скрыть' : 'Дополнительно' }}
          </BaseButton>

          <BaseButton
              @click="handleAddTodo"
              variant="primary"
              :disabled="!newTodoTitle.trim()"
          >
            Добавить
          </BaseButton>
        </div>

        <div v-if="showAdvancedOptions" class="space-y-3 pt-2 border-t dark:border-gray-700">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Описание
            </label>
            <textarea
                v-model="newTodoDescription"
                placeholder="Введите описание задачи (необязательно)"
                class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                rows="2"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Важность
            </label>
            <select
                v-model="newTodoImportance"
                class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <option value="low">Низкая</option>
              <option value="normal">Обычная</option>
              <option value="high">Высокая</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <TodoFilter
        :filter="filter"
        :importance-filter="importanceFilter"
        @update:filter="updateFilter"
        @update:importance-filter="updateImportanceFilter"
        class="mb-6 dark:bg-gray-800 dark:text-gray-200"
    />

    <div v-if="paginatedTodos.length" class="space-y-4">
      <TodoItem
          v-for="todo in paginatedTodos"
          :key="todo.id"
          :todo="todo"
      />

      <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @update:page="handlePageChange"
      />
    </div>

    <div v-else class="bg-white rounded-lg shadow-md p-6 text-center text-gray-500 dark:bg-gray-800 dark:text-gray-400">
      <p v-if="filter !== 'all' || importanceFilter !== 'all'" class="dark:text-gray-300">
        Нет задач, соответствующих выбранным фильтрам
      </p>
      <p v-else class="dark:text-gray-300">
        У вас пока нет задач. Создайте первую!
      </p>
    </div>
  </div>
</template>