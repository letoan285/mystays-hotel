import { IUseCase } from "../../../../shared/interfaces/common/usecase";
import ResponseModel from "../../../../models/response";
import CustomerRepository from "../../../../data/repository/customer";

export default class CancelMembershipUseCase implements IUseCase {
  private customerRepository: CustomerRepository;

  constructor(private data: any) {
    this.customerRepository = new CustomerRepository();
  }

  execute = (): Promise<ResponseModel<string>> => {
    return new Promise((resolve, reject) => {
      this.customerRepository
        .cancelMembership(this.data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
}
