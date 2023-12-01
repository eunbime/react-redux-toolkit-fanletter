import React from "react";
import styled, { css } from "styled-components";

const defaultUser = "default-user.png";

const Avatar = ({ src, alt, size }) => {
  return (
    <AvatarFigure size={size}>
      <img src={src || defaultUser} alt={alt || "avatar"} />
    </AvatarFigure>
  );
};

const AvatarFigure = styled.figure`
  border-radius: 50%;
  background-color: #fff;
  margin-bottom: 0.5rem;
  overflow: hidden;

  ${(props) => {
    switch (props.size) {
      case "large":
        return css`
          width: 8rem;
          height: 8rem;
        `;
      default:
        return css`
          width: 4rem;
          height: 4rem;
        `;
    }
  }}

  & img {
    width: inherit;
    height: inherit;
    object-fit: cover;
  }
`;

export default Avatar;
