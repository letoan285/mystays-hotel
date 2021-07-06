/* eslint-disable import/no-duplicates */
import moment from "moment";
import { BookingActionTypes } from "./types";
import * as types from "./types";
export default {
  [BookingActionTypes.SHOW_LOCATION](state: any) {
    state.bookingError.location.msg = null;
    state.bookingState = {
      location: true,
      checking: false,
      roomSelect: false,
      promoCode: false,
      searchButton: false
    };
  },
  [BookingActionTypes.SHOW_CHECKING](state: any) {
    state.bookingState = {
      location: false,
      checking: true,
      roomSelect: false,
      promoCode: false,
      searchButton: false
    };
  },
  [BookingActionTypes.SHOW_ROOM_SELECT](state: any) {
    state.bookingState = {
      location: false,
      checking: false,
      roomSelect: true,
      promoCode: false,
      searchButton: false
    };
  },
  [BookingActionTypes.SHOW_PROMO_CODE](state: any) {
    state.bookingState = {
      location: false,
      checking: false,
      roomSelect: false,
      promoCode: true,
      searchButton: false
    };
  },
  [BookingActionTypes.SEARCH_ROOM](state: any) {
    state.bookingState = {
      ...state.bookingState,
      searchButton: true
    };
  },
  [BookingActionTypes.CLOSE_ALL](state: any) {
    state.bookingState = {
      location: false,
      checking: false,
      roomSelect: false,
      promoCode: false,
      searchButton: false
    };
  },
  [BookingActionTypes.SHOW_TOTAL_GUEST](state: any) {
    state.isShowTotalGuest = true;
  },

  [BookingActionTypes.GET_LOCATION](state: any, action: any) {
    if (action?.payload?.name) {
      state.bookingData.location = action.payload.name;
      state.bookingData.hotelID = action.payload.hotelID;
    } else {
      state.bookingData.location = "";
      state.bookingData.hotelID = "";
    }
  },

  [BookingActionTypes.GET_CHECKIN](state: any, action: any) {
    state.bookingData.checkIn = action.payload;
  },

  [BookingActionTypes.GET_CHECKOUT](state: any, action: any) {
    state.bookingData.checkOut = action.payload;
  },

  [BookingActionTypes.GET_PROMO_CODE](state: any, action: any) {
    state.bookingData.promoCode = action.payload?.toUpperCase();
  },

  [BookingActionTypes.GET_DATA_FROM_URL](state: any, payload: any) {
    const roomInitial = [
      {
        id: "",
        adults: {
          title: "Adults",
          number: 1
        },
        children: {
          title: "Children",
          childrenList: []
        }
      }
    ];

    let location = "";
    if (payload.location !== undefined) {
      location = payload.location;
    } else if (state.bookingData.location) {
      location = state.bookingData.location;
    } else {
      location = "";
    }
    if (payload.checkIndate && payload.checkOutdate) {
      const today = moment().format("YYYY-MM-DD");
      if (
        moment(today).isAfter(payload.checkIndate) ||
        moment(today).isAfter(payload.checkOutdate) ||
        moment(payload.checkIndate).isAfter(payload.checkOutdate)
      ) {
        const checkinDate = moment()
          .day(7)
          .format("YYYY-MM-DD");
        const checkoutDate = moment()
          .day(8)
          .format("YYYY-MM-DD");
        state.bookingData = {
          ...state.bookingData,
          location,
          checkIn: checkinDate,
          checkOut: checkoutDate,
          checkOutBeforeBookingUseDay: checkoutDate,
          promoCode: payload?.coupon_code?.toUpperCase() || "",
          promoCodeExist: {},
          roomList: payload.rooms ? JSON.parse(payload.rooms) : roomInitial
        };
      } else {
        state.bookingData = {
          ...state.bookingData,
          location,
          checkIn: payload.checkIndate,
          checkOut: payload.checkOutdate,
          checkOutBeforeBookingUseDay: payload.checkOutdate,
          promoCode: payload?.coupon_code?.toUpperCase() || "",
          promoCodeExist: {},
          roomList: payload.rooms ? JSON.parse(payload.rooms) : roomInitial
        };
      }
    } else if (state.bookingData.checkIn && !payload.checkIndate) {
      const today = moment().format("YYYY-MM-DD");
      if (
        moment(today).isAfter(state.bookingData.checkIn) ||
        moment(today).isAfter(state.bookingData.checkOut)
      ) {
        const checkinDate = moment()
          .day(7)
          .format("YYYY-MM-DD");
        const checkoutDate = moment()
          .day(8)
          .format("YYYY-MM-DD");
        state.bookingData = {
          ...state.bookingData,
          checkIn: checkinDate,
          checkOut: checkoutDate
        };
      }
    } else {
      const checkinDate = moment()
        .day(7)
        .format("YYYY-MM-DD");
      const checkoutDate = moment()
        .day(8)
        .format("YYYY-MM-DD");
      state.bookingData = {
        ...state.bookingData,
        location,
        checkIn: checkinDate,
        checkOut: checkoutDate,
        checkOutBeforeBookingUseDay: checkoutDate,
        promoCode: payload?.coupon_code?.toUpperCase() || "",
        promoCodeExist: {},
        roomList: payload.rooms ? JSON.parse(payload.rooms) : roomInitial
      };
    }
  },

  [BookingActionTypes.SET_SEARCH_KEYWORD](state: any, payload: any) {
    state.bookingData.location = payload;
  },
  [BookingActionTypes.GET_ERROR](state: any, action: any) {
    switch (action.payload.key) {
      case "location":
        state.bookingError.location.msg = action.payload.msg;
        break;
      default:
        break;
    }
  },

  [BookingActionTypes.CHECK_PROMO_CODE_SUCCESS](state: any, action: any) {
    state.bookingData.promoCodeExist = action.payload;
  },

  [BookingActionTypes.CHECK_PROMO_CODE_FAIL](state: any, action: any) {
    state.bookingData.promoCodeExist = action.error;
  },

  [BookingActionTypes.SET_INITIAL_BOOKING](_state: any, _action: any) {
    // state.bookingData.booking = action.payload
  },

  [BookingActionTypes.GET_INITIAL_BOOKING](state: any, action: any) {
    state.bookingData = {
      ...state.bookingData,
      checkIn: action.payload.checkIn,
      checkOut: action.payload.checkOut,
      checkOutBeforeBookingUseDay: action.payload.checkOut
      // roomSelect: action.payload.roomSelect
    };
  },

  [BookingActionTypes.SET_SEARCH_TYPE](state: any, payload: any) {
    state.bookingData.searchType = payload;
  },

  [BookingActionTypes.SAVE_HOTEL_ID](state: any, payload: any) {
    state.bookingData.hotelID = payload;
  },

  [BookingActionTypes.SAVE_ROOM_INDEX](state: any, payload: any) {
    state.roomIndex = payload;
  },

  //
  [BookingActionTypes.SAVE_ROOM_LIST](state: any, payload: types.IRoomModel[]) {
    state.bookingData.roomList = payload;
    state.bookingData.totalGuest = payload
      .map(
        (x: types.IRoomModel) =>
          x.adults.number + x.children.childrenList.length
      )
      .reduce((a: number, b: number) => a + b);
  },

  [BookingActionTypes.ADD_ROOM](state: any) {
    // const roomModel = {
    //   id: '',
    //   adults: {
    //     title: 'Adults',
    //     number: 1
    //   },
    //   children: {
    //     title: 'Children',
    //     childrenList: []
    //   }
    // }
    // state.bookingData.roomList.push(roomModel)

    const roomItem = {
      ...JSON.parse(JSON.stringify(state.bookingData.roomList[0]))
    };
    state.bookingData.roomList.push(roomItem);
  },

  [BookingActionTypes.DELETE_ROOM](state: any, roomID: number) {
    if (state.bookingData?.roomList?.length > 1) {
      state.bookingData.roomList.splice(roomID, 1);
    }
  },

  [BookingActionTypes.ON_CHANGE_CHILD](
    state: any,
    payload: types.IChangeChild
  ) {
    // if (payload.child.isMinus) {
    //   state.bookingData.roomList[payload.roomIndx].children.childrenList.pop();
    // } else {
    //   state.bookingData.roomList[payload.roomIndx].children.childrenList.push({
    //     title: `Child ${payload.child.data.number}`,
    //     age: 1,
    //     value: "Select Tier",
    //     bed: false
    //   });
    // }

    const { roomList } = state.bookingData;
    if (payload.child.isMinus) {
      state.bookingData.roomList[0].children.childrenList.pop();

      const firstRoom = { ...state.bookingData.roomList[0] };
      state.bookingData.roomList = roomList.map((room: any) => {
        return firstRoom;
      });
    } else {
      state.bookingData.roomList[0].children.childrenList.push({
        title: `Child ${payload.child.data.number}`,
        age: 1,
        value: "Select Tier",
        bed: false
      });
      const firstRoom = { ...state.bookingData.roomList[0] };
      state.bookingData.roomList = roomList.map((room: any) => {
        return firstRoom;
      });
    }
  },

  [BookingActionTypes.ON_CHANGE_PERSON](
    state: any,
    payload: types.IPersonChange
  ) {
    // state.bookingData.roomList[payload.roomIndx].adults = payload.person.data;
    state.bookingData.roomList.map((room: any) => {
      room.adults = payload.person.data;
      return room;
    });
  },

  [BookingActionTypes.ON_CHANGE_CHILD_AGE](
    state: any,
    payload: types.IChangeChildAge
  ) {
    state.bookingData.roomList[payload.roomIdx].children.childrenList[
      payload.data.index
    ].age = payload.data.age;
    state.bookingData.roomList[payload.roomIdx].children.childrenList[
      payload.data.index
    ].value = payload.data.age;

    const firstRoom = JSON.parse(JSON.stringify(state.bookingData.roomList[0]));

    state.bookingData.roomList = state.bookingData.roomList.map((room: any) => {
      return firstRoom;
    });
  },

  [BookingActionTypes.ON_CHANGE_BED_SELECT](state: any, payload: any) {
    state.bookingData.roomList[payload.roomIdx].children.childrenList[
      payload.data.index
    ].bed = payload.data.bed;

    const firstRoom = JSON.parse(JSON.stringify(state.bookingData.roomList[0]));

    state.bookingData.roomList = state.bookingData.roomList.map((room: any) => {
      return firstRoom;
    });
  },

  [BookingActionTypes.CREATE_RESERVATIONS](state: any) {
    state.isUpdateLoading = true;
  },

  [BookingActionTypes.CREATE_RESERVATIONS_SUCCESS](state: any, action: any) {
    state.reservationData = action.payload;
    state.isUpdateLoading = false;
  },

  [BookingActionTypes.CREATE_RESERVATIONS_FAIL](state: any, action: any) {
    state.paymentState.isLoading = false;
    state.isUpdateLoading = false;
    state.reservationError = action;
  },

  [BookingActionTypes.GET_RESERVATIONS](state: any, _action: any) {
    state.reservationData = {};
    state.isReservationLoading = true;
  },

  [BookingActionTypes.GET_RESERVATIONS_SUCCESS](state: any, action: any) {
    state.reservationData = action.payload;
    state.isReservationLoading = false;
  },

  [BookingActionTypes.GET_RESERVATIONS_FAIL](state: any, action: any) {
    state.error = action.payload;
    state.isReservationLoading = false;
  },

  [BookingActionTypes.CANCEL_RESERVATIONS](state: any) {
    state.isReservationLoading = true;
    // state.e = true;
  },

  [BookingActionTypes.CANCEL_RESERVATIONS_SUCCESS](state: any, action: any) {
    state.success = true;
    state.reservationData = action.payload;
    state.isReservationLoading = false;
    state.successCancelReservationMessage = action.payload.message.title;
  },

  [BookingActionTypes.CANCEL_RESERVATIONS_FAIL](state: any, action: any) {
    state.error = action.payload;
    state.isReservationLoading = false;
    const errorMessage = action.error.message[0].title;
    state.cancelReservationMessage = errorMessage;
  },

  [BookingActionTypes.UPDATE_RESERVATIONS](state: any) {
    state.isUpdateLoading = true;
  },

  [BookingActionTypes.UPDATE_RESERVATIONS_SUCCESS](state: any, action: any) {
    state.reservationData = action.payload;
    state.isUpdateLoading = false;
  },

  [BookingActionTypes.UPDATE_RESERVATIONS_FAIL](state: any, action: any) {
    state.isUpdateLoading = false;
    state.reservationError = action;
  },

  [BookingActionTypes.UPDATE_GUEST_DETAIL](state: any) {
    state.isReservationLoading = true;
    // state.e = true;
  },

  [BookingActionTypes.UPDATE_GUEST_DETAIL_SUCCESS](state: any, action: any) {
    state.success = true;
    state.reservationData = action.payload;
    state.isReservationLoading = false;
    // state.e = true;
  },

  [BookingActionTypes.UPDATE_GUEST_DETAIL_FAIL](state: any, action: any) {
    state.error = action.payload;
    state.isReservationLoading = false;
  },

  [BookingActionTypes.GET_SETTING_RESERVATIONS_SUCCESS](
    state: any,
    action: any
  ) {
    state.reservationsSettings = action.payload;
  },

  [BookingActionTypes.GET_SETTING_RESERVATIONS_FAIL](state: any, action: any) {
    state.reservationsSettings = action.payload;
  },

  [BookingActionTypes.SAVE_URL_PARAMS_RESERVATIONS](state: any, payload: any) {
    state.reservationParams = {
      hotelID: payload.hotelID,
      reservationID: payload.reservationID,
      email: payload.email,
      bypass_token: payload.byPassToken
    };
  },

  [BookingActionTypes.SET_BOOKING_FROM_API](state: any, payload: any) {
    state.bookingData = {
      ...state.bookingData,
      checkIn: payload.checkIn,
      checkOut: payload.checkOut,
      checkOutBeforeBookingUseDay: payload.checkOut,
      roomList: payload.roomList
    };
  },

  [BookingActionTypes.SET_CALENDAR](state: any, payload: any) {
    state.allowedSelectOneDay = payload;
    const tomorrow = moment(state.bookingData.checkIn).add(1, "days");
    let checkOut = "";
    if (state.bookingData.checkOutBeforeBookingUseDay) {
      if (
        moment(state.bookingData.checkOutBeforeBookingUseDay).isSame(
          state.bookingData.checkIn
        )
      ) {
        checkOut = moment(tomorrow).format("YYYY-MM-DD");
      } else {
        checkOut = state.bookingData.checkOutBeforeBookingUseDay;
      }
    }
    if (payload) {
      state.bookingData.checkOut = state.bookingData.checkIn;
    } else {
      state.bookingData.checkOut = checkOut;
    }
  },

  [BookingActionTypes.UPDATE_BOOKING_GTM](_state: any, _action: any) {},

  [BookingActionTypes.GET_BOOKING_ID](state: any, _action: any) {
    state.bookingData.hotelID = _action.payload;
  },

  [BookingActionTypes.SAVE_ROOM_PARAMS_FOR_GET_ROOM_SELECTED](state: any) {
    state.roomParamsForGetRoomSelected = [...state.bookingData.roomList];
  },

  [BookingActionTypes.DEL_ROOM_PARAMS_FOR_GET_ROOM_SELECTED](
    state: any,
    roomIdx: number
  ) {
    state.roomParamsForGetRoomSelected.splice(roomIdx, 1);
  }
};
