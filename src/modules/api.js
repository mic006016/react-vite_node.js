/**
 * axios -> rs : { config, headers, ... error, data }
 * rs.data -> { success: "OK" | "FAIL", data?: {}, error?: {} }
 *
 * 1. api 공통 파라메터 생성
 * 2. 토큰 저장/가져오는 함수(LocalStorage)
 * 3. interceptors.request 토큰 탑재
 * 4. interceptors.response 401처리(동시요청처리)
 * 5. Token갱신 및 지연요청 송신
 */
import axios from "axios"

/***** 전역상수 *****/
export const BASE_URL = import.meta.env.VITE_EXPRESS_API
export const REFRESH_URL = import.meta.env.VITE_REFRESH_API
export const TIMEOUT = Number(import.meta.env.VITE_TIMEOUT_API)

/***** 전역변수 *****/
let promiseQueue = []
let isUpdatingToken = false

/***** 토큰 Getter/Setter *****/
export const getAccessToken = () => {
  return window.localStorage.getItem("accessToken")
}
export const getRefreshToken = () => {
  return window.localStorage.getItem("refreshToken")
}
export const getTokens = () => {
  return {
    accessToken: window.localStorage.getItem("accessToken"),
    refreshToken: window.localStorage.getItem("refreshToken"),
  }
}
export const setTokens = (accessToken, refreshToken) => {
  window.localStorage.setItem("accessToken", accessToken)
  window.localStorage.setItem("refreshToken", refreshToken)
}
export const clearTokens = () => {
  window.localStorage.removeItem("accessToken")
  window.localStorage.removeItem("refreshToken")
}

/***** Token 갱신 API *****/
// 401이 리턴되면 refreshToken을 실어서 API요청을 보내고, 응답받은 토큰을 저장
export const retrieveToken = async () => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    clearTokens()
    window.dispatchEvent(
      new CustomEvent("ERROR_API", { code: 403, msg: "리프레시 토큰 오류" })
    )
  }
  const rs = await api({
    url: "/public/refresh",
    type: "POST",
    data: {
      refreshToken,
    },
  })
  if (rs?.success === "OK") {
    setTokens(rs?.data?.accessToken, rs?.data?.refreshToken)
    promiseQueue.forEach((config) => {
      instance(config)
    })
    isUpdatingToken = false
    promiseQueue = []
  }
  return rs?.success === "OK"
}

/***** Axios Instance *****/
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
})

/***** Axios Request 콜백 *****/
instance.interceptors.request.use(
  (config) => {
    const url = config.url || ""
    const isPublic = url.toUpperCase().includes("PUBLIC")
    if (!isPublic) {
      const accessToken = getAccessToken()
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
        config.headers.withCredentials = true
      }
    }
    if (config.method?.toUpperCase() === "FILE") {
      config.headers["Content-Type"] = "multipart/form-data"
      config.method = "POST"
    } else {
      config.headers["Content-Type"] = "application/json"
    }
    return config
  },
  (error) => {
    return Promise.resolve(null)
    // return Promise.reject(error)
  }
)

/***** Axios Response 콜백 *****/
instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error?.status === 401) {
      console.log("===== 리플래시 토큰 갱신 요청 =====")
      // TODO :: 리플래시 토큰 요청 코드
      retrieveToken()
      promiseQueue.push(error.config)
      isUpdatingToken = true
    }
    if (error.response?.status === 500) {
      // 공통 에러 처리
    }
    return Promise.resolve(null)
    // return Promise.reject(error)
  }
)

// data: post, params: get
const api = async ({ url, type = "GET", data = null, params = null }) => {
  let method = type.toUpperCase()
  const response = await instance({
    method,
    url,
    data,
    params,
  })
  // TODO :: response.error
  return response?.data || null
}

export { api }
