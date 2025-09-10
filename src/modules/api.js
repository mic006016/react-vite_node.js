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
      new CustomEvent("ERROR_API", {
        detail: { cod: 403, msg: "리플래시 토큰 오류" },
      })
    )
  } else {
    const rs = await apiPost("/public/refresh", { refreshToken })
    if (rs?.success === "OK") {
      setTokens(rs?.data?.accessToken, rs?.data?.refreshToken)
      return true
    }
  }
  return false
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
  (err) => {
    window.dispatchEvent(
      new CustomEvent("ERROR_API", {
        detail: { cod: 403, msg: "API 요청 오류", err },
      })
    )
    return Promise.reject(null)
  }
)

/***** Axios Response 콜백 *****/
instance.interceptors.response.use(
  (response) => {
    if (response.data?.success === "FAIL" && response.data?.error) {
      // 비지니스에러
      const { cod, msg, data } = response.data?.error || {}
      window.dispatchEvent(
        new CustomEvent("ERROR_BIZ", {
          detail: { cod, msg, data },
        })
      )
      return null
    }
    return response?.data || null
  },
  async (error) => {
    if (error?.status === 401) {
      console.log("===== 리플래시 토큰 갱신 요청 =====")
      if (!isUpdatingToken) {
        // 갱신중
        if (retrieveToken()) {
          promiseQueue.forEach((config) => instance(config))
          isUpdatingToken = false
          promiseQueue = []
        } else {
          promiseQueue.push(error.config)
        }
      }
    } else {
      // 공통 에러 처리 500등
      const { cod, msg, data } = error?.response?.data?.error || {}
      window.dispatchEvent(
        new CustomEvent("ERROR_API", {
          detail: { cod, msg, data },
        })
      )
    }
    return Promise.reject(null)
  }
)

// data: post, params: get
const api = async (url, params = null) => {
  const response = await instance({
    method: "GET",
    url,
    params,
  })
  return response || null
}

const apiPost = async (url, data = null) => {
  const response = await instance({
    method: "POST",
    url,
    data,
  })
  return response || null
}

const apiFile = async (url, data = null) => {
  const response = await instance({
    method: "FILE",
    url,
    data,
  })
  return response || null
}

export { api, apiPost, apiFile }
