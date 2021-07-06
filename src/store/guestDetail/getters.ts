import * as types from "./types";

export default {
  guestDetailAddition: (state: types.IState) => state.additional,
  diningTime: (state: types.IState) => state.diningTime,
  isFormInValid: (state: types.IState) => state.isFormInvalid,
  isMakingForSomeoneFormInValid: (state: any) => {
    return state.isMakingForSomeoneFormInvalid && state.isBookingForSomeoneElse;
  },
  isSubmitted: (state: types.IState) => state.isSubmitted,

  extrasParams(state: any) {
    const { extrasParams } = state;
    return extrasParams.filter((extras: any) => extras.quantity);
  }
};
