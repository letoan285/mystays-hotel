import { IUseCase } from '../../../../shared/interfaces/common/usecase'
import ResponseModel from '../../../../models/response'
import HotelRepository from '../../../../data/repository/hotel'

export default class SetLocationUseCase implements IUseCase {
  private hotelRepository: HotelRepository

  constructor (private location: any) {
    this.hotelRepository = new HotelRepository()
  }

  execute = (): Promise<ResponseModel<string>> => {
    return new Promise((resolve, reject) => {
      this.hotelRepository
        .setLocation(this.location)
        .then((res) => {
          resolve(res)
        })
        .catch(reject)
    })
  }
}
