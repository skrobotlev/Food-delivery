import { Context } from "../../../";

import React, { useContext, useEffect } from "react";
import { useHistory, useLocation, useRouteMatch, withRouter } from "react-router-dom";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import Searching from "./searching";

export const SearchPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* overflow-y: scroll; */
  /* margin-left: 25px; */
  height: 100vh;
  width: 100%;
`;

const SearchPageH1 = styled.h1`
  font-family: "Balsamiq Sans";
  font-size: 22px;
  font-weight: 400;
  margin-top: 125px;
`;

export const RecipeResponse = styled.div`
  /* overflow-y: scroll; */
`;

const SearchInputDiv = styled.div``;

const SearchPage = observer(() => {
  const { userStore } = useContext(Context);
  const history = useHistory();
  const { categoriesStore } = useContext(Context);

  return (
    <>

      <SearchPageH1>Поиск</SearchPageH1>
      {/* <SearchingTESTPAG /> */}
      {/* {categoriesStore._currentCategory !== [] ? < ModalWindow /> : null} */}

      {/* {history.location.pathname === `${path}${search}&modal=show`
        ? (< ModalWindow />) : null} */}
      {/* < ModalWindow /> */}
      <Searching />

    </>
  );
});

export default SearchPage;
