import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import RectangleButton from "../../buttons/rectangle-button";
import RecipeCard from "../../recipe-cards/recipe-card";
import { Search } from "../../searching/search-input";
import TrandingList from "./tranding-list";

const SearchPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* margin-left: 25px; */
  height: 100vh;
  width: 100%;
`;

const SearchPageH1 = styled.h1`
  font-family: "Signika";
  font-size: 22px;
  font-weight: 400;
  margin-top: 25px;
`;

const RecipeCardsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow-x: scroll;
  width: 100%;
  div {
    margin-left: 15px;
  }
`;

const SearchPage = () => {
    // https://user-images.githubusercontent.com/92730840/147400625-e55e86e1-b7ce-4629-8582-7a0edb438ef9.png
    // https://vasylivanovich.com.ua/image/cache/import_files/00/006df762efa111eba8230cc47a0c8aea_020dee13f04b11eba8230cc47a0c8aea-1000x1000.jpg
    return (
        <SearchPageDiv>
            <Search />
            <SearchPageH1>Hot now</SearchPageH1>
            <RecipeCardsDiv>
                <RecipeCard
                    title="The pumpkin secrets"
                    desc="Enjoy pumpkin dishes!"
                    srcImage="https://user-images.githubusercontent.com/92730840/147400625-e55e86e1-b7ce-4629-8582-7a0edb438ef9.png"
                />
                <RecipeCard
                    title="Dishes with garbage"
                    desc="Most ealthy food!"
                    srcImage="https://vasylivanovich.com.ua/image/cache/import_files/00/006df762efa111eba8230cc47a0c8aea_020dee13f04b11eba8230cc47a0c8aea-1000x1000.jpg"
                />
            </RecipeCardsDiv>
            <SearchPageH1>Trending</SearchPageH1>
            <TrandingList />
        </SearchPageDiv>
    );
};

export default SearchPage;
