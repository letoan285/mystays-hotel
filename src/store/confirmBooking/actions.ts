import HotelUsecase from '../../domain/usecases/hotel'
import * as types from './types'

export default {
  getReservationQuestion ({ commit }: any, payload?: any) {
    commit(types.ConfirmBookingTypes.GET_RESERVATION_QUESTION)
    const getAllHotelsUseCase = new HotelUsecase.GetReservationAdditionalQuestionUseCase(payload)
    getAllHotelsUseCase.execute().then((resp: any) => {
      commit(types.ConfirmBookingTypes.GET_RESERVATION_QUESTION_SUCCESS, {
        payload: resp.data
      })
    })
      .catch((error) => {
        commit(types.ConfirmBookingTypes.GET_RESERVATION_QUESTION_FAIL, {
          error
        })
      })
  },

  updateBatch ({ commit }: any, payload?: any) {
    commit(types.ConfirmBookingTypes.UPDATE_BATCH)
    const getAllHotelsUseCase = new HotelUsecase.UpdateBatchUseCase(payload)
    getAllHotelsUseCase.execute().then((resp: any) => {
      commit(types.ConfirmBookingTypes.UPDATE_BATCH_SUCCESS, {
        payload: resp.data
      })
    })
      .catch((error) => {
        commit(types.ConfirmBookingTypes.UPDATE_BATCH_FAIL, {
          error
        })
      })
  }

}
