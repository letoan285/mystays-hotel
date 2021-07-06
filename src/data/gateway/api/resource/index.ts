import Customer from './customer'
import Common from './common'
import Hotel from './hotel'
import Calendar from './calendar'

// export const getApiController = (storeView = 'jp') => storeView ? `rest/V1` : 'rest/V1';
export const getApiController = (storeView = 'jp') => (storeView ? '' : '')

export const SitecoreResource = {
  Customer,
  Common,
  Hotel,
  Calendar
}
