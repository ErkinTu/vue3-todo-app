import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodoListView from '../views/TodoListView.vue'
import TodoDetailView from '../views/TodoDetailView.vue'
import TodoListEasyPaginationExample from "@/views/TodoListEasyPaginationExample.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/todos',
        name: 'todos',
        component: TodoListView
    },
    {
        path: '/todos/:id',
        name: 'todo-detail',
        component: TodoDetailView,
        props: true
    },
    {
        path: '/easy-pagination-example',
        name: 'easy-pagination-example',
        component: TodoListEasyPaginationExample
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router