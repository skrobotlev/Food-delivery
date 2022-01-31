import { SearchInput } from "./searching/search-input";
import React, { useContext, useEffect } from "react";
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

// const Shower = ({ current }) => {
//     const { userStore } = useContext(Context);
//     const { categoriesStore } = useContext(Context);
//     const { search } = useLocation();
//     const values = queryString.parse(search);
//     const { path } = useRouteMatch();
//     const { push } = useHistory();

//     let showCateg;
//     if (current === "salads") showCateg = categoriesStore._salads;
//     if (current === "deserts") showCateg = categoriesStore._deserts;
//     if (current === "first-dishes") showCateg = categoriesStore._firstDishes;
//     if (current === "second-dishes") showCateg = categoriesStore._secondDishes;
//     if (current === "beverages") showCateg = categoriesStore._beverages;
//     if (current === "canning") showCateg = categoriesStore._canning;
//     if (current === "sauces") showCateg = categoriesStore._sauces;
//     const { length } = showCateg;
//     let pageCount;

//     // console.log(categorFunct(current));
//     // const categResposne = categorFunct(current)
//     useEffect(() => {
//         // console.log(categoriesStore._categoryLength);
//         categoriesStore.setCategoryLength(length);
//         // console.log(categoriesStore._categoryLength);
//         // console.log(length);
//         pageCount = Math.ceil(categoriesStore._categoryLength / categoriesStore._perPage);
//         console.log(categoriesStore._currentPage);
//     }, [categoriesStore._categoryLength, categoriesStore._currentPage]);

//     // useEffect(() => {
//     //     pageCount = Math.ceil(categoriesStore._categoryLength / categoriesStore._perPage);
//     // }, [])

//     const pagesVisited = categoriesStore._currentPage * categoriesStore._perPage;

//     const displayItems = showCateg.slice(pagesVisited, pagesVisited + categoriesStore._perPage).map((recip, idx) => {
//         // console.log(recip);
//         // console.log(idx);
//         const { carbs, fat, proteins, img } = recip.bzhu;
//         return (
//             <RecipeResponse
//                 onClick={() => {
//                     push(MODAL_WINDOW);
//                     userStore.setModalObject(recip);
//                     // return console.log(userStore._modalObject);
//                 }}
//             >
//                 <FavoriteRecipeCard key={idx} title={recip.header} calories={recip.calories + " Kcal"} likeIcon={<FavorRecCardLike />} image={recip.img} />
//             </RecipeResponse>
//         );
//     });


//     // console.log(pageCount);
//     const changePage = (selected) => {
//         categoriesStore.setCurrentPage(selected);
//     };

//     return (
// <>
//     <ReactPaginate
//         pageCount={pageCount}
//         onPageChange={changePage}
//         previousLabel={"Previous"}
//         nextLabel={"Next"}
//         containerClassName={"paginationBtns"}
//         previousLinkClassName={"previousBtns"}
//         lastLinkClassName={"nextBtn"}
//         disabledClassName={"paginationDisabled"}
//         activeClassName={"paginationActive"}
//     />
//     {displayItems}
//     {/* {showCateg.slice(pagesVisited, pagesVisited + categoriesStore._perPage).map((recip, idx) => {
//         // console.log(recip);
//         // console.log(idx);
//         const { carbs, fat, proteins, img } = recip.bzhu;
//         return (
//             <RecipeResponse
//                 onClick={() => {
//                     push(MODAL_WINDOW);
//                     userStore.setModalObject(recip);
//                     // return console.log(userStore._modalObject);
//                 }}
//             >
//                 <FavoriteRecipeCard
//                     key={idx}
//                     title={recip.header}
//                     calories={recip.calories + " Kcal"}
//                     likeIcon={<FavorRecCardLike />}
//                     image={recip.img}
//                 />
//             </RecipeResponse>
//         );
//     })} */}
// </>
//     );
// };

const SearchingTESTPAG = observer(() => {
    const { userStore } = useContext(Context);
    const { categoriesStore } = useContext(Context);
    const { search } = useLocation();
    const values = queryString.parse(search);
    const { path } = useRouteMatch();

    const ShowData = ({ category }) => {
        return <div>{<h1>{category}</h1>}</div>;
    };
    const { push } = useHistory();

    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery();
    useEffect(() => {
        console.log(query.get("category"));
    }, []);

    const currCategory = query.get("category");
    let showCateg;
    if (currCategory === "salads") showCateg = categoriesStore._salads;
    if (currCategory === "deserts") showCateg = categoriesStore._deserts;
    if (currCategory === "first-dishes") showCateg = categoriesStore._firstDishes;
    if (currCategory === "second-dishes") showCateg = categoriesStore._secondDishes;
    if (currCategory === "beverages") showCateg = categoriesStore._beverages;
    if (currCategory === "canning") showCateg = categoriesStore._canning;
    if (currCategory === "sauces") showCateg = categoriesStore._sauces;
    const { length } = showCateg;

    // console.log(categorFunct(current));
    // const categResposne = categorFunct(current)
    useEffect(() => {
        // console.log(categoriesStore._categoryLength);
        categoriesStore.setCategoryLength(length);
        // console.log(categoriesStore._categoryLength);
        // console.log(length);


        console.log(categoriesStore._currentPage);
    }, [categoriesStore._categoryLength, categoriesStore._currentPage]);

    // useEffect(() => {
    //     pageCount = Math.ceil(categoriesStore._categoryLength / categoriesStore._perPage);
    // }, [])

    const pagesVisited = categoriesStore._currentPage * categoriesStore._perPage;
    console.log(showCateg)
    const displayItems = showCateg.slice(pagesVisited, pagesVisited + categoriesStore._perPage).map((recip, idx) => {
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
                <FavoriteRecipeCard key={idx} title={recip.header} calories={recip.calories + " Kcal"} likeIcon={<FavorRecCardLike />} image={recip.img} />
            </RecipeResponse>
        );
    });
    const pageCount = Math.ceil(categoriesStore._categoryLength / categoriesStore._perPage);
    // console.log(pageCount);
    const changePage = ({ selected }) => {
        categoriesStore.setCurrentPage(selected);
    };


    return (
        <SearchPageDiv>
            <SearchInput />
            <RecipeFavoriteCardDiv>
                {/* {!userStore._category ? <NoResultsCard header="Нет результатов" desc="Попробуйте другой запрос" icon={<NoResCardImage />} /> : null} */}

                {/* <ShowData category={query.get("category")} /> */}

                {/* <Shower current={currCategory} /> */}

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
                {displayItems}
                {/* {showCateg.slice(pagesVisited, pagesVisited + categoriesStore._perPage).map((recip, idx) => {
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
            })} */}


            </RecipeFavoriteCardDiv>
        </SearchPageDiv>
    );
});

export default SearchingTESTPAG;