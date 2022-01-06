import React from "react";
import styled from "styled-components";
import SnackSvg from "../../buttons/icons/snack";
import FruitSVG from "../../buttons/icons/strawb";
import VegetableSvg from "../../buttons/icons/vegetable";
import SquareButton from "../../buttons/square-button";

const FavoriteCategoriesDiv = styled.div`
display: flex;
flex-direction: row;
`;

const FavoriteCategories = () => {
    return (
        <FavoriteCategoriesDiv>
            <SquareButton size="lg" backgroundColor="#FFF2F0" title="Fruits" icon={<FruitSVG />} />
            <SquareButton size="lg" backgroundColor="#FFF2F0" title="Vegetables" icon={<VegetableSvg />} />
            <SquareButton size="lg" backgroundColor="#FFF2F0" title="Snacks" icon={<SnackSvg />} />
        </FavoriteCategoriesDiv>

    );
};

export default FavoriteCategories;