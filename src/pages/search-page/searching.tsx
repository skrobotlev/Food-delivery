import { SearchInput } from "./searching/search-input";
import React, { useContext, useEffect, useState } from "react";
import { RecipeFavoriteCardDiv } from "@/components/tabulation/all-tabs/recipe-tab";
import { Context } from "@/store";
import NoResultsCard from "./searching/no-results-card";
import NoResCardImage from "@/components/images/no-results";
import { RecipeResponse, SearchPageDiv } from "./search-page";
import FavoriteRecipeCard from "@/components/recipe-cards/favorite-recipe-card";
import FavorRecCardLike from "@/components/images/heart-like";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import ModalWindow from "./modal-window";
import Pagination from "@mui/material/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import usePagination from "./pagination-logic";
import useSearchingUpd from "@/hooks/useSearchingUpd";
import { requestCurrentCategory } from "@/api/categories";
import { useStore } from "@/hooks/useStore";

const ModalDiv = styled.div`
position: relative;
align-items: center;
  /* overflow-x: scroll; */
  background-color: blue;
  width: auto;
  height: auto;
`;

const Searching = observer(() => {
    const { userStore, categoriesStore } = useStore();
    const [openModal, setOpenModal] = useState(false);

    function useQuery() {
        const { search } = useLocation();

        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery();
    let resHeader;
    categoriesStore.nameCurrentCategory = query.get("category");
    let currentCategory = categoriesStore.nameCurrentCategory;
    let searchFunc = useSearchingUpd(categoriesStore, currentCategory);
    searchFunc
    // useEffect(() => {
    //     requestCurrentCategory(currentCategory).then((fullCateg) => {
    //         categoriesStore.nameCurrentCategory = query.get("category");
    //         const currentCategory = categoriesStore.nameCurrentCategory;

    //         let responseArr = [];
    //         const enterArr = Object.entries(fullCateg[0]);
    //         enterArr.map((items: any) => {
    //             let pars;
    //             try {
    //                 if (typeof items[1] === "string") pars = JSON.parse(items[1]);
    //             } catch (e) {
    //                 console.log(e);
    //             }

    //             const { bzhu, calories, header, img, timeToCook, desc } = pars;
    //             resHeader = header;
    //             responseArr.push({
    //                 img: img,
    //                 header: header,
    //                 bzhu: bzhu,
    //                 desc: desc,
    //                 calories: calories,
    //                 timeToCook: timeToCook,
    //                 category: currentCategory,
    //                 rkey: items[0],
    //             });
    //         });

    //         categoriesStore.currentCategory = responseArr;
    //         const { length } = categoriesStore.currentCategory;
    //         categoriesStore.categoryLength = length;
    //     });
    // }, [currentCategory]);

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
        // categoriesStore.heartLikeRecipe = ({
        //     recipe: recip,
        //     id: "",
        //     recipeId: recip.rkey,
        //     categories: recip.category,
        // });
        categoriesStore.heartLikeRecipe = setterObj;
        if (e.target.tagName === "path") return e.stopPropagation();

        if (currentKey > -1) categoriesStore.modalObject = userStore.favoriteRecipesDb[currentKey];
        else categoriesStore.modalObject = setterObj;

        setOpenModal(true);
    };

    const pagesCount = Math.ceil(categoriesStore.categoryLength / categoriesStore.perPage);

    const _DATA = usePagination(categoriesStore.valFilter(), categoriesStore.perPage);
    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };
    const useStyles = makeStyles(() => ({
        root: {
            "& .MuiPagination-ul": {
                fontFamily: "Balsamiq Sans",
                fontSize: "25px"
            },
        },
        ul: {

            "& .MuiButtonBase-root": {
                color: "#fff",
                backgroundColor: "#1a9920 ",
                fontFamily: "Balsamiq Sans",
            },
            "& .Mui-selected": {
                color: "#fff",
                backgroundColor: "#bb9733 !important",
                fontFamily: "Balsamiq Sans",
            },
        },
    }));
    const classes = useStyles();
    let [page, setPage] = useState(1);
    return (
        <SearchPageDiv>
            <SearchInput />
            {categoriesStore.valFilter() === "" ? (
                <NoResultsCard header="Нет результатов" desc="Попробуйте другой запрос" icon={<NoResCardImage />} />
            ) : (
                <RecipeFavoriteCardDiv>
                    {_DATA.currentData().map((recip, idx) => {
                        return (
                            // <RecipeResponse >
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
                                    recipeId={recip.rkey}
                                    bzhu={recip.bzhu}

                                />
                            </RecipeResponse>
                        );
                    })}
                    <Pagination
                        count={pagesCount}
                        size="large"
                        page={page}
                        siblingCount={0}
                        shape="circular"
                        classes={{
                            // root: classes.root,
                            ul: classes.ul,
                        }}
                        onChange={handleChange}
                    />
                </RecipeFavoriteCardDiv>
            )}
            <ModalDiv>
                {openModal ? <ModalWindow openMod={openModal} closeMod={setOpenModal} /> : null}
            </ModalDiv>
        </SearchPageDiv>
    );
});

export default Searching;
