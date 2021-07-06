export const GET_LOCATION = 'GET_LOCATION'
export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS'
export const GET_LOCATION_FAILED = 'GET_LOCATION_FAILED'
export const TOGGLE_SIGNUP = 'TOGGLE_SIGNUP'
export const TOGGLE_LOGIN = 'TOGGLE_LOGIN'
export const SHOW_MAIN_HEADER = 'SHOW_MAIN_HEADER'

export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'

export interface IActions<T> {
  type: string;
  payload?: T;
}

export interface ILoginStatus {
  isLoginOpen: boolean
}

export interface ISignupStatus {
  isSignupOpen: boolean
}
