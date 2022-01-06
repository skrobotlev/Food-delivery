import React from "react";
import styled from "styled-components";
import RectangleButton from "../../buttons/rectangle-button";
import Tabulation from "../../tabulation/tabulation";
import Layout from "../layout";

const FavoriteItemsPageDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  
`;

const FavoriteItemsPageH1 = styled.div`
  font-size: 16px;
  font-family: "Signika";
  padding-top: 61px;
`;

const LayoutSpan = styled.span`
/* display: flex;
justify-content: flex-end; */
padding-top: 100px;
 `;


const FavoriteItemsPage = () => {
    return (
        <FavoriteItemsPageDiv>
            <FavoriteItemsPageH1>Favorites</FavoriteItemsPageH1>
            <Tabulation />
            <RectangleButton size="md" title="Search Recipes" />
            <LayoutSpan><Layout /></LayoutSpan>
        </FavoriteItemsPageDiv>
    );
};

export default FavoriteItemsPage;
