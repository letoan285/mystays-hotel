import { IUseCase } from '../../../../shared/interfaces/common/usecase'
import ResponseModel from '../../../../models/response'
import LanguageRepository from '../../../../data/repository/locale'

export default class GetLocaleUseCase implements IUseCase {
  private languageRepository: LanguageRepository

  constructor (private locale: string) {
    this.languageRepository = new LanguageRepository()
  }

  execute = (): Promise<ResponseModel<string>> => {
    return new Promise((resolve, reject) => {
      this.languageRepository
        .getLocale(this.locale)
        .then((res) => {
          resolve(res)
        })
        .catch(reject)
    })
  }
}
