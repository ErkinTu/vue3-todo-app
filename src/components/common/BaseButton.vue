<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'success', 'danger', 'warning'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: value => ['sm', 'md', 'lg'].includes(value)
  },
  to: {
    type: [String, Object],
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
})

const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200',
    success: 'bg-green-600 hover:bg-green-700 text-white dark:bg-green-800 dark:hover:bg-green-900',
    danger: 'bg-red-600 hover:bg-red-700 text-white dark:bg-red-800 dark:hover:bg-red-900',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white dark:bg-yellow-700 dark:hover:bg-yellow-800'
  }

  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6 text-lg'
  }

  return sizes[props.size]
})

const classes = computed(() => {
  return [
    'rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900',
    variantClasses.value,
    sizeClasses.value,
    props.block ? 'w-full' : '',
    props.disabled ? 'opacity-50 cursor-not-allowed' : ''
  ]
})
</script>

<template>
  <RouterLink v-if="to && !disabled" :to="to" :class="classes">
    <slot></slot>
  </RouterLink>

  <button v-else :disabled="disabled" :class="classes">
    <slot></slot>
  </button>
</template>