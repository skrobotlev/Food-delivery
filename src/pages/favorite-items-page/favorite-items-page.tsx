import React from "react";
import styled from "styled-components";
import Tabulation from "@/components/tabulation/tabulation";

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
  font-size: 22px;
  font-family: "Balsamiq Sans";
  padding-top: 30px;
`;

const TabulationSpan = styled.span`
   display: flex;
   padding-top: 12px;
 `;

const FavoriteItemsPage = () => {
  return (
    <FavoriteItemsPageDiv>
      <FavoriteItemsPageH1>Избранное</FavoriteItemsPageH1>
      <TabulationSpan><Tabulation /> </TabulationSpan>
    </FavoriteItemsPageDiv>
  );
};

export default FavoriteItemsPage;
