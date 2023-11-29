import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Nav from "./nav/Nav";

const Header = () => {
  return (
    <>
      <StHeader>
        <HeaderLeft>
          <StHeaderLink to="/">
            <img src={LOGO_IMG} alt="" width="60px" />
          </StHeaderLink>
          <StHeaderLink to="/letter">To.aespa</StHeaderLink>
        </HeaderLeft>
        <Nav />
      </StHeader>
      <StLogo>
        <Link to="/">
          <img src={HEADER_IMG} alt="title-logo" width="400px" />
        </Link>
      </StLogo>
    </>
  );
};

const HEADER_IMG = "aespa-logo.png";

const LOGO_IMG =
  "https://kpopping.com/documents/54/0/400/first_Aespa_official_symbol_logo-removebg-preview.webp";

const StHeader = styled.nav`
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  gap: 3rem;
  background-color: rgba(255, 255, 255, 0.3);
  /* background: linear-gradient(to right, var(--mainBlack), var(--aespa4)); */
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const StHeaderLink = styled(Link)`
  color: var(--mainWhite);
  font-weight: 600;
  font-size: 1.2rem;
  transition: 0.3s;
  &:hover {
    color: var(--aespa4);
  }
`;

const StLogo = styled.header`
  width: "100%";
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export default Header;
