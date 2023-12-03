import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = "";

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    selectMember: (_, action) => action.payload,
  },
});

export default memberSlice.reducer;
export const { selectMember } = memberSlice.actions;
