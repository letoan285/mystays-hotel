import CalendarCloud from './cloud'

export default class CalendarRepository {
  getCalendar = (data?: any) => {
    return CalendarCloud.getCalendar(data)
  }
}
