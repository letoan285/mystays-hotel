import { IState } from '../../shared/interfaces/common'
import * as fromTypes from './types'

export default {
  [fromTypes.GET_LOCATION] (state: IState<any>, action: fromTypes.IActions<any>) {
    state.data.locations = { lat: action.payload.lat, log: action.payload.long }
    state.errorMessage = 'null'
  },

  [fromTypes.TOGGLE_LOGIN] (state: IState<any>, action: fromTypes.IActions<any>) {
    state.isLoginOpen = action.payload.isLoginOpen
    state.isSignupOpen = false
  },

  [fromTypes.TOGGLE_SIGNUP] (state: IState<any>, action: fromTypes.IActions<any>) {
    state.isSignupOpen = action.payload.isSignupOpen
    state.isLoginOpen = false
  },

  [fromTypes.CHANGE_LANGUAGE] (state: IState<any>, action: fromTypes.IActions<any>) {
    state.data.language = action.payload.langText
    state.data.fullLang = action.payload.fullLang
  }
}
