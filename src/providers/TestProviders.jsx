import { createContext, useContext, useState } from "react"

export const TestContext = createContext()

export default function TestProvider({ children }) {
  const [test, setTest] = useState("ABCD")
  // const value = { test, setTest }
  setTimeout(() => {
    // setTest("Hello")
  }, 2000)

  return (
    <TestContext.Provider value={{ test, setTest }}>
      {children}
    </TestContext.Provider>
  )
}
