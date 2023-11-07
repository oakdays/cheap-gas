<script setup lang="ts">
import { ref, computed } from 'vue'
import type GasStation from '@/types/GasStation'

const props = defineProps<{
  gasStations: Array<GasStation>
}>()
const emit = defineEmits(['brandSelect'])

const brands = computed<Set<string>>(() => {
  const gasStationsBrands = props.gasStations.map(gasStation => gasStation.brand)
  return new Set(gasStationsBrands)
})

let selectedBrand = ref<string>('all')

const emitValue = (e: Event) => {
  emit('brandSelect', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <div>
    <label for="brands">Filter by brand: </label>
    <select class="brand-filter__select" :value="selectedBrand" @input="emitValue" id="brands">
      <option value="all">All</option>
      <option v-for="brand in brands">{{ brand }}</option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.brand-filter {
  &__select {
    font-family: Inter;
    border: 1px solid gray;
    padding: 2px 4px;
    border-radius: 4px;
  }
}
</style>