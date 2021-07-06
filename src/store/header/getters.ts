import { IState } from './types'

export default {
  authen: (state: IState) => state.authen,
  isHeaderSearchBoxOpen: (state: IState) => state.isHeaderSearchBoxOpen,
  headerLinks: (state: IState) => state.headerLinks,
  headerNavButtons: (state: IState) => state.headerNavButtons,
  headerDropdownsMobile: (state: IState) => state.headerDropdownsMobile,
  userProfileLinks: (state: IState) => state.userProfileLinks,
  headerMobileBottomLinks: (state: IState) => state.headerMobileBottomLinks
}
