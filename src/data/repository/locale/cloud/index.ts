import { SitecoreResource } from '../../../gateway/api/resource'
import ResponseModel from '../../../../models/response'
import { getConfig } from '../../../setting'
import ApiGateway from '../../../gateway/api'
import Cookies from 'js-cookie'

const login = (
  email: string,
  password: string,
  params?: any
): Promise<ResponseModel<string>> => {
  const { program_id, hotel_id } = params
  const apiGateway = ApiGateway.createAPIConnection(getConfig())
  const loginResource = SitecoreResource.Customer.Login(hotel_id)

  const body = {
    email,
    password,
    program_id
  }
  return apiGateway.doPostRequest(loginResource, body)
}

// const getClientSession = (
//   key: string,
//   secret: string
// ): Promise<ResponseModel<string>> => {
//   const apiGateway = ApiGateway.createAPIConnection(getConfig())
//   const loginResource = SitecoreResource.Customer.clientSession()
//   const body = {
//     key,
//     secret
//   }

//   return apiGateway.doPostRequest(loginResource, body)
// }

const signup = (data: any): Promise<ResponseModel<string>> => {
  const apiGateway = ApiGateway.createAPIConnection(getConfig())
  const signupResource = SitecoreResource.Customer.Signup(data)

  return apiGateway
    .doPostRequest(signupResource, data)
    .then((response: any) => {
      const data = response._data
      return data
    })
}

const resetPassword = (
  email: string,
  hotel_id: number
): Promise<ResponseModel<string>> => {
  const body = { email }
  const apiGateway = ApiGateway.createAPIConnection(getConfig())
  const signupResource = SitecoreResource.Customer.resetPassword(hotel_id)

  return apiGateway
    .doPostRequest(signupResource, body)
    .then((response: any) => {
      const data = response._data

      return data
    })
}

const updatePassword = (
  data: any,
  hotel_id: number
): Promise<ResponseModel<string>> => {
  const body = {
    reset_password_token: data.token,
    password: data.password
  }
  const apiGateway = ApiGateway.createAPIConnection(getConfig())
  const signupResource = SitecoreResource.Customer.updatePassword(hotel_id)

  return apiGateway.doPutRequest(signupResource, body).then((response: any) => {
    const data = response._data
    return data
  })
}

const getLocale = (payload?: any): Promise<ResponseModel<string>> => {
  const params = {
    TargetLanguage: payload === 'en-US' ? 'en' : payload,
    KeyWord: '',
    IsClearCache: false
  }
  const accessToken = Cookies.get('Client-Session')
    ? Cookies.get('Client-Session')
    : ''
  const setting: any = getConfig()
  setting.accessToken = accessToken

  const resourcePath = SitecoreResource.Hotel.getLocale(payload)
  const apiGateway = ApiGateway.createAPIConnection(setting)
  return apiGateway
    .doPostRequest(resourcePath, params)
    .then((response: any) => {
      return response._data
    })
}

export default {
  login,
  signup,
  resetPassword,
  updatePassword,
  // getClientSession,
  getLocale
}
