import { IUseCase } from '../../../shared/interfaces/common/usecase'
import ResponseModel from '../../../models/response'
import HotelRepository from '../../../data/repository/hotel'

export default class SetInitialBookingUseCase implements IUseCase {
    private hotelRepository: HotelRepository;

    constructor (private payload: any) {
      this.hotelRepository = new HotelRepository()
    }

    execute = (): Promise<ResponseModel<string>> => {
      return new Promise((resolve, reject) => {
        this.hotelRepository.setInitialBooking(this.payload).then((res) => {
          resolve(res)
        }).catch(reject)
      })
    };
}
