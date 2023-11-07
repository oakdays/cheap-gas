import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import type GasStation from '@/types/GasStation'

import GasStationCard from "@/components/GasStationCard.vue";

const mockGasStation: GasStation = {
  id: "51df69e1-03e1-0f50-e100-80009459e038",
  name: "JET SCHOENEFELD WASSMANNSDORFER CHAUSSEE 20",
  brand: "JET",
  street: "WASSMANNSDORFER CHAUSSEE",
  place: "SCHOENEFELD",
  lat: 52.38571,
  lng: 13.50124,
  dist: 0.1,
  price: 1.009,
  isOpen: true,
  houseNumber: "20",
  postCode: 12529
}

describe('GasStationCard', () => {
  it('renders properly', () => {
    const wrapper = mount(
      GasStationCard,
      {
        props: {
          gasStation: mockGasStation
        }
      }
    )

    expect(wrapper.find('.gas-station__name').text()).toBe(`⛽${mockGasStation.name}`)
    expect(wrapper.find('.gas-station__address').text()).toBe(`📌 ${mockGasStation.street} ${mockGasStation.houseNumber}, ${mockGasStation.place}`)
    expect(wrapper.find('.gas-station__distance').text()).toBe(`🗺️ ${mockGasStation.dist} km away`)
    expect(wrapper.find('.gas-station__price').text()).toBe(`💶 € ${mockGasStation.price}`)
  })

  it('emits the share event when the Share button is clicked', async () => {
    const wrapper = mount(
      GasStationCard,
      {
        props: {
          gasStation: mockGasStation
        }
      }
    )

    await wrapper.find('.gas-station__footer-share-btn').trigger('click')
    expect(wrapper.emitted('share')).toBeTruthy()
  })
})
