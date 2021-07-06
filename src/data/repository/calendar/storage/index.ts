import StorageGateway from '../../../gateway/storage'
import { TokenType, User } from '../../../constants'
import ResponseModel from '../../../../models/response'

const getUser = () => {
  return StorageGateway.doGetJson(User.Key)
}

const removeUser = () => {
  StorageGateway.doDelete(TokenType.UserAuthorization)
  return StorageGateway.doDelete(User.Key)
}

const setUser = (user: {}) => {
  return StorageGateway.doUpdateJson(User.Key, user)
}

const setAuthToken = (token: string) => {
  return StorageGateway.doUpdate(TokenType.Customer, token)
}

const setAccessToken = (token: string) => {
  return StorageGateway.doUpdateJson(TokenType.AccessToken, token)
}

const setSessionToken = (token: string) => {
  return StorageGateway.doUpdateJson(TokenType.Session, token)
}

const setUserInformation = (user: any) => {
  return StorageGateway.doUpdate(User.Key, user)
}

const getAuthToken = async (): Promise<ResponseModel<string>> => {
  return await StorageGateway.doGet(TokenType.MemberShipSession)
}

const getUserLocalStorage = () => {
  return StorageGateway.doGet(User.Key)
}

const getSessionStorageToken = async (): Promise<ResponseModel<string>> => {
  return await new Promise((resolve, reject) => {
    StorageGateway.doGet(TokenType.ClientSession)
      .then((res: any) => {
        resolve(res.data)
      })
      .catch(() => {
        reject(TokenType.ClientSession)
      })
  })
}

const removeAuthToken = () => {
  return StorageGateway.doDelete(TokenType.Customer)
}

/**
 *
 * @param deviceToken
 */
const saveDeviceToken = (
  deviceToken: string
): Promise<ResponseModel<boolean>> => {
  return StorageGateway.doUpdate(TokenType.DeviceToken, deviceToken)
}

/**
 *
 */
const getDeviceToken = (): Promise<ResponseModel<string>> => {
  return StorageGateway.doGet(TokenType.DeviceToken)
}

/**
 *
 */
const removeDeviceToken = (): Promise<ResponseModel<boolean>> => {
  return StorageGateway.doDelete(TokenType.DeviceToken)
}

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
  getSessionStorageToken,
  setSessionToken,
  setUserInformation,
  getUserLocalStorage,
  setAccessToken
}
