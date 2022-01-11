import React from "react";
import styled from "styled-components";
import SnackSvg from "../../buttons/icons/snack";
import FruitSVG from "../../buttons/icons/strawb";
import VegetableSvg from "../../buttons/icons/vegetable";
import SquareButton from "../../buttons/square-button";

const FavoriteCategoriesDiv = styled.div`
  display: flex;
  overflow-x: scroll;
  width: 100%;
  margin-bottom: 66px;
  margin-top: 24px;
`;

const ButtonDiv = styled.div`
  display: inline-block;
  &:first-of-type {
    margin-left: 0px;
  }
  margin-left: 15px;
`;

const FavoriteCategories = () => {
    return (
        <FavoriteCategoriesDiv>
            <ButtonDiv>
                <SquareButton size="lg" backgroundColor="fruits" title="Fruits" icon={<FruitSVG />} />
            </ButtonDiv>
            <ButtonDiv>
                <SquareButton size="lg" backgroundColor="vegan" title="Vegetables" icon={<VegetableSvg />} />
            </ButtonDiv>
            <ButtonDiv>
                <SquareButton size="lg" backgroundColor="manyfats" title="Snacks" icon={<SnackSvg />} />
            </ButtonDiv>
        </FavoriteCategoriesDiv>
    );
};

export default FavoriteCategories;
