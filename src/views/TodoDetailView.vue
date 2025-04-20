<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTodos } from '../composables/useTodos'
import BaseButton from '../components/common/BaseButton.vue'
import BaseInput from '../components/common/BaseInput.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const { todos, toggleTodo, removeTodo, updateTodoDetails } = useTodos()

// Получаем текущую задачу по ID
const todo = computed(() => {
  return todos.value.find(t => t.id === props.id)
})

// Состояние для режима редактирования
const isEditing = ref(false)
const editedTitle = ref('')
const editedDescription = ref('')
const editedImportance = ref('normal')

// Объект для отображения названий важности
const importanceLabels = {
  low: 'Низкая',
  normal: 'Обычная',
  high: 'Высокая'
}

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

// Включение режима редактирования
function startEditing() {
  if (!todo.value) return

  editedTitle.value = todo.value.title
  editedDescription.value = todo.value.description || ''
  editedImportance.value = todo.value.importance || 'normal'
  isEditing.value = true
}

// Сохранение изменений
function saveChanges() {
  if (!todo.value) return

  updateTodoDetails(props.id, {
    title: editedTitle.value.trim(),
    description: editedDescription.value.trim(),
    importance: editedImportance.value
  })

  isEditing.value = false
}

// Отмена редактирования
function cancelEditing() {
  isEditing.value = false
}

// Обработчик удаления задачи
function handleRemove() {
  if (confirm('Вы уверены, что хотите удалить эту задачу?')) {
    removeTodo(props.id)
    router.push('/todos')
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
  <div v-if="todo" class="max-w-2xl mx-auto">
    <div class="flex items-center mb-6">
      <BaseButton to="/todos" variant="secondary" class="mr-2">
        &larr; Назад
      </BaseButton>
      <h1 class="text-2xl font-bold dark:text-gray-100">Детали задачи</h1>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:text-gray-100">
      <!-- Режим редактирования -->
      <div v-if="isEditing" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Название
          </label>
          <BaseInput
              v-model="editedTitle"
              placeholder="Введите название задачи"
              class="w-full dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Описание
          </label>
          <textarea
              v-model="editedDescription"
              placeholder="Введите описание задачи"
              class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
              rows="3"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Важность
          </label>
          <select
              v-model="editedImportance"
              class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="low">Низкая</option>
            <option value="normal">Обычная</option>
            <option value="high">Высокая</option>
          </select>
        </div>

        <div class="flex space-x-3 mt-4">
          <BaseButton @click="saveChanges" variant="primary">
            Сохранить
          </BaseButton>
          <BaseButton @click="cancelEditing" variant="secondary">
            Отмена
          </BaseButton>
        </div>
      </div>

      <!-- Режим просмотра -->
      <div v-else>
        <div class="flex items-center mb-6">
          <div
              class="w-5 h-5 border-2 rounded-full mr-3 cursor-pointer flex items-center justify-center"
              :class="[
              todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'
            ]"
              @click="toggleTodo(todo.id)"
          >
            <svg
                v-if="todo.completed"
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
              ></path>
            </svg>
          </div>
          <div class="flex-grow">
            <div class="flex items-center">
              <h2
                  class="text-xl font-semibold"
                  :class="{ 'line-through text-gray-400 dark:text-gray-600': todo.completed }"
              >
                {{ todo.title }}
              </h2>
              <span
                  class="ml-2 px-2 py-0.5 text-xs rounded-full"
                  :class="importanceStyles[todo.importance || 'normal']"
              >
                {{ importanceLabels[todo.importance || 'normal'] }}
              </span>
            </div>

            <p v-if="todo.description" class="mt-2 text-gray-600 dark:text-gray-300">
              {{ todo.description }}
            </p>
            <p v-else class="mt-2 text-gray-400 dark:text-gray-500 italic">
              Нет описания
            </p>
          </div>
        </div>

        <div class="space-y-4 text-gray-600 dark:text-gray-300">
          <div>
            <p class="font-medium">Статус:</p>
            <p>
              <span
                  class="inline-block px-2 py-1 text-sm rounded"
                  :class="todo.completed
                  ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-200'"
              >
                {{ todo.completed ? 'Выполнено' : 'Активно' }}
              </span>
            </p>
          </div>

          <div>
            <p class="font-medium">Важность:</p>
            <p>
              <span
                  class="inline-block px-2 py-1 text-sm rounded"
                  :class="importanceStyles[todo.importance || 'normal']"
              >
                {{ importanceLabels[todo.importance || 'normal'] }}
              </span>
            </p>
          </div>

          <div>
            <p class="font-medium">Дата создания:</p>
            <p>{{ formattedDate }}</p>
          </div>

          <div>
            <p class="font-medium">ID задачи:</p>
            <p class="text-sm font-mono bg-gray-100 p-1 rounded dark:bg-gray-700 dark:text-gray-300">
              {{ todo.id }}
            </p>
          </div>
        </div>

        <div class="mt-8 flex space-x-4">
          <BaseButton @click="startEditing" variant="primary">
            Редактировать
          </BaseButton>

          <BaseButton
              @click="toggleTodo(todo.id)"
              :variant="todo.completed ? 'warning' : 'success'"
          >
            {{ todo.completed ? 'Отметить как активную' : 'Отметить как выполненную' }}
          </BaseButton>

          <BaseButton @click="handleRemove" variant="danger">
            Удалить
          </BaseButton>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-12">
    <p class="text-xl text-gray-600 mb-6 dark:text-gray-300">Задача не найдена</p>
    <BaseButton to="/todos" variant="primary">
      Вернуться к списку задач
    </BaseButton>
  </div>
</template>