import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAt-4kf23CyiK-Bx9_9V77zivjqBxcyHHk",
  authDomain: "yellowoobi-store.firebaseapp.com",
  projectId: "yellowoobi-store",
  storageBucket: "yellowoobi-store.firebasestorage.app",
  messagingSenderId: "16543808244",
  appId: "1:16543808244:web:5e066183a55bd95be77ca1",
  measurementId: "G-HBQNS9G5X2",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const analytics = getAnalytics(app)

export { app, auth, googleProvider, signInWithPopup, signOut }
