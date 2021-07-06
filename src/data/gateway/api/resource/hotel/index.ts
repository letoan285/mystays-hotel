import Type from "../../type";
import { getApiController } from "../";
import { IResource } from "../../../../../shared/interfaces/common/resource";

const getHotelsAndAreas = (_data?: any, storeView?: string): IResource => {
  return {
    Type: Type.Customer,
    Path: `${getApiController(storeView)}/MystaysTriplaGetHotelsAndAreasV2`
  };
};
const getHotelsPlans = (hotel_id?: string, storeView?: string): IResource => ({
  Type: Type.UserAuthorization,
  Path: `${getApiController(storeView)}/hotels/${hotel_id}/hotel_plans`
});

const getRoomTypes = (hotel_id?: string, storeView?: string): IResource => ({
  Type: Type.UserAuthorization,
  Path: `${getApiController(storeView)}/hotels/${hotel_id}/room_types`
});

const getTiers = (hotel_id?: string, storeView?: string): IResource => ({
  Type: Type.UserAuthorization,
  Path: `${getApiController(storeView)}/hotels/${hotel_id}/tiers`
});

const getAvailableRoom = (data: any, storeView?: string): IResource => {
  const queryString = JSON.stringify(data.queryString);
  return {
    Type: Type.UserAuthorization,
    Path: `${getApiController(storeView)}/hotels/${
      data.hotel_id
    }/rooms?q=${queryString}&type=${data.type}`
  };
};

const getLocation = (storeView?: string): IResource => ({
  Type: Type.Customer,
  Path: `${getApiController(storeView)}/MystaysTriplaGetCurrentUserLocation`
});
const checkPromoCode = (promoCode?: string, storeView?: string): IResource => ({
  Type: Type.UserAuthorization,
  Path: `${getApiController(storeView)}/hotels/${promoCode}/room_types`
});

const getHotelPrice = (q: any, storeView?: string): IResource => {
  const query = {
    rooms: q.rooms
  };
  const url = `/hotel_brands/297/hotels?is_including_lowest_price=${q.isIncludeLowestPrice}&is_including_max_of_lowest_price_next_30_days=${q.isMaxOfLowestPriceNext30Days}`;
  return {
    Type: Type.UserAuthorization,
    Path: `${getApiController(storeView)}${url}&q=${JSON.stringify(query)}`
  };
};

const getHotelDetail = (payload?: any, storeView?: string): IResource => ({
  Type: Type.UserAuthorization,
  Path: `${getApiController(storeView)}/hotels/${payload.hotelID}`
});

const getHotelDetailV2 = (payload?: any, storeView?: string): IResource => ({
  Type: Type.Customer,
  Path: `${getApiController(storeView)}/MystaysTriplaGetHotelDetail`
});

const getCancellationPolicies = (data: any, storeView?: string): IResource => {
  const queryString = JSON.stringify(data.queryString);
  return {
    Type: Type.UserAuthorization,
    Path: `${getApiController(storeView)}/hotels/${
      data.hotelID
    }/cancellation_policies?q=${queryString}`
  };
};

const getHotelReviews = (_params: any, storeView?: string): IResource => {
  return {
    Type: Type.Customer,
    Path: `${getApiController(storeView)}/MystaysTriplaGetHotelReviews`
  };
};

const createReservations = (payload?: any, storeView?: string): IResource => ({
  Type: Type.UserAuthorization,
  Path: `${getApiController(storeView)}/hotels/${payload.hotelId}/reservations`
});

const cancelReservations = (payload?: any, storeView?: string): IResource => {
  return {
    Type: Type.UserAuthorization,
    Path: `${getApiController(storeView)}/hotels/${
      payload.hotelID
    }/reservations/${payload.reservationID}/cancel/?email=${
      payload.email
    }&bypass_token=${payload.byPassToken}`
  };
};

const updateReservations = (payload?: any, storeView?: string): IResource => ({
  Type: Type.UserAuthorization,
  Path: `${getApiController(storeView)}/hotels/${
    payload.hotelID
  }/reservations/${payload.reservationID}?email=${payload.email}&bypass_token=${
    payload.byPassToken
  }`
});

const getReservations = (payload?: any, storeView?: string): IResource => ({
  Type: Type.UserAuthorization,
  Path: `${getApiController(storeView)}/hotels/${
    payload.hotelID
  }/reservations/${payload.reservationID}?email=${payload.email}&bypass_token=${
    payload.byPassToken
  }`
});

const updateGuestDetail = (payload?: any, storeView?: string): IResource => ({
  Type: Type.UserAuthorization,
  Path: `${getApiController(storeView)}/hotels/${
    payload.hotelID
  }/reservations/${payload.reservationID}/guests`
});

const getSettingReservations = (
  payload?: any,
  storeView?: string
): IResource => ({
  Type: Type.UserAuthorization,
  Path: `${getApiController(storeView)}/hotels/${
    payload.hotelID
  }/reservations/${payload.reservationID}/update_settings?email=${
    payload.email
  }&bypass_token=${payload.byPassToken}`
});

const getRoomSelected = (payload?: any, storeView?: string): IResource => {
  const queryString = JSON.stringify(payload.queryString);
  return {
    Type: Type.UserAuthorization,
    Path: `${getApiController(storeView)}/hotels/${
      payload.hotelID
    }/rooms/price?q=${queryString}`
  };
};

const getLocale = (_locale?: string, storeView?: string): IResource => ({
  Type: Type.Customer,
  Path: `${getApiController(storeView)}/MystaysTriplaGetDictionaries`
});

const getExtras = (params?: any, storeView?: string): IResource => {
  const queryString = JSON.stringify(params.queryString);
  return {
    Type: Type.UserAuthorization,
    Path: `${getApiController(storeView)}/hotels/${
      params.hotelID
    }/extras?q=${queryString}`
  };
};

const getAdditionalQuestion = (params?: any, storeView?: string): IResource => {
  const queryString = JSON.stringify(params.queryString);
  return {
    Type: Type.UserAuthorization,
    Path: `${getApiController(storeView)}/hotels/${
      params.hotelID
    }/additional_questions?q=${queryString}&room_plan_codes=${
      params.room_plan_code
    }`
  };
};

const getReservationAdditionalQuestion = (
  params?: any,
  storeView?: string
): IResource => {
  const queryString = JSON.stringify(params.q);
  return {
    Type: Type.UserAuthorization,
    Path: `${getApiController(storeView)}/hotels/${
      params.hotelID
    }/reservations/${params.reservationID}/additional_questions?email=${
      params.email
    }&bypass_token=${params.byPassToken}&q=${queryString}`
  };
};

const updateBatch = (params?: any, storeView?: string): IResource => {
  return {
    Type: Type.UserAuthorization,
    Path: `${getApiController(storeView)}/hotels/${
      params.hotelID
    }/reservations/${params.reservationID}/additional_questions/batch_update`
  };
};

export default {
  getTiers,
  getRoomTypes,
  getHotelsPlans,
  getHotelsAndAreas,
  getAvailableRoom,
  getLocation,
  checkPromoCode,
  getHotelPrice,
  getHotelDetail,
  createReservations,
  getCancellationPolicies,
  getHotelReviews,
  getLocale,
  getExtras,
  getAdditionalQuestion,
  cancelReservations,
  updateReservations,
  getReservations,
  updateGuestDetail,
  getSettingReservations,
  getRoomSelected,
  getReservationAdditionalQuestion,
  updateBatch,
  getHotelDetailV2
};
