import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import GasStationRadiusInput from "@/components/GasStationRadiusInput.vue";

describe('GasStationRadiusInput', () => {
  it('renders properly', () => {
    const wrapper = mount(
      GasStationRadiusInput,
      {
        props: {
          modelValue: 30
        }
      }
    )

    expect(wrapper.find('input').element.value).toBe('30')
  })
})
