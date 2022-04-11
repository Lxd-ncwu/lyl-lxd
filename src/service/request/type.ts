import type { AxiosRequestConfig, AxiosResponse } from "axios"

// 定义接口
export interface YLRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface YLRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YLRequestInterceptors<T>
}
