import { SearchInput } from "./searching/search-input";
import React, { useContext, useEffect, useState } from "react";
import { RecipeFavoriteCardDiv } from "../../../components/tabulation/all-tabs/recipe-tab";
import { Pagination } from "./pagination/pagination";
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
import { categoriesWithKey, takeDataCat, testData } from "../../../api/categories";
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
        // console.log(query);
        // console.log(query.get("modal"));
        // console.log(query.get("category"));
        categoriesStore.setNameCurrentCategory(query.get("category"));
        console.log(categoriesStore._nameCurrentCategory, "NAMcurrCATEG");
    }, [categoriesStore._nameCurrentCategory]);
    const currCategory = categoriesStore._nameCurrentCategory;

    // const currCategory = query.get("category");
    // testData(currCategory).then((fullCateg) => {
    //     const resArr = [];
    //     let finalArr = [];

    //     const values = Object.values(fullCateg[0]);
    //     const keys = Object.keys(fullCateg[0]);

    //     resArr.push({
    //         keys: keys,
    //         values: values,
    //     });

    //     resArr.map((items) => {
    //         const { values, keys } = items;
    //         let resVals;

    //         values.map((val, id) => {
    //             keys.map((key, idx) => {
    //                 resVals = JSON.parse(val);
    //                 if (id === idx) {
    //                     return resVals.rkey = key;
    //                 }
    //             });
    //             console.log(resVals)
    //             finalArr.push(resVals);
    //         });

    //     });
    // categoriesStore.setCurrentCategory(finalArr);
    // console.log(categoriesStore._currentCategory);
    // });

    // console.log(categoriesStore._keyCATEGORY);
    useEffect(() => {
        // console.log(categoriesStore.currentCategory);
        // console.log(categoriesStore._currentCategory[0]);
    }, [categoriesStore.currentCategory]);
    // !!!!!!!!!!!! OR TAKEDATACAT!!!!!!!!!!!!!

    useEffect(() => {
        testData(currCategory).then((fullCateg) => {
            let resArr = [];
            let finalArr = [];
            let responseArr = [];
            const values = Object.values(fullCateg[0]);
            const keys = Object.keys(fullCateg[0]);
            // console.log(Object.entries(fullCateg[0]));
            const enterArr = Object.entries(fullCateg[0]);
            enterArr.map((items: any) => {
                // console.log(items[1])
                // console.log(JSON.parse(items[1]))
                // const str = JSON.stringify(items[1])
                // console.log(str)
                const pars = JSON.parse(items[1]);

                const { bzhu, calories, header, img, timeToCook, desc } = pars;
                // console.log(pars)
                responseArr.push({
                    img: img,
                    header: header,
                    bzhu: bzhu,
                    desc: desc,
                    calories: calories,
                    timeToCook: timeToCook,
                    rkey: items[0],
                });
                // items.map((item) => {
                //     // console.log(item)
                // })
            });
            // console.log(responseArr);

            categoriesStore.setCurrentCategory(responseArr);
            categoriesStore.setModalObject(categoriesStore._currentCategory[0]);
        });
    }, [currCategory]);

    // useEffect(() => {
    //     categoriesStore.setModalObject(categoriesStore._currentCategory[0]);
    // }, [categoriesStore._currentCategory]);
    // useEffect(() => {
    //     let arrr = [];
    //     categoriesWithKey(currCategory).then((val) => {
    //         // console.log(val);
    //         val.map((item) => {
    //             return arrr.push(JSON.parse(item));
    //         });
    //         // console.log(arrr);
    //         // console.log(userStore._category);
    //         // console.log(arrr)
    //         //   return arrr;
    //         return categoriesStore.setCurrentCategory(arrr);
    //     });
    // }, [currCategory]);
    // const { uid } = auth.currentUser;
    // console.log(uid)
    let showCateg = categoriesStore._currentCategory;
    const { length } = showCateg;

    useEffect(() => {
        categoriesStore.setCategoryLength(length);
    }, [categoriesStore._categoryLength, length]);

    const pagesVisited = categoriesStore._currentPage * categoriesStore._perPage;
    // console.log(showCateg);
    const displayItems = categoriesStore
        .valFilter()
        .slice(pagesVisited, pagesVisited + categoriesStore._perPage)
        .map((recip, idx) => {
            const { rkey } = recip;
            // console.log(rkey, "TYPEOFKEYY");
            // console.log(idx);
            const { carbs, fat, proteins, img } = recip.bzhu;
            // console.log(search)
            // categoriesStore.setModalObject(recip);
            // console.log(categoriesStore._modalObject)
            return (
                <RecipeResponse
                    onClick={() => {
                        categoriesStore.setModalObject(recip);
                        push(`${MODAL_WINDOW}`);
                        // addQuery("modal", idx);
                        return console.log(categoriesStore._modalObject);
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
    const pageCount = Math.ceil(categoriesStore._categoryLength / categoriesStore._perPage);
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
            {categoriesStore._currentCategory.length === 0 ? (
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
            {/* {categoriesStore._currentCategory !== [] ? (< ModalWindow />) : (
                <NoResultsCard header="Нет результатов" desc="Попробуйте другой запрос" icon={<NoResCardImage />} />
            )} */}
        </SearchPageDiv>
    );
});

export default SearchingTESTPAG;
