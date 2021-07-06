import ResponseModel from '../../../../models/response'
import CustomerRepository from '../../../../data/repository/customer'
import { IUseCase } from '../../../../shared/interfaces/common/usecase'

export default class GetAccessTokenUseCase implements IUseCase {
  private customerRepository: CustomerRepository

  constructor () {
    this.customerRepository = new CustomerRepository()
  }

  execute = (): Promise<ResponseModel<string>> => {
    return new Promise((resolve, reject) => {
      this.customerRepository
        .getAccessToken()
        .then((response: any) => {
          this.customerRepository
            .setAccessToken(response.data)
            .then(() => resolve(response.data))
        })
        .catch(reject)
    })
  }
}
