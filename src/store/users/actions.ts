import CustomerUserCase from "../../domain/usecases/customer";
import GetUserLoginInfoUseCase from "../../domain/usecases/customer/signIn/GetUserLoginInfoUseCase";
import GetUserDetailUseCase from "../../domain/usecases/customer/signIn/GetUserDetailUseCase";
import { UserActionTypes, IUserLogin } from "./types";

export default {
  loginUser({ commit, dispatch }: any, payload: IUserLogin) {
    commit(UserActionTypes.LOGIN_USER, {
      payload
    });
    const loginUserUseCase = new CustomerUserCase.LoginUserUseCase(payload);
    loginUserUseCase
      .execute()
      .then((resp: any) => {
        dispatch("getUserDetail");
        console.log("dispatch");

        commit(UserActionTypes.LOGIN_USER_SUCCESS, { payload: resp.data });
      })
      .catch(error => {
        commit(UserActionTypes.LOGIN_USER_FAIL, { error });
      });
  },
  signupUser({ commit }: any, payload: any) {
    commit(UserActionTypes.SIGNUP_USER, {});
    const signupUserUseCase = new CustomerUserCase.SignupUserUseCase(payload);
    signupUserUseCase
      .execute()
      .then((resp: any) => {
        commit(UserActionTypes.SIGNUP_USER_SUCCESS, {
          payload: resp.data
        });
      })
      .catch(error => {
        commit(UserActionTypes.SIGNUP_USER_FAIL, {
          error
        });
      });
  },
  getAuthenticationSession({ commit }: any) {
    const clientSessionUseCase = new CustomerUserCase.ClientSessionUseCase();
    clientSessionUseCase
      .execute()
      .then((resp: any) => {
        commit(UserActionTypes.GET_CLIENT_SESSION_SUCCESS, { payload: resp });
      })
      .catch((error: string) => {
        commit(UserActionTypes.GET_CLIENT_SESSION_FAIL, {
          error
        });
      });
  },
  setSession({ commit }: any) {
    const sessionUseCase = new CustomerUserCase.SetSessionUseCase();
    sessionUseCase
      .execute()
      .then((resp: any) => {
        commit(UserActionTypes.GET_CLIENT_SESSION_SUCCESS, { payload: resp });
      })
      .catch((error: string) => {
        commit(UserActionTypes.GET_CLIENT_SESSION_FAIL, {
          error
        });
      });
  },
  checkUserLogin() {},

  logoutUser({ commit }: any, payload?: any) {
    let hotel_id = 1498;
    if (payload && payload.hotel_id) {
      hotel_id = payload.hotel_id;
    }
    const logoutUserUseCase = new CustomerUserCase.LogoutUserUseCase(hotel_id);

    logoutUserUseCase
      .execute()
      .then((resp: any) => {
        commit(UserActionTypes.LOGOUT_USER_SUCCESS, { payload: resp.data });
      })
      .catch(error => {
        commit(UserActionTypes.LOGOUT_USER_FAIL, {
          error
        });
      });
  },

  resetPassword({ commit }: any, payload?: any) {
    commit(UserActionTypes.RESET_PASSWORD);
    const resetPasswordUseCase = new CustomerUserCase.ResetPasswordUseCase(
      payload
    );
    resetPasswordUseCase
      .execute()
      .then((resp: any) => {
        commit(UserActionTypes.RESET_PASSWORD_SUCCESS, { payload: resp.data });
      })
      .catch(error => {
        commit(UserActionTypes.RESET_PASSWORD_FAIL, {
          error
        });
      });
  },
  updatePassword({ commit }: any, payload?: any) {
    const updatePasswordUseCase = new CustomerUserCase.UpdatePasswordUseCase(
      payload
    );
    commit(UserActionTypes.UPDATE_PASSWORD);
    updatePasswordUseCase
      .execute()
      .then((resp: any) => {
        commit(UserActionTypes.UPDATE_PASSWORD_SUCCESS, { payload: resp });
      })
      .catch(error => {
        commit(UserActionTypes.UPDATE_PASSWORD_FAIL, { error });
      });
  },
  getUserInfo({ commit }: any) {
    const updatePasswordUseCase = new GetUserLoginInfoUseCase();
    updatePasswordUseCase
      .execute()
      .then((resp: any) => {
        const payload = JSON.parse(resp.data);
        commit(UserActionTypes.GET_USER_INFO, { payload });
      })
      .catch(error => {
        commit(UserActionTypes.GET_USER_INFO, { payload: error });
      });
  },

  getUserDetail({ commit }: any) {
    commit(UserActionTypes.GET_USER_DETAIL)

    const updatePasswordUseCase = new GetUserDetailUseCase();
    updatePasswordUseCase
      .execute()
      .then((resp: any) => {
        commit(UserActionTypes.GET_USER_DETAIL_SUCCESS, {
          payload: resp.data
        });
      })
      .catch(error => {
        commit(UserActionTypes.GET_USER_DETAIL_FAIL, { payload: error });
      });
  },

  updateUserInfo({ commit }: any, payload?: any) {
    commit(UserActionTypes.UPDATE_USER_INFO, {});
    const updateUseCase = new CustomerUserCase.UpdateUserInfoUseCase(payload);
    updateUseCase
      .execute()
      .then((resp: any) => {
        commit(UserActionTypes.UPDATE_USER_INFO_SUCCESS, {
          payload: resp.data
        });
      })
      .catch(error => {
        commit(UserActionTypes.UPDATE_USER_INFO_FAIL, { error, payload });
      });
  },

  getRessetPasswordToken({ commit }: any, payload?: any) {
    commit(UserActionTypes.GET_RESSET_PASSWORD_TOKEN, { payload });
  },

  getMemberConfimation({ commit }: any, payload?: any) {
    commit(UserActionTypes.GET_MEMBER_CONFIRMATION, { payload });
    const signupUserUseCase = new CustomerUserCase.MemberConfimationUseCase(
      payload
    );
    signupUserUseCase
      .execute()
      .then(res => {
        commit(UserActionTypes.GET_MEMBER_CONFIRMATION_SUCCESS, {
          payload: res
        });
      })
      .catch(error => {
        commit(UserActionTypes.GET_MEMBER_CONFIRMATION_FAIL, {
          payload: error
        });
      });
  }
};
