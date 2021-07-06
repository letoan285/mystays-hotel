// eslint-disable-next-line import/named
import { Moment } from 'moment'
import { DateTimeFormat } from '../constants'

export default class TimeUtils {
    public static formatCustomOptionDateTime = (date: Moment) => {
      return date.format(DateTimeFormat.FullDateTime)
    };

    public static formatCustomOptionDate = (date: Moment) => {
      return date.format(DateTimeFormat.FullDate)
    };

    public static formatCustomOptionTime = (date: Moment) => {
      return date.format(DateTimeFormat.Time)
    };
}
