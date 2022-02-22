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
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";
import usePagination from "./pagination-logic";

const PaginationSpan = styled.span`
  overflow-x: scroll;
  width: auto;
  height: auto;
`;

const Searching = observer(() => {
    const { userStore } = useContext(Context);
    const { categoriesStore } = useContext(Context);
    const { persist } = useContext(Context);
    const { search } = useLocation();
    const { path } = useRouteMatch();
    const history = useHistory();
    const [active, setActive] = useState(false);

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
    let res;
    let resHeader;

    useEffect(() => {
        categoriesStore.setNameCurrentCategory(query.get("category"));
        console.log(categoriesStore._nameCurrentCategory, "NAMcurrCATEG");
    }, [categoriesStore._nameCurrentCategory]);
    const currCategory = categoriesStore._nameCurrentCategory;

    useEffect(() => {
        testData(currCategory).then((fullCateg) => {
            let responseArr = [];
            // const values = Object.values(fullCateg[0]);
            // const keys = Object.keys(fullCateg[0]);
            const enterArr = Object.entries(fullCateg[0]);
            // console.log(enterArr, "enterARR");
            enterArr.map((items: any) => {
                const pars = JSON.parse(items[1]);
                const { bzhu, calories, header, img, timeToCook, desc } = pars;
                resHeader = header;
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

    const updateLikeHearts = (header) => {
        res = userStore.dbResponse.findIndex((rec) => {
            return rec.recipe.header === header;
        });
        console.log(res, "resEXP");
        res > -1 ? setActive(true) : setActive(false);
    };

    // useEffect(() => {
    //     !categoriesStore.openModal ? updateLikeHearts(resHeader) : null;
    // }, [res, active, categoriesStore.openModal]);
    // useEffect(() => {
    //     res = userStore.dbResponse.findIndex((rec) => {
    //         // console.log(rec, "rID");
    //         // console.log(rec.recipe.header, "rID", header, "pID");
    //         return rec.recipe.header === resHeader;
    //     });
    //     console.log(res, "resEXP");
    //     res > -1 ? setActive(true) : setActive(false);
    // }, []);

    useEffect(() => {
        categoriesStore.setCategoryLength(length);
    }, [categoriesStore.categoryLength, length]);

    // useEffect(() => {
    //     // console.log(categoriesStore.currentPage);
    // }, [categoriesStore.currentPage]);

    let currentKey;
    // const updateModalObj = (recip) => {
    //     currentKey = userStore.dbResponse.findIndex((rec) => {
    //         return rec.recipeId === recip.rkey;
    //     });
    //     currentKey > -1 ? categoriesStore.setModalObject(userStore.dbResponse[currentKey]) : null;
    //     console.log(userStore.dbResponse[currentKey], "rkey==recipeId157");
    //     console.log("UPDATEmodOBJ");
    // };
    const recipeClickFunc = (recip) => {
        currentKey = userStore.dbResponse.findIndex((rec) => {
            return rec.recipeId === recip.rkey;
        });
        const setterObj = {
            recipe: recip,
            id: "",
            recipeId: recip.rkey,
            categories: recip.category,
        };
        if (currentKey > -1) categoriesStore.setModalObject(userStore.dbResponse[currentKey]);
        else categoriesStore.setModalObject(setterObj);
        categoriesStore.setHeartLikeRecipe(setterObj);

        console.log(userStore.dbResponse[currentKey], "rkey==recipeId157SEARCHING");
        console.log(categoriesStore.modalObject, "modOBj");
        categoriesStore.setOpenModal(true);
    };
    // const recipeClickFunc = (recip) => {
    //     currentKey = userStore.dbResponse.findIndex((rec) => {
    //         return rec.recipeId === recip.rkey;
    //     });
    //     // if(currKey) переделать
    //     currentKey > -1
    //         ? categoriesStore.setModalObject(userStore.dbResponse[currentKey])
    //         : categoriesStore.setModalObject({
    //             recipe: recip,
    //             id: "",
    //             recipeId: recip.rkey,
    //             categories: recip.category,
    //         });
    //     categoriesStore.setHeartLikeRecipe({
    //         recipe: recip,
    //         id: "",
    //         recipeId: recip.rkey,
    //         categories: recip.category,
    //     });
    //     console.log(userStore.dbResponse[currentKey], "rkey==recipeId157SEARCHING");
    //     console.log(categoriesStore.modalObject, "modOBj");
    //     categoriesStore.setOpenModal(true);
    // };

    const pagesVisited = categoriesStore.currentPage * categoriesStore.perPage;
    // console.log(showCateg);
    const displayItems = categoriesStore
        .valFilter()
        .slice(pagesVisited, pagesVisited + categoriesStore.perPage)
        .map((recip, idx) => {
            const { category } = recip;
            // console.log(category, "categ");

            return (
                <RecipeResponse onClick={() => recipeClickFunc(recip)}>
                    {/* <RecipeResponse> */}

                    <FavoriteRecipeCard
                        timeToCook={recip.timeToCook}
                        key={idx}
                        title={recip.header}
                        calories={recip.calories + " Kcal"}
                        likeIcon={<FavorRecCardLike activeClass={active} />}
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

    const _DATA = usePagination(categoriesStore.valFilter(), categoriesStore.perPage);
    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };
    const useStyles = makeStyles(() => ({
        root: {
            "& .MuiPagination-ul": {
                fontFamily: "Balsamiq Sans",
            },
        },
        // root: {
        //     "& .MuiPagination-root": {
        //         marginTop: "10px",
        //         backgroundColod: "red"
        //     },
        // },
        // root: {
        //     '& ul > li:not(:first-child):not(:last-child) > button:not(.Mui-selected)': {
        //         backgroundColor: 'transparent',
        //         color: '#19D5C6',
        //     },
        ul: {
            // "& .MuiPagination-ul": {
            //     fontFamily: "Balsamiq Sans"

            // },
            "& .Mui-selected": {
                color: "#fff",
                backgroundColor: "#1a9920 !important",
                fontFamily: "Balsamiq Sans",
            },
        },
    }));
    const classes = useStyles();
    let [page, setPage] = useState(1);
    return (
        <SearchPageDiv>
            <SearchInput />
            {
                categoriesStore.valFilter() == "" ? (
                    <NoResultsCard header="Нет результатов" desc="Попробуйте другой запрос" icon={<NoResCardImage />} />
                ) : (
                    <RecipeFavoriteCardDiv>



                        {_DATA.currentData().map((recip, idx) => {
                            return (
                                // <RecipeResponse >
                                <RecipeResponse onClick={() => recipeClickFunc(recip)}>
                                    <FavoriteRecipeCard
                                        timeToCook={recip.timeToCook}
                                        key={idx}
                                        title={recip.header}
                                        calories={recip.calories + " Kcal"}
                                        likeIcon={<FavorRecCardLike activeClass={active} />}
                                        image={recip.img}
                                        rkey={recip.rkey}
                                        category={recip.category}
                                        recip={recip}
                                    />
                                </RecipeResponse>
                            );
                        })}
                        <Pagination
                            count={pageCount}
                            size="large"
                            page={page}
                            siblingCount={0}
                            shape="rounded"
                            classes={{
                                // root: classes.root,
                                ul: classes.ul,
                            }}
                            onChange={handleChange}
                        />
                    </RecipeFavoriteCardDiv>
                )}
            {/* {displayItems == "" ? (
                <NoResultsCard header="Нет результатов" desc="Попробуйте другой запрос" icon={<NoResCardImage />} />
            ) : (
                <RecipeFavoriteCardDiv>
                    {displayItems}
                    <ReactPaginate
                        pageCount={pageCount}
                        onPageChange={changePage}
                        previousLabel="<"
                        nextLabel=">"
                        breakLabel="..."
                        breakClassName="break-me"
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={1}
                        // subContainerClassName="pages pagination"
                        breakLinkClassName="page-link"
                        containerClassName="paginationBtns"
                        disabledClassName="disabled"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        activeClassName="active"

                    // МОЁ !!!!!!!!!!
                    // previousLabel={"<"}
                    // nextLabel={">"}
                    // containerClassName={"paginationBtns"}
                    // pageRangeDisplayed={1}
                    // marginPagesDisplayed={1}
                    // // previousLinkClassName={"previousBtns"}
                    // // pageLinkClassName={"nextBtn"}
                    // // activeClassName={"paginationActive"}
                    // breakLinkClassName="page-link"
                    // pageClassName="page-item"
                    // pageLinkClassName="page-link"
                    // previousClassName="page-item"
                    // previousLinkClassName="page-link"
                    // nextClassName="page-item"
                    // nextLinkClassName="page-link"
                    // activeClassName="paginationActive"
                    />
                </RecipeFavoriteCardDiv>
            )} */}
            {categoriesStore.openModal ? <ModalWindow /> : null}
        </SearchPageDiv>
    );
});

export default Searching;
