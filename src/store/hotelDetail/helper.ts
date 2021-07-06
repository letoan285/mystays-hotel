export class PlanHelper {
  public plans: Array<any> = [];
  public sortBy = "";
  public filterModel: any = {};
  public selectedRoom: Array<any> = [];
  public planFilter: Array<any> = [];

  constructor(
    plans: Array<any>,
    sortBy: string,
    filterModel: any,
    selectedRoom: Array<any>,
    planFilter: Array<any>
  ) {
    this.plans = plans;
    this.sortBy = sortBy;
    this.filterModel = filterModel;
    this.selectedRoom = selectedRoom;
    this.planFilter = planFilter;
  }

  public planInfo() {
    const planInfo = this.plans.map((hotel: any, hotelIndex: number) => {
      const roomPlans = hotel.rooms.map((room: any) => {
        const firstPicture =
          room.room_pictures[0]?.picture?.chatbot_header?.url;

        const discountRate =
          room.sign_in_discount.total_price_after_discount +
          room.sign_in_discount.total_price_after_discount_tax;

        const promoCodeName =
          room.sign_in_discount?.promotions &&
          room.sign_in_discount?.promotions[0]?.name;

        return {
          details: room.room_type_description,
          discountRate,
          promoCodeName,
          earn: 125,
          image: firstPicture,
          isMemberOnly: true,
          rate: room.total_price + room.tax,
          roomId: room.room_type_code,
          roomLeft: room.room_count,
          roomSliderImages: room.room_pictures,
          roomTitle: room.room_type_name,
          isSmocking: room.is_smoking,
          planCode: `${room.room_type_code}_${hotel.code}_sleeps_${room.sleeps}`,
          sleeps: room.sleeps,
          roomRate: room.room_rate,
          tax: room.tax,
          cancellationFreeDeadline: room.cancellation_free_deadline,
          roomPlanCode: room.room_plan_code
        };
      });

      let roomSort = [];

      switch (this.sortBy) {
        case "lowestToHighest":
          roomSort = roomPlans.sort((a: any, b: any) => a.rate - b.rate);
          break;
        case "highestToLowest":
          roomSort = roomPlans.sort((a: any, b: any) => b.rate - a.rate);
          break;
        default:
          roomSort = roomPlans;
          break;
      }

      const sleeps = roomSort[0]?.sleeps;

      const minPrice = Math.min(
        ...roomSort.map((room: any) => {
          if (room.discountRate) {
            return room.discountRate;
          }

          return room.rate;
        })
      );

      const maxPrice = Math.max(...roomSort.map((room: any) => room.rate));

      const minPriceBeforeDiscount = Math.min(
        ...roomSort.map((room: any) => room.rate)
      );

      const promoCodeName = roomPlans && roomPlans[0].promoCodeName;

      return {
        cancellationFreeDeadline: roomSort[0]?.cancellationFreeDeadline,
        cancellationPolicyLink: "",
        rateBeforeDiscount: minPriceBeforeDiscount,
        roomPlanCode: roomSort[0]?.roomPlanCode,
        details: hotel.description,
        isMemberOnly: false,
        picture: hotel.url_plan_pictures[0],
        planId: hotelIndex + 1,
        rate: minPrice,
        maxPrice,
        subContent: roomSort,
        title: hotel.name,
        meals: hotel.meals,
        sleeps,
        code: hotel.code,
        paymentMethod: hotel.payment_method,
        promoCodeName
      };
    });

    return planInfo;
  }

  public planLeftFilter() {
    let newPlanFilter = [];
    if (this.filterModel.status) {
      const priceRange = this.filterModel.priceRange;
      const subContentFilter = this.planFilter.map((plan: any) => {
        const { subContent } = plan;
        const subContentFilter = subContent.filter((sub: any) => {
          return sub.rate >= priceRange[0] && sub.rate <= priceRange[1];
        });
        return {
          ...plan,
          subContent: subContentFilter
        };
      });
      newPlanFilter = subContentFilter.filter((room: any) => {
        return room.subContent.length;
      });
    } else {
      newPlanFilter = this.planFilter;
    }

    if (newPlanFilter.length && this.selectedRoom.length) {
      newPlanFilter.forEach((planFilter: any, _roomIdx: number) => {
        planFilter.subContent.forEach((roomInfo: any) => {
          this.selectedRoom.forEach((selectedRoom: any) => {
            if (roomInfo.roomId === selectedRoom.room.roomId) {
              roomInfo.roomLeft -= 1;
            }
          });
        });
      });
    }
    const planLeftFilter = newPlanFilter?.map((plan: any) => {
      return {
        ...plan,
        subContent: plan?.subContent?.filter(
          (subContent: any) => subContent.roomLeft > 0
        )
      };
    });

    let planSort = [];

    switch (this.sortBy) {
      case "lowestToHighest":
        planSort = planLeftFilter.sort((a: any, b: any) => a.rate - b.rate);
        break;
      case "highestToLowest":
        planSort = planLeftFilter.sort((a: any, b: any) => b.rate - a.rate);
        break;
      default:
        planSort = planLeftFilter;
        break;
    }
    return planSort.filter((plan: any) => plan.subContent.length) || [];
  }
}

export class RoomHelper {
  roomStatus: any = {};
  sortBy = "";
  roomList: Array<any> = [];
  roomPlanCode: any = {};
  filterModel: any = {};
  isSmocking = false;
  constructor(
    roomStatus: any,
    sortBy: string,
    roomList: Array<any>,
    roomPlanCode: any,
    filterModel: any,
    isSmocking: boolean
  ) {
    this.roomStatus = roomStatus;
    this.sortBy = sortBy;
    this.roomList = roomList;
    this.roomPlanCode = roomPlanCode;
    this.filterModel = filterModel;
    this.isSmocking = isSmocking;
  }

  public roomInfo() {
    const rooms = this.roomList.map((room: any) => {
      const planList = room.room_plan.map((plan: any, index: number) => {
        const discountRate =
          plan.sign_in_discount.total_price_after_discount +
          plan.sign_in_discount.total_price_after_discount_tax;
        const promoCodeName =
          plan.sign_in_discount?.promotions &&
          plan.sign_in_discount?.promotions[0]?.name;
        return {
          details: plan.hotel_plan_description,
          discountRate,
          promoCodeName,
          isActive: true,
          isMemberOnly: false,
          rate: plan.total_price + plan.tax,
          title: plan.room_plan_name,
          image: plan.url_plan_pictures && plan.url_plan_pictures[0],
          roomRate: plan.room_rate,
          planCode: `${room.room_type_code}_${plan.hotel_plan_code}_sleeps_${plan.sleeps}`,
          planId: index,
          code: plan.hotel_plan_code,
          sleeps: plan.sleeps,
          tax: plan.tax,
          paymentMethod: plan.payment_method,
          cancellationFreeDeadline: plan.cancellation_free_deadline,
          cancellationPolicyLink: plan.cancellation_policy_link,
          roomPlanCode: plan.room_plan_code,
          roomId: room.room_type_code
        };
      });

      const minPrice = Math.min(
        ...planList.map((plan: any) => {
          if (plan.discountRate) {
            return plan.discountRate;
          }

          return plan.rate;
        })
      );

      const minPriceBeforeDiscount = Math.min(
        ...planList.map((plan: any) => plan.rate)
      );

      const promoCodeName = planList && planList[0].promoCodeName;

      const firstPicture = room.room_pictures[0]?.picture?.chatbot_header?.url;

      let planSort = [];

      switch (this.sortBy) {
        case "lowestToHighest":
          planSort = planList.sort((a: any, b: any) => a.rate - b.rate);
          break;
        case "highestToLowest":
          planSort = planList.sort((a: any, b: any) => b.rate - a.rate);
          break;
        default:
          planSort = planList;
          break;
      }

      const planFilter = planSort.filter((plan: any) => {
        if (this.roomPlanCode.planCode) {
          return this.roomPlanCode.planCode === plan.code;
        }
        return plan;
      });

      return {
        ...room,
        roomTitle: room.room_type_name,
        details: room.room_type_description,
        picture: firstPicture,
        rate: minPrice,
        promoCodeName,
        rateBeforeDiscount: minPriceBeforeDiscount,
        roomId: room.room_type_code,
        roomLeft: room.room_count,
        roomSliderImages: room.room_pictures,
        isSmocking: room.is_smoking,
        subContent: planFilter,
        sleeps: this.roomStatus?.adults?.number,
        tax: 0
      };
    });

    return rooms;
  }

  public roomFilter() {
    let newRoom = [];
    if (this.filterModel.status) {
      const priceRange = this.filterModel.priceRange;
      const subContentFilter = this.roomList.map((room: any) => {
        const { subContent } = room;
        const subContentFilter = subContent.filter((sub: any) => {
          return sub.rate >= priceRange[0] && sub.rate <= priceRange[1];
        });

        let minPrice = subContentFilter[0]?.rate;
        let maxPrice = subContentFilter[0]?.rate;

        subContentFilter.forEach((room: any) => {
          if (room.rate < minPrice) {
            minPrice = room.rate;
          }
          if (maxPrice < room.rate) {
            maxPrice = room.rate;
          }
        });

        return {
          ...room,
          rate: minPrice,
          maxPrice,
          subContent: subContentFilter
        };
      });
      newRoom = subContentFilter.filter((room: any) => {
        return room.subContent.length;
      });
    } else {
      newRoom = this.roomList;
    }

    let roomSort = [];

    switch (this.sortBy) {
      case "lowestToHighest":
        roomSort = newRoom.sort((a: any, b: any) => a.rate - b.rate);
        break;
      case "highestToLowest":
        roomSort = newRoom.sort((a: any, b: any) => b.rate - a.rate);
        break;
      default:
        roomSort = newRoom;
        break;
    }

    let newRoomFilter = [];
    if (roomSort && roomSort.length) {
      newRoomFilter = roomSort.filter((room: any) => {
        if (this.roomPlanCode.roomCode) {
          return room.room_type_code === this.roomPlanCode.roomCode;
        } else {
          return room.subContent.length > 0;
        }
      });
    }

    return newRoomFilter;
  }
}
