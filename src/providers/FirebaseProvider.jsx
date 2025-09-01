import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { createContext } from "react" // create component

export const FirebaseContext = createContext(null)
export default function FirebaseProvider({ children }) {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  }
  //앱 만들기
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const googleProvider = new GoogleAuthProvider()
  const analytics = getAnalytics(app)
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
