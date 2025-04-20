<script setup>
import { useTodos } from '@/composables/useTodos'
import BaseButton from '../common/BaseButton.vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const { toggleTodo, removeTodo } = useTodos()

function confirmDelete() {
  if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
    removeTodo(props.todo.id)
  }
}

// Объект для стилей важности задачи
const importanceStyles = {
  low: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  normal: 'bg-blue-100 text-blue-600 dark:bg-blue-700 dark:text-blue-300',
  high: 'bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-300'
}
</script>

<template>
  <div
      class="bg-white rounded-lg shadow p-4 transition-all dark:bg-gray-800 dark:text-gray-100"
      :class="{ 'opacity-75': props.todo.completed }"
  >
    <div class="flex items-center">
      <div
          class="w-5 h-5 border-2 rounded-full mr-3 cursor-pointer flex items-center justify-center"
          :class="[
          props.todo.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-400 dark:border-gray-600'
        ]"
          @click="toggleTodo(props.todo.id)"
      >
        <svg
            v-if="props.todo.completed"
            class="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <div class="flex-grow">
        <div class="flex items-center">
          <span
              class="font-medium"
              :class="{
              'line-through text-gray-500 dark:text-gray-400': props.todo.completed
            }"
          >
            {{ props.todo.title }}
          </span>

          <span
              class="ml-2 px-2 py-0.5 text-xs rounded-full"
              :class="importanceStyles[props.todo.importance || 'normal']"
          >
            {{ props.todo.importance || 'normal' }}
          </span>
        </div>

        <p v-if="props.todo.description" class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
          {{ props.todo.description }}
        </p>
      </div>

      <div class="flex space-x-2">
        <BaseButton
            :to="`/todos/${props.todo.id}`"
            variant="secondary"
            size="sm"
        >
          Детали
        </BaseButton>
        <BaseButton
            @click="confirmDelete"
            variant="danger"
            size="sm"
        >
          Удалить
        </BaseButton>
      </div>
    </div>
  </div>
</template>