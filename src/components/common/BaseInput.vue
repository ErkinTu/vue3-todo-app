<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

function updateValue(event) {
  emit('update:modelValue', event.target.value)
}

const inputClasses = computed(() => {
  return [
    'w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500',
    props.error
        ? 'border-red-500'
        : 'border-gray-300 focus:border-blue-500',
    props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''
  ]
})
</script>

<template>
  <div class="w-full">
    <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="updateValue"
        :class="inputClasses"
    />
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>