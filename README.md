# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

**Установка необходимых зависимостей**

npm install

npm install vue-router@4 pinia
npm install tailwindcss postcss autoprefixer
npm install uuid

```plaintxet
vue3-todo-app/
│
├── public/              # Статические файлы
│   └── favicon.ico
│
├── src/                 # Исходный код
│   ├── assets/          # Ресурсы (изображения, стили)
│   │   └── main.css     # Главный CSS файл с импортом Tailwind
│   │
│   ├── components/      # Компоненты Vue
│   │   ├── common/      # Переиспользуемые UI компоненты
│   │   └── todo/        # Компоненты связанные с функционалом Todo
│   │
│   ├── composables/     # Переиспользуемая бизнес-логика (composition API)
│   │   └── useTodos.js  # Логика для работы с задачами
│   │
│   ├── layouts/         # Шаблоны страниц
│   │   └── MainLayout.vue
│   │
│   ├── router/          # Настройки маршрутизации
│   │   └── index.js
│   │
│   ├── stores/          # Pinia хранилища
│   │   └── todo.js
│   │
│   ├── utils/           # Вспомогательные функции
│   │   └── localStorage.js
│   │
│   ├── views/           # Страницы
│   │   ├── HomeView.vue
│   │   ├── TodoListView.vue
│   │   └── TodoDetailView.vue
│   │
│   ├── App.vue          # Корневой компонент
│   └── main.css          # Точка входа
│
├── index.html           # HTML шаблон
├── tailwind.config.js   # Конфигурация Tailwind
├── postcss.config.js    # Конфигурация PostCSS
├── vite.config.js       # Конфигурация Vite
├── package.json         # Зависимости и скрипты проекта
└── README.md            # Документация проекта
```