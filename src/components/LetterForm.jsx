import React, { useState } from "react";
import styled from "styled-components";
import { data } from "../shared/data";
import { useDispatch, useSelector } from "react-redux";
import { __addLetter } from "redux/modules/lettersSlice";
import { selectMember } from "redux/modules/memberSlice";
import { logoutUser } from "redux/modules/authSlice";
import { useNavigate } from "react-router-dom";

const LetterForm = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nickname, userId, avatar } = useSelector((state) => state.auth.auth);
  const { user } = useSelector((state) => state.user);
  const [content, setContent] = useState("");
  const [member, setMember] = useState("카리나");
  const [memberPhoto, setMemberPhoto] = useState("karina.jpeg");

  console.log(user);

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleMember = (e) => {
    const photo = data.find((item) => item.member === e.target.value);
    setMember(e.target.value);
    setMemberPhoto(photo.memberPhoto);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user.success) {
        alert("로그인이 만료되었습니다.");
        dispatch(logoutUser());
        navigate("/login");
      }
      if (!nickname || !content) return alert("닉네임과 내용을 입력해주세요");

      const newLetter = {
        nickname,
        content,
        member,
        memberPhoto,
        createdAt: new Date(),
        userId,
        avatar,
      };

      // axios.post(`${process.env.REACT_APP_SERVER_URL}/letters`, newLetter);

      // dispatch(addLetter(newLetter));
      dispatch(__addLetter(newLetter));
    } catch (error) {
      console.log(error);
    }
    setContent("");
    dispatch(selectMember(member)); // 멤버 자동 선택
    setModalOpen(false);
  };

  const closeModal = () => {
    setContent("");
    setModalOpen(false);
  };

  return (
    <div style={{ width: "100%" }}>
      <StForm onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "1rem",
          }}
        >
          <StSection>
            <label>닉네임</label>
            <p>{nickname}</p>
          </StSection>
          <StSection>
            <label>내용</label>
            <StTextArea type="text" value={content} onChange={handleContent} />
          </StSection>
          <StSection>
            <label>아티스트를 선택해주세요.</label>
            <select id="member" onChange={handleMember}>
              {data.map((item) => (
                <option key={item.id} value={item.member}>
                  {item.member}
                </option>
              ))}
            </select>
          </StSection>
        </div>
        <ButtonSection>
          <StButton type="submit">등록</StButton>
          <StButton onClick={closeModal}>닫기</StButton>
        </ButtonSection>
      </StForm>
    </div>
  );
};

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 650px;
  margin: 0 auto;
  gap: 0.5rem;
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
`;

const StSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 0 auto;
  & label {
    padding: 0.5rem 0;
    color: var(--mainWhite);
  }

  p {
    font-size: large;
    font-weight: bold;
    color: var(--aespa4);
  }
`;

const StTextArea = styled.textarea.attrs({
  required: true,
  maxLength: 200,
  placeholder: "200자 이내로 작성해주세요.",
  cols: 30,
  rows: 15,
})`
  resize: none;
  padding: 0.5rem;
`;

const ButtonSection = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 5rem;
  margin-top: 1rem;
`;

const StButton = styled.button`
  border: none;
  font-size: medium;
  padding: 0.25rem 1.5rem;
  border-radius: 1rem;
  background-color: var(--aespa4);
  color: var(--mainWhite);
  border: solid 1px var(--mainWhite);
  cursor: pointer;
  &:hover {
    background-color: var(--aespa3);
  }
`;

export default React.memo(LetterForm);
