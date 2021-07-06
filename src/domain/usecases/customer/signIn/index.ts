import { IUseCase } from '../../../../shared/interfaces/common/usecase'
import ResponseModel from '../../../../models/response'
import CustomerRepository from '../../../../data/repository/customer'
import ValidationResult from '../../../../models/validationResult'

export default class LoginUserUseCase implements IUseCase {
  private customerRepository: CustomerRepository

  constructor (private params: any) {
    this.customerRepository = new CustomerRepository()
  }

  validate = (): ValidationResult => {
    if (this.params.email && this.params.password) {
      return new ValidationResult(true)
    }
    return new ValidationResult(false, 'email or Password is empty')
  }

  execute = (): Promise<ResponseModel<string>> => {
    return new Promise((resolve, reject) => {
      const validationResult = this.validate()

      if (validationResult.isValid) {
        this.customerRepository
          .loginUser(this.params.email, this.params.password, this.params)
          .then((response: any) => {
            const data = response && response.data

            if (data) {
              this.customerRepository
                .saveUserInformation(data.data)
                .then(() => {
                  resolve(data)
                })
                .catch(reject)
            } else {
              reject(ResponseModel.createError(500, 'Customer token is null'))
            }
          })
          .catch(reject)
      }
    })
  }
}
