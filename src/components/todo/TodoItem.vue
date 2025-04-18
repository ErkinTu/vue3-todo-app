<script setup>
import { useTodos } from '@/composables/useTodos'
import BaseButton from '../common/BaseButton.vue'

// Motion
import { useMotion } from '@vueuse/motion'
import { ref } from 'vue'

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

// Motion setup
const card = ref(null)
useMotion(card, {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 20
    }
  },
  leave: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: {
      duration: 0.3
    }
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
  },
  tap: {
    scale: 0.97
  }
})
</script>

<template>
  <div ref="card" class="bg-white rounded-lg shadow p-4 transition-all">
    <div class="flex items-center">
      <!-- Кружок -->
      <div
          class="w-5 h-5 border-2 rounded-full mr-3 cursor-pointer flex items-center justify-center"
          :class="[
          props.todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'
        ]"
          @click="toggleTodo(props.todo.id)"
      >
        <svg
            v-if="props.todo.completed"
            class="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <!-- Название задачи -->
      <span
          class="flex-grow"
          :class="{ 'line-through text-gray-500': props.todo.completed }"
      >
        {{ props.todo.title }}
      </span>

      <!-- Кнопки -->
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
