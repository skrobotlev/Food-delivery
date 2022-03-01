import styled from "styled-components";
import React, { ReactNode } from "react";
import Navbar from "./navbar";

const CenterDiv = styled.div`
@media screen and (min-width: 450px) {
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-top: 100px; */
  } 
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  height: 85vh;
  display: grid;
  grid-template-rows: 1fr;
  /* grid-template-areas: ; */
  /* align-items: center; */
.wrapper-navbar {
  /* background-color: aqua; */
}
  @media screen and (max-width: 450px) {
    width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto;
  } 
`;

const Body = styled.div`
  margin-left: 24px;
  margin-right: 24px;
  overflow: hidden;
`;

export interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <CenterDiv>
      <Wrapper>
        <Body className="wrapper-body">{children}</Body>
        <Navbar />
      </Wrapper>
    </CenterDiv>
  );
};

export default Layout;
