<script setup lang="ts">
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const emitValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <div>
    <label for="fuel-types">Fuel type: </label>
    <select id="fuel-types" class="fuel-select" :value="modelValue" @input="emitValue">
      <option value="e5">E5</option>
      <option value="e10">E10</option>
      <option value="diesel">Diesel</option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.fuel-select {
  font-family: Inter;
  width: 75px;
  border: 1px solid gray;
  padding: 2px 4px;
  border-radius: 4px;
}
</style>
