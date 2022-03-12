import { Context } from "@/store";
import React, { useContext, useEffect } from "react";

export default function useRecipesHash(recipesHashTb, recipeId, active, setActive, records) {
    useEffect(() => {
        console.log(recipesHashTb.recipeId, "recHashTB")
        if (recipesHashTb[recipeId]) setActive(true);
        else setActive(false);
    }, [records, active]);
}

export function useStore() {
    const { userStore, categoriesStore, caloriesStore } = useContext(Context);
    return { userStore, categoriesStore, caloriesStore };
}
