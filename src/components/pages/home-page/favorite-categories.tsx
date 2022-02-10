import { takeDataCat, testData } from "../../../api/categories";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SnackSvg from "../../buttons/icons/snack";
import FruitSVG from "../../buttons/icons/strawb";
import VegetableSvg from "../../buttons/icons/vegetable";
import SquareButton, { SquareBut } from "../../buttons/square-button";
import { Context } from "../../..";
import FavorRecCardChicken from "../../images/chicken";
import { SoupIcon } from "../../../components/images/soup";

const FavoriteCategoriesDiv = styled.div`
  display: flex;
  overflow-x: scroll;
  width: 100%;
  margin-bottom: 66px;
  margin-top: 5px;
`;

const ButtonDiv = styled.div`
  display: inline-block;
  &:first-of-type {
    margin-left: 0px;
  }
  margin-left: 15px;
`;

const FavoriteCategories = () => {
  const { categoriesStore } = useContext(Context);
  const { userStore } = useContext(Context);
  const { push } = useHistory();

  const linkToCategory = (category) => {
    push(`/search?category=${category}`);
  };
  return (
    <FavoriteCategoriesDiv>
      <ButtonDiv>
        <SquareButton size="lg" backgroundColor="fruits" title="TEST" onClick={() => linkToCategory("TEST")} icon={<FruitSVG />} />
      </ButtonDiv>
      <ButtonDiv>
        <SquareButton size="lg" backgroundColor="vegan" title="Салаты" onClick={() => linkToCategory("salads")} icon={<VegetableSvg />} />
      </ButtonDiv>
      <ButtonDiv>
        <SquareButton size="lg" backgroundColor="manyfats" title="Первые блюда" onClick={() => linkToCategory("first-dishes")} icon={<SoupIcon />} />
      </ButtonDiv>
      <ButtonDiv>
        <SquareButton
          size="lg"
          backgroundColor="manyfats"
          title="Вторые блюда"
          onClick={() => linkToCategory("second-dishes")}
          icon={<FavorRecCardChicken />}
        />
      </ButtonDiv>
      <ButtonDiv>
        <SquareButton size="lg" backgroundColor="manyfats" title="Напитки" onClick={() => linkToCategory("beverages")} icon={<SnackSvg />} />
      </ButtonDiv>
      <ButtonDiv>
        <SquareButton size="lg" backgroundColor="manyfats" title="Консервирование" onClick={() => linkToCategory("canning")} icon={<SnackSvg />} />
      </ButtonDiv>
      <ButtonDiv>
        <SquareButton size="lg" backgroundColor="manyfats" title="Десерты" onClick={() => linkToCategory("deserts")} icon={<SnackSvg />} />
      </ButtonDiv>
      <ButtonDiv>
        <SquareButton size="lg" backgroundColor="manyfats" title="Соусы" onClick={() => linkToCategory("sauces")} icon={<SnackSvg />} />
      </ButtonDiv>
    </FavoriteCategoriesDiv>
  );
};

export default FavoriteCategories;
