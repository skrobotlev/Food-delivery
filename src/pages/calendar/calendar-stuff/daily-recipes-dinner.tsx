import FavorRecCardLike from "@/components/images/heart-like";
import { auth } from "@/firebase";
import { useDailyRecipesDinner } from "@/hooks/useDailyRecipes";
import { useStore } from "@/hooks/useStore";
import { RecipeResponse } from "@/pages/search-page/search-page";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import styled from "styled-components";
import CaloriesColumnSearchingDinner from "../calories-columns/calories-searching-column-dinner";
import CalendarRecipeCard from "./calendar-recipe-card";
import ModalMenu from "./modal-menu";

const CalcSumCaloriesDiv = styled.div`
h1{
color: #6eb62a;
}
`;

const DailyRecipesDinner = observer(() => {
    const [openSearch, setShowSearch] = useState(false);
    const { userStore, categoriesStore, caloriesStore } = useStore();
    const { uid } = auth.currentUser;

    const meal = "dinner";

    return (
        <>
            <ModalMenu closeSearch={setShowSearch} meal={meal} />
            {openSearch ? <CaloriesColumnSearchingDinner closeSearch={setShowSearch} meal={meal} /> :
                caloriesStore.dinner.map((recip, idx) => {
                    return (
                        <RecipeResponse>
                            <CalendarRecipeCard
                                timeToCook={recip.recipe.timeToCook}
                                key={idx}
                                title={recip.recipe.header}
                                calories={recip.recipe.calories + " Kcal"}
                                likeIcon={<FavorRecCardLike />}
                                image={recip.recipe.img}
                                category={recip.recipe.category}
                                // recip={recip}
                                recipeId={recip.recipeId}
                                bzhu={recip.recipe.bzhu}
                                meal={meal}
                                caloriesId={recip.caloriesId}
                            />
                        </RecipeResponse>
                    );
                })}
            <CalcSumCaloriesDiv><h1>Итог: {caloriesStore.sumCaloriesDinner} калорий</h1></CalcSumCaloriesDiv>
        </>
    );
});

export default DailyRecipesDinner;
