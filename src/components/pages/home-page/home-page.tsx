import React from "react";
import styled from "styled-components";
import Layout from "../layout";
import HomePageHeader from "./home-page-header";

const HomePageContent = styled.div`
  display: flex;
  justify-content: space-around;
    /* align-items: center; */
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const HomePage = () => {
  return (
    <HomePageContent>
      <HomePageHeader desc="Find, track and eat heathy food." name="Shimbhavi" />
      <Layout />
    </HomePageContent>
  );
};

export default HomePage;
