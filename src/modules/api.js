/**
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
    throw new Error("토큰만료")
  }
  const rs = await api({
    url: "/public/refresh",
    type: "POST",
    data: {
      refreshToken,
    },
  })
  console.log(rs)
  // setTokens({ accessToken: rs.accessToken, refreshToken: rs.refreshToken })
  return rs ? true : false
}

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
})

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
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // TODO :: 리플래시 토큰 요청 코드
      // if (retrieveToken()) {
      // }
    }
    if (error.response?.status === 500) {
      // 공통 에러 처리
    }
    return Promise.reject(error)
  }
)

// data: post, params: get
const api = ({ url, type = "GET", data = null, params = null }) => {
  let method = type.toUpperCase()
  return instance({
    method,
    url,
    data,
    params,
  })
}

export { api }
