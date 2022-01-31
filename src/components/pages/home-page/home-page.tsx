import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import RectangleButton, { BigRectangleButton, BigRectBut, RectBut } from "../../buttons/rectangle-button";
import Layout from "../../../layout";
import HomePageHeader from "./header";
import HomePageSlider from "./slider-home";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { InsideRectBut } from "../../buttons/rectangle-button";
import FavoriteCategories from "./favorite-categories";
import { withRouter } from "react-router-dom";
import { requestCategories, takeDataCat, testData } from "../../../api/categories";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";
import PersistApp from "../search-page/mobx-persist/App";
// const { takeDataCat } = require("")

const HomePageContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  /* overflow-y: hidden; */
  height: 100vh;
  width: 100%;
`;

const BigRectButtonDiv = styled.div`
  padding-top: 40px;
`;

const FavoritesCardHeader = styled.h3`
  font-family: "Balsamiq Sans";
  font-weight: 400;
  font-size: 22px;
  margin-top: 24px;
`;

const HomePage = observer(() => {
  const { userStore } = useContext(Context);
  const { categoriesStore } = useContext(Context);
  const { persist } = useContext(Context);
  // console.log(testData());
  // useEffect(() => {
  //   // console.log(categoriesStore._salads);
  //   // console.log(userStore._category);
  //   const arr = [];
  //   requestCategories("salads")
  //     .then((items) => {
  //       items.map((item) => {
  //         return arr.push(JSON.parse(item));
  //       })
  //       return persist.setObject(arr);
  //     })
  //     .then(() => console.log(persist.exper));
  // }, []);

  return (
    <HomePageContent>
      <HomePageHeader desc="Находите, ешьте, отслеживайте полезную пищу" name="Эвелина" />
      <HomePageSlider />
      {/* <PersistApp /> */}
      <BigRectButtonDiv>
        <BigRectangleButton title="Следите за своим прогрессом">
          <InsideRectBut key="1">
            Смотреть
            <ArrowRightIcon />
          </InsideRectBut>
        </BigRectangleButton>
      </BigRectButtonDiv>
      <FavoritesCardHeader>Выберите интересующую категорию</FavoritesCardHeader>
      <FavoriteCategories />
    </HomePageContent>
  );
});

export default HomePage;
