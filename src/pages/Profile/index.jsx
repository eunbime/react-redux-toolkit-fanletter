import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const defaultProfile = "default-profile.jpeg";

const Profile = () => {
  const { userId, nickname, avatar } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Container>
      <ProfileCard>
        <h2>프로필</h2>
        <ImgBox>
          <img src={avatar || defaultProfile} alt="" />
        </ImgBox>
        {isEditing ? <input value={nickname} /> : <p>{nickname}</p>}
        <span>{userId}</span>
        <button onClick={() => setIsEditing(!isEditing)}>프로필 수정</button>
      </ProfileCard>
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

const ProfileCard = styled.div`
  background-color: #fff;
  width: 500px;
  height: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;

  h2 {
    font-size: x-large;
    font-weight: bold;
  }

  p {
    font-size: large;
    font-weight: 500;
  }

  button {
    font-size: medium;
    color: #fff;
    padding: 0.5rem 1rem;
    background-color: var(--aespa4);
    border-radius: 1rem;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: var(--aespaMain);
    }
  }
`;

const ImgBox = styled.figure`
  background-color: #eee;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: inherit;
    height: inherit;
  }
`;

export default Profile;
