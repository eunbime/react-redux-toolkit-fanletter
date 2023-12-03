import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { data } from "shared/data";
import ModalProfile from "components/ModalProfile";
import { useDispatch, useSelector } from "react-redux";
import { __getUser } from "redux/modules/userSlice";
import { __getLetters } from "redux/modules/lettersSlice";

const PROFILE_PHOTO = "aespa-profile.jpeg";

function Home() {
  const dispatch = useDispatch();
  const {
    auth: { accessToken },
  } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.auth.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberId, setMemberId] = useState(0);

  useEffect(() => {
    dispatch(__getUser(accessToken));
  }, [accessToken]);

  useEffect(() => {
    dispatch(__getLetters());
  }, []);

  const handleModal = useCallback((id) => {
    const selectedMember = data.find((item) => item.id === id);
    setMemberId(selectedMember.id);
    setIsModalOpen(true);
  }, []);

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <>
      <Container>
        <ProfileContainer>
          <TeamInfo>
            <ProfileImg src={PROFILE_PHOTO} alt="" />
            <section>
              <InfoTitle htmlFor="">팀명</InfoTitle>
              <InfoUl>
                <InfoLi>aespa (에스파)</InfoLi>
              </InfoUl>
            </section>
            <section>
              <InfoTitle htmlFor="">멤버</InfoTitle>
              <InfoUl>
                {data.map((item) => (
                  <InfoLi key={item.id} onClick={() => handleModal(item.id)}>
                    <MemberProfile>
                      <img
                        src={item.memberPhoto}
                        alt=""
                        width="100px"
                        style={{ cursor: "pointer" }}
                      />
                      <span>{item.member}</span>
                    </MemberProfile>
                  </InfoLi>
                ))}
              </InfoUl>
            </section>
            <section>
              <InfoTitle>공식 계정</InfoTitle>
              <InfoUl>
                <InfoLi>
                  <p>
                    <Link to="https://www.youtube.com/@aespa">
                      <img
                        src="youtube-icon.png"
                        alt="youtube-logo"
                        width="15px"
                      />{" "}
                    </Link>
                    Youtube
                  </p>
                  <p>
                    <Link to="https://www.youtube.com/@aespa">
                      <img
                        src="twitter-icon.png"
                        alt="twitter-logo"
                        width="15px"
                      />{" "}
                    </Link>
                    Twitter
                  </p>
                  <p>
                    <Link to="https://www.youtube.com/@aespa">
                      <img
                        src="instagram-icon.png"
                        alt="instagram-logo"
                        width="15px"
                      />{" "}
                    </Link>
                    Instagram
                  </p>
                </InfoLi>
              </InfoUl>
            </section>
          </TeamInfo>
        </ProfileContainer>
      </Container>

      <ModalProfile
        isModalOpen={isModalOpen}
        memberId={memberId}
        onClose={() => setIsModalOpen(false)}
      ></ModalProfile>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  min-width: 550px;
  padding: 3.5rem 0 1rem 0;
`;

const ProfileImg = styled.img`
  max-width: 100%;
`;

const ProfileContainer = styled.div`
  max-width: 650px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamInfo = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 2rem 1.5rem;
  margin: 2rem 0;
  border-radius: 1rem;
  font-size: large;
  font-weight: 500;
`;

const InfoTitle = styled.label`
  font-weight: 700;
  font-size: 1.3rem;
`;

const InfoUl = styled.ul`
  display: flex;
  gap: 1rem;
`;

const InfoLi = styled.li`
  padding-top: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MemberProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem;
  font-size: 1rem;
`;

export default Home;
