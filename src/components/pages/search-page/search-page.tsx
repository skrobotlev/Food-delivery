import { Context } from "../../../";
import FavorRecCardLike from "../../../components/images/fav-re-cd-like";
import FavorRecCardSalad from "../../../components/images/fav-re-cd-salad";
import FavoriteRecipeCard from "../../../components/recipe-cards/favorite-recipe-card";
import { RecipeFavoriteCardDiv, RectangleButtonSpan } from "../../../components/tabulation/all-tabs/recipe-tab";
import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import RectangleButton from "../../buttons/rectangle-button";
import RecipeCard from "../../recipe-cards/recipe-card";
import { SearchInput } from "../../searching/search-input";
import TrandingList from "./tranding-list";
import { takeDataCat } from "../../../api/categories";
import { observer } from "mobx-react-lite";

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

const RecipeResponse = styled.div`
  /* overflow-y: scroll; */
`;

const SearchInputDiv = styled.div`

`;

const SearchPage = observer(() => {

  const handleChange = (e) => {
    userStore._filter = e.target.value;
  };
  const { userStore } = useContext(Context);
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
      <SearchPageH1>Популярные категории</SearchPageH1>
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
      </RecipeCardsDiv>
      <SearchPageH1>Поиск</SearchPageH1>
      <RecipeFavoriteCardDiv>
        {/* <RectangleButtonSpan>
          <RectangleButton size="md" title="Искать рецепты" />
        </RectangleButtonSpan> */}
        {userStore.valFilter().map((recip, idx) => {
          // console.log(recip);
          const { carbs, fat, proteins } = recip.bzhu;
          return (
            <RecipeResponse>
              <FavoriteRecipeCard
                key={idx}
                title={recip.header}
                calories={recip.calories}
                likeIcon={<FavorRecCardLike />}
                icon={<FavorRecCardSalad />}
                bzhu={`Б${proteins} Ж${fat} У${carbs}`}
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
