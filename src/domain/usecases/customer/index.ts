import LoginUserUseCase from './signIn'
import LogoutUserUseCase from './logout'
import SignupUserUseCase from './signUp'
import ClientSessionUseCase from './clientSession'
import CheckUserLoginUserUseCase from './signIn/CheckUserLoginUserUseCase'
import HotelPlansUseCase from './hotel/HotelPlansUseCase'
import RoomTypesUseCase from './hotel/RoomTypesUseCase'
import TiersUseCase from './hotel/TiersUseCase'
import ResetPasswordUseCase from './signIn/ResetPasswordUseCase'
import UpdatePasswordUseCase from './signIn/UpdatePasswordUseCase'
import RecentSearchUseCase from './hotel/RecentSearchUseCase'
import SetSessionUseCase from './clientSession/setSession'
import UpdateUserInfoUseCase from './updateUserInfo'
import MemberConfimationUseCase from './memberConfimation'
import CancelMembershipUseCase from './cancelMembership'

export default {
  TiersUseCase,
  RoomTypesUseCase,
  LoginUserUseCase,
  LogoutUserUseCase,
  SignupUserUseCase,
  HotelPlansUseCase,
  ClientSessionUseCase,
  ResetPasswordUseCase,
  UpdatePasswordUseCase,
  CheckUserLoginUserUseCase,
  RecentSearchUseCase,
  SetSessionUseCase,
  UpdateUserInfoUseCase,
  MemberConfimationUseCase,
  CancelMembershipUseCase
}
