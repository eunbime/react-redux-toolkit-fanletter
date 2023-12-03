import Avatar from "components/common/Avatar";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getFormattedDate } from "util/date";
import { useDispatch, useSelector } from "react-redux";
import { __deleteLetter, __editLetter } from "redux/modules/lettersSlice";
import { __getUser } from "redux/modules/userSlice";

const DetailLetter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { letters } = useSelector((state) => state.letters);
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const { id } = useParams();
  const { nickname, avatar, member, createdAt, memberPhoto, content, userId } =
    letters?.find((letter) => letter.id === id);

  useEffect(() => {
    dispatch(__getUser(auth.accessToken));
    if (user?.success) {
      setAuthorized(user.id === userId);
    }
  }, [auth.accessToken]);

  const handleDelete = (id) => {
    const answer = window.confirm("정말로 삭제하시겠습니까?");
    if (!answer) return; // 취소 시

    dispatch(__deleteLetter(id));
    navigate("/letter");
  };

  const handleSubmit = (id) => {
    if (!editingText) return alert("수정사항이 없습니다.");

    const answer = window.confirm("정말로 수정하시겠습니까?");
    if (!answer) return;

    dispatch(__editLetter({ id, editingText }));
    setIsEditing(false);
    setEditingText("");
  };

  const goBackHandler = () => {
    navigate("/letter");
  };

  return (
    <Container>
      <GoBackButton onClick={goBackHandler}>
        <span className="material-icons">arrow_back</span>
        <span>돌아가기</span>
      </GoBackButton>
      <LetterBox>
        <ProFileContainer>
          <li>
            <Avatar src={avatar} />
            <span>From.{nickname}</span>
          </li>
          <li
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Avatar src={memberPhoto} alt="member" />
            <span>To.{member}</span>
          </li>
        </ProFileContainer>
        <li>{getFormattedDate(createdAt)}</li>
        {authorized ? (
          isEditing ? (
            <>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                autoFocus
                defaultValue={content}
                maxLength="150"
                onChange={(e) => setEditingText(e.target.value)}
              />
              <ButtonSection>
                <StButton onClick={() => setIsEditing(false)}>취소</StButton>
                <StButton onClick={() => handleSubmit(id)}>완료</StButton>
              </ButtonSection>
            </>
          ) : (
            <>
              <StContent>{content}</StContent>
              <ButtonSection>
                <StButton onClick={() => setIsEditing(true)}>수정</StButton>
                <StButton onClick={() => handleDelete(id)}>삭제</StButton>
              </ButtonSection>
            </>
          )
        ) : (
          <StContent>{content}</StContent>
        )}
      </LetterBox>
    </Container>
  );
};

export default DetailLetter;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const GoBackButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: absolute;
  top: 0;
  left: 0;
  margin: 1rem;
  padding: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

const LetterBox = styled.ul`
  width: 100%;
  max-width: 650px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--mainWhite);
  border-radius: 1rem;
  transition: 0.3s;
`;

const ProFileContainer = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 0 0 1rem 0;
  border-bottom: solid 1px #d4d4d4;
`;

const Profile = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: gray;
  margin-bottom: 0.5rem;
  overflow: hidden;
`;

const ButtonSection = styled.section`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
  padding: 0.5rem 0.2rem 0 0;
  border-top: solid 1px #d4d4d4;
`;

const StButton = styled.button`
  border: none;
  background-color: var(--aespaMain);
  color: var(--mainWhite);
  font-size: small;
  padding: 0.25rem 1rem;
  border-radius: 1rem;
  transition: 0.3s;
  &:hover {
    background-color: var(--aespa4);
  }
`;

const StContent = styled.li`
  white-space: pre-line;
  line-height: 1.5;
`;
