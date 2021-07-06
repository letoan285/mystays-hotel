import { IUseCase } from '../../../../shared/interfaces/common/usecase'
import ResponseModel from '../../../../models/response'
import CustomerRepository from '../../../../data/repository/customer'
import ValidationResult from '../../../../models/validationResult'
import { UserSignup } from '../../../../data/models/customer/auth'

export default class SignupUserUseCase implements IUseCase {
  private customerRepository: CustomerRepository
  private data: UserSignup

  constructor (data: UserSignup) {
    this.customerRepository = new CustomerRepository()
    this.data = data
  }

  validate = (): ValidationResult => {
    if (!this.data.email || !this.data.password) {
      return new ValidationResult(false, 'email or Password is empty')
    }
    if (this.data.password !== this.data.password_confirm) {
      return new ValidationResult(false, 'Password not Matched')
    }
    return new ValidationResult(true)
  }

  execute = (): Promise<ResponseModel<string>> => {
    return new Promise((resolve, reject) => {
      const validationResult = this.validate()
      if (validationResult.isValid) {
        this.customerRepository
          .signupUser(this.data)
          .then((response: any) => {
            const results = response && response.data
            if (results) {
              resolve(response)
            } else {
              reject(ResponseModel.createError(500, 'Customer token is null'))
            }
          })
          .catch(reject)
      }
    })
  }
}
