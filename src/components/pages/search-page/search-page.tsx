import { Context } from "../../../";
import FavorRecCardLike from "../../../components/images/fav-re-cd-like";
import FavorRecCardSalad from "../../../components/images/fav-re-cd-salad";
import FavoriteRecipeCard from "../../../components/recipe-cards/favorite-recipe-card";
import { RecipeFavoriteCardDiv, RectangleButtonSpan } from "../../../components/tabulation/all-tabs/recipe-tab";
import React, { useContext, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import styled from "styled-components";
import RectangleButton from "../../buttons/rectangle-button";
import RecipeCard from "../../recipe-cards/recipe-card";
import { SearchInput } from "../../searching/search-input";
import TrandingList from "./tranding-list";
import { takeDataCat, testData } from "../../../api/categories";
import { observer } from "mobx-react-lite";
import { MODAL_WINDOW } from "../../../components/routing/consts";
import NoResultsCard from "../../../components/searching/no-results-card";
import NoResCardImage from "../../../components/images/no-res-card";

const SearchPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* overflow-y: scroll; */
  /* margin-left: 25px; */
  height: 100vh;
  width: 100%;
`;

const SearchPageH1 = styled.h1`
  font-family: "Balsamiq Sans";
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
  height: 100%;
  div {
    margin-left: 15px;
  }
`;

export const RecipeResponse = styled.div`
  /* overflow-y: scroll; */
`;

const SearchInputDiv = styled.div``;

const SearchPage = observer(() => {
  const { userStore } = useContext(Context);
  const { push } = useHistory();
  const handleChange = (e) => {
    userStore._filter = e.target.value;
  };

  useEffect(() => {
    const { length } = userStore._category;
    console.log(length);
    // console.log(userStore._category.length);
    userStore.setCategoryLength(length)
  }, [userStore._category, userStore._category.length]);

  const modalObjectOn = () => { };
  // let arrr = [];
  // useEffect(() => {
  //   takeDataCat("salads").then((val) => {
  //     const test = val;
  //     // console.log(test)
  //     val.map((item) => {
  //       // console.log(JSON.parse(item).header)
  //       return arrr.push(JSON.parse(item));
  //     });
  //     // console.log(userStore._category);
  //     // console.log(arrr)
  //     //   return arrr;
  //     return userStore.setCategory(arrr);
  //   });
  // }, []);
  return (
    <SearchPageDiv>
      <SearchInput />
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
      <SearchPageH1>Поиск</SearchPageH1>
      <RecipeFavoriteCardDiv>
        {/* <RectangleButtonSpan>
          <RectangleButton size="md" title="Искать рецепты" />
        </RectangleButtonSpan> */}

        {!userStore._category ? <NoResultsCard header="Нет результатов" desc="Попробуйте другой запрос" icon={<NoResCardImage />} /> : null}
        {userStore.valFilter().map((recip, idx) => {
          console.log(recip);
          console.log(idx);
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
              // bzhu={`Б${proteins} Ж${fat} У${carbs}`}
              />
            </RecipeResponse>
          );
        })}
      </RecipeFavoriteCardDiv>
      {/* <TrandingList /> */}
    </SearchPageDiv>
  );
});

export default SearchPage;
