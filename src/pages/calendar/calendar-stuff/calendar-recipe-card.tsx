import React, { ReactElement, DetailedHTMLProps, HTMLAttributes, useState, useContext, useEffect } from "react";
import styled from "styled-components";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { Context } from "@/store";
import { pushNewFavoriteRecipe, removeFavoriteRecipe, updateFavoritesStorage, searchingOnDb } from "@/api/favorite-recipes";
import { auth } from "@/firebase";
import { observer } from "mobx-react-lite";
import useRecipesHash, { useStore } from "@/hooks/useStore";

interface FavoriteRecipeCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    title?: string;
    calories?: string;
    icon?: ReactElement;
    category?: any;
    likeIcon?: ReactElement;
    bzhu?: any;
    image?: string;
    timeToCook?: any;
    recipeId?: any;
    clickFunc?: any;
    rkey?: any;
    recip?: any;
    closeSearch?: any;
}

const RecipeElement = styled.div<FavoriteRecipeCardProps>`
  width: 100%;
  height: 120px;
  border-radius: 2rem;
  margin: 10px 0px 0px 0px;
  background-color: #eff7ee;
  font-family: "Balsamiq Sans";
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: 30px;
  grid-template-areas:
    "img h2 icon"
    "img h2 ."
    "img h1 h1"
    "img h3 bzhu";
  justify-items: flex-start;

  h1,
  h2,
  h3 {
    padding-left: 5px;
  }
  h1 {
    grid-area: h1;
    font-size: 15px;
    font-weight: 600;
  }
  h2 {
    grid-area: h2;
    padding-top: 10px;
    font-size: 15px;
    color: #6cb663;
    font-weight: 600;
  }
  h3 {
    grid-area: h3;
    font-size: 15px;
    font-weight: 600;
  }
  @media screen and (min-width: 450px) {
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-areas:
      "img h2 icon"
      "img h2   ."
      "img h1  ."
      "img h3 bzhu";
    font-family: "Balsamiq Sans";

    h1,
    h2,
    h3 {
      padding-left: 5px;
      font-size: 18px;
    }
  }
`;
const LikeIcon = styled.i`
  grid-area: icon;
  padding-left: 45%;
  padding-top: 5px;
`;

const TimeToCookSpan = styled.span`
  grid-area: h3;
  /* font-size: 15px; */
  font-weight: 600;
  align-items: baseline;
`;

const TimeToCookH = styled.h5`
  grid-area: h3;
  /* font-size: 15px; */
  font-weight: 600;
  align-items: baseline;
`;

const BzhuRecip = styled.span`
  grid-area: bzhu;
  align-items: baseline;
  display: grid;
  /* grid-row: 1; */
  h4 {
    font-size: 15px;
    align-items: baseline;
    grid-row: 1;
    font-size: 15px;
    padding-right: 5px;
    color: #6eb62a;
  }
  @media screen and (min-width: 450px) {
    h4 {
      font-size: 20px;
    }
  }
`;

const ImageCard = styled.div`
  width: 120px;
  height: 90px;
  border-radius: 100px;
  margin-top: 15px;
  margin-left: 15px;
  img {
    width: 120px;
    height: 90px;
    border-radius: 100px;
  }
`;

const CalendarRecipeCard: React.FC<FavoriteRecipeCardProps> = observer(
    ({ title, calories, rkey, recip, likeIcon, image, icon, closeSearch, category, bzhu, timeToCook, recipeId }) => {
        const [active, setActive] = useState(false);
        const { userStore, categoriesStore, caloriesStore } = useStore();

        const { proteins, fat, carbs } = bzhu;
        const handleAddRecipe = () => {
            caloriesStore.heartLikeRecipe = recip;
            console.log(caloriesStore.heartLikeRecipe);
            caloriesStore.addRecipe(recipeId, caloriesStore.heartLikeRecipe);
            closeSearch(false);
            console.log(caloriesStore.breakfast, "brkfst");
        };
        // console.log(recipeId, rkey);
        // useRecipesHash(recipesHash, recipeId, active, setActive, favRecs);

        return (
            <RecipeElement>
                {/* <LikeIcon onClick={() => closeSearch(false)}> */}
                <LikeIcon onClick={() => handleAddRecipe()}>
                    {React.cloneElement(likeIcon, { activeClass: active })}</LikeIcon>
                <h1>{title}</h1>
                <ImageCard>
                    <img src={image} />
                </ImageCard>
                <h2>{calories}</h2>
                <BzhuRecip className="bzhu-recip">
                    <h4>Б:{proteins}</h4>
                    <h4>Ж:{fat}</h4>
                    <h4>У:{carbs}</h4>
                </BzhuRecip>
                {/* <TimeToCookSpan> */}
                <TimeToCookH>
                    <AccessAlarmsIcon fontSize="small" />
                    {timeToCook}
                </TimeToCookH>
                {/* </TimeToCookSpan> */}
            </RecipeElement>
        );
    }
);

export default CalendarRecipeCard;
