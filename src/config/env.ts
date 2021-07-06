export default {
  INT: 1,
  UAT: 2,
  PRODUCTION: 3
}
const defaultSession =
  'eyJhbGciOiJIUzI1NiJ9.eyJwZXJtaXNzaW9uIjoiYWxsIiwiYWNjZXNzaWJsZV90eXBlIjpudWxsLCJhY2Nlc3NpYmxlX2lkcyI6W10sImFwcF90eXBlcyI6W10sImRhdGV0aW1lIjoxNTkwMzc3MTc2fQ.umO_E61cOwZtq0GlinD_tPSAQLqk1gffas2mWu2qLPE'
export const defaultHeaders = {
  'App-Version': 'tripla-API/1.0',
  'Client-Session': defaultSession,
  'Tripla-Locale': 'en',
  'Content-Type': 'application/json'
}
