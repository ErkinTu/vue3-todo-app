const TODOS_STORAGE_KEY = 'vue3-todos'

export function getTodos() {
    try {
        const storedTodos = localStorage.getItem(TODOS_STORAGE_KEY)
        return storedTodos ? JSON.parse(storedTodos) : []
    } catch (error) {
        console.error('Error getting todos from localStorage', error)
        return []
    }
}

export function saveTodos(todos) {
    try {
        localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
    } catch (error) {
        console.error('Error saving todos to localStorage', error)
    }
}