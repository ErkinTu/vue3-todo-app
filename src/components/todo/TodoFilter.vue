<script setup>
import { useTodos } from '@/composables/useTodos'

const props = defineProps({
  filter: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits(['update:filter'])

const { todoStats } = useTodos()

function setFilter(value) {
  emit('update:filter', value)
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg shadow-md">
    <span class="text-gray-600 font-medium">Фильтр:</span>

    <div class="flex space-x-2">
      <button
          @click="setFilter('all')"
          class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
          :class="props.filter === 'all'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
      >
        Все ({{ todoStats.total }})
      </button>

      <button
          @click="setFilter('active')"
          class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
          :class="props.filter === 'active'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
      >
        Активные ({{ todoStats.incomplete }})
      </button>

      <button
          @click="setFilter('completed')"
          class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
          :class="props.filter === 'completed'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
      >
        Выполненные ({{ todoStats.completed }})
      </button>
    </div>
  </div>
</template>