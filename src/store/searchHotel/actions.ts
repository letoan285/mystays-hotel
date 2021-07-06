import { HotelFilterTypes } from './types'

export default {
  showMapViewOverlay ({ commit }: any) {
    commit(HotelFilterTypes.SHOW_MAP_VIEW_OVERLAY)
  },

  showSortByOverlay ({ commit }: any) {
    commit(HotelFilterTypes.SHOW_SORT_BY_OVERLAY)
  },

  showFilterOverlay ({ commit }: any) {
    commit(HotelFilterTypes.SHOW_FILTER_OVERLAY)
  },

  closeOverlay ({ commit }: any) {
    commit(HotelFilterTypes.CLOSE_OVERLAY)
  },

  changeViewType ({ commit }: any, type: String) {
    commit(HotelFilterTypes.CHANGE_VIEW_TYPE, type)
  },

  openFilterSection ({ commit }: any, payload: boolean) {
    commit(HotelFilterTypes.OPEN_FILTER_SECTION, payload)
  },

  openHeaderSearchBox ({ commit }: any) {
    commit(HotelFilterTypes.OPEN_HEADER_SEARCH_BOX)
  },

  closeHeaderSearchBox ({ commit }: any) {
    commit(HotelFilterTypes.CLOSE_HEADER_SEARCH_BOX)
  },

  toggleHeaderSearchBox ({ commit }: any, payload: boolean) {
    commit(HotelFilterTypes.TOGGLE_HEADER_SEARCH_BOX, payload)
  },

  getHotelPosition ({ commit }: any, payload: any) {
    commit(HotelFilterTypes.GET_HOTEL_POSITION, payload)
  }
}
