import Form from "components/LoginForm";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const auth = useSelector((state) => state.auth.auth);
  const [isLogin, setIsLogin] = useState(true);

  const store = useSelector((state) => state);
  console.log(store);

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return (
    <Container>
      <LoginWrapper>
        <LoginTitle>{isLogin ? "로그인" : "회원가입"}</LoginTitle>
        <Form isLogin={isLogin} setIsLogin={setIsLogin} />
      </LoginWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const LoginWrapper = styled.div`
  background-color: #fff;
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem;
  gap: 2rem;
`;

const LoginTitle = styled.p`
  font-size: xx-large;
  font-weight: bold;
`;

const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input {
    font-size: large;
    padding: 0.8rem 1rem;
    background-color: #eee;
    border: none;
    outline-color: var(--aespa3);
  }
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  button {
    width: 100%;
    font-size: large;
    color: #fff;
    background-color: var(--aespa2);
    border-radius: 0.25rem;
    padding: 0.7rem 1rem;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: var(--aespa4);
    }
  }

  span {
    font-size: small;
    color: #888;
    cursor: pointer;

    &:hover {
      color: #222;
    }
  }
`;

export default Login;
