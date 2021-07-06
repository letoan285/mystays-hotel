import ResponseModel from '../../../../models/response'
import CustomerRepository from '../../../../data/repository/customer'
import { IUseCase } from '../../../../shared/interfaces/common/usecase'

export default class GetClientTokenUseCase implements IUseCase {
  private customerRepository: CustomerRepository

  constructor () {
    this.customerRepository = new CustomerRepository()
  }

  execute = (): Promise<ResponseModel<string>> => {
    return new Promise((resolve, reject) => {
      this.customerRepository
        .getClientSessionToken()
        .then((response: any) => {
          this.customerRepository
            .setClientSessionToken(response.data)
            .then(() => resolve(response.data))
        })
        .catch(reject)
    })
  }
}
