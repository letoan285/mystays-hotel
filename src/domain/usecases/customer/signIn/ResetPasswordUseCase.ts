import { IUseCase } from '../../../../shared/interfaces/common/usecase'
import ResponseModel from '../../../../models/response'
import CustomerRepository from '../../../../data/repository/customer'
import { STATIC_HOTEL_ID } from '../../../../shared/constants'

export default class ResetPasswordUserUseCase implements IUseCase {
  private customerRepository: CustomerRepository

  constructor (private email: string) {
    this.customerRepository = new CustomerRepository()
  }

  execute = (): Promise<ResponseModel<string>> => {
    return new Promise((resolve, reject) => {
      this.customerRepository
        .resetPassword(this.email, STATIC_HOTEL_ID)
        .then((res) => {
          resolve(res)
        })
        .catch(reject)
    })
  }
}
