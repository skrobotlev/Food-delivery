import React from "react";
import styled from "styled-components";
import Tabulation from "../../tabulation/tabulation";

const FavoriteItemsPageDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const FavoriteItemsPageH1 = styled.div`
  font-size: 12px;
  font-family: "Signika";
  padding-top: 61px;
`;

const FavoriteItemsPage = () => {
    return (
        <FavoriteItemsPageDiv>
            <FavoriteItemsPageH1>Favorites</FavoriteItemsPageH1>
            <Tabulation />


        </FavoriteItemsPageDiv>
    );
};

export default FavoriteItemsPage;
