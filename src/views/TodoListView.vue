<script setup>
import { ref, computed } from 'vue'
import { useTodos } from '../composables/useTodos'
import BaseInput from '../components/common/BaseInput.vue'
import BaseButton from '../components/common/BaseButton.vue'
import TodoItem from '../components/todo/TodoItem.vue'
import TodoFilter from '../components/todo/TodoFilter.vue'

const { todos, addTodo } = useTodos()
const newTodoTitle = ref('')
const filter = ref('all') // 'all', 'active', 'completed'

// Отфильтрованный список задач
const filteredTodos = computed(() => {
  if (filter.value === 'active') {
    return todos.value.filter(todo => !todo.completed)
  } else if (filter.value === 'completed') {
    return todos.value.filter(todo => todo.completed)
  }
  return todos.value
})

// Обработчик создания новой задачи
function handleAddTodo() {
  if (newTodoTitle.value.trim()) {
    addTodo(newTodoTitle.value.trim())
    newTodoTitle.value = ''
  }
}

function updateFilter(newFilter) {
  filter.value = newFilter
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

    <div v-if="filteredTodos.length" class="space-y-4">
      <TodoItem
          v-for="todo in filteredTodos"
          :key="todo.id"
          :todo="todo"
      />
    </div>
    <div v-else class="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
      <p v-if="filter !== 'all'">Нет задач, соответствующих выбранному фильтру</p>
      <p v-else>У вас пока нет задач. Создайте первую!</p>
    </div>
  </div>
</template>