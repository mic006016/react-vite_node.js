import { createContext } from "react"
import {
  auth,
  googleProvider,
  signOut,
  signInWithPopup,
} from "@/modules/firebase"

export const FirebaseContext = createContext(null)
export default function FirebaseProvider({ children }) {
  const value = {
    auth,
    googleProvider,
    signOut,
    signInWithPopup,
  }
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  )
}
