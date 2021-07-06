import * as fromTypes from './types'

export default {
  showHeaderSearch ({ commit }: any, payload: boolean) {
    commit(fromTypes.SHOW_HEADER_SEARCH, { payload })
  }
}
