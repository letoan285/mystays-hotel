import moment from 'moment'
import Type from '../../type'
import { getApiController } from '../index'

const getCalendar = (payload?: any, storeView?: string): any => {
  const {
    year,
    month,
    adults,
    children,
    nights,
    hotelID
  } = payload
  const result = []

  if (payload.isCalled) {
    result.push(
      {
        Type: Type.MemberShip,
        Path: `${getApiController(
          storeView
        )}/hotels/${hotelID}/rooms/inventory?checkin_date=${moment(new Date(year, month, 1)).format('YYYY-MM-DD').toString()}&checkout_date=${moment(new Date(year, month + 1, 0)).format('YYYY-MM-DD').toString()}&adults=${adults}&children=${children}&nights=${nights}`
      }
    )
  } else {
    for (let item = 0; item < 2; item++) {
      if (month < 12) {
        result.push(
          {
            Type: Type.MemberShip,
            Path: `${getApiController(
              storeView
            )}/hotels/${hotelID}/rooms/inventory?checkin_date=${moment(new Date(year, month + item, 1)).format('YYYY-MM-DD').toString()}&checkout_date=${moment(new Date(year, month + item + 1, 0)).format('YYYY-MM-DD').toString()}&adults=${adults}&children=${children}&nights=${nights}`
          }
        )
      } else {
        result.push(
          {
            Type: Type.MemberShip,
            Path: `${getApiController(
              storeView
            )}/hotels/${hotelID}/rooms/inventory?checkin_date=${new Date(year + 1, month + item, 1)}&checkout_date=${new Date(year, month + item + 1, 0)}&adults=${adults}&children=${children}&nights=${nights}`
          }
        )
      }
    }
  }


  return result
}

export default {
  getCalendar
}
