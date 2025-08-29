/**
suspense = false: React Suspense 모드를 활성화 (상세내용)
fetcher(args): fetcher 함수
revalidateIfStale = true: 오래된 데이터가 있더라도 자동으로 다시 확인 (상세내용)
revalidateOnMount: 컴포넌트가 마운트되었을 때 자동 갱신 활성화 또는 비활성화 (details)
revalidateOnFocus = true: 창이 포커싱되었을 때 자동 갱신 (상세내용)
revalidateOnReconnect = true: 브라우저가 네트워크 연결을 다시 얻었을 때 자동으로 갱신(navigator.onLine을 통해) (상세내용)
refreshInterval (상세내용):
기본적으로는 비활성화: refreshInterval = 0
number로 설정된 경우, 폴링 인터벌(밀리초)
function으로 설정된 경우, 함수가 최신 데이터를 받고 인터벌 반환(밀리초)
refreshWhenHidden = false: 창이 보이지 않을 때 폴링(refreshInterval이 활성화된 경우)
refreshWhenOffline = false: 브라우저가 오프라인일 때 폴링(navigator.onLine에 의해 결정됨)
shouldRetryOnError = true: fetcher에 에러가 있을 때 재시도
dedupingInterval = 2000: 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거(밀리초)
focusThrottleInterval = 5000: 이 시간 범위 동안 단 한 번만 갱신(밀리초)
loadingTimeout = 3000: onLoadingSlow 이벤트를 트리거 하기 위한 타임아웃(밀리초)
errorRetryInterval = 5000: 에러 재시도 인터벌(밀리초)
errorRetryCount: 최대 에러 재시도 수
fallback: 다중 폴백 데이터의 키-값 객체 (예시)
fallbackData: 반환될 초기 데이터(노트: hook 별로 존재)
keepPreviousData = false: 새 데이터가 로드될 때까지 이전 키의 데이터를 반환 (상세내용)
onLoadingSlow(key, config): 요청을 로드하는 데 너무 오래 걸리는 경우의 콜백 함수(loadingTimeout을 보세요)
onSuccess(data, key, config): 요청이 성공적으로 종료되었을 경우의 콜백 함수
onError(err, key, config): 요청이 에러를 반환했을 경우의 콜백 함수
onErrorRetry(err, key, config, revalidate, revalidateOps): 에러 재시도 핸들러
onDiscarded(key): 경합 상태(race condition)로 인해 요청이 무시될 경우 실행되는 콜백 함수
compare(a, b): 비논리적인 리렌더러를 회피하기 위해 반환된 데이터가 변경되었는지를 감지하는데 사용하는 비교 함수. 기본적으로 stable-hash(opens in a new tab)을 사용합니다.
isPaused(): 갱신의 중지 여부를 감지하는 함수. true가 반환될 경우 가져온 데이터와 에러는 무시합니다. 기본적으로는 false를 반환합니다.
use: 미들웨어 함수의 배열 (상세내용)
 */

import { api } from "@/modules/api"

export const typiFetcher = (url) => {
  const baseURL = "https://jsonplaceholder.typicode.com"
  return api.get(baseURL + url).then((response) => response.data)
}

export const firebaseGetFetcher = (url) => {
  const baseURL = "https://jsonplaceholder.typicode.com"
  api.get(baseURL + url).then((response) => response.data)
}

export const firebasePostFetcher = (url) => {
  const baseURL = "https://jsonplaceholder.typicode.com"
  api.get(baseURL + url).then((response) => response.data)
}
export const swrValue = {
  suspense: false,
  fetcher: typiFetcher,
  revalidateIfStale: false,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0,
  refreshWhenHidden: false,
  refreshWhenOffline: false,
  shouldRetryOnError: false,
  dedupingInterval: 2000,
  focusThrottleInterval: 5000,
  loadingTimeout: 3000,
  errorRetryInterval: 5000,
  errorRetryCount: 0,
  keepPreviousData: true,
  onLoadingSlow: (key, config) => {},
  onSuccess: (data, key, config) => {},
  onError: (err, key, config) => {
    console.log(err, key, config)
  },
  onErrorRetry: (err, key, config, revalidate, revalidateOps) => {},
  onDiscarded: (key) => {},
  // compare: (a, b) => true,
  // isPaused: () => false,
}
