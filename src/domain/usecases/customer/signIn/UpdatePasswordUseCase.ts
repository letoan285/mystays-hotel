import { IUseCase } from '../../../../shared/interfaces/common/usecase'
import ResponseModel from '../../../../models/response'
import CustomerRepository from '../../../../data/repository/customer'
import { STATIC_HOTEL_ID } from '../../../../shared/constants'

export default class UpdatePasswordUserUseCase implements IUseCase {
  private customerRepository: CustomerRepository

  constructor (private data: any) {
    this.customerRepository = new CustomerRepository()
  }

  execute = (): Promise<ResponseModel<string>> => {
    return new Promise((resolve, reject) => {
      this.customerRepository
        .updatePassword(this.data, STATIC_HOTEL_ID)
        .then((res: any) => {
          if (res.data || res.data === {}) {
            resolve(res.data)
          } else {
            reject(res.message)
          }
        })
    })
  }
}
