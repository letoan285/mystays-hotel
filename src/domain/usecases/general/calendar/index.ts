import { IUseCase } from '../../../../shared/interfaces/common/usecase'
import ResponseModel from '../../../../models/response'
import CalendarRepository from '../../../../data/repository/calendar'

export default class GetCalendarUseCase implements IUseCase {
  private calendarRepository: CalendarRepository
  private data: any

  constructor (_data: any) {
    this.calendarRepository = new CalendarRepository()
    this.data = _data
  }

  execute = (): Promise<ResponseModel<string>> => {
    return new Promise((resolve, reject) => {
      this.calendarRepository
        .getCalendar(this.data)
        .then((res) => {
          resolve(res)
        })
        .catch(reject)
    })
  }
}
