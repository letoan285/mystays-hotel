export const GET_LOCATION = 'GET_LOCATION'
export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS'
export const GET_LOCATION_FAILED = 'GET_LOCATION_FAILED'
export const TOGGLE_SIGNUP = 'TOGGLE_SIGNUP'
export const TOGGLE_LOGIN = 'TOGGLE_LOGIN'
export const SHOW_MAIN_HEADER = 'SHOW_MAIN_HEADER'
export const SHOW_CANCEL_RESERVATION = 'SHOW_CANCEL_RESERVATION'

export const GO_TO_RESSET_PASSWORD_CONFIRM = 'GO_TO_RESSET_PASSWORD_CONFIRM'

export const GO_TO_LOGIN = 'GO_TO_LOGIN'

export const RESET_DATA = 'RESET_DATA'

export const TOGGLE_HEADER_SEARCH_BOX = 'TOGGLE_HEADER_SEARCH_BOX'
export interface IActions<T> {
  resp?: any
  type: string;
  payload?: T;
}

export interface ILoginStatus {
  isLoginOpen: boolean
}

export interface ISignupStatus {
  isSignupOpen: boolean
}
