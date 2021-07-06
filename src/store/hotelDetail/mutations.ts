import * as fromTypes from "./types";

interface IState {
  isOpen: boolean;
  isZoomSlide: boolean;
  bookingState: any;
  bookingData: any;
  selectedRoom: Array<any>;
  tax: object;
  isShowCalendar: boolean;
  data: {};
}

export default {
  [fromTypes.CHANGE_TAB](state: any, payload: any) {
    state.currentTab = payload.currentTab;
    state.currentId = payload.currentId;
  },

  [fromTypes.toggleSidebar](state: IState, payload: boolean) {
    state.isOpen = payload;
  },

  [fromTypes.zoomSlideFullScreen](state: IState) {
    state.isZoomSlide = !state.isZoomSlide;
  },

  [fromTypes.saveRoomInfo](state: IState, payload: any) {
    state.selectedRoom.push(payload);
  },

  [fromTypes.deleteRoomDeatailsSummary](state: IState, roomIdx: number) {
    state.selectedRoom.splice(roomIdx, 1);
  },

  [fromTypes.GET_DATA_FROM_URL](state: any) {
    // state.planList = {}
    // state.roomList = {}
  },
  [fromTypes.SEARCH_ROOM](state: any, _action: any) {
    state.isRoomLoading = true;
    state.isPlanLoading = true;
    state.roomList = {
      rooms: [],
      search_params: {}
    }
    state.planList = {
      plans: [],
      search_params: {}
    }
  },
  [fromTypes.SEARCH_ROOM_SUCCESS](state: any, action: any) {
    state.roomList = action.payload;
    state.isRoomLoading = false;
    state.roomFilterModel = {
      status: false,
      priceRange: [0, 100],
      planType: [],
      mealType: [],
      roomType: [],
      tripType: []
    };
  },
  [fromTypes.SEARCH_PLAN_SUCCESS](state: any, action: any) {
    state.planList = action.payload;
    state.isFetching = false;
    state.isPlanLoading = false;
    state.success = true;
    state.roomFilterModel = {
      status: false,
      priceRange: [0, 100],
      planType: [],
      mealType: [],
      roomType: [],
      tripType: []
    };
  },
  [fromTypes.SEARCH_ROOM_FAIL](state: any, action: any) {
    state.data = action.payload;
    state.isFetching = false;
    state.success = false;
    state.isRoomLoading = false;
    state.isPlanLoading = false;
  },

  [fromTypes.GET_HOTEL_DETAIL](state: any) {
    state.isHotelDetailLoading = true;
    state.isRoomLoading = true;
  },

  [fromTypes.GET_HOTEL_DETAIL_SUCCESS](state: any, action: any) {
    state.hotelDetail = action.payload;
    state.isHotelDetailLoading = false;
  },

  [fromTypes.GET_HOTEL_DETAIL_FAIL](state: any, action: any) {
    state.hotelDetail = action.payload;
    state.isFetching = false;
    state.success = false;
    state.isHotelDetailLoading = false;
  },

  [fromTypes.GET_HOTEL_DETAIL_V2](state: any, action: any) {
    state.isHotelDetailV2Loading = true;
    state.hotelDetailV2 = {}
  },

  [fromTypes.GET_HOTEL_DETAIL_V2_SUCCESS](state: any, action: any) {
    state.hotelDetailV2 = action.payload;
    state.isHotelDetailV2Loading = false;
  },

  [fromTypes.GET_HOTEL_DETAIL_V2_FAIL](state: any, action: any) {
    state.isHotelDetailV2Loading = false;
  },

  [fromTypes.SAVE_ROOM_FILTER](state: any, payload: any) {
    state.roomFilterModel = payload;
    state.isPlanLoading = true;
    state.isRoomLoading = true;

    setTimeout(() => {
      state.isPlanLoading = false;
      state.isRoomLoading = false;
    }, 300);
  },

  [fromTypes.SAVE_ROOM_INDEX](state: any, payload: number) {
    state.roomIndex = payload;
  },

  [fromTypes.CLEAR_ROOM_SELECTED](state: any) {
    state.selectedRoom = [];
    state.roomFilterModel = {
      status: false,
      priceRange: [0, 100],
      planType: [],
      mealType: [],
      roomType: [],
      tripType: []
    };
  },

  [fromTypes.SAVE_FILTER_ROOM_BY](state: any, payload: number) {
    state.sortBy = payload;

    state.isPlanLoading = true;
    state.isRoomLoading = true;

    setTimeout(() => {
      state.isPlanLoading = false;
      state.isRoomLoading = false;
    }, 300);
  },

  [fromTypes.SAVE_ROOM_PLAN_CODE](state: any, payload: number) {
    state.roomPlanCode = payload;
  },

  [fromTypes.GET_CANCELLATION_POLICIES](state: any) {
    state.isLoading = true;
    state.cancellationPolicies = [];
  },

  [fromTypes.GET_CANCELLATION_POLICIES_SUCCESS](state: any, action: any) {
    state.cancellationPolicies = [];
    state.cancellationPolicies = action.payload.data;
    state.isLoading = false;
  },

  [fromTypes.GET_CANCELLATION_POLICIES_FAIL](state: any, action: any) {
    state.cancellationPolicies = action.payload;
    state.isLoading = false;
  },

  [fromTypes.GET_HOTEL_REVIEWS_SUCCESS](state: any, action: any) {
    state.hotelReviews = action.payload;
  },

  [fromTypes.GET_HOTEL_REVIEWS_FAIL](state: any, action: any) {
    state.hotelReviews = action.payload;
  },

  [fromTypes.GET_ROOM_SELECTED](state: any) {
    state.isRoomSelectedLoading = true;
    // state.roomSelectedFromAPI = {}
  },

  [fromTypes.GET_ROOM_SELECTED_SUCCESS](state: any, action: any) {
    state.isRoomSelectedLoading = false;
    state.roomSelectedFromAPI = action.payload;
    state.alertModel = null;
  },

  [fromTypes.GET_ROOM_SELECTED_FAIL](state: any, action: any) {
    state.isRoomSelectedLoading = false;
    state.alertModel = {
      status: action.error.code,
      text: action.error.message
    };
  },

  [fromTypes.CLEAR_HOTEL_DETAIL](state: any) {
    state.hotelDetail = {};
    state.planList = {};
    state.roomList = {};
    state.hotelReviews = [];
  },

  [fromTypes.UPDATE_BOOKING_STATUS](state: any, payload: any) {
    state.isUpdateBooking = payload;
  },

  [fromTypes.SAVE_USE_DAY_PARAMS](state: any, payload: any) {
    state.isUseDay = payload.isUseDay;
    state.isAvailable = payload.isAvailable;
  }
};
