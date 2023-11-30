import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : { userId: "", nickname: "", accessToken: "", avatar: "" };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.userId = action.payload.userId;
      state.nickname = action.payload.nickname;
      state.accessToken = action.payload.accessToken;
      state.avatar = action.payload.avatar;

      localStorage.setItem("user", JSON.stringify(state));
    },
    logoutUser: (state) => {
      localStorage.removeItem("user");
    },
  },
});

export default authSlice.reducer;
export const { loginUser, logoutUser, registerUser } = authSlice.actions;
