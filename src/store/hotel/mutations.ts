import { wait } from "../../utils/common";
import { IState } from "../../shared/interfaces/common";
import { HotelHelper } from "./helper";
import { HotelActionTypes } from "./types";

export default {
  [HotelActionTypes.GET_HOTELS](state: IState<any>) {
    state.isHotelLoading = true;
    state.isGetAllHotelLoading = true;
  },

  [HotelActionTypes.GET_HOTELS_SUCCESS](state: IState<any>, action: any) {
    state.isHotelLoading = false;
    state.isGetAllHotelLoading = false;

    let hotelList: Array<any> = [];
    let hotelNearMe: Array<any> = [];
    let prefectures: Array<any> = [];
    let cityList: Array<any> = [];

    const hotelHelper = new HotelHelper(action.payload);

    hotelList = hotelHelper.getHotelList();
    prefectures = hotelHelper.getPrefectures();
    hotelNearMe = hotelHelper.getHotelNearMe();
    cityList = hotelHelper.cityList;

    state.data.cityList = cityList;
    state.data.districtList = prefectures;
    state.data.hotelList = hotelList;
    state.data.hotelFilter = hotelList;
    state.success = true;
    state.data.hotel_nearme = hotelNearMe;
    state.actionType = "LOAD_HOTELS_SUCCESS";
  },

  [HotelActionTypes.GET_HOTELS_FAIL](state: IState<any>, action: any) {
    state.isHotelLoading = false;
    state.isGetAllHotelLoading = false;
    state.success = action.payload;
  },

  [HotelActionTypes.FILTER_HOTELS](state: IState<any>, action: any) {
    state.data.selectedHotel = action.payload;
    state.data.filterModel.prefecture = "";

    let filterCityList: Array<any> = [];
    let filterPrefectureList: Array<any> = [];
    let filterHotelList: Array<any> = [];

    const hotelHelper = new HotelHelper(state.data.cityList);

    const keyword = action.payload?.keyword?.trim() || "";
    filterCityList = hotelHelper.filterCity(keyword);
    filterHotelList = hotelHelper.filterHotel(keyword);
    filterPrefectureList = hotelHelper.filterPrefecture(keyword);

    state.data.citySearch = filterCityList;
    state.data.hotelList = filterHotelList;
    state.data.districtListFilter = filterPrefectureList;

    if (action.payload?.isFilter) {
      const hotelPrice = state.data?.hotel_price;
      const hotelHelper = new HotelHelper([]);

      if (hotelPrice.length) {
        state.data.hotelFilterByMapView = hotelHelper.hotelMappingPrice(
          filterHotelList,
          hotelPrice
        );
        state.data.hotelFilter = hotelHelper.hotelMappingPrice(
          state.data.hotelFilter,
          hotelPrice
        );
      } else {
        state.data.hotelFilterByMapView = state.data.hotelList;
      }

      state.isFilteringHotel = true;
      wait(100).then(() => (state.isRenderHotelList = true));

      if (!action.payload?.isLoading) state.isFilteringHotel = true;
    }

    state.isFetching = true;
  },

  [HotelActionTypes.SELECT_HOTEL](state: IState<any>, action: any) {
    state.data.selectedHotel = action.payload;
    state.isFetching = true;
  },
  [HotelActionTypes.SELECT_ALL_HOTELS](state: IState<any>, action: any) {
    state.data.selectedHotels = action.payload;
    state.isFetching = true;
  },
  [HotelActionTypes.GET_HOTEL_PLANS_SUCCESS](state: IState<any>, action: any) {
    state.data = action.payload;
    state.isFetching = true;
    state.success = true;
  },
  [HotelActionTypes.GET_HOTEL_PLANS_FAIL](state: IState<any>, action: any) {
    state.errorMessage = action.payload;
    state.isFetching = true;
    state.success = false;
  },

  [HotelActionTypes.GET_ROOM_TYPES_SUCCESS](state: IState<any>, action: any) {
    state.data.roomType = action.payload;
    state.isFetching = true;
    state.success = true;
  },
  [HotelActionTypes.GET_ROOM_TYPES_FAIL](state: IState<any>, action: any) {
    state.errorMessage = action.payload;
    state.isFetching = true;
    state.success = false;
  },

  [HotelActionTypes.SAVE_MODEL_FILTER](state: IState<any>, payload: any) {
    state.data.filterModel = payload;
    state.isHotelLoading = true;

    wait(200).then(() => (state.isHotelLoading = false));
  },

  [HotelActionTypes.SAVE_PREFECTURE_VALUE](state: IState<any>, payload: any) {
    state.data.filterModel.prefecture = payload;
  },

  [HotelActionTypes.SAVE_RECENT_SEARCH](state: IState<any>) {
    state.isFetching = true;
    state.success = false;
  },

  [HotelActionTypes.GET_HOTEL_PRICE](state: IState<any>) {
    state.isPriceLoading = true;
  },

  [HotelActionTypes.GET_HOTEL_PRICE_SUCCESS](state: IState<any>, action: any) {
    state.data.hotel_price = action.payload;
    state.isPriceLoading = false;
    const hotelFilterByMapView = [...state.data.hotelFilterByMapView];
    const hotelFilter = [...state.data.hotelFilter];

    const hotelHelper = new HotelHelper([]);

    state.data.hotelFilterByMapView = hotelHelper.hotelMappingPrice(
      hotelFilterByMapView,
      action.payload
    );

    state.data.hotelFilter = hotelHelper.hotelMappingPrice(
      hotelFilter,
      action.payload
    );
  },

  [HotelActionTypes.GET_HOTEL_PRICE_FAIL](state: IState<any>, action: any) {
    state.errorMessage = action.payload;
    state.isPriceLoading = false;
  },

  [HotelActionTypes.SAVE_SORT_BY_VALUE](state: IState<any>, payload: any) {
    state.data.filterModel.sortBy = payload;
    state.isHotelLoading = true;

    wait(300).then(() => (state.isHotelLoading = false));
  },

  [HotelActionTypes.SAVE_SORT_BY_VALUE](state: IState<any>, payload: any) {
    state.data.filterModel.sortBy = payload;
    state.isHotelLoading = true;

    wait(300).then(() => (state.isHotelLoading = false));
  },

  [HotelActionTypes.RESET_FILTER_MODEL](state: IState<any>) {
    state.data.filterModel = {
      sortBy: "highestToLowest",
      tripTypeList: [],
      popularFilterList: [],
      price: 0
    };

    state.isHotelLoading = true;
    wait(300).then(() => (state.isHotelLoading = false));
  },

  [HotelActionTypes.SAVE_FULL_PATH](state: IState<any>, payload: any) {
    state.data.fullPath = payload;
  },

  [HotelActionTypes.SAVE_FULL_PATH_HOTEL_DETAIL](
    state: IState<any>,
    payload: any
  ) {
    state.data.fullPathHotelDetail = payload.fullPath;
    state.data.hotelID = payload.hotelID;
  },

  [HotelActionTypes.GET_TIERS_LIST_SUCCESS](state: IState<any>, action: any) {
    state.data.tiers = action.payload;
    state.data.tiersSettings = action.payload;
  },

  [HotelActionTypes.GET_TIERS_LIST_FAIL](state: IState<any>, action: any) {
    state.data.tiers = action.payload;
    state.data.tiersSettings = action.payload;
  },

  [HotelActionTypes.CLEAR_TIERS_LIST](state: IState<any>) {
    state.data.tiers = {};
  },

  [HotelActionTypes.SAVE_HOTEL_ID](state: IState<any>, hotelID: any) {
    state.data.hotelID = hotelID;
  },

  [HotelActionTypes.SAVE_HOTEL_LIST](state: IState<any>, payload: any) {
    const hotelPrice = state.data.hotel_price;
    const hotelHelper = new HotelHelper([]);

    state.data.hotelFilterByMapView = hotelHelper.hotelMappingPrice(
      payload,
      hotelPrice
    );
  }
};
