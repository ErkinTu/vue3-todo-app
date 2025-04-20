const TODOS_STORAGE_KEY = 'vue3-todos'
const STORAGE_VERSION = '2' // Увеличиваем версию для отслеживания изменений структуры

// Получение задач с миграцией при необходимости
export function getTodos() {
    const todosJson = localStorage.getItem(TODOS_STORAGE_KEY)
    if (!todosJson) return []

    try {
        const todos = JSON.parse(todosJson)

        // Проверка версии и миграция данных
        const version = localStorage.getItem(`${TODOS_STORAGE_KEY}-version`) || '1'

        if (version === '1') {
            // Миграция с версии 1 на версию 2
            const migratedTodos = todos.map(todo => ({
                ...todo,
                description: todo.description || '', // Добавляем пустое описание
                importance: todo.importance || 'normal' // Добавляем нормальную важность по умолчанию
            }))

            // Сохраняем мигрированные задачи
            saveTodos(migratedTodos)
            return migratedTodos
        }

        return todos
    } catch (e) {
        console.error('Ошибка при разборе задач из localStorage:', e)
        return []
    }
}

// Сохранение задач с обновлением версии
export function saveTodos(todos) {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
    localStorage.setItem(`${TODOS_STORAGE_KEY}-version`, STORAGE_VERSION)
}

// Дополнительная функция для обновления определенной задачи
export function updateTodo(updatedTodo) {
    const todos = getTodos()
    const index = todos.findIndex(todo => todo.id === updatedTodo.id)

    if (index !== -1) {
        todos[index] = updatedTodo
        saveTodos(todos)
        return true
    }
    return false
}