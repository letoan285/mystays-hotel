export const SHOW_HEADER_SEARCH = 'SHOW_HEADER_SEARCH'

export interface IActions<T> {
  type: string;
  payload?: T;
}

export interface IHeaderLink {
  headerLinkText: string,
  headerLinkHref: string,
  headerIcon: string,
  isNavSearch: boolean
}

export interface IHeaderNavButton {
  headerNavButtonText: string,
  headerNavButtonTel: string,
  headerNavButtonTextSp: string,
  headerNavMobileText: string,
  headerNavButtonIcon: string,
  headerNavButtonType: string,
  headerNavButtonLinkLogin: string,
  headerNavButtonLinkSignup: string
}

export interface IHeaderDropdownMobile {
  headerDropdownText: string,
  headerDropdownIcon: string
}

export interface IUserProfileLink {
  userProfileText: string,
  userProfileHref: string
}

export interface IHeaderMobileBottomLink {
  headerMobileBottomText: string,
  headerMobileBottomHref: string
}

export interface IState {
  authen: boolean;
  success: boolean;
  headerLinks: Array<IHeaderLink>,
  headerNavButtons: Array<IHeaderNavButton>,
  headerDropdownsMobile: Array<IHeaderDropdownMobile>,
  userProfileLinks: Array<IUserProfileLink>,
  headerMobileBottomLinks: Array<IHeaderMobileBottomLink>,
  isHeaderSearchBoxOpen: boolean
}
