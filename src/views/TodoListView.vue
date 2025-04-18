<script setup>
import {ref} from 'vue'
import {useTodos} from '../composables/useTodos'
import BaseInput from '../components/common/BaseInput.vue'
import BaseButton from '../components/common/BaseButton.vue'
import TodoItem from '../components/todo/TodoItem.vue'
import TodoFilter from '../components/todo/TodoFilter.vue'
import Pagination from '../components/todo/Pagination.vue'

// Используем обновленный composable с опциями пагинации
const {
  addTodo,
  filter,
  paginatedTodos,
  currentPage,
  totalPages,
  setPage
} = useTodos({perPage: 10})

const newTodoTitle = ref('')

// Обработчик создания новой задачи
function handleAddTodo() {
  if (newTodoTitle.value.trim()) {
    addTodo(newTodoTitle.value.trim())
    newTodoTitle.value = ''
  }
}

function updateFilter(newFilter) {
  filter.value = newFilter
  // Сбрасываем страницу при изменении фильтра
  setPage(1)
}

function handlePageChange(page) {
  setPage(page)
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Мои задачи</h1>

    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-lg font-semibold mb-4">Добавить новую задачу</h2>

      <div class="flex flex-col md:flex-row gap-4">
        <BaseInput
            v-model="newTodoTitle"
            placeholder="Что нужно сделать?"
            @keyup.enter="handleAddTodo"
            class="flex-grow"
        />
        <BaseButton
            @click="handleAddTodo"
            variant="primary"
            :disabled="!newTodoTitle.trim()"
        >
          Добавить
        </BaseButton>
      </div>
    </div>

    <TodoFilter
        :filter="filter"
        @update:filter="updateFilter"
        class="mb-6"
    />

    <div v-if="paginatedTodos.length" class="space-y-4">
      <TransitionGroup
          tag="div"
          name="todo-list"
          class="space-y-4"
      >
        <TodoItem
            v-for="todo in paginatedTodos"
            :key="todo.id"
            :todo="todo"
        />
      </TransitionGroup>

      <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @update:page="handlePageChange"
      />
    </div>
    <div v-else class="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
      <p v-if="filter !== 'all'">Нет задач, соответствующих выбранному фильтру</p>
      <p v-else>У вас пока нет задач. Создайте первую!</p>
    </div>
  </div>
</template>

<style scoped>
.todo-list-move {
  transition: transform 0.3s ease;
}
</style>