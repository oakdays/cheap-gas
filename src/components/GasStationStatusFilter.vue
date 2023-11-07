<script setup lang="ts">
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const emitValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).checked)
}
</script>

<template>
  <div>
    <input type="checkbox" id="status-filter" :checked="modelValue" @change="emitValue">
    <label for="status-filter">Show only open gas stations</label>
  </div>
</template>