import GetAllHotelsUseCase from '../../domain/usecases/hotel/GetAllHotelsUseCase'
import * as types from './types'

export default {
  getHotelList ({ commit }: any, payload?: any) {
    const getAllHotelsUseCase = new GetAllHotelsUseCase(payload)
    getAllHotelsUseCase.execute().then((resp: any) => {
      commit(types.FooterActionTypes.GET_HOTELS_SUCCESS, {
        payload: resp.data
      })
    })
      .catch((error) => {
        commit(types.FooterActionTypes.GET_HOTELS_FAIL, {
          error
        })
      })
  }

}
