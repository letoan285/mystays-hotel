import ResponseModel from "~/src/models/response"
import ApiGateway from "../../gateway/api"
import { SitecoreResource } from "../../gateway/api/resource"
import { getNuxtConfig } from "../../setting"

export default class AuthenticationRepository {
  constructor() { }

  getAccessToken = (): Promise<ResponseModel<string>> => {
    const resourcePath = SitecoreResource.Customer.getAccessToken()
    const apiGateway = ApiGateway.createAPIConnection(getNuxtConfig())
    return apiGateway.doPostRequest(resourcePath, {}).then((response: any) => {
      return response._data
    })
  }

  getClientSession = (): Promise<ResponseModel<string>> => {
    const apiGateway = ApiGateway.createAPIConnection(getNuxtConfig())
    const resourcePath = SitecoreResource.Customer.getClientSession()
    return apiGateway.doPostRequest(resourcePath, {}).then((response: any) => {
      return response._data
    })
  }
}