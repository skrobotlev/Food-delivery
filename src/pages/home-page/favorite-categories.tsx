import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import VegetableSvg from "@/components/buttons/icons/vegetable";
import SquareButton from "@/components/buttons/square-button";
import { Context } from "@/store";
import FavorRecCardChicken from "@/components/images/chicken";
import { SoupSvg } from "@/components/images/soup";
import CakeSvg from "@/components/images/cake";
import CanningSvg from "@/components/images/canning";
import BeveragesSvg from "@/components/images/beverages";
import { SaucesSvg } from "@/components/images/sauces";

const FavoriteCategoriesDiv = styled.div`
  display: flex;
  overflow-x: scroll;
  width: 100%;
  /* margin-bottom: 66px; */
  margin-top: 15px;
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
      {/* <ButtonDiv>
        <SquareButton size="lg" backgroundColor="fruits" title="TEST" onClick={() => linkToCategory("TEST")} icon={<FruitSVG />} />
      </ButtonDiv> */}
      <ButtonDiv>
        <SquareButton size="lg" backgroundColor="vegan" title="Салаты" onClick={() => linkToCategory("salads")} icon={<VegetableSvg />} />
      </ButtonDiv>
      <ButtonDiv>
        <SquareButton size="lg" backgroundColor="manyfats" title="Первые блюда" onClick={() => linkToCategory("first-dishes")} icon={<SoupSvg />} />
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
        <SquareButton size="lg" backgroundColor="beverages" title="Напитки" onClick={() => linkToCategory("beverages")} icon={<BeveragesSvg />} />
      </ButtonDiv>
      <ButtonDiv>
        <SquareButton size="lg" backgroundColor="manyfats" title="Соленья, консервы" onClick={() => linkToCategory("canning")} icon={<CanningSvg />} />
      </ButtonDiv>
      <ButtonDiv>
        <SquareButton size="lg" backgroundColor="deserts" title="Десерты" onClick={() => linkToCategory("deserts")} icon={<CakeSvg />} />
      </ButtonDiv>
      <ButtonDiv>
        <SquareButton size="lg" backgroundColor="sauces" title="Соусы" onClick={() => linkToCategory("sauces")} icon={<SaucesSvg />} />
      </ButtonDiv>
    </FavoriteCategoriesDiv>
  );
};

export default FavoriteCategories;
