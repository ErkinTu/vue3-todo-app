<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTodos } from '../composables/useTodos'
import BaseButton from '../components/common/BaseButton.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const { todos, toggleTodo, removeTodo } = useTodos()

// Получаем текущую задачу по ID
const todo = computed(() => {
  return todos.value.find(t => t.id === props.id)
})

// Форматирование даты создания
const formattedDate = computed(() => {
  if (!todo.value) return ''

  const date = new Date(todo.value.createdAt)
  return new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
})

// Обработчик удаления задачи
function handleRemove() {
  if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
    removeTodo(props.id)
    router.push('/todos')
  }
}
</script>

<template>
  <div v-if="todo" class="max-w-2xl mx-auto">
    <div class="flex items-center mb-6">
      <BaseButton to="/todos" variant="secondary" class="mr-2">
        &larr; Назад
      </BaseButton>
      <h1 class="text-2xl font-bold">Детали задачи</h1>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex items-center mb-6">
        <div
            class="w-5 h-5 border-2 rounded-full mr-3 cursor-pointer flex items-center justify-center"
            :class="[
            todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'
          ]"
            @click="toggleTodo(todo.id)"
        >
          <svg v-if="todo.completed" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2
            class="text-xl font-semibold flex-grow"
            :class="{ 'line-through text-gray-400': todo.completed }"
        >
          {{ todo.title }}
        </h2>
      </div>

      <div class="space-y-4 text-gray-600">
        <div>
          <p class="font-medium">Статус:</p>
          <p>
            <span
                class="inline-block px-2 py-1 text-sm rounded"
                :class="todo.completed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'"
            >
              {{ todo.completed ? 'Выполнено' : 'Активно' }}
            </span>
          </p>
        </div>

        <div>
          <p class="font-medium">Дата создания:</p>
          <p>{{ formattedDate }}</p>
        </div>

        <div>
          <p class="font-medium">ID задачи:</p>
          <p class="text-sm font-mono bg-gray-100 p-1 rounded">{{ todo.id }}</p>
        </div>
      </div>

      <div class="mt-8 flex space-x-4">
        <BaseButton
            @click="toggleTodo(todo.id)"
            :variant="todo.completed ? 'warning' : 'success'"
        >
          {{ todo.completed ? 'Отметить как активную' : 'Отметить как выполненную' }}
        </BaseButton>

        <BaseButton
            @click="handleRemove"
            variant="danger"
        >
          Удалить
        </BaseButton>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-12">
    <p class="text-xl text-gray-600 mb-6">Задача не найдена</p>
    <BaseButton to="/todos" variant="primary">
      Вернуться к списку задач
    </BaseButton>
  </div>
</template>