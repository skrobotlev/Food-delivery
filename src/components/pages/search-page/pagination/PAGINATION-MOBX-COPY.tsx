import { requestCategories } from "../../../../api/categories";
import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Context } from "../../../..";
import { RecipeResponse } from "../search-page";
import FavoriteRecipeCard from "../../../recipe-cards/favorite-recipe-card";
import { observer } from "mobx-react-lite";

export const PaginationCOPY = observer(() => {
    const { userStore } = useContext(Context);
    const { persist } = useContext(Context);
    const { length } = persist.category
    let pageCount;
    useEffect(() => {
        // console.log(categoriesStore._salads);
        console.log(persist.category);
        const arr = [];
        console.log(persist.currentPage);
        console.log(persist.categoryLength);
        console.log(persist.perPage);
        console.log(length);
        pageCount = Math.ceil(persist.categoryLength / persist.perPage);
        requestCategories("salads").then((items) => {
            items.map((item) => {
                return arr.push(JSON.parse(item));
            });
            return persist.setObject(arr);
        })
            .then(() => console.log(persist.category));
    }, []);

    // const usersPerPage = 10;
    const pagesVisited = persist.currentPage * persist.perPage;

    const displayUsers = persist.category.slice(pagesVisited, pagesVisited + persist.perPage).map((recip, idx) => (
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



    const changePage = ({ selected }) => {
        persist.setCurrentPage(selected);
    };

    return (
        <div className="App">
            {/* <div> */}
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
            {/* </div> */}
        </div>
    );
});
