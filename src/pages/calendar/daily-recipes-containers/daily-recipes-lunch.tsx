import FavorRecCardLike from "@/components/images/heart-like";
import { auth } from "@/firebase";
import { useStore } from "@/hooks/useStore";
import { RecipeResponse } from "@/pages/search-page/search-page";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import styled from "styled-components";
import CalendarRecipeCard from "../calendar-stuff/calendar-recipe-card";
import ModalMenu from "../calendar-stuff/modal-menu";
import CaloriesColumnSearchingLunch from "../calories-columns/calories-searching-column-lunch";


const CalcSumCaloriesDiv = styled.div`
  h1 {
    color: #6eb62a;
  }
`;

const DailyRecipesLunch = observer(() => {
    const [openSearch, setShowSearch] = useState(false);
    const { userStore, categoriesStore, caloriesStore } = useStore();
    const { fats, proteins, carbs, sumCalories } = caloriesStore.sumCaloriesLunch;

    const meal = "lunch";

    return (
        <>
            <ModalMenu closeSearch={setShowSearch} meal={meal} />
            {openSearch ? (
                <CaloriesColumnSearchingLunch closeSearch={setShowSearch} meal={meal} />
            ) : (
                caloriesStore.lunch.map((recip, idx) => {
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
                                recipeId={recip.recipeId}
                                caloriesId={recip.caloriesId}
                                bzhu={recip.recipe.bzhu}
                                meal={meal}
                            />
                        </RecipeResponse>
                    );
                })
            )}
            <CalcSumCaloriesDiv>
                <h1>Итог: {sumCalories} ckal</h1>
                <h1> {proteins}gr белков</h1>
                <h1> {fats}gr жиров</h1>
                <h1> {carbs}gr углеводов</h1>
            </CalcSumCaloriesDiv>
        </>
    );
});

export default DailyRecipesLunch;
