import StorageGateway from '../../../gateway/storage'
import { TokenType } from '../../../constants'
import ResponseModel from '../../../../models/response'

const setLocaleToken = (token: string) => {
  return StorageGateway.doUpdate(TokenType.Locale, token)
}

const getAuthToken = async (): Promise<ResponseModel<string>> => {
  return await StorageGateway.doGet(TokenType.MemberShipSession)
}

const removeAuthToken = () => {
  return StorageGateway.doDelete(TokenType.Customer)
}

export default {
  setLocaleToken,
  getAuthToken,
  removeAuthToken
}
