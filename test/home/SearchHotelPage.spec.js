import { shallowMount } from '@vue/test-utils'
import SearchHotelPage from '@/src/pages/SearchHotelPage.vue'

describe('SearchHotelPage', () => {
  it('renders a message and responds correctly to user input', () => {
    const wrapper = shallowMount(SearchHotelPage, {
      data () {
        return {
          message: 'Search Hotel Page',
          username: 'toanlv'
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
