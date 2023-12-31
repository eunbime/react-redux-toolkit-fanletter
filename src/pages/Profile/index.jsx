import axios from "axios";
import Avatar from "components/common/Avatar";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "redux/modules/authSlice";
import { updateLetter } from "redux/modules/lettersSlice";
import { __getUser } from "redux/modules/userSlice";
import styled from "styled-components";

const Profile = () => {
  const dispatch = useDispatch();
  const { userId, nickname, avatar, accessToken } = useSelector(
    (state) => state.auth.auth
  );
  const { letters } = useSelector((state) => state.letters);
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(nickname);
  const [newName, setNewName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const imageInput = useRef();

  useEffect(() => {
    dispatch(__getUser(accessToken));
  }, [accessToken]);

  useEffect(() => {
    setNewName(nickname);
  }, [nickname]);

  useEffect(() => {
    setImgUrl(avatar);
  }, [avatar]);

  const onClickImageUpload = () => {
    imageInput.current.click();
  };

  const onChangeFile = (e) => {
    if (e.target.files[0]) {
      const fileURL = URL.createObjectURL(e.target.files[0]);
      setImgUrl(fileURL); // 프리뷰
      setImgFile(e.target.files[0]); // 이미지 파일
    }
  };

  const cancelHandler = () => {
    const answer = window.confirm(
      "수정 사항이 사라집니다. 정말 취소하시겠습니까?"
    );
    if (!answer) return;
    setInput("");
    setIsEditing(false);
  };

  const completeHandler = async () => {
    // form 형식으로 추가하기 위해 formData 생성자 사용
    const formData = new FormData();
    formData.append("avatar", imgFile);
    formData.append("nickname", input);

    const answer = window.confirm("변경사항을 적용하시겠습니까?");
    if (!answer) return;

    // 서버 반영
    const response = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/profile`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // formData 반드시 명시해야함
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const profile = { ...response.data };
    // 불필요한 데이터 삭제
    delete profile.message;
    delete profile.success;

    dispatch(updateProfile(profile));

    letters.map((letter) => {
      if (letter.userId === userId) {
        axios.patch(
          `${process.env.REACT_APP_SERVER_URL}/letters/${letter.id}`,
          {
            avatar: profile.avatar,
            nickname: input,
          }
        );
      }
    });

    dispatch(updateLetter({ userId, imgUrl, input }));

    // 화면 반영
    setNewName(input);
    setIsEditing(false);
  };

  return (
    <Container>
      <ProfileCard>
        <h2>프로필</h2>
        <Avatar src={imgUrl} size="large" />
        {isEditing && (
          <button onClick={onClickImageUpload}>이미지 업로드</button>
        )}
        <FileInput
          ref={imageInput}
          type="file"
          name="file"
          accept="image/*"
          onChange={onChangeFile}
        />
        {isEditing ? (
          <>
            <NicknameInput
              defaultValue={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
            <span>{userId}</span>
            <ButtonBox>
              <button onClick={cancelHandler}>취소</button>
              <button onClick={completeHandler}>수정완료</button>
            </ButtonBox>
          </>
        ) : (
          <>
            <p>{newName}</p>
            <span>{userId}</span>
            <button onClick={() => setIsEditing(true)}>프로필 수정</button>
          </>
        )}
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
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  padding: 2rem 0;

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

const FileInput = styled.input`
  display: none;
`;

const NicknameInput = styled.input`
  font-size: medium;
  padding: 0.25rem 0.5rem;
  outline: none;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 1rem;
`;
export default Profile;
