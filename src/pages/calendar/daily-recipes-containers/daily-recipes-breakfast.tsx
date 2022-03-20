import FavorRecCardLike from "@/components/images/heart-like";
import { auth } from "@/firebase";
import { useDailyRecipesBreakfast } from "@/hooks/useDailyRecipes";
import useRecipesHash, { useStore } from "@/hooks/useStore";
import { RecipeResponse } from "@/pages/search-page/search-page";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CaloriesColumnSearchingBreakfast from "../calories-columns/calories-searching-column-breakfast.tsx";
import CalendarRecipeCard from "../calendar-stuff/calendar-recipe-card";
import ModalMenu from "../calendar-stuff/modal-menu";

const CalcSumCaloriesDiv = styled.div`
h1{
    color:#6eb62a ;
}`;

const DailyRecipesBreakfast = observer(() => {
    const [openSearch, setShowSearch] = useState(false);
    const [active, setActive] = useState(false);
    const { userStore, categoriesStore, caloriesStore } = useStore();
    const { fats, proteins, carbs, sumCalories } = caloriesStore.sumCaloriesBreakfast;

    const meal = "breakfast";

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
                <h1>Итог: {sumCalories} ckal</h1>
                <h1> {proteins}gr белков</h1>
                <h1> {fats}gr жиров</h1>
                <h1> {carbs}gr углеводов</h1>
            </CalcSumCaloriesDiv>
        </>
    );
});

export default DailyRecipesBreakfast;
