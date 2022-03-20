import { Context } from "@/store";
import React, { useContext, useEffect } from "react";
import useRecipesHash from "./useStore";

export function useLikeRecipesHashCOMP(recipeId, setActive, meal, breakfast, lunch, dinner) {
    if (meal === "breakfast") {
        useLikeRecipesHash(breakfast, recipeId, setActive);
    } else if (meal === "dinner") {
        useLikeRecipesHash(dinner, recipeId, setActive);
    } else if (meal === "lunch") {
        useLikeRecipesHash(lunch, recipeId, setActive);
    }
}



export default function useLikeRecipesHash(recipesHashTb, recipeId, setActive,) {
    useEffect(() => {
        if (recipesHashTb[recipeId]) setActive(true);
        else setActive(false);
    });
}


