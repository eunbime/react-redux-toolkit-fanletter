import React from "react";
import styled, { css } from "styled-components";

const defaultUser =
  "https://i.namu.wiki/i/M0j6sykCciGaZJ8yW0CMumUigNAFS8Z-dJA9h_GKYSmqqYSQyqJq8D8xSg3qAz2htlsPQfyHZZMmAbPV-Ml9UA.webp";

const Avatar = ({ src, size }) => {
  return (
    <AvatarFigure>
      <img src={src || defaultUser} alt="avatar" />
    </AvatarFigure>
  );
};

const AvatarFigure = styled.figure`
  ${(props) => {
    switch (props.size) {
      case "large":
        return css`
          width: 75px;
          height: 75px;
        `;
      default:
        return css`
          width: 50px;
          height: 50px;
        `;
    }
  }}
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

export default Avatar;
