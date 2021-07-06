import { IUseCase } from '../../../shared/interfaces/common/usecase'
import ResponseModel from '../../../models/response'
import HotelRepository from '../../../data/repository/hotel'

export default class GetInitialBookingUseCase implements IUseCase {
    private hotelRepository: HotelRepository;

    constructor () {
      this.hotelRepository = new HotelRepository()
    }

    execute = (): Promise<ResponseModel<string>> => {
      return new Promise((resolve, reject) => {
        this.hotelRepository.getInitialBooking().then((res: any) => {
          const data = JSON.parse(res.data)
          if (data) {
            resolve(data)
          }
        }).catch(reject)
      })
    };
}
