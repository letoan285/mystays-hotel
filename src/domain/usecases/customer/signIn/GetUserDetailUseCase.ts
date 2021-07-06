import { IUseCase } from '../../../../shared/interfaces/common/usecase'
import ResponseModel from '../../../../models/response'
import CustomerRepository from '../../../../data/repository/customer'

export default class GetUserDetailUseCase implements IUseCase {
  private customerRepository: CustomerRepository

  constructor () {
    this.customerRepository = new CustomerRepository()
  }

  execute = (): Promise<ResponseModel<string>> => {
    return new Promise((resolve, reject) => {
      this.customerRepository
        .getUserDetail()
        .then((res: any) => {
          resolve(res)
        })
        .catch(reject)
    })
  }
}
