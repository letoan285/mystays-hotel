import { HotelFilterTypes } from './types'

export default {
  [HotelFilterTypes.SHOW_MAP_VIEW_OVERLAY] (state: any) {
    state.filterState = {
      showMap: true,
      showSortBy: false,
      showFilter: false
    }
  },
  [HotelFilterTypes.SHOW_SORT_BY_OVERLAY] (state: any) {
    state.filterState = {
      showMap: false,
      showSortBy: true,
      showFilter: false
    }
  },
  [HotelFilterTypes.SHOW_FILTER_OVERLAY] (state: any) {
    state.filterState = {
      showMap: false,
      showSortBy: false,
      showFilter: true
    }
  },
  [HotelFilterTypes.CLOSE_OVERLAY] (state: any) {
    state.filterState = {
      showMap: false,
      showSortBy: false,
      showFilter: false
    }
  },

  [HotelFilterTypes.CHANGE_VIEW_TYPE] (state: any, type: String) {
    state.viewType = type
  },

  [HotelFilterTypes.OPEN_FILTER_SECTION] (state: any, payload: boolean) {
    state.openFilterSection = payload
  },

  [HotelFilterTypes.OPEN_HEADER_SEARCH_BOX] (state: any) {
    state.openHeaderSearchBox = true
  },

  [HotelFilterTypes.TOGGLE_HEADER_SEARCH_BOX] (state: any, payload: boolean) {
    state.openHeaderSearchBox = payload
  },

  [HotelFilterTypes.CLOSE_HEADER_SEARCH_BOX] (state: any) {
    state.openHeaderSearchBox = false
  },

  [HotelFilterTypes.GET_HOTEL_POSITION] (state: any, payload: any) {
    state.hotelPosition = payload
  }
}
