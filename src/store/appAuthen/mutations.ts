import { IState } from "../../shared/interfaces/common";
import * as fromTypes from "./types";

export default {
  [fromTypes.GET_LOCATION](
    state: IState<any>,
    action: fromTypes.IActions<any>
  ) {
    state.data.locations = {
      lat: action.payload.lat,
      log: action.payload.long
    };
    state.errorMessage = "null";
  },

  [fromTypes.TOGGLE_LOGIN](
    state: IState<any>,
    action: fromTypes.IActions<any>
  ) {
    state.isLoginOpen = action.payload.isLoginOpen;
    state.isSignupOpen = false;
  },

  [fromTypes.TOGGLE_SIGNUP](
    state: IState<any>,
    action: fromTypes.IActions<any>
  ) {
    state.isSignupOpen = action.payload.isSignupOpen;
    state.isLoginOpen = false;
  },

  [fromTypes.SHOW_CANCEL_RESERVATION](
    state: IState<any>,
    action: fromTypes.IActions<any>
  ) {
    state.isShowCancelReservation = action.payload;
  },

  [fromTypes.GO_TO_RESSET_PASSWORD_CONFIRM](
    state: any,
    _action: fromTypes.IActions<any>
  ) {
    state.isResetPassword = true;
  },

  [fromTypes.GO_TO_LOGIN](state: any, _action: fromTypes.IActions<any>) {
    state.isResetPassword = false;
  },

  [fromTypes.RESET_DATA](state: any) {
    state.isResetPassword = false;
  },

  [fromTypes.TOGGLE_HEADER_SEARCH_BOX](state: any, payload: any) {
    state.isShowSearchBox = payload;
  }
};
