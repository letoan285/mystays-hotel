import { HotelActionTypes } from "./types";

import HotelUseCase from "../../domain/usecases/hotel";
import CustomerUserCase from "../../domain/usecases/customer";
import GetAllHotelsUseCase from "../../domain/usecases/hotel/GetAllHotelsUseCase";

export default {
  getHotelList({ commit }: any, payload?: any) {
    commit(HotelActionTypes.GET_HOTELS);
    const getAllHotelsUseCase = new GetAllHotelsUseCase(payload);

    getAllHotelsUseCase.execute()
      .then((resp: any) => {
        commit(HotelActionTypes.GET_HOTELS_SUCCESS, {
          payload: resp.data
        });
      })
      .catch(error => {
        commit(HotelActionTypes.GET_HOTELS_FAIL, {
          error
        });
      });
  },

  filterHotelList({ commit }: any, payload?: any) {
    commit(HotelActionTypes.FILTER_HOTELS, { payload: payload.searchParam });
  },

  selectHotel({ commit }: any, hotel: any) {
    commit(HotelActionTypes.SELECT_HOTEL, {
      payload: hotel
    });
  },

  selectAllHotels({ commit }: any, hotels: any) {
    commit(HotelActionTypes.SELECT_ALL_HOTELS, {
      payload: hotels
    });
  },

  getHotelPlans({ commit }: any, payload: any) {
    const hotelPlansUseCase = new CustomerUserCase.HotelPlansUseCase(payload);
    hotelPlansUseCase
      .execute()
      .then((resp: any) => {
        commit(HotelActionTypes.GET_HOTEL_PLANS_SUCCESS, { payload: resp });
      })
      .catch(error => {
        commit(HotelActionTypes.GET_HOTEL_PLANS_FAIL, { error });
      });
  },
  getRoomTypes({ commit }: any, payload: string) {
    const roomTypesUseCase = new CustomerUserCase.RoomTypesUseCase(payload);
    roomTypesUseCase
      .execute()
      .then((resp: any) => {
        commit(HotelActionTypes.GET_ROOM_TYPES_SUCCESS, { payload: resp });
      })
      .catch(error => {
        commit(HotelActionTypes.GET_ROOM_TYPES_FAIL, { error });
      });
  },
  getTiersList({ commit }: any, payload: string) {
    const tiersUseCase = new CustomerUserCase.TiersUseCase(payload);
    tiersUseCase
      .execute()
      .then((resp: any) => {
        commit(HotelActionTypes.GET_TIERS_LIST_SUCCESS, { payload: resp });
      })
      .catch(error => {
        commit(HotelActionTypes.GET_TIERS_LIST_FAIL, { error });
      });
  },
  saveRecentSearch({ commit }: any, payload: any) {
    const recentSearchUseCase = new CustomerUserCase.RecentSearchUseCase(
      payload
    );
    recentSearchUseCase.execute().then((resp: any) => {
      commit(HotelActionTypes.SAVE_RECENT_SEARCH, { payload: resp });
    });
  },

  saveModelFilter({ commit }: any, payload: any) {
    commit(HotelActionTypes.SAVE_MODEL_FILTER, payload);
  },

  getHotelPrice({ commit }: any, payload: any) {
    commit(HotelActionTypes.GET_HOTEL_PRICE);
    const GetHotelPriceUseCase = new HotelUseCase.GetHotelPriceUseCase({
      rooms: payload.roomMapper,
      fullLang: payload.lang,
      ...payload
    });

    GetHotelPriceUseCase.execute()
      .then((resp: any) => {
        const data = resp.data.data.map((item: any, itemIdx: number) => {
          return {
            id: itemIdx,
            price: item.lowest_price,
            hotelID: `${item.id}`
          };
        });

        commit(HotelActionTypes.GET_HOTEL_PRICE_SUCCESS, { payload: data });
      })
      .catch(error => {
        commit(HotelActionTypes.GET_HOTEL_PRICE_FAIL, { payload: error });
      });
  },

  saveSortByValue({ commit }: any, payload: any) {
    commit(HotelActionTypes.SAVE_SORT_BY_VALUE, payload);
  },

  savePrefectureValue({ commit }: any, payload: any) {
    commit(HotelActionTypes.SAVE_PREFECTURE_VALUE, payload);
  },

  resetFilterModel({ commit }: any) {
    commit(HotelActionTypes.RESET_FILTER_MODEL);
  },

  saveFullPath({ commit }: any, payload: any) {
    commit(HotelActionTypes.SAVE_FULL_PATH, payload);
  },

  saveFullPathHotelDetail({ commit }: any, payload: any) {
    commit(HotelActionTypes.SAVE_FULL_PATH_HOTEL_DETAIL, payload);
  },

  clearTiersList({ commit }: any) {
    commit(HotelActionTypes.CLEAR_TIERS_LIST);
  },

  saveHotelID({ commit }: any, payload: any) {
    commit(HotelActionTypes.SAVE_HOTEL_ID, payload);
  },

  saveHotelList({ commit }: any, payload: any) {
    commit(HotelActionTypes.SAVE_HOTEL_LIST, payload);
  },

  saveRatingCount({ commit }: any, payload: any) {
    commit(HotelActionTypes.SAVE_RATING_COUNT, payload);
  }
};
