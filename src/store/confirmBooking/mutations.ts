import * as types from './types'
export default {
  [types.ConfirmBookingTypes.GET_RESERVATION_QUESTION] (state: any) {
    state.isReservationQuestionLoading = true
  },

  [types.ConfirmBookingTypes.GET_RESERVATION_QUESTION_SUCCESS] (state: any, action: any) {
    state.reservationQuestion = action.payload.data
    state.isReservationQuestionLoading = false
  },

  [types.ConfirmBookingTypes.GET_RESERVATION_QUESTION_FAIL] (state: any) {
    state.isReservationQuestionLoading = false
  },

  [types.ConfirmBookingTypes.UPDATE_BATCH] (state: any) {
    state.isUpdateBatchLoading = true
  },

  [types.ConfirmBookingTypes.UPDATE_BATCH_SUCCESS] (state: any, action: any) {
    state.reservationQuestion = action.payload.data
    state.isUpdateBatchLoading = false
  },

  [types.ConfirmBookingTypes.GET_RESERVATION_QUESTION_FAIL] (state: any) {
    state.isUpdateBatchLoading = false
  }
}
