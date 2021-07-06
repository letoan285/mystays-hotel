import CustomerCloud from "./cloud";
import CustomerStorage from "./storage";
import fetchWithCache from "../../../shared/helper/fetchWithCache";

export default class LanguageRepository {
  /**
   *
   * @param token
   * @returns {Promise<ResponseModel<any>>}
   */
  saveToken = (token: any) => {
    return CustomerStorage.setLocaleToken(token);
  };

  saveLocale = (token: any) => {
    return CustomerStorage.setLocaleToken(token);
  };

  /**
   *
   *
   * @memberof UserRepository
   */
  removeToken = () => {
    return CustomerStorage.removeAuthToken();
  };

  getLocale = (locale: string) => {
    return fetchWithCache(
      "_dictionaries",
      locale,
      "7d",
      CustomerCloud.getLocale
    );
  };

  /**
   *
   * @returns {Promise<ResponseModel<string>>}
   */
  getLocaleToken = () => CustomerStorage.getAuthToken();

  /**
   *
   * @param {string} token
   * @returns {Promise<ResponseModel<any>>}
   */
  setCustomerToken = (token: string) => CustomerStorage.setLocaleToken(token);
}
