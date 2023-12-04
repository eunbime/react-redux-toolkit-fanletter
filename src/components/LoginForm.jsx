import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "redux/modules/authSlice";
import styled from "styled-components";
import loginApi from "../axios/api";

const Form = ({ isLogin, setIsLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const onLoginHandler = async ({ id, password }) => {
    try {
      const { data } = await loginApi.post(`/login?expiresIn=10m`, {
        id,
        password,
      });
      dispatch(loginUser(data));
      alert("성공적으로 로그인 되었습니다!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("아미디 또는 비밀번호가 일치하지 않습니다.");
    }

    reset();
  };

  const onRegisterHandler = async ({
    id,
    password,
    confirmPassword,
    nickname,
  }) => {
    if (password !== confirmPassword)
      return alert("비밀번호가 일치하지 않습니다");

    try {
      const { data } = await loginApi.post(`/register`, {
        id,
        password,
        nickname,
      });
      console.log(data);
      alert(data.message);
      if (data.success) {
        setIsLogin(true);
      }
    } catch (error) {
      console.log(error.message);
      alert("아이디 또는 비밀번호를 다시 확인해주세요.");
    }

    reset();
  };

  const userId = {
    required: "필수 입력란입니다.",
    minLength: {
      value: 4,
      message: "최소 4자를 입력해주세요.",
    },
    maxLength: {
      value: 10,
      message: "최대 10자까지 입력하실 수 있습니다..",
    },
  };

  const userPassword = {
    required: "필수 입력란입니다.",
    minLength: {
      value: 4,
      message: "최소 4자를 입력해주세요.",
    },
    maxLength: {
      value: 15,
      message: "최대 15자까지 입력하실 수 있습니다.",
    },
  };

  const confirmPassword = {
    required: "필수 입력란입니다.",
    minLength: {
      value: 4,
      message: "최소 4자를 입력해주세요.",
    },
    maxLength: {
      value: 15,
      message: "최대 15자까지 입력하실 수 있습니다.",
    },
  };

  const nickname = {
    required: "필수 입력란입니다.",
    minLength: {
      value: 1,
      message: "최소 1자를 입력해주세요.",
    },
    maxLength: {
      value: 10,
      message: "최대 10자까지 입력하실 수 있습니다.",
    },
  };

  return (
    <LoginForm onSubmit={(e) => e.preventDefault()}>
      <InputBox>
        <input type="id" placeholder="아이디" {...register("id", userId)} />
        {errors?.id && ( // 에러 메시지
          <ErrorMessage>{errors.id.message}</ErrorMessage>
        )}
        <input
          type="password"
          placeholder="비밀번호"
          {...register("password", userPassword)}
        />
        {errors?.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}

        {isLogin || (
          <>
            <input
              type="password"
              placeholder="비밀번호 확인"
              {...register("confirmPassword", confirmPassword)}
            />
            {errors?.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}

            <input
              type="text"
              placeholder="닉네임"
              {...register("nickname", nickname)}
            />
            {errors?.nickname && (
              <ErrorMessage>{errors.nickname.message}</ErrorMessage>
            )}
          </>
        )}
      </InputBox>
      {isLogin ? (
        <ButtonBox>
          <button onClick={handleSubmit(onLoginHandler)}>로그인</button>
          <p>
            아직 계정이 없으신가요?{" "}
            <span onClick={() => setIsLogin(false)}>회원가입하기</span>
          </p>
        </ButtonBox>
      ) : (
        <ButtonBox>
          <button onClick={handleSubmit(onRegisterHandler)}>회원가입</button>
          <p>
            이미 계정이 있으신가요?{" "}
            <span onClick={() => setIsLogin(true)}>로그인하기</span>
          </p>
        </ButtonBox>
      )}
    </LoginForm>
  );
};

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

    &:disabled {
      background-color: #fff;
    }
  }

  span {
    color: #888;
    cursor: pointer;

    &:hover {
      color: #222;
    }
  }
`;

const ErrorMessage = styled.span`
  color: var(--aespa4);
  padding: 0 0.25rem;
`;

export default Form;
