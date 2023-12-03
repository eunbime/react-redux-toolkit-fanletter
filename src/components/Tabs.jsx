import React, { useEffect } from "react";
import { data } from "shared/data";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectMember } from "redux/modules/memberSlice";
import userEvent from "@testing-library/user-event";

const Tabs = () => {
  const dispatch = useDispatch();
  const activeMember = useSelector((state) => state.member);

  const selectMemberHandler = (member) => {
    dispatch(selectMember(member));
  };

  return (
    <StButtonSection>
      {data.map((item) => {
        return (
          <StFilterMember
            key={item.id}
            onClick={() => selectMemberHandler(item.member)}
            $activeMember={activeMember === item.member}
          >
            <StBox $activeMember={activeMember}>
              <img src={item.memberPhoto} alt="member photo" />
            </StBox>
          </StFilterMember>
        );
      })}
    </StButtonSection>
  );
};

const StButtonSection = styled.section`
  max-width: 650px;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 650px) {
    gap: 2rem;
  }
`;

const StFilterMember = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: none;
`;

const StBox = styled.div`
  width: 6rem;
  height: 6rem;
  margin-bottom: 0.25rem;
  transform: ${(props) => (props.activeMember ? "scale(1.1)" : "scale(1.0)")};
  border-radius: 100px;
  /* border: ${(props) =>
    props.selected ? "2.5px solid transparent" : "none"}; */
  border: 2.5px solid transparent;
  background-image: linear-gradient(#fff, #fff),
    linear-gradient(
      to right,
      var(--aespaMain) 0%,
      #44107a 29%,
      var(--aespa5) 67%,
      var(--aespa4) 100%
    );
  background-origin: border-box;
  background-clip: content-box, border-box;
  transition: 0.3s;
  overflow: hidden;
  box-shadow: ${(props) =>
    props.activeMember ? "0px 0px 10px 5px #eee" : "none"};
  &:hover {
    transform: scale(1.1);
  }

  img {
    width: inherit;
    height: inherit;
    object-fit: cover;
  }

  @media (min-width: 650px) {
    width: 8rem;
    height: 8rem;
  }
`;

export default Tabs;
