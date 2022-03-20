import { getFavoriteRecipes, searchingOnDb } from "@/api/favorite-recipes";
import React, { useEffect } from "react";

export default function useRequestDb(uid, userStore) {
    useEffect(() => {
        getFavoriteRecipes(uid).then((res) => {
            const favoriteRecipeIds = Object.entries(res).reduce((array, item: any) => {
                const recipe = {
                    id: item[0],
                    recipeId: item[1].recipeId,
                    categories: item[1].category,
                };
                array.push(recipe);
                return array;
            }, []);
            searchingOnDb(favoriteRecipeIds)
                .then((res) => {
                    console.log(res, "res");
                    userStore.favoriteRecipesDb = res;
                    console.log(userStore.favoriteRecipesDb);
                });
        });
    }, []);
}