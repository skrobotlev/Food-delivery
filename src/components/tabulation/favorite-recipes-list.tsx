import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { auth } from "@/firebase";
import { Context } from "@/store";
import { RecipeResponse } from "@/pages/search-page/search-page";
import FavoriteRecipeCard from "../recipe-cards/favorite-recipe-card";
import FavorRecCardLike from "../images/heart-like";
import { RecipeFavoriteCardDiv } from "./all-tabs/recipe-tab";
import ModalWindow from "@/pages/search-page/modal-window";
import useRequestDb from "@/hooks/useRequestDb";
import { useStore } from "@/hooks/useStore";

const FavoriteRecipeList = observer(() => {
    const { userStore, categoriesStore } = useStore();
    const [openModal, setOpenModal] = useState(false);
    const { uid } = auth.currentUser;

    useRequestDb(uid, userStore);

    const recipeClickFunc = (resp, e) => {
        if (e.target.tagName === "path") return e.stopPropagation();

        categoriesStore.modalObject = {
            recipe: resp.recipe,
            id: resp.id,
            recipeId: resp.recipeId,
        };
        console.log(categoriesStore.modalObject, "favModOb");
        setOpenModal(true);
    };

    const showFavorites = userStore.favoriteRecipesDb.map((resp, idx) => {
        return (
            <RecipeResponse onClick={(e) => recipeClickFunc(resp, e)}>
                <FavoriteRecipeCard
                    timeToCook={resp.recipe.timeToCook}
                    key={idx}
                    title={resp.recipe.header}
                    calories={resp.recipe.calories + " Kcal"}
                    likeIcon={<FavorRecCardLike />}
                    recipeId={resp.recipeId}
                    image={resp.recipe.img}
                    bzhu={resp.recipe.bzhu}
                />
            </RecipeResponse>
        );
    });
    return (<RecipeFavoriteCardDiv>{showFavorites}
        {openModal ? <ModalWindow openMod={openModal} closeMod={setOpenModal} /> : null}
    </RecipeFavoriteCardDiv>);

});

export default FavoriteRecipeList;
