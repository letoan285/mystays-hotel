/* eslint-disable import/no-duplicates */
import CheckPromoCodeUseCase from '../../domain/usecases/customer/hotel/CheckPromoCodeUseCase'
import SetInitialBookingUseCase from '../../domain/usecases/hotel/SetInitialBookingUseCase'
import GetInitialBookingUseCase from '../../domain/usecases/hotel/GetInitialBookingUseCase'
import HotelUseCase from '../../domain/usecases/hotel'
import getGtmData, { getPaymentGtmPayload, getCancelBookingGtmPayload } from '../../plugins/gtm'
import * as types from './types'
import { BookingActionTypes } from './types'

export default {
  showLocation ({ commit }: any) {
    commit(BookingActionTypes.SHOW_LOCATION)
  },
  showChecking ({ commit }: any) {
    commit(BookingActionTypes.SHOW_CHECKING)
  },
  showRoomSelect ({ commit }: any) {
    commit(BookingActionTypes.SHOW_ROOM_SELECT)
  },
  showPromoCode ({ commit }: any) {
    commit(BookingActionTypes.SHOW_PROMO_CODE)
  },
  showTotalGuest ({ commit }: any) {
    commit(BookingActionTypes.SHOW_TOTAL_GUEST)
  },
  closeAll ({ commit }: any) {
    commit(BookingActionTypes.CLOSE_ALL)
  },
  getLocation ({ commit }: any, payload: any) {
    commit(BookingActionTypes.GET_LOCATION, { payload })
  },
  getBookingId ({ commit }: any, payload: any) {
    commit(BookingActionTypes.GET_BOOKING_ID, { payload })
  },
  getCheckin ({ commit }: any, payload: any) {
    commit(BookingActionTypes.GET_CHECKIN, { payload })
  },
  getCheckout ({ commit }: any, payload: any) {
    commit(BookingActionTypes.GET_CHECKOUT, { payload })
  },
  getPromoCode ({ commit }: any, payload: any) {
    commit(BookingActionTypes.GET_PROMO_CODE, { payload })
  },

  getDataFromUrl ({ commit }: any, payload: any) {
    commit(BookingActionTypes.GET_DATA_FROM_URL, payload)
  },

  setSearchKeyword ({ commit }: any, keyword: any) {
    commit(BookingActionTypes.SET_SEARCH_KEYWORD, keyword)
  },
  getError ({ commit }: any, payload: any) {
    commit(BookingActionTypes.GET_ERROR, { payload })
  },

  checkPromoCodeExistance ({ commit }: any, payload: string) {
    const usecase = new CheckPromoCodeUseCase(payload)
    usecase.execute().then((res) => {
      commit(BookingActionTypes.CHECK_PROMO_CODE_SUCCESS, { payload: res })
    }).catch((error) => {
      commit(BookingActionTypes.CHECK_PROMO_CODE_FAIL, { error })
    })
  },

  setInitialBooking ({ commit }: any, payload: any) {
    const useCase = new SetInitialBookingUseCase(payload)
    useCase.execute().then((_res: any) => {
      commit(BookingActionTypes.SET_INITIAL_BOOKING, {
        payload
      })
    })
  },

  getInitialBooking ({ commit }: any) {
    const useCase = new GetInitialBookingUseCase()
    useCase.execute().then((res: any) => {
      commit(BookingActionTypes.GET_INITIAL_BOOKING, {
        payload: res
      })
    })
  },
  // RoomSelect
  a_saveRoomList ({ commit }: any, payload: types.IRoomModel[]) {
    commit(BookingActionTypes.SAVE_ROOM_LIST, payload)
  },

  a_addRoom ({ commit }: any) {
    commit(BookingActionTypes.ADD_ROOM)
  },

  a_deleteRoom ({ commit }: any, roomID: number) {
    commit(BookingActionTypes.DELETE_ROOM, roomID)
  },

  a_onChildChange ({ commit }: any, payload: types.IChangeChild) {
    commit(BookingActionTypes.ON_CHANGE_CHILD, payload)
  },

  a_onPersonChange ({ commit }: any, payload: types.IPersonChange) {
    commit(BookingActionTypes.ON_CHANGE_PERSON, payload)
  },

  a_onChildChangeAge ({ commit }: any, payload: types.IChangeChildAge) {
    commit(BookingActionTypes.ON_CHANGE_CHILD_AGE, payload)
  },

  a_onChangeBedSelect ({ commit }: any, payload: any) {
    commit(BookingActionTypes.ON_CHANGE_BED_SELECT, payload)
  },

  searchType ({ commit }: any, payload: any) {
    commit(BookingActionTypes.SET_SEARCH_TYPE, payload)
  },

  saveHotelID ({ commit }: any, payload: any) {
    commit(BookingActionTypes.SAVE_HOTEL_ID, payload)
  },

  saveRoomIndex ({ commit }: any, payload: any) {
    commit(BookingActionTypes.SAVE_ROOM_INDEX, payload)
  },

  createReservations ({ commit, _dispatch }: any, payload: any) {
    commit(BookingActionTypes.CREATE_RESERVATIONS)
    const usecase = new HotelUseCase.CreateReservationsUseCase(payload)

    usecase.execute().then((res: any) => {
      getGtmData(getPaymentGtmPayload(payload))
      commit(BookingActionTypes.CREATE_RESERVATIONS_SUCCESS, { payload: res })
    }).catch((error) => {
      commit(BookingActionTypes.CREATE_RESERVATIONS_FAIL, { error })
    })
  },

  getReservations ({ commit }: any, payload: any) {
    commit(BookingActionTypes.GET_RESERVATIONS)
    const usecase = new HotelUseCase.GetReservationsUseCase(payload)
    usecase.execute().then((res: any) => {
      commit(BookingActionTypes.GET_RESERVATIONS_SUCCESS, { payload: res })
    }).catch((error: any) => {
      commit(BookingActionTypes.GET_RESERVATIONS_FAIL, { error })
    })
  },

  cancelReservations ({ commit }: any, payload: any) {
    commit(BookingActionTypes.CANCEL_RESERVATIONS)
    const usecase = new HotelUseCase.CancelReservationsUseCase(payload)
    usecase.execute().then((res) => {
      const gtmData = { ...res, ...payload }
      getGtmData(getCancelBookingGtmPayload(gtmData))
      commit(BookingActionTypes.CANCEL_RESERVATIONS_SUCCESS, { payload: res })
    }).catch((error) => {
      commit(BookingActionTypes.CANCEL_RESERVATIONS_FAIL, { error })
    })
  },

  updateReservations ({ commit }: any, payload: any) {
    commit(BookingActionTypes.UPDATE_RESERVATIONS)
    const usecase = new HotelUseCase.UpdateReservationsUseCase(payload)
    usecase.execute().then((res) => {
      commit(BookingActionTypes.UPDATE_RESERVATIONS_SUCCESS, { payload: res })
    }).catch((error) => {
      commit(BookingActionTypes.UPDATE_RESERVATIONS_FAIL, { error })
    })
  },

  updateGuestDetail ({ commit }: any, payload: any) {
    commit(BookingActionTypes.UPDATE_GUEST_DETAIL)
    const usecase = new HotelUseCase.UpdateGuestDetailUseCase(payload)
    usecase.execute().then((res: any) => {
      commit(BookingActionTypes.UPDATE_GUEST_DETAIL_SUCCESS, { payload: res })
    }).catch((error: any) => {
      commit(BookingActionTypes.UPDATE_GUEST_DETAIL_FAIL, { error })
    })
  },

  getSettingReservations ({ commit }: any, payload: any) {
    const usecase = new HotelUseCase.GetSettingReservationUseCase(payload)
    usecase.execute().then((res: any) => {
      commit(BookingActionTypes.GET_SETTING_RESERVATIONS_SUCCESS, { payload: res })
    }).catch((error: any) => {
      commit(BookingActionTypes.GET_SETTING_RESERVATIONS_FAIL, { error })
    })
  },

  saveUrlParamsReservations ({ commit }: any, payload: any) {
    commit(BookingActionTypes.SAVE_URL_PARAMS_RESERVATIONS, payload)
  },

  setBookingFromAPI ({ commit }: any, payload: any) {
    commit(BookingActionTypes.SET_BOOKING_FROM_API, payload)
  },

  setCalendar ({ commit }: any, payload: any) {
    commit(BookingActionTypes.SET_CALENDAR, payload)
  },

  updateBookingGTM ({ commit }: any, payload: any) {
    commit(BookingActionTypes.UPDATE_BOOKING_GTM, payload)
  },

  saveRoomParamsForGetRoomSelected ({ commit }: any) {
    commit(BookingActionTypes.SAVE_ROOM_PARAMS_FOR_GET_ROOM_SELECTED)
  },

  delRoomParamsForGetRoomSelected ({ commit }: any, roomIdx: number) {
    commit(BookingActionTypes.DEL_ROOM_PARAMS_FOR_GET_ROOM_SELECTED, roomIdx)
  }
}
