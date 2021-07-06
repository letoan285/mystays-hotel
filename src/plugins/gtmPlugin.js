import { $gtm } from './gtm'

export default function createGtmPlugin () {
  $gtm.init()
  return (store) => {
    store.subscribe((mutation) => {
      switch (mutation.type) {
        case 'guestDetail/SAVE_GTM_DATA': {
          const payload = mutation.payload
          $gtm.push(payload)
          break
        }
        case 'booking/[Booking] UPDATE_BOOKING_GTM': {
          const payload = mutation.payload
          $gtm.push(payload)
          break
        }
        case 'guestDetail/SAVE_ADDITIONAL_DATA': {
          const payload = mutation.payload
          $gtm.push(payload)
          break
        }
        case 'general/[General] SAVE_GTM_DATA': {
          const payload = mutation.payload
          $gtm.push(payload)
          break
        }
        default:
          break
      }
    })
  }
}
