import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import localStorage from "redux-persist/lib/storage"
import sessionStorage from "redux-persist/lib/storage/session"
import uiReducer from "./reducers/ui-slice"
import authReducer from "./reducers/auth-slice"

const uiPersistConfig = {
  key: "ui",
  storage: localStorage,
}
const authPersistConfig = {
  key: "auth",
  storage: sessionStorage,
}
const rootReducer = combineReducers({
  ui: persistReducer(uiPersistConfig, uiReducer),
  auth: persistReducer(authPersistConfig, authReducer),
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
})

const persistor = persistStore(store, null, () => {
  console.log("Persisted state loaded")
})

export { store, persistor }
