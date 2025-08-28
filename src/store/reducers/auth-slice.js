import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  isLogging: false,
  isLogOn: false,
  data: {},
  error: null,
}

export const fetchUser = createAsyncThunk("auth/fetchUser", async (userId) => {
  const url = "https://jsonplaceholder.typicode.com/users/"
  const response = await axios(url + userId)
  return response
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isLogging = false
      state.isLogOn = false
      state.data = {}
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.user.isLogging = true
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user.isLogging = false
        state.user.isLogOn = true
        state.user.data = action.payload.data || {}
        state.user.error = null
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.user.isLogging = false
        state.user.isLogOn = false
        state.user.data = {}
        state.user.error = action.payload.error.data || null
      })
  },
})

export default authSlice.reducer
export const { logOut } = authSlice.actions

// export default React
// export { useState, useCallback }
// import glbReducer from "glb-slice"
// import { fetchUser } from "glb-slice"
