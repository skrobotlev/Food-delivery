import { requestCategories } from "../../../../api/categories";
import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Context } from "../../../../";
import { RecipeResponse } from "../search-page";
import FavoriteRecipeCard from "../../../../components/recipe-cards/favorite-recipe-card";
import { observer } from "mobx-react-lite";

export const Pagination = observer(() => {
  const { userStore } = useContext(Context);
  const { persist } = useContext(Context);
  const { length } = userStore._category;

  useEffect(() => {
    // console.log(userStore._category);
    userStore.setCategoryLength(length);
  }, [userStore._category, userStore._category.length]);

  useEffect(() => {
    // console.log(categoriesStore._salads);
    // console.log(userStore._currentPage);
    const arr = [];
    requestCategories("salads").then((items) => {
      items.map((item) => {
        return arr.push(JSON.parse(item));
      });
      return userStore.setCategory(arr);
    });
    // .then(() => console.log(userStore._category));
  }, [userStore._category, userStore._currentPage]);

  // const usersPerPage = 10;
  const pagesVisited = userStore._currentPage * userStore._perPage;
  console.log(userStore._category)
  const displayUsers = userStore._category.slice(pagesVisited, pagesVisited + userStore._perPage).map((recip, idx) => (
    <RecipeResponse>
      <FavoriteRecipeCard
        key={idx}
        title={recip.header}
        calories={recip.calories + " Kcal"}
        // likeIcon={<FavorRecCardLike />}
        image={recip.img}
      />
    </RecipeResponse>
  ));

  const pageCount = Math.ceil(userStore._categoryLength / userStore._perPage);

  const changePage = ({ selected }) => {
    userStore.setCurrentPage(selected);
  };

  return (
    // <div className="App">
    // <div>
    <>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={changePage}
        previousLabel={"Previous"}
        nextLabel={"Next"}
        containerClassName={"paginationBtns"}
        previousLinkClassName={"previousBtns"}
        lastLinkClassName={"nextBtn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
      {displayUsers}
    </>
    // </div>
    // </div>
  );
});

export default Pagination;
