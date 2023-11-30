import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const initialState = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : { userId: "", nickname: "", accessToken: "", avatar: "" };

const initialState = {
  auth: {},
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
      console.log(data);
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
      state.auth.userId = action.payload.userId;
      state.auth.nickname = action.payload.nickname;
      state.auth.accessToken = action.payload.accessToken;
      state.auth.avatar = action.payload.avatar;

      localStorage.setItem("user", JSON.stringify(state));
    },
    logoutUser: (state) => {
      localStorage.removeItem("user");
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
export const { loginUser, logoutUser, registerUser } = authSlice.actions;
