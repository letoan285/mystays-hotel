export const GET_GUEST_DETAIL_ADDITIONAL_SUCCESS =
  "GET_GUEST_DETAIL_ADDITIONAL_SUCCESS";
export const GET_GUEST_DETAIL_ADDITIONAL_FAIL =
  "GET_GUEST_DETAIL_ADDITIONAL_FAIL";
export const GET_EXTRAS_SUCCESS = "GET_EXTRAS_SUCCESS";
export const GET_EXTRAS_FAIL = "GET_GUEST_DETAIL_ADDITIONAL_FAIL";
export const TRIGGER_IS_FORM_INVALID = "TRIGGER_IS_FORM_INVALID";
export const TRIGGER_IS_MAKING_FOR_SOMEONE_FORM_INVALID = "TRIGGER_IS_MAKING_FOR_SOMEONE_FORM_INVALID";
export const TRIGGER_SUBMIT_BUTTON = "TRIGGER_SUBMIT_BUTTON";
export const SAVE_EXTRAS_PARAMS = "SAVE_EXTRAS_PARAMS";
export const SAVE_EXTRAS_ANSWER = "SAVE_EXTRAS_ANSWER";

export const GET_GUEST_DETAIL_DATA = "GET_GUEST_DETAIL_DATA";

export const SAVE_GUEST_DATA_FROM_API = "SAVE_GUEST_DATA_FROM_API";
export const SAVE_GTM_DATA = "SAVE_GTM_DATA";

export const SAVE_ADDITIONAL_DATA = "SAVE_ADDITIONAL_DATA";
export const SAVE_BOOKING_FOR_SOMEONE_ELSE = "SAVE_BOOKING_FOR_SOMEONE_ELSE";

export const SAVE_IS_BOOKING_FOR_SOMEONE_ELSE =
  "SAVE_IS_BOOKING_FOR_SOMEONE_ELSE";
export const RESET_GUEST_DATA = "RESET_GUEST_DATA";

export interface IGuestDetailAdditional {
  title: string;
  detail: string;
  image: string;
}

export interface IState {
  additional: IGuestDetailAdditional;
  diningTime: Array<Object>;
  isFormInvalid: boolean;
  isSubmitted: boolean;
  additionalList: Array<any>;
  extrasList: Array<any>;
}
