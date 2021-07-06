import HomePage from '../../pages/HomePage.vue'
import SearchHotelPage from '../../pages/SearchHotelPage.vue'
import HotelDetailPage from '../../pages/HotelDetailPage.vue'
import HotelReviewPage from '../../pages/HotelReviewPage.vue'
import GuestDetailPage from '../../pages/GuestDetailPage.vue'
import PaymentDetailPage from '../../pages/PaymentDetailPage.vue'
import ConfirmStayPage from '../../pages/ConfirmStayPage.vue'
import CancelReservationPage from '../../pages/CancelReservationPage.vue'
import MyProfilePage from '../../pages/MyProfilePage.vue'
import NotFoundPage from '../../pages/NotFoundPage.vue'
import ShowFullMapPage from '../../pages/ShowFullMapPage.vue'
import MemberConfirmation from '../../pages/MemberConfirmation.vue'

import MyBooking from '../modules/MyProfile/MyBooking.vue'
import Rewards from '../modules/MyProfile/Rewards.vue'
import MyProfile from '../modules/MyProfile/MyProfile.vue'

export const routers = () => [
  {
    name: 'HomePage',
    path: '/',
    component: HomePage
  },
  {
    path: '/hotels-list',
    component: SearchHotelPage
  },
  {
    name: 'Hotel',
    path: '/hotel/:hotelID',
    component: HotelDetailPage,
    meta: { disableScroll: true }
  },
  {
    name: 'Summary',
    path: '/summary',
    component: HotelReviewPage
  },
  {
    name: 'GuestDetail',
    path: '/guest-detail',
    component: GuestDetailPage
  },
  {
    name: 'Payment',
    path: '/payment',
    component: PaymentDetailPage
  },
  {
    name: 'ConfirmBooking',
    path: '/confirm-booking/:reservationID',
    component: ConfirmStayPage
  },
  {
    name: 'Cancel',
    path: '/cancel',
    component: CancelReservationPage
  },
  {
    name: 'MyProfile',
    path: '/my-profile',
    component: MyProfilePage,
    children: [
      {
        name: 'My Profile',
        path: '/my-profile',
        component: MyProfile
      },
      {
        name: 'My Booking',
        path: '/my-booking',
        component: MyBooking
      },
      {
        name: 'My Rewards',
        path: '/my-rewards',
        component: Rewards
      }
    ]
  },
  {
    name: 'Change Password',
    path: '/change-password',
    component: HomePage
  },
  {
    name: 'FullMap',
    path: '/full-map/:hotelId',
    component: ShowFullMapPage
  },
  {
    name: 'Member Confirmmation',
    path: '/member-confirmation',
    component: MemberConfirmation
  },
  {
    path: '*',
    component: NotFoundPage
  }
]
