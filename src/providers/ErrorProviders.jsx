// ERROR_API -> 오류페이지
// ERROR_BIZ -> Alert으로 보내서 alert창을 띄운다.

import { createContext, useContext, useEffect, useState } from "react"

export const ErrorContext = createContext()

export default function ErrorProvider({ children }) {
  const [rootError, setRootError] = useState(null)

  useEffect(() => {
    const onError = (e) => {
      console.log("ErrorProvider", e)
    }
    const onBizError = (e) => {
      console.log("ErrorProvider", e)
    }
    window.addEventListener("ERROR_API", onError)
    window.addEventListener("ERROR_BIZ", onBizError)
    return () => {
      window.removeEventListener("ERROR_API", onError)
      window.removeEventListener("ERROR_BIZ", onBizError)
    }
  }, [])

  return (
    <ErrorContext.Provider value={{ rootError, setRootError }}>
      {children}
    </ErrorContext.Provider>
  )
}
