<script setup>
import { useTodos } from '../composables/useTodos'
import BaseButton from '../components/common/BaseButton.vue'
import TodoStatsCard from '../components/todo/TodoStatsCard.vue'

const { todoStats } = useTodos()
</script>

<template>
  <div>
    <div class="text-center mb-12 mt-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Добро пожаловать в Vue ToDo</h1>
      <p class="text-xl text-gray-600">Простое и эффективное управление задачами</p>

      <div class="mt-8">
        <BaseButton
            to="/todos"
            variant="primary"
            size="lg"
        >
          Перейти к задачам
        </BaseButton>
      </div>
    </div>

    <TodoStatsCard v-if="todoStats.total > 0" class="max-w-lg mx-auto" />

    <div class="mt-16 max-w-2xl mx-auto">
      <h2 class="text-2xl font-semibold mb-6 text-center">Возможности приложения</h2>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-2">Локальное хранение</h3>
          <p class="text-gray-600">Ваши задачи сохраняются в браузере и будут доступны даже после перезагрузки страницы.</p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-2">Простой интерфейс</h3>
          <p class="text-gray-600">Интуитивно понятное управление задачами с минимумом необходимых действий.</p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-2">Статистика</h3>
          <p class="text-gray-600">Удобное отслеживание прогресса выполнения ваших задач.</p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-2">Адаптивный дизайн</h3>
          <p class="text-gray-600">Работает на всех устройствах — от смартфона до десктопа.</p>
        </div>
      </div>
    </div>
  </div>
</template>