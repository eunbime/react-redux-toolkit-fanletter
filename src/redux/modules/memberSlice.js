import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = "";

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    selectMember: (state, action) => {
      const activeMember = action.payload;
      return activeMember;
    },
  },
});

export default memberSlice.reducer;
export const { selectMember } = memberSlice.actions;
