import HotelUsecase from "../../domain/usecases/hotel";
import * as types from "./types";

export default {
  triggerIsFormInvalid({ commit }: any, payload: boolean) {
    commit(types.TRIGGER_IS_FORM_INVALID, payload);
  },
  triggerSubmitButton({ commit }: any) {
    commit(types.TRIGGER_SUBMIT_BUTTON);
  },

  getExtras({ commit }: any, payload: any) {
    const extrasUseCase = new HotelUsecase.GetExtrasUseCase(payload);
    extrasUseCase
      .execute()
      .then((resp: any) => {
        commit(types.GET_EXTRAS_SUCCESS, resp.data);
      })
      .catch((error: any) => {
        commit(types.GET_EXTRAS_FAIL, { error });
      });
  },

  getAdditionalQuestion({ commit }: any, payload: any) {
    const additionalQuestionUseCase = new HotelUsecase.GetAdditionalQuestionUseCase(
      payload
    );
    additionalQuestionUseCase
      .execute()
      .then((resp: any) => {
        commit(types.GET_GUEST_DETAIL_ADDITIONAL_SUCCESS, resp.data);
      })
      .catch((error: any) => {
        commit(types.GET_GUEST_DETAIL_ADDITIONAL_FAIL, { error });
      });
  },

  getDataGuestDetail({ commit }: any, payload: any) {
    commit(types.GET_GUEST_DETAIL_DATA, { payload });
  },

  saveGuestDataFromAPI({ commit }: any, payload: any) {
    commit(types.SAVE_GUEST_DATA_FROM_API, payload);
  },

  saveExtrasParams({ commit }: any, payload: any) {
    commit(types.SAVE_EXTRAS_PARAMS, payload);
  },

  saveExtrasAnswer({ commit }: any, payload: any) {
    commit(types.SAVE_EXTRAS_ANSWER, payload);
  },

  saveGuestDetailData({ commit }: any, payload: any) {
    commit(types.SAVE_GTM_DATA, payload);
  },

  saveAdditionallData({ commit }: any, payload: any) {
    commit(types.SAVE_ADDITIONAL_DATA, payload);
  },

  saveBookingForSomeoneElseData({ commit }: any, payload: any) {
    commit(types.SAVE_BOOKING_FOR_SOMEONE_ELSE, payload);
  },

  saveiSBookingForSomeoneElseData({ commit }: any, payload: any) {
    commit(types.SAVE_IS_BOOKING_FOR_SOMEONE_ELSE, payload);
  },

  triggerIsMakingForSomeoneFormInvalid({ commit }: any, payload: any) {
    commit(types.TRIGGER_IS_MAKING_FOR_SOMEONE_FORM_INVALID, payload);
  },

  resetGuestData({ commit }: any) {
    commit("RESET_GUEST_DATA");
  }
};
