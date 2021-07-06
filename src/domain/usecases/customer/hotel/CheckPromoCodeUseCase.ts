import { IUseCase } from '../../../../shared/interfaces/common/usecase'
import HotelRepository from '../../../../data/repository/hotel'
import ValidationResult from '../../../../models/validationResult'
import ResponseModel from '../../../../models/response'

export default class CheckPromoCodeUseCase implements IUseCase {
  private hotelRepository: HotelRepository

  constructor (public promoCode: string) {
    this.hotelRepository = new HotelRepository()
  }

  validate = (): ValidationResult => {
    return new ValidationResult(true)
  }

  execute = (): Promise<ResponseModel<Array<any>>> => {
    // @ts-ignore
    return new Promise((resolve, reject) => {
      this.hotelRepository
        .checkPromoCode(this.promoCode)
        .then((response) => {
          if (response) {
            resolve(response)
          } else {
            reject(ResponseModel.createError(500, 'Error'))
          }
        })
        .catch(reject)
    })
  }
}
