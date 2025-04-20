<script setup>
import { useTodos } from '@/composables/useTodos'

const props = defineProps({
  filter: {
    type: String,
    default: 'all'
  },
  importanceFilter: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits(['update:filter', 'update:importanceFilter'])

const { todoStats } = useTodos()

function setFilter(value) {
  emit('update:filter', value)
}

function setImportanceFilter(value) {
  emit('update:importanceFilter', value)
}
</script>

<template>
  <div class="space-y-4 bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
    <div class="flex flex-wrap items-center gap-4">
      <span class="text-gray-600 font-medium dark:text-gray-200">Статус:</span>

      <div class="flex flex-wrap gap-2">
        <button
            @click="setFilter('all')"
            class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
            :class="props.filter === 'all'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'"
        >
          Все ({{ todoStats.total }})
        </button>

        <button
            @click="setFilter('active')"
            class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
            :class="props.filter === 'active'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'"
        >
          Активные ({{ todoStats.incomplete }})
        </button>

        <button
            @click="setFilter('completed')"
            class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
            :class="props.filter === 'completed'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'"
        >
          Выполненные ({{ todoStats.completed }})
        </button>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-4">
      <span class="text-gray-600 font-medium dark:text-gray-200">Важность:</span>

      <div class="flex flex-wrap gap-2">
        <button
            @click="setImportanceFilter('all')"
            class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
            :class="props.importanceFilter === 'all'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'"
        >
          Все ({{ todoStats.total }})
        </button>

        <button
            @click="setImportanceFilter('low')"
            class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
            :class="props.importanceFilter === 'low'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'"
        >
          Низкая ({{ todoStats.lowPriority }})
        </button>

        <button
            @click="setImportanceFilter('normal')"
            class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
            :class="props.importanceFilter === 'normal'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'"
        >
          Обычная ({{ todoStats.normalPriority }})
        </button>

        <button
            @click="setImportanceFilter('high')"
            class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
            :class="props.importanceFilter === 'high'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'"
        >
          Высокая ({{ todoStats.highPriority }})
        </button>
      </div>
    </div>
  </div>
</template>