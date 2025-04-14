# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

**Установка необходимых зависимостей**

```bash
npm install

npm install vue-router@4 pinia
npm install tailwindcss postcss autoprefixer
npm install uuid
```

```plaintxet
vue3-todo-app/
├── index.html                     # HTML шаблон
├── vite.config.js                 # Конфигурация Vite
├── tailwind.config.js             # Конфигурация Tailwind
├── postcss.config.js              # Конфигурация PostCSS
├── package.json                   # Зависимости
└── src/
    ├── main.js                    # Точка входа
    ├── App.vue                    # Корневой компонент
    ├── assets/
    │   └── main.css               # Стили
    ├── components/
    │   ├── common/
    │   │   ├── BaseButton.vue
    │   │   └── BaseInput.vue
    │   ├── layout/
    │   │   ├── TheHeader.vue
    │   │   ├── TheFooter.vue
    │   │   └── NavBar.vue
    │   └── todo/
    │       ├── TodoItem.vue
    │       ├── TodoFilter.vue
    │       └── TodoStatsCard.vue
    ├── composables/
    │   └── useTodos.js
    ├── layouts/
    │   └── MainLayout.vue
    ├── router/
    │   └── index.js
    ├── stores/
    │   └── todo.js
    ├── utils/
    │   └── localStorage.js
    └── views/
        ├── HomeView.vue
        ├── TodoListView.vue
        └── TodoDetailView.vue
```
