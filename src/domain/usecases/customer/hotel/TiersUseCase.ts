import { IUseCase } from '../../../../shared/interfaces/common/usecase'
import ResponseModel from '../../../../models/response'
import HotelRepository from '../../../../data/repository/hotel'
import ValidationResult from '../../../../models/validationResult'

export default class TiersUseCase implements IUseCase {
  private hotelRepository: HotelRepository

  constructor (private hotel_id: any) {
    this.hotelRepository = new HotelRepository()
  }

  validate = (): ValidationResult => {
    if (this.hotel_id) {
      return new ValidationResult(true)
    }
    return new ValidationResult(false, 'Hotel ID is empty')
  }

  execute = (): Promise<ResponseModel<string>> => {
    return new Promise((resolve, reject) => {
      const validationResult = this.validate()
      if (validationResult.isValid) {
        this.hotelRepository
          .getTiers(this.hotel_id)
          .then((response: any) => {
            const data = response && response.data
            if (data) {
              resolve(data)
            } else {
              reject(ResponseModel.createError(500, 'Customer token is null'))
            }
          })
          .catch(reject)
      }
    })
  }
}
