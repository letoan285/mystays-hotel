import * as fromTypes from './types'

export default {
  [fromTypes.SHOW_HEADER_SEARCH] (state: fromTypes.IState, action: any) {
    state.isHeaderSearchBoxOpen = action.payload
  }
}
