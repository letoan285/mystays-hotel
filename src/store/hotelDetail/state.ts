import createLogger from 'vuex/dist/logger'
import * as Data from '../../shared/dataFake/hotelDetail'

export const filterType = {
  filterByRoom: 'room',
  filterByPlan: 'plan'
}


export const strict = false
const debug = process.env.NODE_ENV !== 'production'
export const plugins = debug ? [createLogger({})] : []
export const namespaced = true

interface IState<T> {
  isOpen: boolean,
  isZoomSlide: boolean,

  selectedRoom: Array<T>,
  tax: Object,
  checkInOverview: Object,
  planList: object,
  roomList: object,
  isFetching: boolean,
  hotelDetail: object,
  hotelReviews: Array<any>,
  roomFilterModel: object,
  roomIndex: number,
  sortBy: string,
  roomPlanCode: object,
  cancellationPolicies: Array<any>,
  isLoading: boolean;
  isRoomLoading: boolean;
  isPlanLoading: boolean;
  isHotelDetailLoading: boolean;
  isUpdateBooking: boolean;
  roomSelectedFromAPI: object;
  isRoomSelectedLoading: boolean;
  isUseDay: boolean;
  isAvailable: boolean;
  alertModel: object;
  currentTab: string;
  currentId: string;
  hotelDetailV2: object;
  isHotelDetailV2Loading: boolean;
};

export default (): IState<any> => ({
  currentTab: filterType.filterByRoom,
  currentId: '',
  isOpen: false,
  isZoomSlide: false,
  selectedRoom: [],
  tax: {
    title: '',
    totalPrice: '¥16,650',
    detail: [
      {
        time: 'Tax',
        price: '¥16,650'
      },
      {
        time: 'Hotel Fees',
        price: '¥16,650'
      },
      {
        time: 'Onsen Fees',
        price: '¥16,650'
      }
    ]
  },
  checkInOverview: Data.checkInOverview,
  planList: {
    plans: [],
    search_params: {}
  },
  roomList: {
    rooms: [],
    search_params: {}
  },
  isFetching: false,
  hotelDetail: {},
  hotelDetailV2: {},
  hotelReviews: [],
  roomFilterModel: {
    status: false,
    priceRange: [0, 100],
    planType: [],
    mealType: [],
    roomType: [],
    tripType: []
  },
  roomIndex: 0,
  sortBy: 'lowestToHighest',
  roomPlanCode: {
    roomCode: '',
    planCode: ''
  },
  cancellationPolicies: [],
  isLoading: false,
  isRoomLoading: false,
  isPlanLoading: false,
  isHotelDetailLoading: false,
  isUpdateBooking: false,
  roomSelectedFromAPI: {},
  isRoomSelectedLoading: false,
  isHotelDetailV2Loading: false,
  isUseDay: false,
  isAvailable: true,
  alertModel: {
    status: false,
    text: ''
  }
})
