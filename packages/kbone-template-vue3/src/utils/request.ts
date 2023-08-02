import axios, { type AxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios'

const request = axios.create({
  baseURL: 'https://api.tinmusic.com.cn'
  // baseURL: 'http://localhost:58834'
})

export type Response<T> = AxiosResponse<{
  code: number
  success: boolean
  result: T
  message: string
  timestamp: number
}>

export type Error = AxiosError<{
  error?: string
  message?: string
}>

const requestHandler = (config: AxiosRequestConfig) => {
  return config
}

const responseHandler = <T>(response: Response<T>) => {
  //   const { data } = response
  //   return data as unknown as T
  return response
}

const errorHandler = (error: Error): Promise<unknown> => {
  const { response } = error
  if (response) {
    const { data, status, statusText } = response
    switch (status) {
      case 401:
        break
      case 403:
        break
      case 500:
        break
    }
  }
  return Promise.reject(error)
}

// Add a request interceptor
request.interceptors.request.use(
  // Do something before request is sent
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  requestHandler,
  // Do something with request error
  errorHandler
)

// Add a response interceptor
request.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  responseHandler,
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  errorHandler
)

export default request
