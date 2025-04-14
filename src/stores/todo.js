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

    // Действия
    function addTodo(title) {
        const newTodo = {
            id: uuidv4(),
            title,
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

    return {
        todos,
        completedTodos,
        incompleteTodos,
        addTodo,
        removeTodo,
        toggleTodo
    }
})