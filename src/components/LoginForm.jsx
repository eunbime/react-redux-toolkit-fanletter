import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "redux/modules/aurhSlice";
import styled from "styled-components";

const Form = ({ isLogin, setIsLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = ({ id, password }) => {
    console.log(id, password);
  };

  const onLoginHandler = async () => {
    const newLoginUser = {
      id,
      password,
    };

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        newLoginUser
      );
      dispatch(loginUser(data));
      // reset();
      alert("성공적으로 로그인 되었습니다!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("아미디 또는 비밀번호가 맞지 않습니다.");
    }
  };

  const onRegisterHandler = async () => {
    if (password !== confirmPassword)
      return alert("비밀번호가 일치하지 않습니다");

    const newUser = {
      id,
      password,
      nickname,
    };

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/register`,
        newUser
      );
      console.log(data);
      alert(data.message);
      if (data.success) {
        setIsLogin(true);
      }
    } catch (error) {
      console.log(error);
      alert("다시 시도해주세요.");
    }
  };

  const userId = {
    required: "4~10자의 아이디를 입력해주세요",
    minLength: {
      value: 4,
      message: "최소 4자입니다.",
    },
    maxLength: {
      value: 10,
      message: "최대 10자입니다.",
    },
  };

  const userPassword = {
    required: "4~15자의 비밀번호를 입력해주세요",
    minLength: {
      value: 4,
      message: "최소 4자입니다.",
    },
    maxLength: {
      value: 15,
      message: "최대 15자입니다.",
    },
  };

  return (
    <>
      <LoginForm onSubmit={(e) => e.preventDefault()}>
        <InputBox>
          <input
            type="id"
            placeholder="아이디"
            {...register("id", userId)}
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          {errors?.id && (
            <div>
              <span>{errors.id.message}</span>
            </div>
          )}
          <input
            type="password"
            placeholder="비밀번호"
            {...register("password", userPassword)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors?.password && (
            <div>
              <span>{errors.password.message}</span>
            </div>
          )}

          {isLogin || (
            <>
              <input
                type="password"
                placeholder="비밀번호 확인"
                required
                minLength="4"
                maxLength="15"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <input
                type="text"
                placeholder="닉네임"
                required
                minLength="1"
                maxLength="10"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </>
          )}
        </InputBox>
        {isLogin ? (
          <ButtonBox>
            <button onClick={onLoginHandler}>로그인</button>
            <p>
              아직 계정이 없으신가요?{" "}
              <span onClick={() => setIsLogin(false)}>회원가입하기</span>
            </p>
          </ButtonBox>
        ) : (
          <ButtonBox>
            <button onClick={onRegisterHandler}>회원가입</button>
            <p>
              이미 계정이 있으신가요?{" "}
              <span onClick={() => setIsLogin(true)}>로그인하기</span>
            </p>
          </ButtonBox>
        )}
      </LoginForm>
    </>
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
  }

  span {
    color: #888;
    cursor: pointer;

    &:hover {
      color: #222;
    }
  }
`;

export default Form;
