import React from "react";
import SquareButton, { SquareBut } from "../../buttons/square-button";
import { BurgerSVG } from "../../buttons/icons/burger";
import { CookieSvg, HotdogSvg, MuffinSvg, PizzaSvg, PlusSvg } from "../../buttons/icons/favorite-items-icons";
import styled from "styled-components";


const FoodFaboriteTabDiv = styled.div`
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 316px;
`;

const FoodFavoriteTab = () => {
    return (
        <FoodFaboriteTabDiv>
            <SquareButton size="md" backgroundColor="#FFF8EE" icon={<BurgerSVG />} />
            <SquareButton size="md" backgroundColor="#FFF8EE" icon={<MuffinSvg />} />
            <SquareButton size="md" backgroundColor="#FFF8EE" icon={<CookieSvg />} />
            <SquareButton size="md" backgroundColor="#FFF8EE" icon={<PizzaSvg />} />
            <SquareButton size="md" backgroundColor="#FFF8EE" icon={<HotdogSvg />} />
            <SquareButton size="md" backgroundColor="#FFF8EE" icon={<PlusSvg />} />
        </FoodFaboriteTabDiv>
    );
};

export default FoodFavoriteTab;