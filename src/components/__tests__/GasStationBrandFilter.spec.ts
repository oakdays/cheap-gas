import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import GasStationBrandFilter from "@/components/GasStationBrandFilter.vue";

describe('GasStationBrandFilter', () => {
  it('renders properly', () => {
    const wrapper = mount(
      GasStationBrandFilter,
      {
        props: {
          gasStations: []
        }
      }
    )

    expect(wrapper.find('select').element.value).toBe('all')
  })

  it('emits an input event when an option is selected', async () => {
    const wrapper = mount(
      GasStationBrandFilter,
      {
        props: {
          gasStations: []
        }
      }
    )

    await wrapper.find('select').setValue('Esso')
    expect(wrapper.emitted('input')).toBeTruthy()
  })
})
