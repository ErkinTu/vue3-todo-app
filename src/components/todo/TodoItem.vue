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
</script>

<template>
  <div
      class="bg-white rounded-lg shadow p-4 transition-all"
      :class="{ 'opacity-75': props.todo.completed }"
  >
    <div class="flex items-center">
      <div
          class="w-5 h-5 border-2 rounded-full mr-3 cursor-pointer flex items-center justify-center"
          :class="[
          props.todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'
        ]"
          @click="toggleTodo(props.todo.id)"
      >
        <svg v-if="props.todo.completed" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>

      <span
          class="flex-grow"
          :class="{ 'line-through text-gray-500': props.todo.completed }"
      >
        {{ props.todo.title }}
      </span>

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