import React, { useContext, useEffect } from "react";
import FavoriteRecipeCard from "../../recipe-cards/favorite-recipe-card";
import FavorRecCardLike from "../../images/heart-like";
import FavorRecCardSalad from "../../images/salad";
import styled from "styled-components";
import RectangleButton from "../../buttons/rectangle-button";
import { takeDataCat } from "../../../api/categories";
import { observer } from "mobx-react-lite";
import { Context } from "../../../";
import FavoriteRecipeList from "../favorite-recipes-list";
import { SEARCH_ROUTE } from "../../routing/consts";
import { useHistory } from "react-router-dom";
// // import { takeDataCat } from "@/api/categories";
// const takeDataCat = require("./src/api/categories")

export const RecipeFavoriteCardDiv = styled.div`
  display: flex;
  overflow-y: scroll;
  overflow-x: hidden;
  flex-direction: column;
  align-items: center;
  height: 600px;
  /* margin-top: 100px; */
  /* overflow-x: scroll; */
  /* span {
    flex-grow: 1;
      justify-items: flex-end;
      margin-top: 100px;
  } */
`;

export const RectangleButtonSpan = styled.span`
  /* display: flex; */
  align-items: flex-end;
`;

const RecipeResponse = styled.div`
  /* overflow-y: scroll; */
`;

const RecipeFavoriteCard = observer(() => {
  const { userStore } = useContext(Context);
  const { push } = useHistory();


  const handleChange = (e) => {
    userStore._filter = e.target.value;
  };

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
