import { SitecoreResource } from '../../../gateway/api/resource'
import ResponseModel from '../../../../models/response'
import { getConfig } from '../../../setting'
import ApiGateway from '../../../gateway/api'

const getCalendar = (payload: any): Promise<ResponseModel<string>> => {
  const resourcePath = SitecoreResource.Calendar.getCalendar(payload)
  const apiGateway = ApiGateway.createAPIConnection(getConfig())
  return apiGateway.doGetAllRequest(resourcePath).then((response: any) => {
    return response._data
  })
}

export default {
  getCalendar
}
