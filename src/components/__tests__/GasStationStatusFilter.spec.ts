import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import GasStationStatusFilter from "@/components/GasStationStatusFilter.vue";

describe('GasStationStatusFilter', () => {
  it('renders properly', () => {
    const wrapper = mount(
      GasStationStatusFilter,
      {
        props: {
          modelValue: false
        }
      }
    )

    expect(wrapper.find('input').element.checked).toBe(false)
  })

  it('emits an update:modelValue event when an option is selected', async () => {
    const wrapper = mount(
      GasStationStatusFilter,
      {
        props: {
          modelValue: false
        }
      }
    )

    await wrapper.find('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  })
})
