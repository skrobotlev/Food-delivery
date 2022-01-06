import React from "react";
import styled from "styled-components";
import RecipeCard from "../../recipe-cards/recipe-card";
import { Search } from "../../searching/search-input";
import Layout from "../layout";
import TrandingList from "./tranding-list";

const SearchPageDiv = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding-left: 25px;
  height: 100vh;
  width: 100%;
  padding-top: 90px;
`;

const SearchPageH1 = styled.h1`
font-family: "Signika";
font-size: 22px;
font-weight: 400;
margin-top: 25px;
`;

const LayoutSpan = styled.span`
padding-top: 20px;
 `;

const SearchPage = () => {
    return (
        <SearchPageDiv>
            <Search />
            <SearchPageH1>Hot now</SearchPageH1>
            <RecipeCard title="The pumpkin secrets" desc="Enjoy pumpkin dishes!" />
            <SearchPageH1>Trending</SearchPageH1>
            <TrandingList />
            <LayoutSpan> <Layout /> </LayoutSpan>
        </SearchPageDiv>
    );
};

export default SearchPage;
