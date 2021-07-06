import Cookies from 'js-cookie'
import GetClientTokenUseCase from '../../../domain/usecases/customer/auth/getClientSessionToken'
import AuthenticationRepository from '../../../data/repository/auth/Auth.repo'
import * as types from './types'

export default {
  getAccessToken({ commit, app }: any) {
    const authenticationUseCase = new AuthenticationRepository()
    authenticationUseCase
      .getAccessToken()
      .then((res: any) => {
        Cookies.set('access_token', res.data);
        return res
      })
      .then((resp: any) => {
        commit(types.FooterActionTypes.GET_ACCESS_TOKEN_SUCCESS, {
          resp
        })
      })
      .catch((error: any) => {
        commit(types.FooterActionTypes.GET_ACCESS_TOKEN_FAIL, {
          error
        })
      })
  },

  getClientSessionToken({ commit }: any) {
    const authenticationUseCase = new AuthenticationRepository()

    authenticationUseCase
      .getClientSession()
      .then((res: any) => {
        Cookies.set('Client-Session', res.data);
        return res
      })
      .then((resp: any) => {
        commit(types.FooterActionTypes.GET_CLIENT_SESSION_SUCCESS, {
          resp
        })
      })
      .catch((error: any) => {
        commit(types.FooterActionTypes.GET_CLIENT_SESSION_FAIL, {
          error
        })
      })
  }
}
