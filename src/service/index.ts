// service统一出口
import YLRequest from "./request"

const ylRequest = new YLRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000
})

export default ylRequest
