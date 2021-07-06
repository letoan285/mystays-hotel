import { GeneralActionTypes } from "./types";

export default {
  [GeneralActionTypes.INIT_APPLICATION](state: any) {
    state.isFetching = true;
    state.error = null;
  },

  [GeneralActionTypes.INIT_APPLICATION_SUCCESS](state: any) {
    state.isFetching = false;
    // state.data = action.payload
    state.error = null;
  },

  [GeneralActionTypes.INIT_APPLICATION_ERROR](state: any, action: any) {
    state.isFetching = false;
    state.error = action.error;
  },

  [GeneralActionTypes.GET_LOCALE](state: any, action: any) {
    state.isFetching = false;
    state.data.locale = action.payload;
    state.error = null;
  },

  [GeneralActionTypes.GET_LOCALE_SUCCESS](state: any, action: any) {
    state.isFetching = false;
    state.data.locale.messages = action.payload;
    state.error = null;
  },

  [GeneralActionTypes.GET_LOCALE_FAIL](state: any, action: any) {
    state.isFetching = false;
    state.error = action.error.message;
  },

  [GeneralActionTypes.CHANGE_LANGUAGE](state: any, action: any) {
    state.isFetching = false;
    state.data.language = action.payload;
    state.error = null;
    state.data.locale = action.payload;
  },
  [GeneralActionTypes.CHANGE_LANGUAGE_SUCCESS](state: any, action: any) {
    state.isFetching = false;
    state.data.language = action.payload;
    state.error = null;
    state.data.locale = action.payload;
  },
  [GeneralActionTypes.CHANGE_LANGUAGE_FAIL](state: any, action: any) {
    state.isFetching = false;
    state.data.language = action.payload;
    state.error = null;
    state.data.locale = action.payload;
  },

  [GeneralActionTypes.GET_DEVICE_INFO](state: any, action: any) {
    state.data.isMobile = action.payload;
  },

  [GeneralActionTypes.GET_LOCATION](state: any, action: any) {
    state.data.location = null;
    state.data.isGetLocationLoading = true;
  },

  [GeneralActionTypes.GET_LOCATION_SUCCESS](state: any, action: any) {
    state.data.isGetLocationLoading = false;
    state.isFetching = false;
    state.data.location = action.payload;
    state.error = null;
  },

  [GeneralActionTypes.GET_LOCATION_FAIL](state: any) {
    state.data.isGetLocationLoading = false;
    state.isFetching = false;
    state.data.location = {};
    state.error = "Fetch location fail";
    state.data.isNearMe = false;
  },

  [GeneralActionTypes.SET_LOCATION](state: any, action: any) {
    state.isFetching = false;
    state.data.userLocation = null;
    state.data.userLocation = action.payload;
    state.error = null;

    if (action.payload.lat && action.payload.long) {
      state.data.isNearMe = true;
    } else {
      state.data.isNearMe = false;
    }
  },

  [GeneralActionTypes.UPDATE_SKELETON](state: any, action: any) {
    state.data.skeleton = action;
  },

  [GeneralActionTypes.UPDATE_LOADING](state: any, action: any) {
    state.data.skeleton = action;
  },

  [GeneralActionTypes.SAVE_GTM_DATA](_state: any, _action: any) {},

  [GeneralActionTypes.GET_CALENDAR_DATA](state: any, _action: any) {
    const { hotelID, adults, children } = _action;
    state.data.calendarData.isFetching = false;
    state.data.calendarData.hotelId = hotelID;
    state.data.calendarData.adults = adults;
    state.data.calendarData.children = children;
  },

  [GeneralActionTypes.GET_CALENDAR_DATA_SUCCESS](state: any, _action: any) {
    const { disabled_dates, inventory } = _action;
    state.data.calendarData.disabled_dates = disabled_dates;
    state.data.calendarData.inventory = inventory;
    state.data.calendarData.isFetching = true;
  },

  [GeneralActionTypes.GET_CALENDAR_DATA_FAIL](state: any, _action: any) {
    state.data.calendarData.disabled_dates = [];
    state.data.calendarData.inventory = [];
    state.data.calendarData.isFetching = true;
  }
};
