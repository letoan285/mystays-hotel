import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
const ls = new SecureLS({
  isCompression: false
})

export default ({ store }) => {
  const expiredStorage = localStorage.getItem('_expired')
  const currentTime = new Date().getTime()

  const currentVersion = localStorage.getItem('_version')
  const version = '1.0.1' // change version to clear local storeage

  if (currentVersion && currentVersion !== version) {
    localStorage.clear()
    localStorage.setItem('_version', version)
  } else {
    localStorage.setItem('_version', version)
  }

  if (expiredStorage && expiredStorage < currentTime) {
    localStorage.clear()
  } else {
    const weekTime = 60 * 60 * 24 * 7 * 1000 // 7 days
    localStorage.setItem('_expired', currentTime + weekTime)
  }

  createPersistedState({
    key: '_my_stays',
    paths: [
      'hotelDetail.selectedRoom',
      'hotelDetail.roomFilterModel',
      'hotelDetail.sortBy',
      'hotelDetail.isUpdateBooking',
      'hotelDetail.isUseDay',
      'hotelDetail.isAvailable',
      'hotelDetail.roomList',
      'hotelDetail.planList',
      'hotelDetail.hotelDetail',
      'hotelDetail.roomSelectedFromAPI',
      'hotel.data.fullPath',
      'hotel.data.fullPathHotelDetail',
      'hotel.data.hotelID',
      'hotel.data.tiers',
      'booking.bookingData',
      'booking.roomParamsForGetRoomSelected',
      'booking.reservationData',
      'appHeader.data',
      'guestDetail.guest',
      'guestDetail.someoneElseData',
      'guestDetail.isBookingForSomeoneElse',
      'users.data.isLogin'
    ]
    // storage: {
    //   getItem: key => ls.get(key),
    //   setItem: (key, value) => ls.set(key, value),
    //   removeItem: key => ls.remove(key)
    // }
  })(store)
}
