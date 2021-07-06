import { IUseCase } from '../../../../shared/interfaces/common/usecase'
import ResponseModel from '../../../../models/response'
import CustomerRepository from '../../../../data/repository/customer'
import ValidationResult from '../../../../models/validationResult'

export default class LogoutUserUseCase implements IUseCase {
  private customerRepository: CustomerRepository

  constructor (private hotel_id: any) {
    this.customerRepository = new CustomerRepository()
  }

  validate = (): ValidationResult => {
    if (this.hotel_id) {
      return new ValidationResult(true)
    }
    return new ValidationResult(false, 'Hotel is is empty')
  }

  execute = (): Promise<ResponseModel<string>> => {
    return new Promise((resolve, reject) => {
      const validationResult = this.validate()
      if (validationResult.isValid) {
        this.customerRepository
          .logoutUser(this.hotel_id)
          .then((response: any) => {
            const data = response && response.data

            if (data) {
              this.customerRepository
                .removeUser()
                .then(() => {
                  resolve(data)
                })
                .catch(reject)
            } else {
              reject(ResponseModel.createError(500, 'Customer token is null'))
            }
          })
          .catch((error) => {
            this.customerRepository
              .removeUser()
              .then(() => {
                resolve(error)
              })
              .catch(reject)
          })
      }
    })
  }
}
