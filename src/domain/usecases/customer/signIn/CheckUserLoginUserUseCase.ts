import { IUseCase } from '../../../../shared/interfaces/common/usecase'
import ResponseModel from '../../../../models/response'
import CustomerRepository from '../../../../data/repository/customer'

export default class CheckUserLoginUserUseCase implements IUseCase {
  private customerRepository: CustomerRepository

  constructor () {
    this.customerRepository = new CustomerRepository()
  }

  execute = (): Promise<ResponseModel<string>> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
      this.customerRepository
        .getCustomerToken()
        .then(() => {
          // resolve(data);
        })
        .catch(reject)
    })
  }
}
