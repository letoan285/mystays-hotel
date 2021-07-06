export default class Config {
  _environment: number
  _endPoint: string
  _authorizationKey?: string

  // Consumer information
  _consumerKey?: string
  _consumerSecret?: string

  // Admin information
  _accessToken?: string
  _accessTokenSecret?: string

  constructor (
    environment: number,
    endPoint: string,
    authorizationKey?: string
  ) {
    this._environment = environment
    this._endPoint = endPoint
    this._authorizationKey = authorizationKey
  }

  static init = (environment: number, endPoint: string) => {
    return new Config(environment, endPoint, undefined)
  }

  addConsumerKey = (consumerKey: string) => {
    this._consumerKey = consumerKey
    return this
  }

  addConsumerSecret = (consumerSecret: string) => {
    this._consumerSecret = consumerSecret
    return this
  }

  addAccessToken = (accessToken: string) => {
    this._accessToken = accessToken
    return this
  }

  addAccessTokenSecret = (accessTokenSecret: string) => {
    this._accessTokenSecret = accessTokenSecret
    return this
  }
}
