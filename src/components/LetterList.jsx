import React from "react";
import styled from "styled-components";
import LetterCard from "./LetterCard";
import { useSelector } from "react-redux";

const LetterList = () => {
  const activeMember = useSelector((state) => state.member);
  const { letters, isLoading, error } = useSelector((state) => state.letters);

  const filteredLetters = letters?.filter(
    (item) => item.member === activeMember || activeMember === ""
  );

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <StList>
      {filteredLetters?.length === 0 ? (
        <NotFoundLetter>
          <p>현재 {activeMember}에게 남겨진 팬레터가 없습니다. 🥲</p>
        </NotFoundLetter>
      ) : (
        filteredLetters?.map((item) => (
          <LetterCard key={item.id} letter={item} />
        ))
      )}
    </StList>
  );
};

const StList = styled.div`
  width: 450px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  transition: all 0.3 ease-in-out;

  @media (min-width: 650px) {
    width: 650px;
  }
`;

const NotFoundLetter = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 2rem;
  font-size: large;
  text-align: center;
`;

export default React.memo(LetterList);
