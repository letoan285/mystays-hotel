import moment from "moment";
import * as types from "./types";

export default {
  getCheckinDate: (state: any, _getters: any, rootState: any) => {
    const lang = rootState.appHeader.data.language;
    let format = "";
    switch (lang) {
      case "en":
        format = "MMM DD";
        break;
      case "ko":
        format = "MMM DD일";
        break;
      default:
        format = "MMM DD日";
        break;
    }
    return moment(state.bookingData.checkIn)
      .locale(lang)
      .format(format)
      .toString();
  },
  getCheckoutDate: (state: any, _getters: any, rootState: any) => {
    let format = "";
    const lang = rootState.appHeader.data.language;
    switch (lang) {
      case "en":
        format = "MMM DD";
        break;
      case "ko":
        format = "MMM DD일";
        break;
      default:
        format = "MMM DD日";
        break;
    }
    return moment(state.bookingData.checkOut)
      .locale(lang)
      .format(format)
      .toString();
  },
  totalGuest: (state: any) => {
    if (state.bookingData?.roomList?.length) {
      return state.bookingData.roomList
        .map(
          (x: types.IRoomModel) =>
            x.adults.number + x.children.childrenList.length
        )
        .reduce((a: number, b: number) => a + b);
    }
  },
  numberAdults: (state: any) => {
    if (state.bookingData?.roomList?.length) {
      return state.bookingData.roomList
        .map((x: types.IRoomModel) => x.adults.number)
        .reduce((a: number, b: number) => a + b);
    }
  },

  numberChildren: (state: any) => {
    if (state.bookingData.roomList) {
      return state.bookingData.roomList
        .map((x: types.IRoomModel) => x.children.childrenList.length)
        .reduce((a: number, b: number) => a + b);
    }
  },

  numberAdultsInRoomSelected: (state: any) => {
    if (state.roomParamsForGetRoomSelected.length) {
      return state.roomParamsForGetRoomSelected
        .map((x: types.IRoomModel) => x.adults.number)
        .reduce((a: number, b: number) => a + b);
    }
  },

  numberChildrenInRoomSelected: (state: any) => {
    if (state.bookingData?.roomList?.length) {
      return state.bookingData.roomList
        .map((x: types.IRoomModel) => x.children.childrenList.length)
        .reduce((a: number, b: number) => a + b);
    }
  },

  totalNight(state: any) {
    const checkIn = state.bookingData?.checkIn;
    const checkOut = state.bookingData?.checkOut;
    return -moment(checkIn).diff(moment(checkOut), "days");
  },

  roomList: (state: any) => {
    if (state?.bookingData?.roomList?.length) {
      return state.bookingData.roomList.map((room: types.IRoomModel) => {
        const roomModel = {
          adults: room.adults?.number,
          children: 0, // room.children?.childrenList?.length,
          kids_age_range: null
        };
        return roomModel;
      });
    }
  },

  isSelectedAge: (state: any) => {
    const roomList = state?.bookingData?.roomList;
    let isAgeSelect = true;
    if (roomList?.length) {
      for (let roomIndex = 0; roomIndex < roomList.length; roomIndex++) {
        const childrenList = roomList[roomIndex].children.childrenList;
        for (let childIdx = 0; childIdx < childrenList.length; childIdx++) {
          const children = childrenList[childIdx];
          if (children.age === "Select Tier") {
            isAgeSelect = false;
            break;
          }
        }
      }
    }

    return isAgeSelect;
  },

  roomListWithChildren(state: any) {
    if (state?.bookingData?.roomList?.length) {
      return state.bookingData.roomList.map((room: types.IRoomModel) => {
        const kidsAgeRange = room.children?.childrenList.map((kid: any) => {
          return {
            age: kid.age,
            bed: kid.bed
          };
        });
        const roomModel = {
          adults: room.adults?.number,
          children: room.children?.childrenList?.length,
          kids_tiers: kidsAgeRange
        };
        return roomModel;
      });
    }
  },

  hasChildren(state: any) {
    let hasChildren = false;
    const roomList = state?.bookingData?.roomList;
    if (roomList?.length) {
      roomList.forEach((room: any) => {
        if (room?.children?.childrenList?.length) {
          hasChildren = true;
        }
      });
    }

    return hasChildren;
  },

  promoCodeSave() {
    return 0;
  },

  roomData(state: any, _getters: any, rootState: any, rootGetters: any) {
    const { selectedRoom } = rootState.hotelDetail;
    const {
      guest,
      isBookingForSomeoneElse,
      someoneElseData
    } = rootState.guestDetail;
    const roomParams = state.roomParamsForGetRoomSelected.map(
      (room: types.IRoomModel) => {
        const kidsAgeRange = room.children?.childrenList.map((kid: any) => {
          return {
            age: kid.age,
            bed: kid.bed
          };
        });
        const roomModel = {
          adults: room.adults?.number,
          children: room.children?.childrenList?.length,
          kids_tiers: kidsAgeRange
        };
        return roomModel;
      }
    );
    const totalPrice = rootGetters["hotelDetail/totalPrice"];
    const roomData = selectedRoom.map((item: any, index: number) => {
      const guestIndex = guest[index] ? guest[index] : guest[0];
      return {
        ...roomParams[index],
        guest: isBookingForSomeoneElse ? someoneElseData : guestIndex,
        room_plan_code: item.plan.roomPlanCode || item.room.roomPlanCode,
        room_type_code: item.room.roomId,
        room_count: 1,
        total_price: totalPrice,
        membership_promotion_id: null,
        adult_companion: null,
        kid_tier_a_companion: null
      };
    });

    return roomData;
  },

  roomSelectedParams(state: any, _getters: any, rootState: any) {
    const { selectedRoom } = rootState.hotelDetail;
    const roomList = state?.bookingData?.roomList;

    const roomParams = state.roomParamsForGetRoomSelected.map(
      (room: types.IRoomModel) => {
        const kidsAgeRange = room.children?.childrenList.map((kid: any) => {
          return {
            age: kid.age,
            bed: kid.bed
          };
        });
        const roomModel = {
          adults: room.adults?.number,
          children: room.children?.childrenList?.length,
          kids_tiers: kidsAgeRange
        };
        return roomModel;
      }
    );

    const firstRoomSelected = selectedRoom[0];

    const roomData = {
      ...roomParams[0],
      room_plan_code:
        firstRoomSelected.plan.roomPlanCode ||
        firstRoomSelected.room.roomPlanCode,
      room_type_code: firstRoomSelected.room.roomId,
      room_count: 1,
      total_price: firstRoomSelected.room?.rate || firstRoomSelected.plan?.rate,
      checkin_date: state.bookingData.checkIn,
      checkout_date: state.bookingData.checkOut
    };

    return roomList.map((room: any) => roomData);
  },

  reservationsData(state: any) {
    return state.reservationData;
  },

  bookingID(state: any) {
    return state.reservationData?.reservation_number;
  },

  byPassToken(state: any) {
    return state.reservationData?.bypass_token;
  },

  hotelDetailRouteParams(
    state: any,
    _getters: any,
    _rootState: any,
    rootGetters: any
  ) {
    const routeParams = {
      checkIndate: state.bookingData.checkIn,
      checkOutdate: state.bookingData.checkOut,
      language: rootGetters["appHeader/fullLanguage"],
      promoCode: state.bookingData.promoCode,
      rooms: JSON.stringify(state.bookingData.roomList)
    };

    return routeParams;
  }
};
