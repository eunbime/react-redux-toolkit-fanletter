import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import fakeData from "fakeData.json";

const initialState = {
  letters: fakeData,
  isLoading: false,
  isError: false,
  error: null,
};

export const __getLetters = createAsyncThunk(
  "getLetters",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/letters?_sort=createdAt&_order=desc"
      );
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const lettersSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {
    addLetter: (state, action) => {
      state.letters = [action.payload, ...state.letters];
    },
    deleteLetter: (state, action) => {
      const letterId = action.payload;
      state.letters = state.letters.filter((letter) => letter.id !== letterId);
    },
    editLetter: (state, action) => {
      const { id, editingText } = action.payload;
      state.letters = state.letters.map((letter) => {
        if (letter.id === id) {
          return { ...letter, content: editingText };
        }
        return letter;
      });
    },
  },
  extraReducers: {
    [__getLetters.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getLetters.fulfilled]: (state, action) => {
      console.log("fulfiled", action);
      state.isLoading = false;
      state.isError = false;
      state.letters = action.payload;
    },
    [__getLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export default lettersSlice.reducer;
export const { addLetter, deleteLetter, editLetter } = lettersSlice.actions;
