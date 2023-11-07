import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import GasStationFuelTypeSelect from "@/components/GasStationFuelTypeSelect.vue";

describe('GasStationFuelTypeSelect', () => {
  it('renders properly', () => {
    const wrapper = mount(
      GasStationFuelTypeSelect,
      {
        props: {
          modelValue: 'e5'
        }
      }
    )

    expect(wrapper.find('select').element.value).toBe('e5')
  })

  it('emits an update:modelValue event when an option is selected', async () => {
    const wrapper = mount(
      GasStationFuelTypeSelect,
      {
        props: {
          modelValue: 'e5'
        }
      }
    )

    await wrapper.find('select').setValue('e10')
    expect(wrapper.emitted('update:modelValue')).toEqual([['e10']])
  })
})
