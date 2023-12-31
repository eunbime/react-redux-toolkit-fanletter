import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../../axios/api";

const initialState = {
  user: {},
  error: null,
};

export const __getUser = createAsyncThunk(
  "getUser",
  async (payload, thunkAPI) => {
    try {
      const { data } = await loginApi.get(`/user`, {
        headers: {
          Authorization: `Bearer ${payload}`,
        },
      });
      console.log("getUser", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(__getUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const {} = userSlice.actions;
