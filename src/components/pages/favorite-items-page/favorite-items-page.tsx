import React from "react";
import styled from "styled-components";
import RectangleButton from "../../buttons/rectangle-button";
import Tabulation from "../../tabulation/tabulation";
import Layout from "../layout";

const FavoriteItemsPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* align-items: center; */
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

const LayoutSpan = styled.span`
display: flex;
align-items: flex-end;
justify-content: center;
padding-top: 200px;
/* position: absolute; */
 `;

const TabulationSpan = styled.span`
   display: flex;
   justify-content: center;
   /* margin-bottom: 100px; */
 `;


const FavoriteItemsPage = () => {
  return (
    <FavoriteItemsPageDiv>
      <FavoriteItemsPageH1>Favorites</FavoriteItemsPageH1>
      <TabulationSpan><Tabulation /> </TabulationSpan>

      <LayoutSpan><Layout /></LayoutSpan>
    </FavoriteItemsPageDiv>
  );
};

export default FavoriteItemsPage;
