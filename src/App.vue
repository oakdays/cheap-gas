<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useClipboard, useGeolocation } from '@vueuse/core'

import type GasStation from '@/types/GasStation'
import GasStationCard from './components/GasStationCard.vue';
import GasStationRadiusInput from './components/GasStationRadiusInput.vue';
import GasStationFuelTypeSelect from './components/GasStationFuelTypeSelect.vue';
import GasStationStatusFilter from './components/GasStationStatusFilter.vue';
import GasStationBrandFilter from './components/GasStationBrandFilter.vue';

const gasStations = ref<Array<GasStation>>([])
let radius = ref<number>(30)
let fuelType = ref<string>('e5')

let showOnlyOpenGasStations = ref<boolean>(false)
let brandFilter = ref<string>('all')

const { copy } = useClipboard()
const { coords } = useGeolocation()

const searchParams = computed<URLSearchParams>(() => {
  return new URLSearchParams({
    lat: coords.value.latitude.toString(),
    lng: coords.value.longitude.toString(),
    rad: radius.value.toString(),
    sort: 'dist',
    type: fuelType.value,
    apikey: '00000000-0000-0000-0000-000000000002'
  })
})

const isLoadingLocation = computed<boolean>(() => {
  return searchParams.value.get('lat') !== 'Infinity' && !gasStations.value.length
})

watch(searchParams, (_, newValue) => {
  if (newValue.get('lat') !== 'Infinity' && !gasStations.value.length) {
    searchGasStations()
  }
})

const filteredGasStations = computed<Array<GasStation>>(() => {
  let filteredGasStations = gasStations.value

  // apply only open filter
  if (showOnlyOpenGasStations.value) {
    filteredGasStations = filteredGasStations.filter((gasStation: GasStation) => gasStation.isOpen)
  }

  // apply brand filter
  if (brandFilter.value !== 'all') {
    filteredGasStations = filteredGasStations.filter((gasStation: GasStation) => gasStation.brand === brandFilter.value)
  }

  return filteredGasStations
})

async function searchGasStations() {
  gasStations.value = []

  const url = (
    'https://creativecommons.tankerkoenig.de/json/list.php?' + searchParams.value.toString()
  )

  const result = await fetch(url)
  const data = await result.json()

  // using only top 20 results as the user most likely isn't interested in ALL gas stations
  gasStations.value = data.stations ? data.stations.slice(0, 20) : []

  // mock value
  // gasStations.value = [{ "id": "51df69e1-03e1-0f50-e100-80009459e038", "name": "JET SCHOENEFELD WASSMANNSDORFER CHAUSSEE 20", "brand": "JET", "street": "WASSMANNSDORFER CHAUSSEE", "place": "SCHOENEFELD", "lat": 52.38571, "lng": 13.50124, "dist": 0.1, "price": 1.009, "isOpen": true, "houseNumber": "20", "postCode": 12529 }, { "id": "644d157d-1678-4320-88bb-e8464abf28d4", "name": "Esso Tankstelle", "brand": "ESSO", "street": "WASSMANNSDORFER CHAUSSEE 6", "place": "SCHOENEFELD", "lat": 52.387086, "lng": 13.50451, "dist": 0.3, "price": 1.009, "isOpen": true, "houseNumber": "", "postCode": 12529 }, { "id": "e1a15081-25cb-9107-e040-0b0a3dfe563c", "name": "Schönefeld, Waltersdorfer Chaussee 24", "brand": "HEM", "street": "Waltersdorfer Chaussee", "place": "Schönefeld", "lat": 52.399621, "lng": 13.516635, "dist": 1.8, "price": 1.009, "isOpen": true, "houseNumber": "24", "postCode": 12529 }, { "id": "c1a1a169-d0b9-4e6a-a9a0-a44c4065e8f7", "name": "Aral Tankstelle", "brand": "ARAL", "street": "Schützenstraße", "place": "Schönefeld", "lat": 52.394825, "lng": 13.533624, "dist": 2.4, "price": 1.009, "isOpen": true, "houseNumber": "11", "postCode": 12529 }, { "id": "be5c6214-ea9b-4fde-8355-42b80dbcb9df", "name": "TotalEnergies Berlin-Schoenefeld", "brand": "TotalEnergies", "street": "Elly-Beinhorn-Ring", "place": "Berlin-Schoenefeld", "lat": 52.370372, "lng": 13.527195, "dist": 2.6, "price": 1.009, "isOpen": true, "houseNumber": "2A", "postCode": 12529 }, { "id": "79a7e854-833d-4b0d-89b9-db0053369ff9", "name": "Shell Schoenefeld Wassmannsdorfer Allee 1", "brand": "Shell", "street": "Wassmannsdorfer Allee", "place": "Schoenefeld", "lat": 52.368028, "lng": 13.467417, "dist": 3.1, "price": 1.009, "isOpen": true, "houseNumber": "1", "postCode": 12529 }, { "id": "8484cd59-8550-4970-a71f-a695f7971095", "name": "TotalEnergies Berlin", "brand": "TotalEnergies", "street": "Neukoellner Str.", "place": "Berlin", "lat": 52.4222, "lng": 13.487083, "dist": 4, "price": 1.009, "isOpen": true, "houseNumber": "294", "postCode": 12357 }, { "id": "fce1aaf2-c981-4710-9243-1939b61a3bb3", "name": "Aral Tankstelle", "brand": "ARAL", "street": "Neukoellner Str.", "place": "Berlin", "lat": 52.42579, "lng": 13.482354, "dist": 4.5, "price": 1.009, "isOpen": true, "houseNumber": "250-256", "postCode": 12357 }, { "id": "34b4ac1b-77af-481c-88b5-237921f4eb7c", "name": "Aral Tankstelle", "brand": "ARAL", "street": "Zeppelinstraße", "place": "Schönefeld", "lat": 52.367813, "lng": 13.560766, "dist": 4.6, "price": 1.009, "isOpen": true, "houseNumber": "2", "postCode": 12529 }, { "id": "5c5a87c7-bc04-41b4-8b81-733a9ab2db96", "name": "Esso Tankstelle", "brand": "ESSO", "street": "FRITZ-ERLER-ALLEE 154", "place": "BERLIN", "lat": 52.425434, "lng": 13.474281, "dist": 4.6, "price": 1.009, "isOpen": true, "houseNumber": "", "postCode": 12353 }, { "id": "415db6d8-0a8e-4c1a-8dd7-326903e0a0c9", "name": "Aral Tankstelle", "brand": "ARAL", "street": "Neuköllner Straße", "place": "Berlin", "lat": 52.42863, "lng": 13.479837, "dist": 4.9, "price": 1.009, "isOpen": true, "houseNumber": "219", "postCode": 12357 }, { "id": "3df48270-cb19-43ef-8954-fdb96ceb2536", "name": "Sprint Berlin Rudower Str.", "brand": "Sprint", "street": "Rudower Str.", "place": "Berlin", "lat": 52.433167, "lng": 13.471164, "dist": 5.5, "price": 1.009, "isOpen": true, "houseNumber": "150", "postCode": 12351 }, { "id": "6e89cba4-91d0-4019-b6fe-fe3558af7025", "name": "Aral Tankstelle", "brand": "ARAL", "street": "Am Lückefeld", "place": "Mahlow", "lat": 52.358173, "lng": 13.432388, "dist": 5.6, "price": 1.009, "isOpen": true, "houseNumber": "2", "postCode": 15831 }, { "id": "005056ba-7cb6-1ed2-bceb-99abbf748d3b", "name": "star Tankstelle", "brand": "STAR", "street": "Johannisthaler Chaussee", "place": "Berlin", "lat": 52.431854, "lng": 13.460731, "dist": 5.7, "price": 1.009, "isOpen": true, "houseNumber": "263-273", "postCode": 12351 }, { "id": "005056ba-7cb6-1ed5-a685-79a3266e48f2", "name": "star Tankstelle", "brand": "STAR", "street": "Adlergestell", "place": "Berlin", "lat": 52.423702, "lng": 13.55947, "dist": 5.7, "price": 1.009, "isOpen": true, "houseNumber": "391", "postCode": 12527 }, { "id": "1c002618-6ca6-4faf-9752-688a83b5e818", "name": "Shell Berlin Johannisthaler Chaussee 411", "brand": "Shell", "street": "Johannisthaler Chaussee", "place": "Berlin", "lat": 52.42493, "lng": 13.442476, "dist": 5.8, "price": 1.009, "isOpen": true, "houseNumber": "411", "postCode": 12351 }, { "id": "403be9a4-04fb-4bd0-9b52-ca1cfb8490c5", "name": "TotalEnergies Berlin", "brand": "TotalEnergies", "street": "Adlergestell", "place": "Berlin", "lat": 52.414343, "lng": 13.572973, "dist": 5.8, "price": 1.009, "isOpen": true, "houseNumber": "543", "postCode": 12527 }, { "id": "e1a15081-24cc-9107-e040-0b0a3dfe563c", "name": "Berlin, Adlergestell 305", "brand": "HEM", "street": "Adlergestell", "place": "Berlin", "lat": 52.430569, "lng": 13.549101, "dist": 5.9, "price": 1.009, "isOpen": true, "houseNumber": "305", "postCode": 12489 }, { "id": "32067176-94df-4b22-b314-d8696b41a809", "name": "ENI", "brand": "AGIP ENI", "street": "Adlergestell", "place": "Berlin", "lat": 52.431973788044, "lng": 13.546518992104, "dist": 5.9, "price": 1.009, "isOpen": true, "houseNumber": "289 A", "postCode": 12489 }, { "id": "40066e8e-fd1c-4ccc-8c47-bee5d1bed07e", "name": "Shell Berlin Buckower Damm 225", "brand": "Shell", "street": "Buckower Damm", "place": "Berlin", "lat": 52.423594, "lng": 13.437216, "dist": 5.9, "price": 1.009, "isOpen": true, "houseNumber": "225", "postCode": 12349 }]
}

function onShare(gasStation: GasStation) {
  copy(`The gas station ${gasStation.name}, located at ${gasStation.street} ${gasStation.houseNumber}, ${gasStation.place} has a great ${fuelType.value} price: ${gasStation.price}`)
}

onMounted(() => {
  searchGasStations()
})
</script>

<template>
  <main class="app">
    <div class="app__title-wrapper">
      <h1 class="app__title">⛽Cheap Gas</h1>
      <p v-if="isLoadingLocation" class="app__process-info">Fetching your location...</p>
    </div>

    <div class="app__search">
      <div class="app__inputs">
        <GasStationRadiusInput v-model="radius" />
        <GasStationFuelTypeSelect v-model="fuelType" />
      </div>
      <button class="app__search-btn" @click="searchGasStations">Search</button>
    </div>

    <div class="app__filters">
      <GasStationStatusFilter v-model="showOnlyOpenGasStations" />
      <GasStationBrandFilter :gas-stations="gasStations" @brand-select="brand => brandFilter = brand" />
    </div>

    <div class="app__gas-stations-list">
      <GasStationCard
        v-for="gasStation in filteredGasStations"
        :key="gasStation.id"
        :gas-station="gasStation"
        @share="onShare(gasStation)"
      />
    </div>
  </main>
</template>

<style lang="scss">
p {
  margin: 0;
}

.app {
  font-family: Inter;
  margin: 16px;

  &__gas-stations-list {
    margin-top: 16px;
    display: grid;
    grid-gap: 16px;

    @media only screen and (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media only screen and (min-width: 960px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media only screen and (min-width: 1240px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    margin: 0;
  
    @media only screen and (max-width: 640px) {
      font-size: 24px;
    }
  }

  &__search {
    margin-top: 16px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 16px;
    border-bottom: 1px solid lightgray;
  }

  &__filters,
  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 4px;
    
    @media only screen and (min-width: 640px) {
      flex-direction: row;
      align-items: center;
      gap: 32px;
    }
  }

  &__process-info {
    font-size: 14px;
  }

  &__search-btn {
    font-family: Inter;
    background-color: white;
    border: 0;
    border-radius: 4px;
    padding: 6px 8px;
    cursor: pointer;
    background-color: red;
    color: white;

    &:hover {
      border-color: dimgray;
    }

    &:active {
      border-color: black;
    }
  }
}
</style>
