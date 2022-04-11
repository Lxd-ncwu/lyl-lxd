import axios from "axios"
import { AxiosInstance } from "axios"
import { YLRequestConfig, YLRequestInterceptors } from "./type"

class YLRequest {
  instance: AxiosInstance
  interceptors?: YLRequestInterceptors

  constructor(config: YLRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存拦截器
    this.interceptors = config.interceptors
    // 使用保存的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 全局请求拦截器
    // this.instance.interceptors.request.use(
    //   (config) => {
    //     // 例如修改headers和加token的逻辑
    //     return config
    //   },
    //   (err) => {
    //     return err
    //   }
    // )
    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data
        return data
      },
      (err) => {
        return err
      }
    )
  }

  request<T>(config: YLRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对请求的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }

  get<T>(config: YLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" })
  }
  post<T>(config: YLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" })
  }
  delete<T>(config: YLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" })
  }
  patch<T>(config: YLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" })
  }
}

export default YLRequest
