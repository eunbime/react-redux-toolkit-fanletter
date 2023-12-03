import { configureStore } from "@reduxjs/toolkit";
import letters from "redux/modules/lettersSlice";
import member from "redux/modules/memberSlice";
import auth from "redux/modules/authSlice";
import user from "redux/modules/userSlice";

const store = configureStore({
  reducer: {
    letters,
    member,
    auth,
    user,
  },
});

export default store;
