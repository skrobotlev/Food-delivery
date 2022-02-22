import React, { ReactElement, DetailedHTMLProps, HTMLAttributes, useState, useContext, useEffect } from "react";
import styled from "styled-components";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import { Context } from "../../";
import cn from "classnames";
import { getFavoriteRecipes, pushNewFavoriteRecipe, removeFavoriteRecipe, searchingOnDb } from "../../api/favorite-recipes";
import { auth } from "../..//firebase";

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
  /* position: relative; */
  width: 100%;
  /* width: 100%; */
  height: 120px;
  border-radius: 2rem;
  margin: 10px 0px 0px 0px;
  background-color: #eff7ee;
  font-family: "Balsamiq Sans";
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
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
    // display: flex;
    grid-area: h1;
    /* position: absolute; */
    top: 45px;
    left: 150px;
    font-size: 15px;
    font-weight: 600;
  }
  h2 {
    // display: flex;
    grid-area: h2;
    padding-top: 10px;
    /* position: absolute; */
    bottom: 80px;
    left: 150px;
    font-size: 15px;
    color: #6cb663;
    font-weight: 600;
  }
  h3 {
    grid-area: h3;

    // display: flex;
    /* position: absolute; */
    /* bottom: -5px; */
    left: 150px;
    font-size: 15px;
    /* color:#6CB663; */
    font-weight: 600;
  }
  /* svg {
  position: absolute;
  top: 10px;
  left: 280px;
  } */
`;
const LikeIcon = styled.i`
  /* display: flex;
  justify-content: flex-end; */
  // flex-direction: row-reverse;
  grid-area: icon;
  padding-right: 12px;
  padding-top: 2px;
  /* position: absolute; */
  top: 10px;
  left: 270px;
`;

const TimeToCookSpan = styled.span`
  grid-area: h3;
  font-size: 15px;
  /* color:#6CB663; */
  font-weight: 600;
  align-items: baseline;
`;

// const ImageCard = styled.div`
//   display: flex;
//   position: relative;
//   bottom: 15px;
//   left: 30px;
//   img{
//     width: 60px;
//   height: 90px;
//   }

// `;

const ImageCard = styled.div`
  /* display: flex;
  justify-content: center; */
  /* position: relative; */
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

const FavoriteRecipeCard: React.FC<FavoriteRecipeCardProps> = ({
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
}) => {
  const [active, setActive] = useState(false);
  const { userStore } = useContext(Context);
  const { categoriesStore } = useContext(Context);
  const { uid } = auth.currentUser;
  // let header = title;
  let res;
  let currId;

  useEffect(() => {
    res = userStore.favoriteRecipesDb.findIndex((rec) => {
      // console.log(rec, "recRECIPE")
      return rec.recipe.header === title;
    });

    // !active
    console.log(res);
    res > -1 ? setActive(true) : setActive(false);
  });
  // useEffect(() => {
  //   active ? res = userStore.favoriteRecipesDb.findIndex((rec) => {
  //     return rec.recipe.header === title;
  //   }) : res = null;
  //   console.log(res);
  //   res > -1 ? setActive(true) : setActive(false);
  // });

  const requestUpdateStorage = () => {
    getFavoriteRecipes(uid).then((ress) => {
      const favoriteRecipeIds = Object.entries(ress).reduce((array, item: any) => {
        const recipe = {
          id: item[0],
          recipeId: item[1].recipeId,
          categories: item[1].category,
        };
        array.push(recipe);
        return array;
      }, []);
      searchingOnDb(favoriteRecipeIds).then((result) => {
        let elmg;
        console.log(res, "res");
        userStore.setfavoriteRecipesDb(result);
        console.log(userStore.favoriteRecipesDb, "updStorage");
      });
    });
  };

  const updRecipStor = (header, recId, recipe) => {
    console.log(recipe, "dbresCURRID");
    if (active) {
      currId = userStore.favoriteRecipesDb[res].id;
      userStore.deleteRecipe(header);
      console.log("DELLLL");
      setActive(false);
      removeFavoriteRecipe(uid, currId, null);
    } else if (!active) {
      userStore.addRecipe(recId, recipe);
      console.log("ADDD");
      setActive(true);
      pushNewFavoriteRecipe(uid, { category: category, recipeId: rkey });
      requestUpdateStorage();
    }
  };

  return (
    <RecipeElement>
      <LikeIcon onClick={() => updRecipStor(title, rkey, categoriesStore.heartLikeRecipe)}>
        {React.cloneElement(likeIcon, { activeClass: active })}
      </LikeIcon>
      <h1>{title}</h1>
      <ImageCard>
        <img src={image} />
      </ImageCard>
      <h2>{calories}</h2>
      {/* <p>{bzhu}</p> */}
      <TimeToCookSpan>
        <AccessAlarmsIcon fontSize="small" />
        {timeToCook}
      </TimeToCookSpan>
    </RecipeElement>
  );
};

export default FavoriteRecipeCard;
