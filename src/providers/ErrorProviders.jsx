import { createContext, useContext, useEffect, useState } from "react"

export const ErrorContext = createContext()

export default function ErrorProvider({ children }) {
  const [rootError, setRootError] = useState(null)

  useEffect(() => {
    const onError = (e) => {
      console.log("ErrorProvider", e)
    }
    window.addEventListener("ERROR_API", onError)
    return () => window.removeEventListener("ERROR_API", onError)
  }, [])

  return (
    <ErrorContext.Provider value={{ rootError, setRootError }}>
      {children}
    </ErrorContext.Provider>
  )
}
