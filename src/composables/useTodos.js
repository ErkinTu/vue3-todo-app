import { computed, ref } from 'vue'
import { useTodoStore } from '../stores/todo'

export function useTodos(options = { perPage: 5 }) {
    const todoStore = useTodoStore()

    // Пагинация
    const currentPage = ref(1)
    const perPage = ref(options.perPage)

    // Поиск
    const searchQuery = ref('')

    // Получаем состояние через геттеры
    const todos = computed(() => todoStore.todos)
    const completedTodos = computed(() => todoStore.completedTodos)
    const incompleteTodos = computed(() => todoStore.incompleteTodos)

    // Получаем методы
    const { addTodo, removeTodo, toggleTodo, updateTodoDetails } = todoStore

    // Указатель на текущий фильтр
    const filter = ref('all') // 'all', 'active', 'completed'

    // Фильтр по важности
    const importanceFilter = ref('all') // 'all', 'low', 'normal', 'high'

    // Отфильтрованные задачи по статусу и важности
    const statusFilteredTodos = computed(() => {
        if (filter.value === 'active') {
            return todos.value.filter(todo => !todo.completed)
        } else if (filter.value === 'completed') {
            return todos.value.filter(todo => todo.completed)
        }
        return todos.value
    })

    // Добавляем фильтрацию по важности
    const statusAndImportanceFilteredTodos = computed(() => {
        if (importanceFilter.value === 'all') {
            return statusFilteredTodos.value
        }
        return statusFilteredTodos.value.filter(todo =>
            todo.importance === importanceFilter.value
        )
    })

    // Поиск по задачам (по заголовку и описанию)
    const searchFilteredTodos = computed(() => {
        if (!searchQuery.value.trim()) {
            return statusAndImportanceFilteredTodos.value
        }

        const query = searchQuery.value.toLowerCase().trim()
        return statusAndImportanceFilteredTodos.value.filter(todo => {
            const titleMatch = todo.title.toLowerCase().includes(query)
            const descriptionMatch = todo.description ?
                todo.description.toLowerCase().includes(query) : false
            return titleMatch || descriptionMatch
        })
    })

    // Финальная отфильтрованная коллекция с учетом всех фильтров и поиска
    const filteredTodos = computed(() => searchFilteredTodos.value)

    // Функции для работы с пагинацией
    const totalPages = computed(() => {
        return Math.ceil(filteredTodos.value.length / perPage.value) || 1
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

    // Задачи текущей страницы
    const paginatedTodos = computed(() => {
        const startIndex = (currentPage.value - 1) * perPage.value
        const endIndex = startIndex + perPage.value
        return filteredTodos.value.slice(startIndex, endIndex)
    })

    // Сброс поиска
    const clearSearch = () => {
        searchQuery.value = ''
    }

    // Дополнительные функции
    const getTodoById = (id) => {
        return todos.value.find(todo => todo.id === id)
    }

    const todoStats = computed(() => {
        return {
            total: todos.value ? todos.value.length : 0,
            completed: completedTodos.value ? completedTodos.value.length : 0,
            incomplete: incompleteTodos.value ? incompleteTodos.value.length : 0,
            highPriority: todos.value ? todos.value.filter(todo => todo.importance === 'high').length : 0,
            percentCompleted: todos.value && todos.value.length
                ? Math.round((completedTodos.value.length / todos.value.length) * 100)
                : 0,
            found: filteredTodos.value ? filteredTodos.value.length : 0
        }
    })

    return {
        todos,
        completedTodos,
        incompleteTodos,
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
        filteredTodos,

        // Поиск
        searchQuery,
        clearSearch
    }
}