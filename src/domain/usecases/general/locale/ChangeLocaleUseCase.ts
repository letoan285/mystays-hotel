import { IUseCase } from '../../../../shared/interfaces/common/usecase'
import ResponseModel from '../../../../models/response'
import LanguageRepository from '../../../../data/repository/locale'

export default class ChangeLocaleUseCase implements IUseCase {
  private languageRepository: LanguageRepository

  constructor (private lang: string) {
    this.languageRepository = new LanguageRepository()
  }

  execute = (): Promise<ResponseModel<string>> => {
    return new Promise((resolve, reject) => {
      this.languageRepository
        .saveLocale(this.lang)
        .then((res) => {
          resolve(res)
        })
        .catch(reject)
    })
  }
}
