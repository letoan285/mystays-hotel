import { TokenType } from '../../constants'
import CustomerCloud from './cloud'
import CustomerStorage from './storage'

export default class CustomerRepository {
  loginUser = (email: string, password: string, data?: any) => {
    return CustomerCloud.login(email, password, data)
  }

  logoutUser = (hotel_id: string) => {
    return CustomerCloud.logout(hotel_id)
  }

  /**
   *
   *
   * @memberof UserRepository
   */
  removeUser = () => {
    return CustomerStorage.removeUser()
  }

  getUserInfo = () => {
    return CustomerStorage.getUserLocalStorage()
  }

  signupUser = (data: any) => {
    return CustomerCloud.signup(data)
  }

  getUserDetail = () => {
    return CustomerCloud.getUser()
  }

  resetPassword = (email: string, hotel_id: number) => {
    return CustomerCloud.resetPassword(email, hotel_id)
  }

  updatePassword = (data: any, hotel_id: number) => {
    return CustomerCloud.updatePassword(data, hotel_id)
  }

  /**
   *
   * @param user
   * @returns {Promise<ResponseModel<any>>}
   */
  setUser = (user: any) => {
    return CustomerStorage.setUser(user)
  }

  updateUser = (data: any) => {
    return CustomerCloud.updateUser(data)
  }

  /**
   *
   * @param user
   * @returns {Promise<ResponseModel<any>>}
   */
  getClientSession = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      CustomerCloud.getClientSession()
        .then((response: any) => {
          const token = response.data.data.client_session
          localStorage.setItem(TokenType.ClientSession, token)
          resolve(token)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  /**
   *
   * @returns {Promise<ResponseModel<string>>}
   */
  getUser = () => {
    return CustomerStorage.getUser()
  }

  /**
   *
   * @param token
   * @returns {Promise<ResponseModel<any>>}
   */
  saveToken = (token: any) => {
    return CustomerStorage.setAuthToken(token)
  }

  /**
   *
   * @param token
   * @returns {Promise<ResponseModel<any>>}
   */
  saveUserInformation = (user: any) => {
    return CustomerStorage.setUserInformation(user)
  }

  /**
   *
   *
   * @memberof UserRepository
   */
  removeToken = () => {
    return CustomerStorage.removeAuthToken()
  }

  /**
   *
   * @returns {Promise<ResponseModel<string>>}
   */
  getCustomerToken = () => CustomerStorage.getAuthToken()

  /**
   *
   * @param {string} token
   * @returns {Promise<ResponseModel<any>>}
   */
  setCustomerToken = (token: string) => CustomerStorage.setAuthToken(token)

  confirmation = (data: any) => CustomerCloud.confirmation(data)

  cancelMembership = (data: any) => CustomerCloud.cancelMembership(data)

  getClientSessionToken = () => CustomerCloud.getClientSession()

  setClientSessionToken = (token: any) => CustomerStorage.setSessionToken(token)

  getAccessToken = () => CustomerCloud.getAccessToken()

  setAccessToken = (token: string) => CustomerStorage.setAccessToken(token)
}
