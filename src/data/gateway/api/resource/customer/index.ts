import Type from "../../type";
import { getApiController } from "../";
import { IResource } from "../../../../../shared/interfaces/common/resource";

const Login = (hotel_id: any, storeView?: string): IResource => ({
  Type: Type.MemberShip,
  Path: `${getApiController(storeView)}/hotels/${hotel_id}/memberships/sign_in`
});

const Singout = (hotel_id: any, storeView?: string): IResource => ({
  Type: Type.UserAuthorization,
  Path: `${getApiController(storeView)}/hotels/${hotel_id}/memberships/sign_out`
});

const Profile = (storeView?: string): IResource => ({
  Type: Type.UserAuthorization,
  Path: `${getApiController(storeView)}/user/me`
});

const Signup = (data: any, storeView?: string): IResource => ({
  Type: Type.MemberShip,
  Path: `${getApiController(storeView)}/hotels/${
    data.hotel_id
  }/memberships/sign_up`
});

const ChangePassword = (storeView?: string): IResource => ({
  Type: Type.Customer,
  Path: `${getApiController(storeView)}/customers/me/password`
});

const resetPassword = (hotel_id: number, storeView?: string): IResource => ({
  Type: Type.UserAuthorization,
  Path: `${getApiController(
    storeView
  )}/hotels/${hotel_id}/memberships/start_reset_password_process`
});

const updatePassword = (hotel_id: number, storeView?: string): IResource => ({
  Type: Type.UserAuthorization,
  Path: `${getApiController(
    storeView
  )}/hotels/${hotel_id}/memberships/update_password`
});

const cancelMembership = (hotel_id: number, storeView?: string): IResource => ({
  Type: Type.UserAuthorization,
  Path: `${getApiController(storeView)}/hotels/${hotel_id}/memberships/cancel`
});

const getReservationsList = (payload?: any, storeView?: string): IResource => ({
  Type: Type.UserAuthorization,
  Path: `${getApiController(storeView)}/user/reservations`
});

const updateUser = (hotel_id: any, storeView?: string): IResource => ({
  Type: Type.UserAuthorization,
  Path: `${getApiController(storeView)}/hotels/${hotel_id}/memberships/update`
});

const confirmation = (payload: any, storeView?: string): IResource => ({
  Type: Type.MemberShip,
  Path: `${getApiController(storeView)}/hotels/${
    payload.hotel_id
  }/memberships/confirm?confirmation_token=${
    payload.confirmation_token
  }&program_id=${payload.program_id}`
});

const getClientSession = (storeView?: string): IResource => ({
  Type: Type.Public,
  Path: `${getApiController(storeView)}/api/getClientSession`
});

const getAccessToken = (storeView?: string): IResource => ({
  Type: Type.Public,
  Path: `${getApiController(storeView)}/api/getAccesstoken`
});

export default {
  Login,
  Profile,
  Signup,
  ChangePassword,
  getClientSession,
  resetPassword,
  updatePassword,
  Singout,
  updateUser,
  confirmation,
  getAccessToken,
  cancelMembership,
  getReservationsList
};
