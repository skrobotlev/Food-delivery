import { takeDataCat } from "../../../api/categories";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SnackSvg from "../../buttons/icons/snack";
import FruitSVG from "../../buttons/icons/strawb";
import VegetableSvg from "../../buttons/icons/vegetable";
import SquareButton, { SquareBut } from "../../buttons/square-button";
import { Context } from "../../../";

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
  const { userStore } = useContext(Context);
  const { push } = useHistory();
  const linkToCategory = (category) => {
    let arrr = [];
    return takeDataCat(category).then((val) => {
      // const test = val;
      console.log("ahe");
      val.map((item) => {
        // console.log(JSON.parse(item).header)
        return arrr.push(JSON.parse(item));
      });
      // console.log(userStore._category);
      // console.log(arrr)
      //   return arrr;
      push("/search");
      return userStore.setCategory(arrr);
    });
  };


  return (
    <FavoriteCategoriesDiv>
      <ButtonDiv>
        <SquareButton size="lg" backgroundColor="fruits" title="Десерты" onClick={() => linkToCategory("deserts")} icon={<FruitSVG />} />
      </ButtonDiv>
      <ButtonDiv>
        <SquareButton size="lg" backgroundColor="vegan" title="Салаты" onClick={() => linkToCategory("salads")} icon={<VegetableSvg />} />
      </ButtonDiv>
      <ButtonDiv>
        <SquareButton size="lg" backgroundColor="manyfats" title="Первые блюда" onClick={() => linkToCategory("first-dishes")} icon={<SnackSvg />} />
      </ButtonDiv>
    </FavoriteCategoriesDiv>
  );
};

export default FavoriteCategories;
