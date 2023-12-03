import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
  isError: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.auth = action.payload;
      localStorage.setItem("user", JSON.stringify(state.auth));
    },
    logoutUser: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("letters");
    },
    updateProfile: (state, action) => {
      state.auth = { ...state.auth, ...action.payload };
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state.auth, ...action.payload })
      );
    },
  },
  extraReducers: {},
});

export default authSlice.reducer;
export const { loginUser, logoutUser, registerUser, updateProfile } =
  authSlice.actions;
