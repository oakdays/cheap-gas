<script setup lang="ts">
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const emitValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <div>
    <label for="radius">Radius (km): </label>
    <input id="radius" class="radius-input" type="number" :value="modelValue" @input="emitValue">
  </div>
</template>

<style lang="scss" scoped>
.radius-input {
  font-family: Inter;
  width: 50px;
  border: 1px solid gray;
  padding: 2px 4px;
  border-radius: 4px;
}
</style>