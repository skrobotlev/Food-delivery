import React from "react";
import styled from "styled-components";
import RecipeCard from "../../recipe-cards/recipe-card";

const HotNowRecipeCardsDiv = styled.div`
     display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const HotNowRecipeCards = () => {
    return (
        <HotNowRecipeCardsDiv>
            <RecipeCard title="The pumpkin secrets" desc="Enjoy pumpkin dishes!"
                srcImage="https://vasylivanovich.com.ua/image/cache/import_files/00/006df762efa111eba8230cc47a0c8aea_020dee13f04b11eba8230cc47a0c8aea-1000x1000.jpg" />

        </HotNowRecipeCardsDiv>
    );
};

export default HotNowRecipeCards;