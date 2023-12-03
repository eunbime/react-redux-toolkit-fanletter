import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getFormattedDate } from "util/date";
import Avatar from "./common/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "redux/modules/authSlice";

const LetterCard = ({ letter }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { id, nickname, content, createdAt, member, avatar, memberPhoto } =
    letter;

  const handleToDetailOrLogin = () => {
    if (!user.success) {
      alert("로그인이 만료되었습니다.");
      dispatch(logoutUser());
      navigate("/login");
    } else {
      navigate(`/letter/${id}`);
    }
  };

  return (
    <LetterWrapper onClick={handleToDetailOrLogin}>
      <ProFileContainer>
        <li>
          <Avatar src={avatar} />
          <Name>From.{nickname}</Name>
        </li>
        <li
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Avatar src={memberPhoto} />
          <Name>To.{member}</Name>
        </li>
      </ProFileContainer>
      <Date>{getFormattedDate(createdAt)}</Date>
      <StContent>{content}</StContent>
    </LetterWrapper>
  );
};

const LetterWrapper = styled.ul`
  max-width: 650px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--mainWhite);
  border-radius: 1rem;
  transition: all 0.3s;
  &:hover {
    background-color: #eee;
    transform: scale(1.02);
  }
`;

const ProFileContainer = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 0 0 0.5rem 0;
  border-bottom: solid 0.5px #d4d4d4;
`;

const ProfileFigure = styled.figure`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: gray;
  margin-bottom: 0.5rem;
  overflow: hidden;

  & img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;

const Name = styled.span`
  font-weight: bold;
`;

const StContent = styled.li`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Date = styled.span`
  color: #777;
  font-size: small;
`;

export default LetterCard;
