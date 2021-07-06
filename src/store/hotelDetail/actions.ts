import SearchAvailableUseCase from "../../domain/usecases/hotel/SearchAvailableUseCase";
import HotelUsecase from "../../domain/usecases/hotel";
import * as types from "./types";
export default {
  a_toggleSidebar({ commit }: any, payload: boolean) {
    commit(types.toggleSidebar, payload);
  },

  a_zoomSlideFullScreen({ commit }: any) {
    commit(types.zoomSlideFullScreen);
  },

  a_saveRoomInfo({ commit }: any, payload: any) {
    commit(types.saveRoomInfo, payload);
  },

  a_deleteRoomDetailsSummary({ commit }: any, payload: number) {
    commit(types.deleteRoomDeatailsSummary, payload);
  },

  getDataFromUrl({ commit }: any, payload: any) {
    commit(types.GET_DATA_FROM_URL, payload);
  },

  searchRoom({ commit }: any, payload: any) {
    commit(types.SEARCH_ROOM);
    const searchRoomUseCase = new SearchAvailableUseCase(payload);
    searchRoomUseCase
      .execute()
      .then((resp: any) => {
        if (payload.queryString.type === "rooms") {
          commit(types.SEARCH_ROOM_SUCCESS, { payload: resp });
        } else {
          commit(types.SEARCH_PLAN_SUCCESS, { payload: resp });
        }
      })
      .catch(error => {
        commit(types.SEARCH_ROOM_FAIL, { error });
      });
  },

  getHotelDetail({ commit }: any, payload: any) {
    commit(types.GET_HOTEL_DETAIL);
    const hotelpriceUseCase = new HotelUsecase.GetHotelDetailUseCase(payload);
    hotelpriceUseCase
      .execute()
      .then((resp: any) => {
        commit(types.GET_HOTEL_DETAIL_SUCCESS, { payload: resp.data });
      })
      .catch(error => {
        commit(types.GET_HOTEL_DETAIL_FAIL, { error });
      });
  },

  getHotelDetailV2({ commit }: any, payload: any) {
    commit(types.GET_HOTEL_DETAIL_V2);
    const hotelUseCase = new HotelUsecase.GetHotelDetailV2UseCase(payload);
    hotelUseCase
      .execute()
      .then((resp: any) => {
        commit(types.GET_HOTEL_DETAIL_V2_SUCCESS, { payload: resp.data });
      })
      .catch(error => {
        commit(types.GET_HOTEL_DETAIL_V2_FAIL, { error });
      });
  },

  changeTab({ commit }: any, payload: any) {
    commit(types.CHANGE_TAB, payload);
  },

  saveRoomFilter({ commit }: any, payload: any) {
    commit(types.SAVE_ROOM_FILTER, payload);
  },

  saveRoomIndex({ commit }: any, payload: number) {
    commit(types.SAVE_ROOM_INDEX, payload);
  },

  clearRoomSelected({ commit }: any) {
    commit(types.CLEAR_ROOM_SELECTED);
  },

  saveSortRoomBy({ commit }: any, payload: number) {
    commit(types.SAVE_FILTER_ROOM_BY, payload);
  },

  saveRoomPlanCode({ commit }: any, payload: any) {
    commit(types.SAVE_ROOM_PLAN_CODE, payload);
  },

  getCancellationPolicies({ commit }: any, payload: any) {
    commit(types.GET_CANCELLATION_POLICIES);
    const cancellationPolicies = new HotelUsecase.GetCancellationPolicies(
      payload
    );
    cancellationPolicies
      .execute()
      .then((resp: any) => {
        commit(types.GET_CANCELLATION_POLICIES_SUCCESS, { payload: resp.data });
      })
      .catch(error => {
        commit(types.GET_CANCELLATION_POLICIES_FAIL, { error });
      });
  },

  getHotelReviews({ commit }: any, payload: any) {
    const hotelReviews = new HotelUsecase.GetHotelReviewsUseCase(payload);
    hotelReviews
      .execute()
      .then((resp: any) => {
        commit(types.GET_HOTEL_REVIEWS_SUCCESS, { payload: resp.data });
      })
      .catch(error => {
        commit(types.GET_HOTEL_REVIEWS_FAIL, { error });
      });
  },

  getRoomSelected({ commit }: any, payload: any) {
    commit(types.GET_ROOM_SELECTED);
    const roomSelectedUseCase = new HotelUsecase.GetRoomSelectedUseCase(
      payload
    );
    roomSelectedUseCase
      .execute()
      .then((resp: any) => {
        commit(types.GET_ROOM_SELECTED_SUCCESS, { payload: resp });
      })
      .catch(error => {
        commit(types.GET_ROOM_SELECTED_FAIL, { error });
      });
  },

  clearHotelDetail({ commit }: any) {
    commit(types.CLEAR_HOTEL_DETAIL);
  },

  updateBookingStatus({ commit }: any, payload: boolean) {
    commit(types.UPDATE_BOOKING_STATUS, payload);
  },

  saveUseDayParams({ commit }: any, payload: boolean) {
    commit(types.SAVE_USE_DAY_PARAMS, payload);
  }
};
