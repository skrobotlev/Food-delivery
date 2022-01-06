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
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  h3 {
    padding-right: 35px;
  }
`;

const FavoritesCardHeader = styled.h3`
  font-family: "Signika";
  font-weight: 400;
  font-size: 22px;
  line-height: 20px;
`;

const HomePage = () => {
  return (
    <HomePageContent>
      <HomePageHeader desc="Find, track and eat heathy food." name="Shimbhavi" />
      <HomePageSlider />
      <BigRectangleButton title="Track Your Weekly Progress">
        <InsideRectBut>
          View Now
          <ArrowRightIcon />
        </InsideRectBut>
      </BigRectangleButton>
      <FavoritesCardHeader>Choose Your Favorites</FavoritesCardHeader>
      <FavoriteCategories />
      <Layout />
    </HomePageContent>
  );
};

export default HomePage;
