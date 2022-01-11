import React from "react";
import styled from "styled-components";
import RectangleButton, { BigRectangleButton, BigRectBut, RectBut } from "../../buttons/rectangle-button";
import Layout from "../../../layout";
import HomePageHeader from "./header-home-page";
import HomePageSlider from "./slider-home-page";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { InsideRectBut } from "../../buttons/rectangle-button";
import FavoriteCategories from "./favorite-categories-h-p";
import { withRouter } from "react-router-dom";

const HomePageContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;

  /* overflow-y: hidden; */
  height: 100vh;
  width: 100%;
  h3 {
    padding-right: 35px;
  }
`;

const BigRectButtonDiv = styled.div`
padding-top: 40px;
`;

const FavoritesCardHeader = styled.h3`
  font-family: "Signika";
  font-weight: 400;
  font-size: 22px;
  margin-top: 24px;
`;

const HomePage = () => {
  return (
    <HomePageContent>
      <HomePageHeader desc="Find, track and eat heathy food." name="Shimbhavi" />
      <HomePageSlider />
      <BigRectButtonDiv> <BigRectangleButton title="Track Your Weekly Progress">
        <InsideRectBut>
          View Now
          <ArrowRightIcon />
        </InsideRectBut>
      </BigRectangleButton>
      </BigRectButtonDiv>
      <FavoritesCardHeader>Choose Your Favorites</FavoritesCardHeader>
      <FavoriteCategories />
    </HomePageContent>
  );
};

export default HomePage;
