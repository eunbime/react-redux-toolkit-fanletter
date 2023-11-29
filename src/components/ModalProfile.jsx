import React from "react";
import styled from "styled-components";
import { data } from "shared/data";
import { Link } from "react-router-dom";

const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

const ModalBox = styled.div`
  position: fixed;
  width: 450px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
`;

const ModalTitle = styled.section`
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #eee;
  padding-bottom: 0.5rem;
`;

const CloseButton = styled.span`
  cursor: pointer;
`;

const ProfileBox = styled.section`
  display: flex;
  gap: 1rem;
`;

const ProfileInfo = styled.ul`
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StInfo = styled.p`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: medium;
`;

const ModalProfile = ({ isModalOpen, onClose, memberId }) => {
  if (!isModalOpen) return;
  return (
    <>
      <ModalContainer />
      <ModalBox>
        <ModalTitle>
          <h2>멤버 프로필</h2>
          <CloseButton onClick={onClose}>X</CloseButton>
        </ModalTitle>
        {data
          .filter((item) => {
            return item.id === memberId;
          })
          .map((item) => (
            <ProfileBox key={item.id}>
              <img src={item.memberPhoto} alt={item.member} width="150px" />
              <ProfileInfo>
                <StInfo>{`이름: ${item.member} (본명: ${item.realname})`}</StInfo>
                <StInfo>출생 {item.birth}</StInfo>
                <StInfo>팀 포지션: {item.position}</StInfo>
                <StInfo>전투 스킬: {item.skill}</StInfo>
                <StInfo>
                  {`SNS: ${item.member} 인스타그램`}
                  <Link to={item.sns}>
                    <img
                      src="instagram-icon.png"
                      alt="instagram-icon"
                      width="15px"
                    />
                  </Link>
                </StInfo>
              </ProfileInfo>
            </ProfileBox>
          ))}
      </ModalBox>
    </>
  );
};
export default React.memo(ModalProfile);
