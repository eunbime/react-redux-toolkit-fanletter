import React from "react";
import styled from "styled-components";
import LetterCard from "./LetterCard";
import { useSelector } from "react-redux";

const LetterList = () => {
  const activeMember = useSelector((state) => state.member);
  const {
    letters: letterList,
    isLoading,
    error,
  } = useSelector((state) => state.letters);

  const filterdDrawLetters = letterList.filter(
    (item) => item.member === activeMember || activeMember === ""
  );

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <StList>
      {filterdDrawLetters?.length === 0 ? (
        <p>
          {activeMember}에게 남겨진 팬레터가 없습니다. <br />
          팬레터를 남겨보세요
        </p>
      ) : (
        filterdDrawLetters?.map((item) => (
          <LetterCard key={item.id} letter={item} />
        ))
      )}
    </StList>
  );
};

const StList = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

export default React.memo(LetterList);
