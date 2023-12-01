import Router from "shared/Router";
import GlobalStyle from "GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { __getUser } from "redux/modules/aurhSlice";
import { __getLetters } from "redux/modules/lettersSlice";

function App() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth.auth);

  useEffect(() => {
    dispatch(__getUser(accessToken));
  }, [accessToken]);

  useEffect(() => {
    dispatch(__getLetters());
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
