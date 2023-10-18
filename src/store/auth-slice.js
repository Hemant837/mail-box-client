import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false, idToken: "", userEmail: "" },
  reducers: {
    isLogin(state) {
      state.isAuthenticated = true;
    },
    isLogout(state) {
      state.isAuthenticated = false;
    },
    setIdToken(state, action) {
      state.idToken = action.payload;
    },
    setUserEmail(state, action) {
      state.userEmail = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
