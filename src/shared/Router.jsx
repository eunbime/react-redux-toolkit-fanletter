import React, { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "../pages/Home";
import Layout from "./Layout/Layout";
import Letter from "../pages/Letter";
import Detail from "../pages/Detail";
import Profile from "pages/Profile";
import Login from "pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { __getUser } from "redux/modules/userSlice";
import { __getLetters } from "redux/modules/lettersSlice";

const Router = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const {
    auth: { accessToken },
  } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  console.log(user.success);

  useEffect(() => {
    dispatch(__getUser(accessToken));
  }, [accessToken]);

  useEffect(() => {
    dispatch(__getLetters());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {accessToken ? (
          <>
            <Route path="/" element={<Layout />}>
              <Route index path="/" element={<Home />} />
              <Route path="/letter" element={<Letter />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
            <Route path="/letter/:id" element={<Detail />} />
          </>
        ) : (
          <Route path="*" element={<Navigate replace to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
