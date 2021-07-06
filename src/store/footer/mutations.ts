import * as types from './types'
export default {
  [types.FooterActionTypes.GET_HOTELS_SUCCESS] (state: any, action: any) {
    state.isFetching = true
    const hotelLists: any = []
    const hotelCityList = action.payload.filter((city: any) => city.hotelCount > 0)
    hotelCityList.map((city: any) => {
      const hotelOfCityList = city.prefectures.map((prefectures: any) => {
        return prefectures.hotels
      })
      hotelOfCityList.map((item: any) => {
        item.map((hotel: any) => {
          hotelLists.push(hotel)
        })
      })
    })

    state.data.cityList = hotelCityList
    state.data.hotelList = hotelLists
    state.data.hotelFilter = hotelLists
    state.success = true
  },

  [types.FooterActionTypes.GET_HOTELS_FAIL] (state: any, action: any) {
    state.isFetching = false
    state.success = action.payload
  }
}
