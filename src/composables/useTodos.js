import { computed, ref } from 'vue'
import { useTodoStore } from '../stores/todo'

export function useTodos(options = { perPage: 5 }) {
    const todoStore = useTodoStore()

    // Пагинация
    const currentPage = ref(1)
    const perPage = ref(options.perPage)

    // Получаем состояние через геттеры
    const todos = computed(() => todoStore.todos)
    const completedTodos = computed(() => todoStore.completedTodos)
    const incompleteTodos = computed(() => todoStore.incompleteTodos)
    const lowPriorityTodos = computed(() => todoStore.lowPriorityTodos)
    const normalPriorityTodos = computed(() => todoStore.normalPriorityTodos)
    const highPriorityTodos = computed(() => todoStore.highPriorityTodos)

    // Получаем методы
    const { addTodo, removeTodo, toggleTodo, updateTodoDetails } = todoStore

    // Функции для работы с пагинацией
    const totalPages = computed(() => {
        return Math.ceil(filteredTodos.value.length / perPage.value)
    })

    const setPage = (page) => {
        if (page < 1) page = 1
        if (page > totalPages.value) page = totalPages.value
        currentPage.value = page
    }

    const nextPage = () => {
        if (currentPage.value < totalPages.value) {
            currentPage.value++
        }
    }

    const prevPage = () => {
        if (currentPage.value > 1) {
            currentPage.value--
        }
    }

    // Указатель на текущий фильтр
    const filter = ref('all') // 'all', 'active', 'completed'

    // Дополнительный фильтр по важности
    const importanceFilter = ref('all') // 'all', 'low', 'normal', 'high'

    // Отфильтрованные задачи с учетом статуса и важности
    const filteredTodos = computed(() => {
        let result = todos.value;

        // Фильтр по статусу
        if (filter.value === 'active') {
            result = result.filter(todo => !todo.completed)
        } else if (filter.value === 'completed') {
            result = result.filter(todo => todo.completed)
        }

        // Фильтр по важности
        if (importanceFilter.value !== 'all') {
            result = result.filter(todo => todo.importance === importanceFilter.value)
        }

        return result
    })

    // Задачи текущей страницы
    const paginatedTodos = computed(() => {
        const startIndex = (currentPage.value - 1) * perPage.value
        const endIndex = startIndex + perPage.value
        return filteredTodos.value.slice(startIndex, endIndex)
    })

    // Дополнительные функции
    const getTodoById = (id) => {
        return todos.value.find(todo => todo.id === id)
    }

    const todoStats = computed(() => {
        return {
            total: todos.value ? todos.value.length : 0,
            completed: completedTodos.value ? completedTodos.value.length : 0,
            incomplete: incompleteTodos.value ? incompleteTodos.value.length : 0,
            lowPriority: lowPriorityTodos.value ? lowPriorityTodos.value.length : 0,
            normalPriority: normalPriorityTodos.value ? normalPriorityTodos.value.length : 0,
            highPriority: highPriorityTodos.value ? highPriorityTodos.value.length : 0,
            percentCompleted: todos.value && todos.value.length
                ? Math.round((completedTodos.value.length / todos.value.length) * 100)
                : 0
        }
    })

    return {
        todos,
        completedTodos,
        incompleteTodos,
        highPriorityTodos,
        todoStats,
        getTodoById,
        addTodo,
        removeTodo,
        toggleTodo,
        updateTodoDetails,

        // Пагинация
        currentPage,
        perPage,
        totalPages,
        setPage,
        nextPage,
        prevPage,
        paginatedTodos,

        // Фильтры
        filter,
        importanceFilter,
        filteredTodos
    }
}