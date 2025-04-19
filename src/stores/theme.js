import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    // Определяем, темная или светлая тема
    const isDark = ref(false)

    // При инициализации проверяем localStorage и системные настройки
    function initTheme() {
        // Проверяем сохраненную тему
        const savedTheme = localStorage.getItem('theme')

        if (savedTheme) {
            // Используем сохраненную тему
            isDark.value = savedTheme === 'dark'
        } else {
            // Если нет сохраненной темы, проверяем системные предпочтения
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            isDark.value = prefersDark
            // Сохраняем выбор в localStorage
            localStorage.setItem('theme', prefersDark ? 'dark' : 'light')
        }

        // Применяем тему к документу
        applyTheme()
    }

    // Функция для переключения темы
    function toggleTheme() {
        isDark.value = !isDark.value
        localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    }

    // Применяем тему к HTML элементу
    function applyTheme() {
        if (isDark.value) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    // Следим за изменениями темы
    watch(isDark, () => {
        applyTheme()
    })

    return {
        isDark,
        initTheme,
        toggleTheme
    }
})