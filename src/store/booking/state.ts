export default () => ({
  success: false,
  bookingState: {
    location: false,
    checking: false,
    roomSelect: false,
    promoCode: false,
    searchButton: false
  },
  bookingData: {
    location: null,
    checkIn: null,
    checkOut: null,
    checkOutBeforeBookingUseDay: null,
    roomList: [
      {
        id: '',
        adults: {
          title: 'Adults',
          number: 1
        },
        children: {
          title: 'Children',
          childrenList: []
        }
      }
    ],
    promoCode: null,
    promoCodeExist: {},
    searchType: '',
    reservations: null,
    hotelID: ''
  },
  bookingError: {
    location: {
      type: null,
      msg: null
    },
    roomSelect: {
      type: null,
      msg: null
    },
    promocode: {
      type: null,
      msg: null
    }
  },
  paymentState: {
    isLoading: false
  },
  isShowTotalGuest: false,
  roomIndex: 1,
  reservationData: {},
  isReservationLoading: false,
  isUpdateLoading: false,
  reservationsSettings: {},
  reservationParams: {
    hotelID: '',
    reservationID: '',
    email: '',
    bypass_token: ''
  },
  reservationError: null,
  allowedSelectOneDay: false,
  cancelReservationMessage: undefined,
  successCancelReservationMessage: undefined,
  roomParamsForGetRoomSelected: []
})
