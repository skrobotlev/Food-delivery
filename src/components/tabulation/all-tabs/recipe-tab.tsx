import React, { useContext, useEffect } from "react";
import FavoriteRecipeCard from "../../recipe-cards/favorite-recipe-card";
import FavorRecCardLike from "../../images/heart-like";
import FavorRecCardSalad from "../../images/salad";
import styled from "styled-components";
import FavorRecCardChicken from "../../images/chicken";
import RectangleButton from "../../buttons/rectangle-button";
import { takeDataCat } from "../../../api/categories";
import { observer } from "mobx-react-lite";
import { Context } from "../../../";
// // import { takeDataCat } from "@/api/categories";
// const takeDataCat = require("./src/api/categories")

export const RecipeFavoriteCardDiv = styled.div`
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  align-items: center;
  height: 500px;
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
    // let reciparr = [];
    // reciparr.push(takeDataIcra("canning", reciparr));
    // console.log(reciparr)

    // console.log(userStore._category[0]);
    // catObj = JSON.stringify(userStore._category);
    // console.log(typeof catObj);

    const handleChange = (e) => {
        userStore._filter = e.target.value;
    };

    return (
        <RecipeFavoriteCardDiv>
            {/* <input value={userStore._filter} onChange={handleChange} />
            {userStore.valFilter().map((recip, idx) => {
                // console.log(recip);
                const { carbs, fat, proteins } = recip.bzhu;
                return (
                    <RecipeResponse>
                        <FavoriteRecipeCard
                            key={idx}
                            title={recip.header}
                            calories={recip.calories}
                            likeIcon={<FavorRecCardLike />}
                            icon={<FavorRecCardSalad />}
                            bzhu={`Б${proteins} Ж${fat} У${carbs}`}
                        />
                    </RecipeResponse>
                );
            })} */}

            {/* <FavoriteRecipeCard
                title="Chicken Tandoori"
                calories="450 kcal"
                likeIcon={<FavorRecCardLike />}
                icon={<FavorRecCardChicken />}
                category="Chicken & salad"
            /> */}
            <RectangleButtonSpan>
                <RectangleButton size="md" title="Искать рецепты" />
            </RectangleButtonSpan>
        </RecipeFavoriteCardDiv>
    );
});

export default RecipeFavoriteCard;
