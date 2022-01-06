import React from "react";
import FavoriteRecipeCard from "../../recipe-cards/favorite-recipe-card";
import FavorRecCardLike from "../../images/fav-re-cd-like";
import FavorRecCardSalad from "../../images/fav-re-cd-salad";

import styled from "styled-components";

const RecipeFavoriteCardDiv = styled.div`

`;

const RecipeFavoriteCard = () => {
    return (
        <RecipeFavoriteCardDiv>
            <FavoriteRecipeCard title="Chopped Spring Ramen" calories="250 kcal"
                likeIcon={<FavorRecCardLike />} icon={<FavorRecCardSalad />}
                category="Scallions & tomatoes">

            </FavoriteRecipeCard>

        </RecipeFavoriteCardDiv>
    );
};

export default RecipeFavoriteCard;