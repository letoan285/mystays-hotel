import { mount } from '@vue/test-utils'
import CancelReservationPage from '../src/pages/CancelReservationPage.vue'

const wrapper = mount(CancelReservationPage)
expect(wrapper.attributes('id')).toBe('cancel-reservation')
expect(wrapper.attributes().id).toBe('cancel-reservation')
