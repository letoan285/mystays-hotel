import { getBaseConfig } from '../../config'

export const getConfig = () => {
  const mBaseConfig = getBaseConfig()
  if (mBaseConfig) {
    return {
      ...mBaseConfig
    }
  }
}

export const getNuxtConfig = () => {
  return {
    headers: {
      'App-Version': 'tripla-API/1.0',
      'Client-Session':
        'eyJhbGciOiJIUzI1NiJ9.eyJwZXJtaXNzaW9uIjoiYWxsIiwiYWNjZXNzaWJsZV90eXBlIjpudWxsLCJhY2Nlc3NpYmxlX2lkcyI6W10sImFwcF90eXBlcyI6W10sImRhdGV0aW1lIjoxNTkwMzc3MTc2fQ.umO_E61cOwZtq0GlinD_tPSAQLqk1gffas2mWu2qLPE',
      'Tripla-Locale': 'en',
      'Content-Type': 'application/json'
    }
  }
}
