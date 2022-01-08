import styled from "styled-components";
import React, { ReactNode } from "react";
import Navbar from "./navbar";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto;
  /* flex-direction: column;
  justify-content: space-between; */
`;

const Body = styled.div`
  /* margin-top: 42px; */
  margin-left: 24px;
  margin-right: 24px;
  /* margin-bottom: 96px; */
  overflow-y: scroll;
`;

export interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <Wrapper>
      <Body>{children}</Body>
      <Navbar />
    </Wrapper>
  );
};

export default Layout;
