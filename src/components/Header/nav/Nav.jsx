import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "redux/modules/aurhSlice";
import styled from "styled-components";

const defaultProfile = "default-profile.jpeg";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, avatar } = useSelector((state) => state.auth);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <HeaderNav>
      <LetterButton onClick={() => navigate("/letter")}>
        팬레터 작성
      </LetterButton>
      <ProfileNav>
        <ProfileFigure onClick={() => setIsOpenMenu(!isOpenMenu)}>
          <img src={avatar || defaultProfile} alt="" />
        </ProfileFigure>
        {isOpenMenu && (
          <ProfileMenu onMouseLeave={() => setIsOpenMenu(false)}>
            <button onClick={() => navigate("/profile")}>프로필 정보</button>
            {token === "" ? (
              <button onClick={() => navigate("/login")}>로그인</button>
            ) : (
              <button onClick={handleLogout}>로그아웃</button>
            )}
          </ProfileMenu>
        )}
      </ProfileNav>
    </HeaderNav>
  );
};

const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LetterButton = styled.button`
  font-size: medium;
  font-weight: 500;
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  background-color: #fff;
  border: 2px solid var(--aespa4);
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--aespa4);
    color: #fff;
  }
`;

const ProfileNav = styled.div`
  position: relative;
`;

const ProfileFigure = styled.figure`
  width: 50px;
  height: 50px;
  background-color: #eee;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  img {
    width: inherit;
    height: inherit;
  }
`;

const ProfileMenu = styled.div`
  position: absolute;
  width: 170px;
  right: 0;
  margin-top: 0.25rem;
  background-color: #fff;
  padding: 0.4rem;
  border-radius: 0.5rem;
  z-index: 999;

  button {
    width: 100%;
    text-align: start;
    background-color: transparent;
    font-size: medium;
    border-bottom: 0.3px solid #888;
    padding: 0.5rem;

    &:hover {
      color: #888;
    }

    &:last-child {
      border-bottom: none;
    }
  }
`;

export default Nav;
