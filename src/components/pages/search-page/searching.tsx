import { SearchInput } from "./searching/search-input";
import React, { useContext, useEffect, useState } from "react";
import { RecipeFavoriteCardDiv } from "@/components/tabulation/all-tabs/recipe-tab";
import { Context } from "@/store";
import NoResultsCard from "./searching/no-results-card";
import NoResCardImage from "../../images/no-results";
import { RecipeResponse, SearchPageDiv } from "./search-page";
import FavoriteRecipeCard from "@/components/recipe-cards/favorite-recipe-card";
import FavorRecCardLike from "../../images/heart-like";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import queryString from "query-string";
import { observer } from "mobx-react-lite";
import { requestCurrentCategory, takeDataCat } from "@/api/categories";
import styled from "styled-components";
import ModalWindow from "./modal-window";
import Pagination from "@mui/material/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import usePagination from "./pagination-logic";
import useSearchingUpd from "@/hooks/useSearchingUpd";

const PaginationSpan = styled.span`
  overflow-x: scroll;
  width: auto;
  height: auto;
`;

const Searching = observer(() => {
    const { userStore } = useContext(Context);
    const { categoriesStore } = useContext(Context);
    const { search } = useLocation();
    const [openModal, setOpenModal] = useState(false);
    const values = queryString.parse(search);


    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery();
    let resHeader;
    categoriesStore.setNameCurrentCategory(query.get("category"));
    let currCategory = categoriesStore.nameCurrentCategory;
    useSearchingUpd(categoriesStore, currCategory);
    // useEffect(() => {
    //     categoriesStore.setNameCurrentCategory(query.get("category"));
    //     console.log(categoriesStore.nameCurrentCategory, "NAMcurrCATEG");
    // }, [categoriesStore.nameCurrentCategory]);
    // let currCategory = categoriesStore.nameCurrentCategory;

    // useEffect(() => {
    //     RequestCurrentCategory(currCategory).then((fullCateg) => {
    //         let responseArr = [];
    //         // const values = Object.values(fullCateg[0]);
    //         // const keys = Object.keys(fullCateg[0]);
    //         const enterArr = Object.entries(fullCateg[0]);
    //         // console.log(enterArr, "enterARR");
    //         enterArr.map((items: any) => {
    //             // const pars = JSON.parse(JSON.stringify(items[1]));
    //             // СПРОСИТЬ ПОЧЕМУ ЗДЕСЬ ОШИБКУ ВЫДАЁТ, ВСЁ ПРАВИЛЬНО ЖЕ ПО ПРИЁМУ И ОБРАБОТКЕ ДАННЫХ
    //             // let pars = JSON.parse(items[1]);
    //             console.log(items, items[1]);
    //             let pars;
    //             try {
    //                 if (typeof items[1] == "string") pars = JSON.parse(items[1]);
    //             } catch (e) {
    //                 console.log(e);
    //             }

    //             console.log(typeof items[1]);
    //             console.log(typeof pars, "!!PROBLEM!PARS!!!");
    //             const { bzhu, calories, header, img, timeToCook, desc } = pars;
    //             resHeader = header;
    //             responseArr.push({
    //                 img: img,
    //                 header: header,
    //                 bzhu: bzhu,
    //                 desc: desc,
    //                 calories: calories,
    //                 timeToCook: timeToCook,
    //                 category: currCategory,
    //                 rkey: items[0],
    //             });
    //         });

    //         categoriesStore.setCurrentCategory(responseArr);
    //         categoriesStore.categoryLength = length;
    //     });
    // }, [currCategory]);

    // // const { uid } = auth.currentUser;
    // // console.log(uid)
    // let showCateg = categoriesStore.currentCategory;
    // const { length } = showCateg;

    // useEffect(() => {
    //     categoriesStore.categoryLength = length;
    // }, [categoriesStore.categoryLength, length]);

    let currentKey;
    const recipeClickFunc = (recip, e) => {
        currentKey = userStore.favoriteRecipesDb.findIndex((rec) => {
            return rec.recipeId === recip.rkey;
        });
        let setterObj = {
            recipe: recip,
            id: "",
            recipeId: recip.rkey,
            categories: recip.category,
        };
        console.log(e.target.tagName, "e-target");
        categoriesStore.heartLikeRecipe = ({
            recipe: recip,
            id: "",
            recipeId: recip.rkey,
            categories: recip.category,
        });
        if (e.target.tagName === "path") return e.stopPropagation();

        if (currentKey > -1) categoriesStore.modalObject = userStore.favoriteRecipesDb[currentKey];
        else categoriesStore.modalObject = setterObj;

        console.log(userStore.favoriteRecipesDb[currentKey], "rkey==recipeId157SEARCHING");
        console.log(categoriesStore.modalObject, "modOBj");
        setOpenModal(true);
    };

    const pagesVisited = categoriesStore.currentPage * categoriesStore.perPage;

    const pageCount = Math.ceil(categoriesStore.categoryLength / categoriesStore.perPage);
    const changePage = ({ selected }) => {
        categoriesStore.currentPage = selected;
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
        ul: {
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
            {categoriesStore.valFilter() == "" ? (
                <NoResultsCard header="Нет результатов" desc="Попробуйте другой запрос" icon={<NoResCardImage />} />
            ) : (
                <RecipeFavoriteCardDiv>
                    {_DATA.currentData().map((recip, idx) => {
                        return (
                            <RecipeResponse onClick={(e) => recipeClickFunc(recip, e)}>
                                <FavoriteRecipeCard
                                    timeToCook={recip.timeToCook}
                                    key={idx}
                                    title={recip.header}
                                    calories={recip.calories + " Kcal"}
                                    likeIcon={<FavorRecCardLike />}
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
                        shape="circular"
                        classes={{
                            ul: classes.ul,
                        }}
                        onChange={handleChange}
                    />
                </RecipeFavoriteCardDiv>
            )}
            {openModal ? <ModalWindow openMod={openModal} closeMod={setOpenModal} /> : null}
        </SearchPageDiv>
    );
});

export default Searching;
