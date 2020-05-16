import axios from 'axios'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})
export function getOss() {
  return service({
    // url: '/common/getCssStsToken',
    url: '/cms/backend/common/getCssStsToken',
    method: 'get'
  })
}
