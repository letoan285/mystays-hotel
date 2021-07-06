import HotelCloud from "./cloud";
import HotelStorage from "./storage";
import fetchWithCache from "../../../shared/helper/fetchWithCache";

export default class HotelRepository {
  getAllHotels = (payload: string): Promise<any> => {
    return new Promise(resolve => {
      const params = JSON.parse(payload) || {};
      let locale = HotelStorage.getLocale();
      if (!locale || locale === "en-US") {
        locale = "en";
      }
      params.lang = locale;
      const rs = fetchWithCache(
        "_hotels_and_areas",
        params,
        "7d",
        HotelCloud.getAll
      );
      resolve(rs);
    });
  };

  getHotelPlans = (payload: any) => {
    return HotelCloud.getHotelsPlan(payload);
  };

  getRoomTypes = (hotel_id: string) => {
    return HotelCloud.getRoomTypes(hotel_id);
  };

  getTiers = (hotel_id: string) => {
    return HotelCloud.getTiers(hotel_id);
  };

  getAvailableRoom = (payload: any) => {
    return HotelCloud.getAvailableRoom(payload);
  };

  checkPromoCode = (promoCode: string): Promise<any> => {
    // return HotelCloud.checkPromoCode(promoCode);
    return new Promise((resolve, reject) => {
      const promoCodes = ["aaaa", "bbbb", "cccc", "dddd", "eeee"];
      const result = promoCodes.includes(promoCode.toLowerCase());

      if (result) {
        resolve({ match: true, success: 1 });
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ match: false, success: 0 });
      }
    });
  };

  saveSearchResult = (searchParams: any) => {
    return HotelStorage.saveResult(searchParams);
  };

  getLocation = () => {
    return HotelCloud.getLocation();
  };

  setLocation = (location: any) => {
    return HotelStorage.setLocation(location);
  };

  setInitialBooking = (payload: any) => {
    return HotelStorage.setInitialooking(payload);
  };

  getInitialBooking = () => {
    return HotelStorage.getInitialooking();
  };

  getHotelPrice = (payload: any) => {
    const rs = fetchWithCache(
      "_hotel_price",
      payload,
      "30m",
      HotelCloud.getHotelPrice
    );
    return rs;
  };

  getHotelDetail = (payload: any) => {
    return HotelCloud.getHotelDetail(payload);
  };

  getHotelDetailV2 = (payload: any) => {
    return HotelCloud.getHotelDetailV2(payload);
  };

  getCancellationPolicies = (payload: any) => {
    return HotelCloud.getCancellationPolicies(payload);
  };

  getHotelReviews = (payload: any) => {
    return HotelCloud.getHotelReviews(payload);
  };

  createReservations = (payload: any) => {
    return HotelCloud.createReservations(payload);
  };

  cancelReservations = (payload: any) => {
    return HotelCloud.cancelReservations(payload);
  };

  updateReservations = (payload: any) => {
    return HotelCloud.updateReservations(payload);
  };

  getReservations = (payload: any) => {
    return HotelCloud.getReservations(payload);
  };

  updateGuestDetail = (payload: any) => {
    return HotelCloud.updateGuestDetail(payload);
  };

  getSettingReservation = (payload: any) => {
    return HotelCloud.getSettingReservations(payload);
  };

  getExtras = (payload: any) => {
    return HotelCloud.getExtras(payload);
  };

  getRoomSelected = (payload: any) => {
    return HotelCloud.getRoomSelected(payload);
  };

  getAdditionalQuestion = (payload: any) => {
    return HotelCloud.getAdditionalQuestion(payload);
  };

  getReservationAdditionalQuestion = (payload: any) => {
    return HotelCloud.getReservationAdditionalQuestion(payload);
  };

  updateBatch = (payload: any) => {
    return HotelCloud.updateBatch(payload);
  };
}
