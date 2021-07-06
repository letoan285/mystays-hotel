import { UserState } from '../../users/state'

export default {
  token: (state: UserState) => {
    return state.data
  }
}
