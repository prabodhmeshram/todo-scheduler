import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: Boolean(sessionStorage.getItem("logged-in-user")),
  },
  reducers: {
    login: (state, action) => {
      sessionStorage.setItem("logged-in-user", action.payload.user.username);
      state.value = true;
    },
    logout: (state) => {
      sessionStorage.removeItem("logged-in-user");
      state.value = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectLogin = (state) => state.auth.value;

export default authSlice.reducer;
