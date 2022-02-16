import { SearchInput } from "./searching/search-input";
import React, { useContext, useEffect, useState } from "react";
import { RecipeFavoriteCardDiv } from "../../../components/tabulation/all-tabs/recipe-tab";
import { Context } from "../../../";
import NoResultsCard from "./searching/no-results-card";
import NoResCardImage from "../../images/no-results";
import { RecipeResponse, SearchPageDiv } from "./search-page";
import { MODAL_WINDOW } from "../../../components/routing/consts";
import FavoriteRecipeCard from "../../../components/recipe-cards/favorite-recipe-card";
import FavorRecCardLike from "../../images/heart-like";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import queryString from "query-string";
import ReactPaginate from "react-paginate";
import { observer } from "mobx-react-lite";
import { takeDataCat, testData } from "../../../api/categories";
import styled from "styled-components";
import { auth } from "../../../firebase";
import ModalWindow from "./modal-window";

const PaginationSpan = styled.span`
  overflow-x: scroll;
  width: auto;
  height: auto;
`;

const SearchingTESTPAG = observer(() => {
    const { userStore } = useContext(Context);
    const { categoriesStore } = useContext(Context);
    const { persist } = useContext(Context);
    const { search } = useLocation();
    const { path } = useRouteMatch();
    const history = useHistory();

    const values = queryString.parse(search);

    const { push } = useHistory();

    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery();
    const addQuery = (key, value) => {
        let pathname = location.pathname;
        // console.log(pathname, "ADDQUERYpathname");
        // returns path: '/app/books'
        let searchParams = new URLSearchParams(location.search);
        // returns the existing query string: '?type=fiction&author=fahid'
        searchParams.set(key, value);
        history.push({
            pathname: pathname,
            search: searchParams.toString(),
        });
    };
    useEffect(() => {
        categoriesStore.setNameCurrentCategory(query.get("category"));
        console.log(categoriesStore._nameCurrentCategory, "NAMcurrCATEG");
    }, [categoriesStore._nameCurrentCategory]);
    const currCategory = categoriesStore._nameCurrentCategory;

    useEffect(() => {
        testData(currCategory).then((fullCateg) => {
            let responseArr = [];
            const values = Object.values(fullCateg[0]);
            const keys = Object.keys(fullCateg[0]);
            const enterArr = Object.entries(fullCateg[0]);
            // console.log(enterArr, "enterARR");
            enterArr.map((items: any) => {
                const pars = JSON.parse(items[1]);
                const { bzhu, calories, header, img, timeToCook, desc } = pars;

                responseArr.push({
                    img: img,
                    header: header,
                    bzhu: bzhu,
                    desc: desc,
                    calories: calories,
                    timeToCook: timeToCook,
                    category: currCategory,
                    rkey: items[0],
                });
            });

            categoriesStore.setCurrentCategory(responseArr);
        });
    }, [currCategory]);

    // const { uid } = auth.currentUser;
    // console.log(uid)
    let showCateg = categoriesStore.currentCategory;
    const { length } = showCateg;

    useEffect(() => {
        categoriesStore.setCategoryLength(length);
    }, [categoriesStore.categoryLength, length]);

    const pagesVisited = categoriesStore.currentPage * categoriesStore.perPage;
    // console.log(showCateg);
    const displayItems = categoriesStore
        .valFilter()
        .slice(pagesVisited, pagesVisited + categoriesStore.perPage)
        .map((recip, idx) => {
            const { category } = recip;
            console.log(category, "categ");
            const { carbs, fat, proteins, img } = recip.bzhu;

            return (
                <RecipeResponse
                    onClick={() => {
                        categoriesStore.setModalObject({
                            recipe: recip,
                            id: "",
                            recipeId: recip.rkey
                        });
                        console.log(categoriesStore.modalObject, "modOBj");

                        push(`${MODAL_WINDOW}`);
                        // addQuery("modal", idx);
                        // return console.log(categoriesStore._modalObject);
                    }}
                >
                    <FavoriteRecipeCard
                        timeToCook={recip.timeToCook}
                        key={idx}
                        title={recip.header}
                        calories={recip.calories + " Kcal"}
                        likeIcon={<FavorRecCardLike />}
                        image={recip.img}
                    />
                </RecipeResponse>
            );
        });
    const pageCount = Math.ceil(categoriesStore.categoryLength / categoriesStore.perPage);
    // console.log(pageCount);
    const changePage = ({ selected }) => {
        categoriesStore.setCurrentPage(selected);
        // console.log(selected);
    };

    return (
        <SearchPageDiv>
            <SearchInput />
            {/* {history.location.pathname === `${path}${search}&modal=show`
        ? (< ModalWindow />) : null} */}
            {/* {categoriesStore._currentCategory !== [] ? < ModalWindow /> : null} */}
            {categoriesStore.currentCategory.length === 0 ? (
                <NoResultsCard header="Нет результатов" desc="Попробуйте другой запрос" icon={<NoResCardImage />} />
            ) : (
                <RecipeFavoriteCardDiv>
                    <ReactPaginate
                        pageCount={pageCount}
                        onPageChange={changePage}
                        previousLabel={"Prev"}
                        nextLabel={"Next"}
                        containerClassName={"paginationBtns"}
                        pageRangeDisplayed={1}
                        marginPagesDisplayed={1}
                        previousLinkClassName={"previousBtns"}
                        lastLinkClassName={"nextBtn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                    {displayItems}
                </RecipeFavoriteCardDiv>
            )}
        </SearchPageDiv>
    );
});

export default SearchingTESTPAG;
