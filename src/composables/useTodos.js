import { computed } from 'vue'
import { useTodoStore } from '../stores/todo'

export function useTodos() {
    const todoStore = useTodoStore()

    // Получаем состояние через геттеры
    const todos = computed(() => todoStore.todos)
    const completedTodos = computed(() => todoStore.completedTodos)
    const incompleteTodos = computed(() => todoStore.incompleteTodos)

    // Получаем методы
    const { addTodo, removeTodo, toggleTodo } = todoStore

    // Дополнительные функции
    const getTodoById = (id) => {
        return todos.value.find(todo => todo.id === id)
    }

    const todoStats = computed(() => {
        return {
            total: todos.value ? todos.value.length : 0,
            completed: completedTodos.value ? completedTodos.value.length : 0,
            incomplete: incompleteTodos.value ? incompleteTodos.value.length : 0,
            percentCompleted: todos.value && todos.value.length
                ? Math.round((completedTodos.value.length / todos.value.length) * 100)
                : 0
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
        toggleTodo
    }
}