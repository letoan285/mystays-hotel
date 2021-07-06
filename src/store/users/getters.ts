import { UserState } from './state'
export default {
  userList: (state: UserState) => {
    return state.data.users
  },
  signupUserSuccess: (state: UserState) => {
    return state.success
  },
  loginUserSuccess: (state: UserState) => {
    return state.data.isLogin
  },
  userData: (state: UserState) => {
    return state.data
  }
}
