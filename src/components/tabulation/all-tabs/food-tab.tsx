import React from "react";
import SquareButton from "../../buttons/square-button";
import { BurgerSVG } from "../../buttons/icons/burger";
import { CookieSvg, HotdogSvg, MuffinSvg, PizzaSvg, PlusSvg } from "../../buttons/icons/favorite-items-icons";
import styled from "styled-components";


const FoodFaboriteTabDiv = styled.div`
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 316px;
      @media screen and (min-width: 450px) {
        width: 100%;
      }
`;

const FoodFavoriteTab = () => {
    return (
        <FoodFaboriteTabDiv>
            <SquareButton size="md" backgroundColor="manyfats" icon={<BurgerSVG />} />
            <SquareButton size="md" backgroundColor="manyfats" icon={<MuffinSvg />} />
            <SquareButton size="md" backgroundColor="manyfats" icon={<CookieSvg />} />
            <SquareButton size="md" backgroundColor="manyfats" icon={<PizzaSvg />} />
            <SquareButton size="md" backgroundColor="manyfats" icon={<HotdogSvg />} />
            <SquareButton size="md" backgroundColor="manyfats" icon={<PlusSvg />} />
        </FoodFaboriteTabDiv>
    );
};

export default FoodFavoriteTab;
