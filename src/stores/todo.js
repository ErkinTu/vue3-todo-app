import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { getTodos, saveTodos } from '../utils/localStorage'

export const useTodoStore = defineStore('todo', () => {
    // Состояние
    const todos = ref(getTodos() || [])

    // Вычисляемые свойства
    const completedTodos = computed(() =>
        todos.value.filter(todo => todo.completed)
    )

    const incompleteTodos = computed(() =>
        todos.value.filter(todo => !todo.completed)
    )

    // Фильтрация по важности
    const lowPriorityTodos = computed(() =>
        todos.value.filter(todo => todo.importance === 'low')
    )
    const normalPriorityTodos = computed(() =>
        todos.value.filter(todo => todo.importance === 'normal')
    )
    const highPriorityTodos = computed(() =>
        todos.value.filter(todo => todo.importance === 'high')
    )

    // Действия
    function addTodo(title, description = '', importance = 'normal') {
        const newTodo = {
            id: uuidv4(),
            title,
            description,  // Новое поле для описания
            importance,   // Новое поле для важности
            completed: false,
            createdAt: new Date().toISOString()
        }
        todos.value.push(newTodo)
        saveTodos(todos.value)
        return newTodo
    }

    function removeTodo(id) {
        todos.value = todos.value.filter(todo => todo.id !== id)
        saveTodos(todos.value)
    }

    function toggleTodo(id) {
        const todo = todos.value.find(todo => todo.id === id)
        if (todo) {
            todo.completed = !todo.completed
            saveTodos(todos.value)
        }
    }

    function updateTodoDetails(id, updates) {
        const todoIndex = todos.value.findIndex(todo => todo.id === id)
        if (todoIndex !== -1) {
            // Обновляем задачу с новыми данными
            todos.value[todoIndex] = {
                ...todos.value[todoIndex],
                ...updates
            }
            saveTodos(todos.value)
            return todos.value[todoIndex]
        }
        return null
    }

    return {
        todos,
        completedTodos,
        incompleteTodos,
        lowPriorityTodos,
        normalPriorityTodos,
        highPriorityTodos,
        addTodo,
        removeTodo,
        toggleTodo,
        updateTodoDetails
    }
})