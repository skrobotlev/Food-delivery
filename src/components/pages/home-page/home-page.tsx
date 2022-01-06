import React from "react";
import styled from "styled-components";
import RectangleButton, { BigRectangleButton, BigRectBut, RectBut } from "../../buttons/rectangle-button";
import Layout from "../layout";
import HomePageHeader from "./header-home-page";
import HomePageSlider from "./slider-home-page";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { InsideRectBut } from "../../buttons/rectangle-button";
import FavoriteCategories from "./favorite-categories-h-p";


const HomePageContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;



const HomePage = () => {
  return (
    <HomePageContent>
      <HomePageHeader desc="Find, track and eat heathy food." name="Shimbhavi" />
      <HomePageSlider />
      <BigRectangleButton title="Track Your Weekly Progress">
        <InsideRectBut>
          Read now
          <ArrowRightIcon />
        </InsideRectBut>
      </BigRectangleButton>
      <h3>Choose Your Favorites</h3>
      <FavoriteCategories />
      <Layout />
    </HomePageContent>
  );
};

export default HomePage;
