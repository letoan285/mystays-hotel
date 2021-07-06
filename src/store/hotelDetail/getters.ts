import moment from "moment";
import * as constant from "../../shared/constants/index";
import flatArr from "../../shared/helper/flatArray";
import { PlanHelper, RoomHelper } from "./helper";

export default {
  roomDetails: (state: any, _getters: any, rootState: any) => {
    const selectedRoom = rootState.booking?.bookingData?.roomList;
    const roomDetail = state.selectedRoom.map(
      (roomPlan: any, roomIdx: number) => {
        const guests = selectedRoom[roomIdx]?.adults?.number;
        const numberChildren =
          selectedRoom[roomIdx]?.children?.childrenList.length;
        const numberAdults = selectedRoom[roomIdx]?.adults?.number;
        const roomTitleWithGuestNumber = `${roomPlan.room?.roomTitle} ${
          roomPlan.plan?.title ? "," : ""
        }
            ${roomPlan.plan?.title ? roomPlan.plan?.title : ""} x ${guests} ${
          guests > 1 ? "Guests" : "Guest"
        }`;
        let childrenText = "";
        if (numberChildren > 0) {
          childrenText = `& ${numberChildren} ${
            numberChildren > 1 ? "Children" : "Child"
          }`;
        } else {
          childrenText = "";
        }
        const newRoom = {
          roomID: roomPlan.room?.roomId,
          roomName: "",
          roomTitle: roomPlan.room?.roomTitle,
          title: roomTitleWithGuestNumber,
          roomInfo: {},
          sleeps: roomPlan.plan?.sleeps,
          roomPlanCode:
            roomPlan.plan?.roomPlanCode || roomPlan.room?.roomPlanCode
        };
        const details = roomPlan?.plan?.roomRate?.map(
          (plan: any, index: number) => {
            const percentTax =
              roomPlan.plan?.tax / (roomPlan.plan?.rate + roomPlan.plan?.tax);
            return {
              time: `Night ${index + 1}`,
              price: plan?.rate - percentTax * plan?.rate
            };
          }
        );
        const title = `${roomPlan.plan?.title ? roomPlan.plan?.title : ""} ${
          roomPlan.plan?.title ? "," : ""
        } ${guests} ${guests > 1 ? "Adults" : "Adult"} ${childrenText}`;
        newRoom.roomInfo = {
          title,
          totalPrice: roomPlan.plan?.rate, // + roomPlan.plan.tax
          detail: details,
          numberChildren,
          numberAdults
        };
        return newRoom;
      }
    );

    return roomDetail;
  },

  roomDetailFromAPI(state: any) {
    const { roomSelectedFromAPI } = state;
    const rooms = roomSelectedFromAPI?.rooms;
    if (rooms && rooms.length) {
      const roomDetail = rooms.map((room: any) => {
        const title = `${room.room_plan_name ? room.room_plan_name : ""} ${
          room.room_plan_name ? "," : ""
        }`;
        const newRoomDetail = {
          roomID: room.room_type_code,
          roomInfo: {},
          roomName: "",
          roomPlanCode: room.room_plan_code,
          roomTitle: room.room_type_name,
          sleeps: "",
          title
        };

        const details = room.room_rates?.map((rate: any, rateIdx: number) => {
          return {
            time: `Night ${rateIdx + 1}`,
            price: rate.day_total_rate
          };
        });

        const totalPrice = details
          .map((d: any) => d.price)
          .reduce((a: any, b: any) => a + b);

        newRoomDetail.roomInfo = {
          title,
          totalPrice, // + roomPlan.plan.tax
          detail: details,
          numberChildren: room.children,
          numberAdults: room.adults
        };

        return newRoomDetail;
      });

      return roomDetail;
    }
  },

  couponDiscount(state: any) {
    const { roomSelectedFromAPI } = state;

    return -roomSelectedFromAPI?.coupon_discount_amount;
  },

  promoCodeFromAPI(state: any) {
    const { roomSelectedFromAPI } = state;

    return roomSelectedFromAPI?.coupon_promotion?.coupon_code;
  },

  tax: (state: any) => {
    const roomDetail = state.selectedRoom;
    const { roomSelectedFromAPI } = state;
    if (roomDetail.length) {
      const taxDetail = [
        {
          time: "Tax",
          price: roomSelectedFromAPI?.tax
        }
      ];
      return {
        title: "Total Fees",
        totalPrice: roomSelectedFromAPI?.total_price,
        totalTax: roomSelectedFromAPI?.tax,
        couponDiscount: roomSelectedFromAPI?.coupon_discount_amount,
        detail: taxDetail
      };
    }
  },

  taxFromAPI(_state: any, _getters: any, rootState: any) {
    const reservationData = rootState.booking?.reservationData;
    return {
      title: "Total Fees",
      totalPrice: reservationData?.total_price,
      totalTax: reservationData?.tax,
      detail: [
        {
          time: "Tax",
          price: reservationData?.tax
        }
      ]
    };
  },

  totalPrice: (state: any) => {
    const { roomSelectedFromAPI } = state;

    return roomSelectedFromAPI?.total_price;
  },
  totalPriceWithoutTax: (_state: any, getters: any) => {
    const roomDetail = getters.roomDetails;
    if (roomDetail.length) {
      const totalGross = roomDetail
        .map((room: any) => {
          return room.roomInfo?.totalPrice;
        })
        .reduce((a: any, b: any) => a + b);
      return totalGross;
    }
  },
  roomDetailSidebar: (state: any) => {
    const hotelDetail = state.hotelDetail?.data;
    const roomFacilitiesFilter = hotelDetail?.amenities.filter(
      (amenities: any) => amenities.is_active
    );
    const roomFacilities = roomFacilitiesFilter?.map((amen: any) => {
      let icon = "";
      constant.amenitiesInclude.forEach((a: any) => {
        if (amen.name === a.name) {
          icon = a.icon;
        }
      });
      return {
        icon,
        name: amen.name
      };
    });

    return {
      roomBookingTime: {
        checkIn: state.hotelDetailV2.checkin,
        checkOut: state.hotelDetailV2.checkout
      },
      roomFacilities: {
        title: "Room Facilities and Amenities",
        serviceList: roomFacilities
      },
      roomServices: {
        title: "", // title: Facilities and Services
        serviceList: []
      },
      roomRentalEquipment: {
        title: "", // title: Rental Equipment
        serviceList: []
      }
    };
  },
  checkInOverview: (state: any) => {
    return [
      {
        name: "Check In - Out",
        icon: "icon-Icon-Time",
        title: `${state.hotelDetailV2.checkin} - ${state.hotelDetailV2.checkout}`
      },
      {
        name: "Call to Back",
        icon: "icon-Icon-Phone",
        title: "+1 234-567-8910 "
      },
      {
        name: "Contact Us",
        icon: "icon-Icon-Email",
        title: "hsm.akasaka@email.com "
      }
    ];
  },
  findUsOverview: (state: any) => {
    const hotelDetail = state.hotelDetail && state.hotelDetail.data;
    const area = hotelDetail?.area?.name;
    const findUsOverview: Array<any> = [];

    const { transportations } = state.hotelDetailV2;

    transportations?.forEach((transport: any) => {
      findUsOverview.push({
        name: transport.text,
        icon:
          transport.type === "Plane"
            ? "icon-Icon-Amenity-Airport"
            : "icon-Icon-Amenity-Transit",
        title: ""
      });
    });

    return findUsOverview;
  },
  planInfo: (state: any, getters: any) => {
    if (state.planList?.plans?.length) {
      const { sortBy } = state;

      const hotelDetailHelper = new PlanHelper(
        state.planList?.plans,
        sortBy,
        {},
        [],
        []
      );

      return hotelDetailHelper.planInfo();
    }

    return [];
  },

  planFilter: (state: any, getters: any) => {
    const { planInfo } = getters;
    const roomPlanCode = state.roomPlanCode;
    if (planInfo?.length) {
      const planInfo = getters?.planInfo;
      const newPlan = planInfo.map((plan: any) => {
        const newRoomFilter = plan.subContent.filter((room: any) => {
          if (roomPlanCode.roomCode) {
            return room.roomId === roomPlanCode.roomCode;
          } else {
            return 1;
          }
        });
        return {
          ...plan,
          subContent: newRoomFilter
        };
      });

      const planFilter = newPlan.filter((plan: any) => {
        if (roomPlanCode.planCode) {
          return (
            plan.subContent.length > 0 && roomPlanCode.planCode === plan.code
          );
        } else {
          return plan.subContent.length > 0;
        }
      });
      return planFilter;
    }

    return [];
  },

  roomList: (state: any, getters: any, _rootState: any) => {
    if (state.roomList?.rooms?.length) {
      const { roomStatus } = getters;
      const { sortBy } = state;
      const roomList = state.roomList.rooms;
      const roomPlanCode = state.roomPlanCode;
      const roomHelper = new RoomHelper(
        roomStatus,
        sortBy,
        roomList,
        roomPlanCode,
        {},
        false
      );

      return roomHelper.roomInfo();
    }

    return [];
  },

  roomFilter: (state: any, getters: any) => {
    const filterModel = state.roomFilterModel;
    const roomList = getters.roomList;
    const { sortBy } = state;
    const roomPlanCode = state.roomPlanCode;
    let isSmocking = false;

    const roomHelper = new RoomHelper(
      {},
      sortBy,
      roomList,
      roomPlanCode,
      filterModel,
      isSmocking
    );

    return roomHelper.roomFilter();
  },

  roomLeftFilter(state: any, getters: any) {
    const roomFilter = JSON.parse(JSON.stringify(getters.roomFilter));
    const { selectedRoom } = state;
    if (roomFilter.length && selectedRoom.length) {
      roomFilter.forEach((roomFilter: any, _roomIdx: number) => {
        selectedRoom.forEach((selectedRoom: any) => {
          if (roomFilter.roomId === selectedRoom.room.roomId) {
            roomFilter.roomLeft -= 1;
          }
        });
      });
    }
    return roomFilter.filter((room: any) => room.roomLeft > 0);
  },

  planLeftFilter(state: any, getters: any) {
    const planFilter = JSON.parse(JSON.stringify(getters.planFilter));
    const { selectedRoom } = state;
    const { sortBy } = state;
    const filterModel = state.roomFilterModel;

    const planHelper = new PlanHelper(
      [],
      sortBy,
      filterModel,
      selectedRoom,
      planFilter
    );

    return planHelper.planLeftFilter();
  },

  mealsType: (state: any) => {
    const meals: Array<any> = [];
    state.planList.plans.forEach((plan: any) => {
      meals.push(plan.meals);
    });
    const newMeals = Array.from(new Set(meals.flat()));
    const mealArr = newMeals.map((meal: any) => {
      let mealObj = {
        text: "",
        value: ""
      };
      switch (meal) {
        case "breakfast":
          mealObj = {
            text: "Breakfast",
            value: "breakfast"
          };
          break;
        case "dinner":
          mealObj = {
            text: "Dinner",
            value: "dinner"
          };
          break;
        case "lunch":
          mealObj = {
            text: "Lunch",
            value: "lunch"
          };
          break;
        default:
          break;
      }

      return mealObj;
    });
    return mealArr;
  },

  hotelDetail: (state: any) => {
    return state.hotelDetail?.data;
  },

  hotelDetailV2: (state: any) => {
    return state.hotelDetailV2;
  },

  amennitiesInclude(_state: any, _getters: any) {
    const serviceList = _getters.roomDetailSidebar?.roomFacilities?.serviceList;
    return serviceList?.slice(0, 4);
  },

  roomStatus(state: any, _getters: any, rootState: any) {
    const { roomIndex } = state;
    const roomList = rootState.booking?.bookingData?.roomList;
    if (roomList?.length) {
      return roomList[roomIndex];
    }
    return 0;
  },

  roomSelected(_state: any, getters: any, rootState: any) {
    const { roomDetailFromAPI } = getters;
    const selectedRoom = rootState.booking?.roomParamsForGetRoomSelected;
    const roomNameList = roomDetailFromAPI?.map(
      (roomDetail: any, index: number) => {
        const numberAdults = selectedRoom[index]?.adults?.number;
        const numberChildren =
          selectedRoom[index]?.children?.childrenList.length;
        return {
          title: `${roomDetail.roomTitle}`,
          detail: roomDetail.roomInfo.detail,
          totalPrice: roomDetail.roomInfo.totalPrice,
          numberAdults,
          numberChildren
        };
      }
    );
    return roomNameList;
  },

  mapBackgroundImage(
    state: any,
    _getters: any,
    _rootState: any,
    rootGetters: any
  ) {
    const hotelDetail = state.hotelDetail?.data;
    const language = rootGetters["appHeader/language"];
    const lat = Number(hotelDetail?.latitude);
    const lng = Number(hotelDetail?.longitude);
    const mapImageSize = {
      desktopSize: "638x265",
      ipadSize: "387x177",
      mobileSize: "600x135"
    };
    if (lat && lng) {
      return {
        desktopImage: `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&scale=1&size=${mapImageSize.desktopSize}&maptype=roadmap&key=AIzaSyD9G3yU6CBFBMhuClWTKYsxZIDk5D44Szs&format=png&visual_refresh=true&markers=icon:https://www.mystays.com/Assets/Mystays/images/ms-zoomout-icon.png|shadow:true|${lat},${lng}&language=${language}&markers=icon:https://www.mystays.com/Assets/Mystays/images/location-map-hover.png|shadow:true|43.05978,141.347616&markers=icon:https://www.mystays.com/Assets/Mystays/images/location-map-hover.png|shadow:true|43.062577,141.353647&markers=icon:https://www.mystays.com/Assets/Mystays/images/location-map-hover.png|shadow:true`,
        ipadImage: `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&scale=1&size=${mapImageSize.ipadSize}&maptype=roadmap&key=AIzaSyD9G3yU6CBFBMhuClWTKYsxZIDk5D44Szs&format=png&visual_refresh=true&markers=icon:https://www.mystays.com/Assets/Mystays/images/ms-zoomout-icon.png|shadow:true|${lat},${lng}&language=${language}&markers=icon:https://www.mystays.com/Assets/Mystays/images/location-map-hover.png|shadow:true|43.05978,141.347616&markers=icon:https://www.mystays.com/Assets/Mystays/images/location-map-hover.png|shadow:true|43.062577,141.353647&markers=icon:https://www.mystays.com/Assets/Mystays/images/location-map-hover.png|shadow:true`,
        mobileImage: `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&scale=1&size=${mapImageSize.mobileSize}&maptype=roadmap&key=AIzaSyD9G3yU6CBFBMhuClWTKYsxZIDk5D44Szs&format=png&visual_refresh=true&markers=icon:https://www.mystays.com/Assets/Mystays/images/ms-zoomout-icon.png|shadow:true|${lat},${lng}&language=${language}&markers=icon:https://www.mystays.com/Assets/Mystays/images/location-map-hover.png|shadow:true|43.05978,141.347616&markers=icon:https://www.mystays.com/Assets/Mystays/images/location-map-hover.png|shadow:true|43.062577,141.353647&markers=icon:https://www.mystays.com/Assets/Mystays/images/location-map-hover.png|shadow:true`
      };
    }
  },

  cancellationPolicies(state: any) {
    const { cancellationPolicies } = state;
    if (cancellationPolicies?.length) {
      return cancellationPolicies[0];
    }
  },

  hotelReviews(state: any) {
    const { hotelReviews } = state;
    const hotelReviewList = hotelReviews?.map((hotelReview: any) => {
      return {
        ...hotelReview,
        rating: Math.round(hotelReview.rating),
        createdDate: moment(hotelReview.createdDate)
          .format("DD, MMM YYYY")
          .toString(),
        updatedDate: moment(hotelReview.updatedDate)
          .format("DD, MMM YYYY")
          .toString()
      };
    });

    return hotelReviewList;
  },

  currentTab: (state: any) => {
    return {
      currentTab: state.currentTab,
      currentId: state.currentId
    };
  },

  filtersOfPlans: (state: any) => {
    const { plans } = state.planList;
    const filters = plans?.map((plan: any) => plan.filters);

    const flatFilters = filters.flat();

    return flatArr(flatFilters, "id");
  },

  filtersOfRooms: (state: any) => {
    const { rooms } = state.roomList;
    const filters = rooms?.map((room: any) => room.filters);

    const flatFilters = filters.flat();

    return flatArr(flatFilters, "id");
  },

  filtersList: (state: any) => {
    const filterModel = state.roomFilterModel;

    const filterArray = [
      filterModel.mealType,
      filterModel.planType,
      filterModel.roomType,
      filterModel.tripType
    ];

    return filterArray.flat();
  }
};
