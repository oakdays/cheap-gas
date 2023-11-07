<script setup lang="ts">
import type GasStation from '@/types/GasStation'

defineProps<{
  gasStation: GasStation
}>()

const emit = defineEmits(['share'])
</script>

<template>
  <div class="gas-station__card">
    <div class="gas-station__header">
      <p class="gas-station__name">
        ⛽{{ gasStation.name }}
      </p>
      <p class="gas-station__address">
        {{ `📌 ${gasStation.street} ${gasStation.houseNumber}, ${gasStation.place}` }}
      </p>
    </div>

    <div class="gas-station__footer">
      <div class="gas-station__footer-data">
        <p class="gas-station__distance">
          🗺️ {{ gasStation.dist }} km away
        </p>
        <p class="gas-station__price">
          💶 € {{ gasStation.price }}
        </p>
      </div>

      <button class="gas-station__footer-share-btn" @click="$emit('share')">Share</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gas-station {
  &__card {
    padding: 12px 16px;
    border: 1px solid lightgray;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: space-between;
  }

  &__header,
  &__footer-data {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__footer {
    display: flex;
    align-items: end;
    justify-content: space-between;
  }

  &__footer-share-btn {
    font-family: Inter;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 4px;
    padding: 6px 8px;
    cursor: pointer;

    &:hover {
      border-color: gray;
    }

    &:active {
      border-color: black;
    }
  }

  &__name {
    font-weight: 500;
  }

  &__address {
    font-size: 14px;
  }
}
</style>