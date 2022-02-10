import { Context } from "../../../";
import FavorRecCardLike from "../../images/heart-like";
import FavorRecCardSalad from "../../images/salad";
import FavoriteRecipeCard from "../../../components/recipe-cards/favorite-recipe-card";
import { RecipeFavoriteCardDiv, RectangleButtonSpan } from "../../../components/tabulation/all-tabs/recipe-tab";
import React, { useContext, useEffect } from "react";
import { useHistory, useLocation, useRouteMatch, withRouter } from "react-router-dom";
import styled from "styled-components";
import RectangleButton from "../../buttons/rectangle-button";
import RecipeCard from "../../recipe-cards/recipe-card";
import { SearchInput } from "./searching/search-input";
import TrandingList from "./tranding-list";
import { takeDataCat, testData } from "../../../api/categories";
import { observer } from "mobx-react-lite";
import { MODAL_WINDOW } from "../../../components/routing/consts";
import NoResultsCard from "./searching/no-results-card";
import NoResCardImage from "../../images/no-results";
import { Pagination } from "./pagination/pagination";
import Searching from "./searching";
import ReactPaginate from "react-paginate";
import SearchingTESTPAG from "./TEST-SHOW-PAG";
import { PaginationCOPY } from "./pagination/PAGINATION-MOBX-COPY";
import ModalWindow from "./modal-window";

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

  const { push } = useHistory();
  const { length } = userStore._category;
  const { search } = useLocation();
  const { path } = useRouteMatch();
  // useEffect(() => {
  //   // console.log(userStore._category);
  //   userStore.setCategoryLength(length);
  // }, [userStore._category, userStore._category.length,]);
  // useEffect(() => {
  //   console.log(search);
  //   console.log(path);
  // }, [search, path]);
  const handleChange = (e) => {
    userStore._filter = e.target.value;
  };
  // console.log(path, "======", search);
  return (
    <>
      {/* <SearchPageDiv> */}
      {/* {<SearchingTESTPAG /> ? <SearchingTESTPAG /> : <NoResultsCard header="Нет результатов" desc="Попробуйте другой запрос" icon={<NoResCardImage />} /> } */}

      <SearchPageH1>Поиск</SearchPageH1>
      <SearchingTESTPAG />
      {/* {categoriesStore._currentCategory !== [] ? < ModalWindow /> : null} */}

      {/* {history.location.pathname === `${path}${search}&modal=show`
        ? (< ModalWindow />) : null} */}
      {/* < ModalWindow /> */}
      {/* <Searching /> */}
      {/* <PaginationCOPY /> */}
      {/* <Pagination /> */}
      {/* <SearchPageH1>Популярные категории</SearchPageH1>
      <RecipeCardsDiv>
        <RecipeCard
          title="Тыквенное удовольствие"
          desc="Вкуси тыквенную сладость!"
          srcImage="https://user-images.githubusercontent.com/92730840/147400625-e55e86e1-b7ce-4629-8582-7a0edb438ef9.png"
        />
        <RecipeCard
          title="Очень полезная капуста"
          desc="Ешьте полезные и вкусные салаты!"
          srcImage="https://vasylivanovich.com.ua/image/cache/import_files/00/006df762efa111eba8230cc47a0c8aea_020dee13f04b11eba8230cc47a0c8aea-1000x1000.jpg"
        />
      </RecipeCardsDiv> */}

      {/* <RecipeFavoriteCardDiv>
        {userStore._category.length === 0 ? <NoResultsCard header="Нет результатов" desc="Попробуйте другой запрос" icon={<NoResCardImage />} /> : null}
        {userStore.valFilter().map((recip, idx) => {
          // console.log(recip);
          // console.log(idx);
          const { carbs, fat, proteins, img } = recip.bzhu;
          return (
            <RecipeResponse
              onClick={() => {
                push(MODAL_WINDOW);
                userStore.setModalObject(recip);
                // return console.log(userStore._modalObject);
              }}
            >
              <FavoriteRecipeCard
                key={idx}
                title={recip.header}
                calories={recip.calories + " Kcal"}
                likeIcon={<FavorRecCardLike />}
                image={recip.img}
              />
             
            </RecipeResponse>
          );
        })}
      </RecipeFavoriteCardDiv> */}
      {/* </SearchPageDiv> */}
    </>
  );
});

export default SearchPage;
