import React, { ReactElement, DetailedHTMLProps, HTMLAttributes, useState, useContext, useEffect } from "react";
import styled from "styled-components";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { Context } from "@/store";
import { getFavoriteRecipes, pushNewFavoriteRecipe, removeFavoriteRecipe, requestUpdateStorage, searchingOnDb } from "@/api/favorite-recipes";
import { auth } from "@/firebase";
import { observer } from "mobx-react-lite";
import useStore from "@/hooks/useStore";

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
    "img h3 .";
  justify-items: flex-start;
  h1,
  h2,
  h3 {
    padding-left: 5px;
  }
  h1 {
    grid-area: h1;
    top: 45px;
    left: 150px;
    font-size: 15px;
    font-weight: 600;
  }
  h2 {
    grid-area: h2;
    padding-top: 10px;
    bottom: 80px;
    left: 150px;
    font-size: 15px;
    color: #6cb663;
    font-weight: 600;
  }
  h3 {
    grid-area: h3;
    left: 150px;
    font-size: 15px;
    font-weight: 600;
  }
`;
const LikeIcon = styled.i`
  grid-area: icon;
  padding-right: 12px;
  padding-top: 2px;
  top: 10px;
  left: 270px;
`;

const TimeToCookSpan = styled.span`
  grid-area: h3;
  font-size: 15px;
  font-weight: 600;
  align-items: baseline;
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

const FavoriteRecipeCard: React.FC<FavoriteRecipeCardProps> = observer(({
  title,
  calories,
  rkey,
  recip,
  likeIcon,
  image,
  icon,
  category,
  bzhu,
  timeToCook,
  recipeId
}) => {
  const [active, setActive] = useState(false);
  const { userStore } = useContext(Context);
  const { categoriesStore } = useContext(Context);
  const { uid } = auth.currentUser;
  // let header = title;
  let currId;
  let favRecs = userStore.favoriteRecipesDb;
  let recipesHash = userStore.favoriteRecipesHashTable;

  // const requestUpdateStorage = () => {
  //   getFavoriteRecipes(uid).then((ress) => {
  //     const favoriteRecipeIds = Object.entries(ress).reduce((array, item: any) => {
  //       const recipe = {
  //         id: item[0],
  //         recipeId: item[1].recipeId,
  //         categories: item[1].category,
  //       };
  //       array.push(recipe);
  //       return array;
  //     }, []);
  //     searchingOnDb(favoriteRecipeIds).then((result) => {
  //       let elmg;
  //       console.log(result, "res");
  //       userStore.favoriteRecipesDb = result;
  //       console.log(userStore.favoriteRecipesDb, "updStorage");
  //     });
  //   });
  // };

  useStore(recipesHash, recipeId, active, setActive, favRecs);
  // useEffect(() => {
  //   console.log(recipesHash);
  //   if (recipesHash[recipeId]) setActive(true);
  //   else setActive(false);
  // }, [favRecs, active]);

  // useEffect(() => {
  //   requestUpdateStorage();

  // }, [active]);



  const updRecipesStores = (header, recId, recipe) => {
    console.log(recipe, "dbresCURRID");
    // console.log(res, userStore.favoriteRecipesDb, "updRecStorEXACT");
    let res = favRecs.findIndex((rec) => {
      return rec.recipe.header === title;
    });
    if (active) {
      // console.log(res, "deleteRES");
      currId = userStore.favoriteRecipesDb[res].id;
      userStore.deleteRecipe(header);
      console.log("DELLLL");
      setActive(false);
      removeFavoriteRecipe(uid, currId, null);
      requestUpdateStorage(uid, userStore);
    } else if (!active) {
      userStore.addRecipe(recId, recipe);
      console.log("ADDD");
      setActive(true);
      pushNewFavoriteRecipe(uid, { category: category, recipeId: rkey });
      requestUpdateStorage(uid, userStore);
    }
  };

  return (
    <RecipeElement>
      <LikeIcon onClick={() => updRecipesStores(title, rkey, categoriesStore.heartLikeRecipe)}>
        {React.cloneElement(likeIcon, { activeClass: active })}
      </LikeIcon>
      <h1>{title}</h1>
      <ImageCard>
        <img src={image} />
      </ImageCard>
      <h2>{calories}</h2>
      <TimeToCookSpan>
        <AccessAlarmsIcon fontSize="small" />
        {timeToCook}
      </TimeToCookSpan>
    </RecipeElement>
  );
});

export default FavoriteRecipeCard;
