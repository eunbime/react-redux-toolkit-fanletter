import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  letters: localStorage.getItem("letters")
    ? JSON.parse(localStorage.getItem("letters"))
    : {},
  isLoading: false,
  isError: false,
  error: null,
};

export const __getLetters = createAsyncThunk(
  "getLetters",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/letters?_sort=createdAt&_order=desc`
      );
      console.log(data);
      // localStorage.setItem("letters", JSON.stringify(data));
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addLetter = createAsyncThunk(
  "addLetter",
  async (newLetter, thunkAPI) => {
    try {
      axios.post(`${process.env.REACT_APP_SERVER_URL}/letters`, newLetter);

      return thunkAPI.fulfillWithValue(newLetter);
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteLetter = createAsyncThunk(
  "deleteLetter",
  async (id, thunkAPI) => {
    try {
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/letters/${id}`);
      return thunkAPI.fulfillWithValue(id);
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editLetter = createAsyncThunk(
  "editLetter",
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const { id, editingText } = payload;
      const { data } = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/letters/${id}`,
        {
          content: editingText,
        }
      );
      console.log(data);

      thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error.message);
      thunkAPI.rejectWithValue(error);
    }
  }
);

const lettersSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {
    updateLetter: (state, action) => {
      const { userId, imgUrl, input } = action.payload;
      state.letters = state.letters.map((letter) => {
        if (letter.userId === userId) {
          return { ...letter, avatar: imgUrl, nickname: input };
        }
        return letter;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getLetters.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__getLetters.fulfilled, (state, action) => {
        // console.log("fulfiled", action);
        state.isLoading = false;
        state.isError = false;
        state.letters = action.payload;
        localStorage.setItem("letters", JSON.stringify(state.letters));
      })
      .addCase(__getLetters.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(__addLetter.fulfilled, (state, action) => {
        state.letters = [action.payload, ...state.letters];
      })
      .addCase(__addLetter.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(__deleteLetter.fulfilled, (state, action) => {
        const letterId = action.payload;
        state.letters = state.letters.filter(
          (letter) => letter.id !== letterId
        );
      })
      .addCase(__deleteLetter.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(__editLetter.fulfilled, (state, action) => {
        state.letters = state.letters.map((letter) => {
          if (letter.id === action.payload.id) {
            return { ...letter, content: action.payload.content };
          }
          return letter;
        });
      })
      .addCase(__editLetter.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default lettersSlice.reducer;
export const { addLetter, deleteLetter, editLetter, updateLetter } =
  lettersSlice.actions;
