import { IUseCase } from '../../../../shared/interfaces/common/usecase'
import ResponseModel from '../../../../models/response'
import HotelRepository from '../../../../data/repository/hotel'

export default class GetLocationUseCase implements IUseCase {
  private hotelRepository: HotelRepository

  constructor () {
    this.hotelRepository = new HotelRepository()
  }

  execute = (): Promise<ResponseModel<string>> => {
    return new Promise((resolve, reject) => {
      this.hotelRepository
        .getLocation()
        .then((res) => {
          resolve(res)
        })
        .catch(reject)
    })
  }
}
