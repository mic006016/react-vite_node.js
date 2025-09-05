import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  // 채팅(구글)로그인
  isLogging: false,
  isLogOn: false,
  user: {},
  error: null,
  // Express 로그인
  isLocalLogging: false,
  isLocalLogOn: false,
  localUser: {},
  localError: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOn: (state, action) => {
      state.isLogging = false
      state.isLogOn = !!action.payload.isLogOn
      state.user = action.payload.user
      state.error = null
    },
    logOut: (state) => {
      state.isLogging = false
      state.isLogOn = false
      state.user = {}
      state.error = null
    },
    localLogOn: (state, action) => {
      state.isLocalLogging = false
      state.isLocalLogOn = !!action.payload.isLocalLogOn
      state.localUser = action.payload.localUser
      state.localError = null
    },
    localLogOut: (state) => {
      state.isLocalLogging = false
      state.isLocalLogOn = false
      state.localUser = {}
      state.localError = null
    },
  },
})

export default authSlice.reducer
export const { logOn, logOut, localLogOn, localLogOut } = authSlice.actions
