import FavorRecCardLike from "@/components/images/heart-like";
import { useStore } from "@/hooks/useStore";
import { RecipeResponse } from "@/pages/search-page/search-page";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import styled from "styled-components";
import CaloriesColumnSearching from "../calendar-categories-searching";
import CalendarRecipeCard from "./calendar-recipe-card";
import ModalMenu from "./modal-menu";

const CalcSumCaloriesDiv = styled.div``;

const DailyRecipesLunch = observer(() => {
    const [open, setOpen] = React.useState(false);
    const [openSearch, setShowSearch] = useState(false);
    const { userStore, categoriesStore, caloriesStore } = useStore();
    const meal = "lunch";

    return (
        <>
            <ModalMenu closeSearch={setShowSearch} />
            {openSearch && <CaloriesColumnSearching closeSearch={setShowSearch} meal={meal} />}
            {caloriesStore.lunch.map((recip, idx) => {
                // calcCal = calcCal += recip.calories;
                return (
                    <RecipeResponse>
                        <CalendarRecipeCard
                            timeToCook={recip.timeToCook}
                            key={idx}
                            title={recip.header}
                            calories={recip.calories + " Kcal"}
                            likeIcon={<FavorRecCardLike />}
                            image={recip.img}
                            rkey={recip.rkey}
                            category={recip.category}
                            recip={recip}
                            recipeId={recip.rkey}
                            bzhu={recip.bzhu}
                        // closeSearch={closeSearch}
                        />
                    </RecipeResponse>
                );
            })}
            <CalcSumCaloriesDiv><h1>Итог: {caloriesStore.sumCaloriesLunch}</h1></CalcSumCaloriesDiv>
        </>
    );
});

export default DailyRecipesLunch;
