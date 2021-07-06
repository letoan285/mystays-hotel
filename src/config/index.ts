import { IRemoteConfig } from '../shared/interfaces/common'

let configs: IRemoteConfig | undefined

export const initConfig = (): Promise<IRemoteConfig> => {
  return new Promise((resolve) => {
    /**
     * Some data from remote config API place here
     */
    const remoteConfig = {
      headers: {
        'App-Version': 'tripla-API/1.0',
        'Client-Session':
          'eyJhbGciOiJIUzI1NiJ9.eyJwZXJtaXNzaW9uIjoiYWxsIiwiYWNjZXNzaWJsZV90eXBlIjpudWxsLCJhY2Nlc3NpYmxlX2lkcyI6W10sImFwcF90eXBlcyI6W10sImRhdGV0aW1lIjoxNTkwMzc3MTc2fQ.umO_E61cOwZtq0GlinD_tPSAQLqk1gffas2mWu2qLPE',
        'Tripla-Locale': 'en',
        'Content-Type': 'application/json'
      }
    }
    /**
     * Some data from remote config API place here
     */

    const config: IRemoteConfig = {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InNpdGVjb3JlXFxJbnRlcm5hbEFwaVVzZXIiLCJuYmYiOjE1ODk3OTA5MTIsImV4cCI6NDc0NTQ2NDUxMiwiaWF0IjoxNTg5NzkwOTEyLCJpc3MiOiJodHRwOi8vZGV2LnJlZGlzYXBpLm15c3RheXMuY29tIn0.1qb571XqYjwpJZc3KgwOquB2gRYnjohTDNBUwpV8x8I',
      endpoint: 'https://triplaapi.mystays.com',
      domain: 'https://triplaapi.mystays.com',
      googleApiKey: 'AIzaSyCMHguf4YtVuO7CzkFawENNXmIXSJ-c9uM',
      adminUsername: 'toanlv@smartosc.com',
      adminPassword: 'testtest',
      session_endpoint: 'https://endpoint.tripla.ai', // https://idp.tripla.ai
      membership_endpoint: 'https://endpoint.tripla.ai',
      new_membership_endpoint: 'https://endpoint.tripla.ai',
      new_session_endpoint: 'https://endpoint.tripla.ai', // https://idp.tripla.ai
      ...remoteConfig
    }

    configs = config

    resolve(config)
  })
}

export const getBaseConfig = (): IRemoteConfig | undefined => {
    return configs;
}
