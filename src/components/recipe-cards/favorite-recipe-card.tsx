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
  favKey?: any;
  recipeId?: any;
  clickFunc?: any;
  rkey?: any;
  recip?: any;
}

const RecipeElement = styled.div<FavoriteRecipeCardProps>`
  position: relative;
  width: 313px;
  height: 120px;
  border-radius: 2rem;
  margin: 10px;
  background-color: #eff7ee;
  font-family: "Balsamiq Sans";
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  h1 {
    // display: flex;
    position: absolute;
    top: 45px;
    left: 150px;
    font-size: 15px;
    font-weight: 600;
  }
  h2 {
    // display: flex;
    position: absolute;
    bottom: 80px;
    left: 150px;
    font-size: 12px;
    color: #6cb663;
    font-weight: 600;
  }
  h3 {
    // display: flex;
    position: absolute;
    bottom: -5px;
    left: 150px;
    font-size: 15px;
    /* color:#6CB663; */
    font-weight: 600;
  }
  p {
    position: absolute;
    bottom: 10px;
    left: 150px;
    font-size: 12px;
    color: #646464;
    font-weight: 550;
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
  position: absolute;
  top: 10px;
  left: 270px;
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
  display: flex;
  justify-content: center;
  position: relative;
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

const FavoriteRecipeCard: React.FC<FavoriteRecipeCardProps> = ({ title, calories, rkey, recip, likeIcon, image, icon, category, bzhu, timeToCook }) => {
  const [active, setActive] = useState(false);
  const { userStore } = useContext(Context);
  const { categoriesStore } = useContext(Context);
  const { uid } = auth.currentUser;
  // let header = title;
  let res;
  let numCurrId;
  let currId;

  useEffect(() => {
    res = userStore.dbResponse.findIndex((rec) => {
      console.log(rec, "recRECIPE")
      return rec.recipe.header === title;
    });

    // !active
    console.log(res);
    res > -1 ? setActive(true) : setActive(false);
  });
  // useEffect(() => {
  //   active ? res = userStore.dbResponse.findIndex((rec) => {
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
      // console.log(favoriteRecipeIds, "favRecIDS");
      searchingOnDb(favoriteRecipeIds)
        .then((result) => {
          let elmg;
          console.log(res, "res");
          userStore.setDbResponse(result);

          console.log(userStore.dbResponse);
          // console.log("REQUESTupdSTORAGE");
          // return res;
        });
    });
  };



  const updRecipStor = (header, recId, recipe) => {
    console.log(recipe, "dbresCURRID");
    // categoriesStore.setOpenModal(false);
    if (active) {
      currId = userStore.dbResponse[res].id;
      console.log(currId, "dbresCURRID");
      userStore.deleteRecipe(header);
      console.log("DELLLL");
      setActive(false);
      removeFavoriteRecipe(uid, currId, null);
      console.log(userStore.dbResponse, "currModObj");
    } else if (!active) {
      userStore.addRecipe(recId, recipe);
      console.log("ADDD");
      setActive(true);
      console.log(category, "cat", rkey, "rkey");
      pushNewFavoriteRecipe(uid, { category: category, recipeId: rkey });
      requestUpdateStorage();
    }
  };

  return (
    <RecipeElement>
      <LikeIcon onClick={() => updRecipStor(title, rkey, categoriesStore.heartLikeRecipe)}>{React.cloneElement(likeIcon, { activeClass: active })}</LikeIcon>
      <h1>{title}</h1>
      <ImageCard>
        <img src={image} />
      </ImageCard>
      <h2>{calories}</h2>
      <p>{bzhu}</p>
      <h3>
        <AccessAlarmsIcon fontSize="small" />
        {timeToCook}
      </h3>
    </RecipeElement>
  );
};

export default FavoriteRecipeCard;
