import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userId: null,
  },
  reducers: {
    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userId = action.payload.userId;
    },
  },
});

export const { setLoginStatus } = authSlice.actions;

export default authSlice.reducer;
