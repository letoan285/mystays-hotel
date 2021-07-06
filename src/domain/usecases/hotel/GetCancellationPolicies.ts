import { IUseCase } from '../../../shared/interfaces/common/usecase'
import HotelRepository from '../../../data/repository/hotel'
import ValidationResult from '../../../models/validationResult'
import ResponseModel from '../../../models/response'

export default class GetCancellationPolicies implements IUseCase {
    private hotelRepository: HotelRepository;

    constructor (public payload: string) {
      this.hotelRepository = new HotelRepository()
    }

    validate = (): ValidationResult => {
      return new ValidationResult(true)
    };

    execute = (): Promise<ResponseModel<Array<any>>> => {
      // @ts-ignore
      return new Promise((resolve, reject) => {
        this.hotelRepository.getCancellationPolicies(this.payload).then((response) => {
          const data = response
          if (data) {
            resolve(ResponseModel.createSuccess(data))
          } else {
            reject(ResponseModel.createError(500, 'Error'))
          }
        }).catch(reject)
      })
    };
}
