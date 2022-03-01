import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import Searching from "./searching";

export const SearchPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const SearchPageH1 = styled.h1`
  font-family: "Balsamiq Sans";
  font-size: 22px;
  font-weight: 400;
  margin-top: 30px;
  text-align: center;
`;

export const RecipeResponse = styled.div`
`;


const SearchPage = observer(() => {

  return (
    <>
      <SearchPageH1>Поиск</SearchPageH1>
      <Searching />
    </>
  );
});

export default SearchPage;
