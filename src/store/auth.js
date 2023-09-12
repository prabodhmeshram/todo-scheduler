import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: false,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload.isLoggedIn;
    },
  },
});

export const { login } = authSlice.actions;

export const selectLogin = (state) => state.auth.value;

export default authSlice.reducer;
