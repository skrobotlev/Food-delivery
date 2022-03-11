import FavorRecCardLike from "@/components/images/heart-like";
import { auth } from "@/firebase";
import { useDailyRecipesLunch } from "@/hooks/useDailyRecipes";
import { useStore } from "@/hooks/useStore";
import { RecipeResponse } from "@/pages/search-page/search-page";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import styled from "styled-components";
import CaloriesColumnSearching from "../calories-columns/calories-searching-column-breakfast.tsx";
import CaloriesColumnSearchingLunch from "../calories-columns/calories-searching-column-lunch";
import CalendarRecipeCard from "./calendar-recipe-card";
import ModalMenu from "./modal-menu";

const CalcSumCaloriesDiv = styled.div``;

const DailyRecipesLunch = observer(() => {
    const [open, setOpen] = React.useState(false);
    const [openSearch, setShowSearch] = useState(false);
    const { userStore, categoriesStore, caloriesStore } = useStore();
    const { uid } = auth.currentUser;

    const meal = "lunch";

    // useDailyRecipesLunch(uid, caloriesStore.actualDay, caloriesStore);

    return (
        <>
            <ModalMenu closeSearch={setShowSearch} meal={meal} />
            {openSearch ? (
                <CaloriesColumnSearchingLunch closeSearch={setShowSearch} meal={meal} />
            ) : (
                caloriesStore.lunch.map((recip, idx) => {
                    console.log(recip, "recupppppp");
                    // calcCal = calcCal += recip.calories;
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
                                // recip={recip}
                                recipeId={recip.recipe.rkey}
                                bzhu={recip.recipe.bzhu}
                            // closeSearch={closeSearch}
                            />
                        </RecipeResponse>
                    );
                })
            )}
            <CalcSumCaloriesDiv>
                <h1>Итог: {caloriesStore.sumCaloriesLunch}</h1>
            </CalcSumCaloriesDiv>
        </>
    );
});

export default DailyRecipesLunch;
