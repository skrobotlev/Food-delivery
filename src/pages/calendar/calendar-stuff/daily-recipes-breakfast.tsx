import FavorRecCardLike from "@/components/images/heart-like";
import { auth } from "@/firebase";
import { useDailyRecipesBreakfast } from "@/hooks/useDailyRecipes";
import useRecipesHash, { useStore } from "@/hooks/useStore";
import { RecipeResponse } from "@/pages/search-page/search-page";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CaloriesColumnSearchingBreakfast from "../calories-columns/calories-searching-column-breakfast.tsx";
import CalendarRecipeCard from "./calendar-recipe-card";
import ModalMenu from "./modal-menu";

const CalcSumCaloriesDiv = styled.div``;

const DailyRecipesBreakfast = observer(() => {
    const [openSearch, setShowSearch] = useState(false);
    const [active, setActive] = useState(false);
    const { userStore, categoriesStore, caloriesStore } = useStore();
    const { uid } = auth.currentUser;

    const meal = "breakfast";

    const { breakfast, lunch, dinner } = caloriesStore.caloriesHashTable;

    // useRecipesHash(breakfast, recipeId, active, setActive, caloriesStore.breakfast);

    // useDailyRecipesBreakfast(uid, caloriesStore.actualDay, caloriesStore);

    // useEffect(() => {
    //     console.log(caloriesStore.breakfast);
    // });

    return (
        <>
            <ModalMenu closeSearch={setShowSearch} meal={meal} />
            {openSearch ? <CaloriesColumnSearchingBreakfast closeSearch={setShowSearch} meal={meal} /> :
                caloriesStore.breakfast.map((recip, idx) => {
                    return (
                        <RecipeResponse>
                            <CalendarRecipeCard
                                timeToCook={recip.recipe.timeToCook}
                                key={idx}
                                title={recip.recipe.header}
                                calories={recip.recipe.calories + " Kcal"}
                                likeIcon={<FavorRecCardLike />}
                                image={recip.recipe.img}
                                rkey={recip.recipe.rkey}
                                category={recip.recipe.category}
                                recip={recip}
                                recipeId={recip.recipeId}
                                bzhu={recip.recipe.bzhu}
                                caloriesId={recip.caloriesId}
                                meal={meal}
                            />
                        </RecipeResponse>
                    );
                })}
            <CalcSumCaloriesDiv>
                <h1>Итог: {caloriesStore.sumCaloriesBreakfast}</h1>
            </CalcSumCaloriesDiv>
        </>
    );
});

export default DailyRecipesBreakfast;
