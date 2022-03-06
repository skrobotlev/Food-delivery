import React, { useContext } from "react";
import styled from "styled-components";
import RectangleButton from "../../buttons/rectangle-button";
import { observer } from "mobx-react-lite";
import FavoriteRecipeList from "../favorite-recipes-list";
import { SEARCH_ROUTE } from "@/router/consts";
import { useHistory } from "react-router-dom";

export const RecipeFavoriteCardDiv = styled.div`
  display: flex;
  overflow-x: hidden;
  flex-direction: column;
  align-items: center;
  height: 66vh;
  @media screen and (max-width: 450px) {
    height: 70vh;
  }
`;

export const RectangleButtonSpan = styled.span`
  align-items: flex-end;
`;

const RecipeFavoriteCard = observer(() => {
  const { push } = useHistory();

  return (
    <RecipeFavoriteCardDiv>
      <FavoriteRecipeList />
      <RectangleButtonSpan onClick={() => push(SEARCH_ROUTE)}>
        <RectangleButton size="md" title="Искать рецепты" />
      </RectangleButtonSpan>
    </RecipeFavoriteCardDiv>
  );
});

export default RecipeFavoriteCard;
