import GetCalendarUseCase from '../../domain/usecases/general/calendar'
import AppInitUseCase from '../../domain/usecases/general/appInitation'
import LocaleUseCase from '../../domain/usecases/general/locale'
import LocationUseCase from '../../domain/usecases/general/location'
import { GeneralActionTypes } from './types'

export default {
  initApplication ({ commit }: any) {
    commit(GeneralActionTypes.INIT_APPLICATION)
    const appInitUseCase = new AppInitUseCase()
    appInitUseCase
      .execute()
      .then((resp: any) => {
        commit(GeneralActionTypes.INIT_APPLICATION_SUCCESS, {
          payload: resp
        })
      })
      .catch((error) => {
        commit(GeneralActionTypes.INIT_APPLICATION_ERROR, {
          error
        })
      })
  },

  changeLanguage ({ commit }: any, payload: string) {
    commit(GeneralActionTypes.CHANGE_LANGUAGE, {
      payload
    })
    const useCase = new LocaleUseCase.ChangeLocaleUseCase(payload)
    useCase
      .execute()
      .then((_res) => {
        commit(GeneralActionTypes.CHANGE_LANGUAGE_SUCCESS, {
          payload
        })
      })
      .catch((error) => {
        commit(GeneralActionTypes.CHANGE_LANGUAGE_FAIL, {
          error
        })
      })
  },

  getLocale ({ commit }: any, payload: string) {
    const useCase = new LocaleUseCase.GetLocaleUseCase(payload)
    useCase
      .execute()
      .then((response: any) => {
        commit(GeneralActionTypes.GET_LOCALE_SUCCESS, {
          payload: response
        })
      })
      .catch((error) => {
        commit(GeneralActionTypes.GET_LOCALE_FAIL, {
          error
        })
      })
  },

  getDeviceInfo ({ commit }: any, payload: boolean) {
    commit(GeneralActionTypes.GET_DEVICE_INFO, {
      payload
    })
  },

  getLocation ({ commit }: any) {
    commit(GeneralActionTypes.GET_LOCATION)
    const useCase = new LocationUseCase.GetLocationUseCase()
    useCase
      .execute()
      .then((res) => {
        commit(GeneralActionTypes.GET_LOCATION_SUCCESS, {
          payload: res
        })
      })
      .catch((error) => {
        commit(GeneralActionTypes.GET_LOCATION_FAIL, {
          error
        })
      })
  },

  setLocation ({ commit }: any, payload: any) {
    const useCase = new LocationUseCase.SetLocationUseCase(payload)
    useCase.execute().then((_res: any) => {
      commit(GeneralActionTypes.SET_LOCATION, {
        payload
      })
    })
  },

  saveGtmData ({ commit }: any, payload: any) {
    commit(GeneralActionTypes.SAVE_GTM_DATA, payload)
  },

  getCalendarData ({ commit }: any, payload: any) {
    commit(GeneralActionTypes.GET_CALENDAR_DATA, payload)
    const usecase = new GetCalendarUseCase(payload)
    usecase
      .execute()
      .then((res: any) => {
        let disabled_dates: any = []
        let inventory: any = {}

        res.map((item: any) => {
          if (item.data.data.disabled_dates) { disabled_dates = [...disabled_dates, ...item.data.data.disabled_dates] };
          if (item.data.data.inventory) { inventory = { ...inventory, ...item.data.data.inventory } };
        })

        commit(GeneralActionTypes.GET_CALENDAR_DATA_SUCCESS, { disabled_dates, inventory })
      })
      .catch((err) => {
        commit(GeneralActionTypes.GET_CALENDAR_DATA_FAIL, err)
      })
  }
}
