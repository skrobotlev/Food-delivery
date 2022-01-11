import React from "react";
import styled from "styled-components";
import RectangleButton from "../../buttons/rectangle-button";
import Tabulation from "../../tabulation/tabulation";

const FavoriteItemsPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const FavoriteItemsPageH1 = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-family: "Signika";
  padding-top: 61px;
`;

const TabulationSpan = styled.span`
   display: flex;
   padding-top: 32px;
   /* justify-content: center; */
   /* margin-bottom: 100px; */
 `;

const FavoriteItemsPage = () => {
  return (
    <FavoriteItemsPageDiv>
      <FavoriteItemsPageH1>Favorites</FavoriteItemsPageH1>
      <TabulationSpan><Tabulation /> </TabulationSpan>
    </FavoriteItemsPageDiv>
  );
};

export default FavoriteItemsPage;
