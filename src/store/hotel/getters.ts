export default {
  hotelsGetterList: (state: any) => {
    return state.data.hotelList;
  },

  hotelFilterByMapView: (state: any) => {
    return state.data.hotelFilterByMapView;
  },

  districtListFilterGetter: (state: any) => {
    return state.data.districtListFilter.length
      ? state.data.districtListFilter[0]
      : null;
  },
  districtListFormat: (state: any) => {
    return state.data.districtList.map((district: any) => {
      return {
        value: district.name,
        text: district.name
      };
    });
  },
  hotelsDisplayList: (state: any) => {
    return state.data.hotelList.slice(0, 10);
  },
  citySearch: (state: any) => {
    if (state.data.citySearch && state.data.citySearch.length) {
      return state.data.citySearch[0];
    } else if (
      state.data.districtListFilter &&
      state.data.districtListFilter.length
    ) {
      return state.data.districtListFilter[0];
    }
    return "";
  },
  bookingInformation: (state: any) => {
    const areaModal = state.data.areaModal;
    const bookingInformation = state.data.bookingInformation;
    const isNearMe = state.data.isNearMe;
    return {
      areaModal,
      bookingInformation,
      isNearMe
    };
  },

  mapMarkers: (state: any) => {
    return state.data.hotelList;
  },

  allMarkers: (state: any) => {
    return state.data.hotelFilter;
  },

  hotelSelected: (state: any) => {
    const hotel = state.data.hotelFilter?.filter((hotel: any) => {
      return hotel.triplaHotelId === state.hotelID;
    });

    return hotel[0] || {};
  },

  tripTypeList: (state: any) => {
    // const tripTypeList: Array<any> = []
    // const hotelList = state.data.hotelList
    // const allHotelKey: Array<any> = []
    // const tripTypesDefault = [
    //   { value: 'isFamilyTrip', text: 'Family Trip' },
    //   { value: 'isPetTrip', text: 'Traveling with Pet' },
    //   { value: 'isCouples', text: 'Couples' },
    //   { value: 'isTravelingAlone', text: 'Traveling Alone' }
    // ]

    // for (let hotelIdx = 0; hotelIdx < hotelList.length; hotelIdx++) {
    //   for (const key in hotelList[hotelIdx]) {
    //     if (!allHotelKey.includes(key)) {
    //       allHotelKey.push(key)
    //     }
    //   }
    // }

    // tripTypesDefault.forEach((t) => {
    //   if (allHotelKey.includes(t.value)) {
    //     tripTypeList.push(t)
    //   }
    // })

    return [];
  },

  popularFilterList: (state: any) => {
    // const popularFilterList: Array<any> = []
    // const hotelList = state.data.hotelList
    // const allHotelKey: Array<any> = []
    // const popularFilterDefault = [
    //   { value: 'isSmocking', text: 'Smocking' },
    //   { value: 'isNonSmocking', text: 'Non Smocking' },
    //   { value: 'isBreakfast', text: 'Breakfast' },
    //   { value: 'isWithoutBreakfast', text: 'Without Breakfast' },
    //   { value: 'isPool', text: 'Pool' },
    //   { value: 'isOnsen', text: 'Onsen' },
    //   { value: 'isAccessibleRoom', text: 'Accessible Room' },
    //   { value: 'isPetFriendly', text: 'Pet-Friendly' }
    // ]

    // for (let hotelIdx = 0; hotelIdx < hotelList.length; hotelIdx++) {
    //   for (const key in hotelList[hotelIdx]) {
    //     if (!allHotelKey.includes(key)) {
    //       allHotelKey.push(key)
    //     }
    //   }
    // }

    // popularFilterDefault.forEach((p) => {
    //   if (allHotelKey.includes(p.value)) {
    //     popularFilterList.push(p)
    //   }
    // })
    return [];
  },

  hotelFilter: (state: any) => {
    const hotelList = state.data.hotelFilterByMapView;
    const hotelFilter = state.data.hotelFilter;
    const filterModel = state.data.filterModel;

    const filters = {
      priceFilter: (item: any) =>
        item.price >= filterModel.price.minPrice &&
        item.price <= filterModel.price.maxPrice,
      prefectureFilter: (item: any) => {
        return (
          item.city
            ?.toLowerCase()
            .includes(filterModel.prefecture?.toLowerCase()) ||
          item.prefecture
            ?.toLowerCase()
            .includes(filterModel.prefecture?.toLowerCase()) ||
          item.district
            ?.toLowerCase()
            .includes(filterModel.prefecture?.toLowerCase())
        );
      }
    };
    const selected = [filters.priceFilter, filters.prefectureFilter];

    let hotelFilterByPrice = [];
    if (filterModel.isFilter) {
      if (filterModel.prefecture) {
        hotelFilterByPrice = hotelFilter.filter((hotel: any) =>
          selected.every((fn: any) => fn(hotel))
        );
      } else {
        hotelFilterByPrice = hotelList.filter((hotel: any) =>
          selected.every((fn: any) => fn(hotel))
        );
      }
    } else {
      hotelFilterByPrice = hotelList;
    }

    switch (filterModel.sortBy) {
      case "mostPopular":
        hotelFilterByPrice.sort((a: any, b: any) => {
          return b.popularOrder - a.popularOrder;
        });
        break;
      case "highestToLowest":
        hotelFilterByPrice.sort((a: any, b: any) => {
          return b.price - a.price;
        });
        break;
      case "lowestToHighest":
        hotelFilterByPrice.sort((a: any, b: any) => {
          return a.price - b.price;
        });
        break;
      case "distance":
        hotelFilterByPrice.sort((a: any, b: any) => {
          return a.distanceToUser - b.distanceToUser;
        });
        break;

      case "highReview":
        hotelFilterByPrice.sort((a: any, b: any) => {
          return b.numberOfReviews - a.numberOfReviews;
        });
        break;
      default:
        break;
    }

    return hotelFilterByPrice;
  },

  listHotelID: (state: any) => {
    const hotelList = state.data.hotelList;
    const listID: Array<any> = [];
    if (hotelList.length) {
      hotelList.forEach((hotel: any) => {
        if (hotel?.triplaHotelId) {
          const hotelID = Number(hotel?.triplaHotelId);
          listID.push(hotelID);
        }
      });
    }
    return listID;
  },

  maxPrice: (state: any) => {
    const hotelPrice = state.data.hotel_price;
    if (hotelPrice.length) {
      return hotelPrice?.reduce((a: any, b: any) => (a.price > b.price ? a : b))
        ?.price;
    }

    return 0;
  },

  minPrice: (state: any) => {
    const hotelPrice = state.data?.hotel_price;
    if (hotelPrice.length) {
      return (
        hotelPrice?.reduce((a: any, b: any) => (a.price < b.price ? a : b))
          ?.price || 0
      );
    }
    return 0;
  },

  tiers: (state: any) => {
    return state.data.tiers;
  },

  isKidsTierSupport(state: any) {
    const { tiers } = state.data;
    const kidType = tiers?.kids_setting?.kids_type;
    const acceptType = tiers?.kids_setting?.accept_type;
    let isSupport = false;
    if (acceptType === "accept" && kidType.includes("tiers")) {
      isSupport = true;
    } else {
      isSupport = false;
    }

    return isSupport;
  }
};
