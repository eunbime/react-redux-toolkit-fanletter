import Form from "components/LoginForm";
import React, { useState } from "react";
import styled from "styled-components";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

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

export default Login;
