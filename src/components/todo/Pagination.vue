<script setup>
import { defineProps, defineEmits } from 'vue'
import BaseButton from '../common/BaseButton.vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:page'])

function changePage(page) {
  emit('update:page', page)
}

// Определяем, какие номера страниц показать
const pageNumbers = () => {
  // Если меньше 8 страниц, показываем все
  if (props.totalPages <= 7) {
    return Array.from({ length: props.totalPages }, (_, i) => i + 1)
  }

  // Если текущая страница близка к началу
  if (props.currentPage <= 3) {
    return [1, 2, 3, 4, 5, '...', props.totalPages]
  }

  // Если текущая страница близка к концу
  if (props.currentPage >= props.totalPages - 2) {
    return [1, '...', props.totalPages - 4, props.totalPages - 3, props.totalPages - 2, props.totalPages - 1, props.totalPages]
  }

  // В середине - показываем текущую и по 2 страницы с каждой стороны
  return [
    1,
    '...',
    props.currentPage - 1,
    props.currentPage,
    props.currentPage + 1,
    '...',
    props.totalPages
  ]
}
</script>

<template>
  <div v-if="totalPages > 1" class="flex justify-center space-x-2 mt-4">
    <!-- Кнопка "Назад" -->
    <BaseButton
        variant="secondary"
        size="sm"
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        aria-label="Предыдущая страница"
    >
      &laquo;
    </BaseButton>

    <!-- Номера страниц -->
    <template v-for="(page, index) in pageNumbers()" :key="index">
      <span v-if="page === '...'" class="flex items-center px-2">...</span>
      <BaseButton
          v-else
          :variant="page === currentPage ? 'primary' : 'secondary'"
          size="sm"
          @click="changePage(page)"
      >
        {{ page }}
      </BaseButton>
    </template>

    <!-- Кнопка "Вперед" -->
    <BaseButton
        variant="secondary"
        size="sm"
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        aria-label="Следующая страница"
    >
      &raquo;
    </BaseButton>
  </div>
</template>