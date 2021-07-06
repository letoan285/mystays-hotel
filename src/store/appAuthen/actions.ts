import * as types from './types'

export default {
  toggleLogin ({ commit }: any, payload: any) {
    commit(types.TOGGLE_LOGIN, { payload })
  },
  toggleSignup ({ commit }: any, payload: any) {
    commit(types.TOGGLE_SIGNUP, { payload })
  },

  showCancelReservation ({ commit }: any, payload: any) {
    commit(types.SHOW_CANCEL_RESERVATION, { payload })
  },
  goToRessetPasswordConfirm ({ commit }: any, payload: any) {
    commit(types.GO_TO_RESSET_PASSWORD_CONFIRM, { payload })
  },
  goToLogin ({ commit }: any, payload: any) {
    commit(types.GO_TO_LOGIN, { payload })
  },
  resetData ({ commit }: any) {
    commit(types.RESET_DATA, { })
  },
  toggleHeaderSearchBox ({ commit }: any, payload: boolean) {
    commit(types.TOGGLE_HEADER_SEARCH_BOX, payload)
  }
}
