import { Languages } from "../../shared/constants";

export default (): any => ({
  isFetching: false,
  status: "",
  data: {
    locales: Languages,
    locale: {
      messages: {} // this message will replace by locale api
    },
    isMobile: false,
    location: null,
    userLocation: null,
    booking: {},
    skeleton: null,
    page_loading: false,
    isNearMe: false,
    isGetLocationLoading: false,
    calendarData: {
      disabled_dates: [],
      inventory: [],
      hotelId: "",
      adults: "",
      children: ""
    }
  },
  params: "",
  errorMessage: "",
  actionType: "",
  success: false,
  canLoadMore: null
});
