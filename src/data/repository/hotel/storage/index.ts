import StorageGateway from "../../../gateway/storage";
import { TokenType, User } from "../../../constants";
import ResponseModel from "../../../../models/response";

const getUser = () => {
  return StorageGateway.doGetJson(User.Key);
};

const removeUser = () => {
  return StorageGateway.doDelete(User.Key);
};

const setUser = (user: {}) => {
  return StorageGateway.doUpdateJson(User.Key, user);
};

const setAuthToken = (token: string) => {
  return StorageGateway.doUpdate(TokenType.Customer, token);
};

const getAuthToken = async (): Promise<ResponseModel<string>> => {
  return await StorageGateway.doGet(TokenType.Customer);
};

const removeAuthToken = () => {
  return StorageGateway.doDelete(TokenType.Customer);
};

/**
 *
 * @param deviceToken
 */
const saveDeviceToken = (
  deviceToken: string
): Promise<ResponseModel<boolean>> => {
  return StorageGateway.doUpdate(TokenType.DeviceToken, deviceToken);
};

/**
 *
 */
const getDeviceToken = (): Promise<ResponseModel<string>> => {
  return StorageGateway.doGet(TokenType.DeviceToken);
};
const getLocale = () => {
  return localStorage.getItem(TokenType.Locale);
};

/**
 *
 */
const removeDeviceToken = (): Promise<ResponseModel<boolean>> => {
  return StorageGateway.doDelete(TokenType.DeviceToken);
};

const saveResult = (data: any) => {
  return StorageGateway.doUpdateSearchResult(TokenType.recentSearch, data);
};

const setLocation = (location: any) => {
  return StorageGateway.doUpdateJson(TokenType.Location, location);
};

const setInitialooking = (booking: any) => {
  const data = localStorage.getItem(TokenType.Booking);
  if (!data) {
    return StorageGateway.doUpdateJson(TokenType.Booking, booking);
  } else {
    const bookingData = JSON.parse(data);
    const newBooking = { ...bookingData, ...booking };
    return StorageGateway.doUpdateJson(TokenType.Booking, newBooking);
  }
};

const getInitialooking = (): Promise<ResponseModel<string>> => {
  return StorageGateway.doGet(TokenType.Booking);
};

export default {
  getUser,
  removeUser,
  setUser,
  setAuthToken,
  getAuthToken,
  removeAuthToken,
  saveDeviceToken,
  getDeviceToken,
  removeDeviceToken,
  saveResult,
  setLocation,
  setInitialooking,
  getInitialooking,
  getLocale
};
