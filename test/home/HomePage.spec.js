import { mount, shallowMount } from '@vue/test-utils'
import HomePage from '@/src/pages/HomePage.vue'

describe('HomePage', () => {
  test('is a Vue instance', () => {
    const wrapper = mount({})
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
describe('SearchHotelPage', () => {
  it('renders a message and responds correctly to user input', () => {
    const wrapper = shallowMount(HomePage, {
      data () {
        return {
          message: 'Home Page',
          username: ''
        }
      }
    })

    // see if the message renders
    expect(wrapper.find('.message').text()).toEqual('SearchHotelPage')

    // assert the error is rendered
    expect(wrapper.find('.error').exists()).toBeTruthy()

    // update the `username` and assert error is no longer rendered
    wrapper.setData({ username: 'toanlv' })
    expect(wrapper.find('.error').exists()).toBeFalsy()
  })
})
