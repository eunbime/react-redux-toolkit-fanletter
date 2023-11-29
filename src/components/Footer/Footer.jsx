import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <>
      <StFooter>© EB Corp.</StFooter>
    </>
  );
};

const StFooter = styled.footer`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #eee;
  font-size: small;
`;

export default Footer;
