import { Header } from '../../shared/constants/index'

export default () => ({
  authen: true,
  success: false,
  isHeaderSearchBoxOpen: false,
  headerLinks: [
    {
      headerLinkText: Header.findHotel,
      headerLinkHref: '',
      headerIcon: 'Icon-Search',
      isNavSearch: true
    },
    {
      headerLinkText: Header.myReservation,
      headerLinkHref: '/',
      headerIcon: 'Icon-Reservations',
      isNavSearch: false
    }
  ],
  headerNavButtons: [
    {
      headerNavButtonText: Header.login,
      headerNavButtonTextSp: Header.loginMobile,
      headerNavButtonTel: '334343939',
      headerNavMobileText: `${Header.login} ${Header.or} ${Header.join}`,
      headerNavButtonIcon: 'Icon-Profile',
      headerNavButtonType: 'Login',
      headerNavButtonLinkLogin: '/login',
      headerNavButtonLinkSignup: '/signup'
    },
    {
      headerNavButtonText: '+81-3-3434-3939',
      headerNavButtonTel: '334343939',
      headerNavButtonTextSp: Header.call,
      headerNavMobileText: Header.callMobile,
      headerNavButtonIcon: 'Icon-Phone',
      headerNavButtonType: 'Phone',
      headerNavButtonLinkLogin: '/login',
      headerNavButtonLinkSignup: '/signup'
    },
    {
      headerNavButtonText: Header.menu,
      headerNavButtonTextSp: Header.menu,
      headerNavButtonTel: '3-3434-3939',
      headerNavButtonIcon: 'Icon-Menu',
      headerNavButtonType: 'Menu',
      headerNavMobileText: Header.callMobile,
      headerNavButtonLinkLogin: '/login',
      headerNavButtonLinkSignup: '/signup'
    }
  ],
  headerDropdownsMobile: [
    {
      headerDropdownText: Header.GuestRelations,
      headerDropdownIcon: 'Icon-Chat'
    },
    {
      headerDropdownText: Header.RecentSearches,
      headerDropdownIcon: 'Icon-Time'
    },
    {
      headerDropdownText: 'English',
      headerDropdownIcon: 'Icon-Languages'
    },
    {
      headerDropdownText: 'Yen',
      headerDropdownIcon: 'Icon-Currency-YEN'
    }
  ],
  userProfileLinks: [
    {
      userProfileText: Header.MyProfile,
      userProfileHref: '/my-profile'
    },
    {
      userProfileText: Header.MyReward,
      userProfileHref: '/my-profile'
    }
  ],
  headerMobileBottomLinks: [
    {
      headerMobileBottomText: Header.VisitWebsite,
      headerMobileBottomHref: '/'
    },
    {
      headerMobileBottomText: Header.PrivatePolicy,
      headerMobileBottomHref: '/'
    },
    {
      headerMobileBottomText: Header.Sitemap,
      headerMobileBottomHref: '/'
    }
  ]
})
