import * as fromTypes from "./types";

export default {
  [fromTypes.TRIGGER_IS_FORM_INVALID](
    state: fromTypes.IState,
    payload: boolean
  ) {
    state.isFormInvalid = payload;
  },
  [fromTypes.TRIGGER_SUBMIT_BUTTON](state: fromTypes.IState) {
    state.isSubmitted = !state.isSubmitted;
  },

  [fromTypes.GET_EXTRAS_SUCCESS](state: fromTypes.IState, payload: any) {
    state.extrasList = payload.data;
  },

  [fromTypes.GET_EXTRAS_FAIL](_state: fromTypes.IState, _payload: any) {},

  [fromTypes.GET_GUEST_DETAIL_ADDITIONAL_SUCCESS](
    state: fromTypes.IState,
    payload: any
  ) {
    state.additionalList = payload.data;
  },

  [fromTypes.GET_GUEST_DETAIL_ADDITIONAL_FAIL](
    _state: fromTypes.IState,
    _payload: any
  ) {},
  [fromTypes.GET_GUEST_DETAIL_DATA](state: any, action: any) {
    const guestArr = action.payload.map((item: any) => {
      const guest = {
        email: `${item.guestInfoInput.email.value?.trim()}`,
        name: `${item.guestInfoInput.firstNameInput.value?.trim()} ${item.guestInfoInput.lastNameInput.value?.trim()}`,
        first_name: `${item.guestInfoInput.firstNameInput.value?.trim()}`,
        last_name: `${item.guestInfoInput.lastNameInput.value?.trim()}`,
        first_name_kana: `${item.guestInfoInput.kanjiFirstName.value?.trim()}`,
        last_name_kana: `${item.guestInfoInput.kanjiLastName.value?.trim()}`,
        phone: `${item.guestInfoInput.phone.value?.trim()}`,
        additional: item.additional
      };
      return guest;
    });
    state.guest = guestArr;
  },

  [fromTypes.SAVE_GUEST_DATA_FROM_API](state: any, payload: any) {
    state.guest = payload;
  },

  [fromTypes.SAVE_EXTRAS_PARAMS](state: any, payload: any) {
    state.extrasParams = payload;
  },

  [fromTypes.SAVE_GTM_DATA](_state: any, _payload: any) {},

  [fromTypes.SAVE_ADDITIONAL_DATA](_state: any, _payload: any) {},

  [fromTypes.SAVE_BOOKING_FOR_SOMEONE_ELSE](state: any, payload: any) {
    state.someoneElseData = {
      first_name: payload.firstNameInput.value,
      first_name_kana: payload.kanjiFirstName.value,
      last_name: payload.lastNameInput.value,
      last_name_kana: payload.kanjiLastName.value
    };
  },

  [fromTypes.SAVE_IS_BOOKING_FOR_SOMEONE_ELSE](state: any, payload: any) {
    state.isBookingForSomeoneElse = payload;
  },

  [fromTypes.TRIGGER_IS_MAKING_FOR_SOMEONE_FORM_INVALID](
    state: any,
    payload: any
  ) {
    state.isMakingForSomeoneFormInvalid = payload;
  },

  [fromTypes.RESET_GUEST_DATA](state: any) {
    state.someoneElseData = {};
    state.guest = [];
    state.isBookingForSomeoneElse = false;
    state.extrasParams = [
      {
        extra_id: "",
        quantity: 0,
        delivery_times: [
          {
            delivered_at: "",
            quantity: 0
          }
        ],
        answer: ""
      }
    ];
  }
};
