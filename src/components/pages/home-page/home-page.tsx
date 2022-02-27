import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import RectangleButton, { BigRectangleButton, BigRectBut, RectBut } from "../../buttons/rectangle-button";
import HomePageHeader from "./header";
import HomePageSlider from "./slider-home";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { InsideRectBut } from "../../buttons/rectangle-button";
import FavoriteCategories from "./favorite-categories";
import { observer } from "mobx-react-lite";
import { Context } from "@/store";
import { getFavoriteRecipes, searchingOnDb } from "@/api/favorite-recipes";
import { auth } from "@/firebase";
import useRequest from "@/hooks/useRequestDb";

const HomePageContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
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
  margin-top: 35px;
`;

const HomePage = observer(() => {
  const { userStore } = useContext(Context);
  const { uid } = auth.currentUser;

  useRequest(uid, userStore);

  return (
    <HomePageContent>
      <HomePageHeader desc="Находите, ешьте, отслеживайте полезную пищу" name="Эвелина" />
      <HomePageSlider />
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
