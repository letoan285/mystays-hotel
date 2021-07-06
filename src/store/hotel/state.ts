import { IState } from "../../shared/interfaces/common";

interface IHotelState {
  hotelList: Array<any>;
  hotelListFilter: Array<any>;
  hotelFilterByMapView: Array<any>;
  cityList: Array<any>;
  districtList: Array<any>;
  districtListFilter: Array<any>;
  isNearMe: boolean;
  hotelFilter: Array<any>;
  citySearch: Array<any>;
  bookingInformation: {
    area: {};
    checkIn: {};
    checkOut: {};
    guest: {};
    promotionCode: {};
  };
  areaModal: {
    isOpen: boolean;
  };
  checkin: {
    isOpen: boolean;
  };
  hotel_plans: {};
  recentSearch: Array<any>;
  filterModel: {
    sortBy: string;
    tripTypeList: Array<any>;
    popularFilterList: Array<any>;
    price: number;
    prefecture: string;
    ratingCount: Array<any>;
    isFilter: boolean;
  };
  hotel_price: Array<any>;
  hotel_nearme: Array<any>;
  roomType: Array<any>;
  fullPath: String;
  fullPathHotelDetail: String;
  hotelID: string;
  tiers: Object;
  tiersSettings: Object;
}

export default (): IState<IHotelState> => ({
  isFetching: false,
  status: "",
  data: {
    hotelList: [],
    hotelListFilter: [],
    hotelFilterByMapView: [],
    cityList: [],
    districtList: [],
    districtListFilter: [],
    isNearMe: false,
    hotelFilter: [],
    citySearch: [],
    bookingInformation: {
      area: {},
      checkIn: {},
      checkOut: {},
      guest: {},
      promotionCode: {}
    },
    areaModal: {
      isOpen: false
    },
    checkin: {
      isOpen: false
    },
    hotel_plans: {},
    recentSearch: [],
    filterModel: {
      sortBy: "highestToLowest",
      tripTypeList: [],
      popularFilterList: [],
      price: 0,
      prefecture: "",
      ratingCount: [],
      isFilter: false
    },
    hotel_price: [],
    hotel_nearme: [],
    roomType: [],
    fullPath: "",
    fullPathHotelDetail: "",
    hotelID: "",
    tiers: {},
    tiersSettings: {}
  },
  params: "",
  errorMessage: "",
  actionType: "",
  success: false,
  canLoadMore: false,
  isHotelLoading: false,
  isGetAllHotelLoading: false,
  isFilteringHotel: false,
  isPriceLoading: false,
  isRenderHotelList: false
});
