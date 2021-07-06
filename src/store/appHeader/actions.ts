import * as types from './types'

export default {
  toggleLogin ({ commit }: any, payload: any) {
    commit(types.TOGGLE_LOGIN, { payload })
  },
  toggleSignup ({ commit }: any, payload: any) {
    commit(types.TOGGLE_SIGNUP, { payload })
  },
  changeLanguage ({ commit }: any, payload: any) {
    commit(types.CHANGE_LANGUAGE, { payload })
  }
}
