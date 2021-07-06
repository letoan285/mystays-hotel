import { IUseCase } from '../../../../shared/interfaces/common/usecase'
import ResponseModel from '../../../../models/response'
import CustomerRepository from '../../../../data/repository/customer'

export default class SetSessionUseCase implements IUseCase {
  private customerRepository: CustomerRepository

  constructor () {
    this.customerRepository = new CustomerRepository()
  }

  execute = (): Promise<ResponseModel<string>> => {
    return new Promise((resolve, reject) => {
      const KEY = process.env.NEW_CLIENT_KEY || ''
      const SECRETE = process.env.NEW_CLIENT_SECRETE || ''
      // this.customerRepository
      //   .getSession(KEY, SECRETE)
      //   .then((response: any) => {
      //     const token =
      //       response && response.data && response.data.data.client_session
      //         ? response.data.data.client_session
      //         : ''

      //     if (token) {
      //       this.customerRepository
      //         .setSession(token)
      //         .then(() => {
      //           resolve(response)
      //         })
      //         .catch(reject)
      //     } else {
      //       reject(ResponseModel.createError(500, 'Customer token is null'))
      //     }
      //   })
      //   .catch(reject)
    })
  }

  setAccessToken = (token: string): Promise<ResponseModel<string>> => {
    return new Promise((resolve, reject) => {
      this.customerRepository.setAccessToken(token)
        .then((response: any) => resolve(response))
        .catch(reject)
    })
  }
}
