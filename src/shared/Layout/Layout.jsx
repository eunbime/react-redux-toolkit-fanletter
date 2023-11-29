import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const StLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: "100%";
  min-height: 90vh;
`;

function Layout({ children }) {
  return (
    <div>
      <Header />
      <StLayout>
        <Outlet />
      </StLayout>
      <Footer />
    </div>
  );
}

export default Layout;
