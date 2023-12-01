import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  auth: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
  user: {},
  isLoading: false,
  isError: false,
  error: null,
};

export const __getUser = createAsyncThunk(
  "getUser",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(
        "https://moneyfulpublicpolicy.co.kr/user",
        {
          headers: {
            Authorization: `Bearer ${payload}`,
          },
        }
      );
      console.log("getUser", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
    },
    updateProfile: (state, action) => {
      state.auth = { ...state.auth, ...action.payload };
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state.auth, ...action.payload })
      );
    },
  },
  extraReducers: {
    [__getUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [__getUser.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { loginUser, logoutUser, registerUser, updateProfile } =
  authSlice.actions;
