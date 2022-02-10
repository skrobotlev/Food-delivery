import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import queryString from "query-string";
import ReactPaginate from "react-paginate";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { auth } from "../../firebase";
import { Context } from "../../";
import { searchingOnDb, getFavoriteRecipes } from "../../api/favorite-recipes";
import { RecipeResponse } from "../pages/search-page/search-page";
import FavoriteRecipeCard from "../recipe-cards/favorite-recipe-card";
import FavorRecCardLike from "../images/heart-like";
import { RecipeFavoriteCardDiv } from "./all-tabs/recipe-tab";
import { MODAL_WINDOW } from "../routing/consts";

const PaginationSpan = styled.span`
  overflow-x: scroll;
  width: auto;
  height: auto;
`;

const FavoriteRecipeList = observer(() => {
    const { userStore } = useContext(Context);
    const { categoriesStore } = useContext(Context);
    const { push } = useHistory();
    const { uid } = auth.currentUser;
    // const categories = ["TEST", "beverages", "canning", "deserts", "first-dishes", "salads", "sauces", "second-dishes"];
    let keysRec = [];
    let recRec = [];
    useEffect(() => {
        getFavoriteRecipes(uid)
            .then((res) => {
                console.log(res, "resKEYS");
                keysRec.push(res);
                // console.log(keysRec, "KEYSrec");
                userStore.setFavoriteRecipes(res);
            })
            .then(() => {
                // console.log(userStore._favoriteRecipes);
                // keysRec = userStore._favoriteRecipes;
                console.log(keysRec, "-flat");
                console.log(keysRec.flat(), "flat");
                searchingOnDb(keysRec.flat())
                    .then((res) => {
                        res.forEach((element) => {
                            console.log(element, "elem");
                        });
                        console.log(res, "res");
                        userStore.setDbResponse(res);
                        console.log(userStore._dbResponse);

                        return res;
                        // res.forEach((itm) => console.log(itm, 'ITM'))
                    })
                    .then((finRes) => {
                        // console.log(finRes.length);
                        // finRes
                        console.log(userStore._dbResponse);
                        // const { img, header } = finRes[0];
                        // const values = Object.values(finRes[0]);
                        // const keys = Object.keys(finRes[0]);
                        // console.log(img, header, "finRES")
                    });

                // userStore.setDbSearching(EXPEr(keysRec));
                // console.log(userStore._dbSearching)
                // experRes = EXPEr(keysRec);
                // console.log(experRes, "EXPERRES");
                // experRes.map((res) => console.log(res, "resEXPres"))
            });
        // keysRec = userStore._favoriteRecipes;
        // console.log(keysRec, "-flat");
        // console.log(keysRec.map(itms => console.log(itms)), "flat");
        // EXPEr(keysRec.flat()).then((res) => {
        //     console.log(res);
        //     // res.forEach((itm) => console.log(itm, 'ITM'))
        // });
    }, []);
    // console.log(keysRec);
    const showFavorites = userStore._dbResponse.map((resp, idx) => {
        // console.log(resp, "RESPONSE jsx");
        return (
            <RecipeResponse
                onClick={() => {
                    categoriesStore.setModalObject(resp);
                    push(`${MODAL_WINDOW}`);
                    // addQuery("modal", idx);
                    return console.log(categoriesStore._modalObject);
                }}
            >
                <FavoriteRecipeCard
                    timeToCook={resp.timeToCook}
                    key={idx}
                    title={resp.header}
                    calories={resp.calories + " Kcal"}
                    likeIcon={<FavorRecCardLike />}
                    image={resp.img}
                />
            </RecipeResponse>
        );
    });
    return (
        <RecipeFavoriteCardDiv>
            {showFavorites}
        </RecipeFavoriteCardDiv>
    );

    // useEffect(() => {
    //     testData(currCategory).then((fullCateg) => {

    //         categoriesStore.setCurrentCategory(responseArr);
    //         categoriesStore.setModalObject(categoriesStore._currentCategory[0]);
    //     });
    // }, [currCategory]);

    // let showCateg = categoriesStore._currentCategory;
    // const { length } = showCateg;

    // useEffect(() => {
    //     categoriesStore.setCategoryLength(length);
    // }, [categoriesStore._categoryLength, length]);

    // const pagesVisited = categoriesStore._currentPage * categoriesStore._perPage;
    // const displayItems = categoriesStore
    //     .valFilter()
    //     .slice(pagesVisited, pagesVisited + categoriesStore._perPage)
    //     .map((recip, idx) => {
    //         const { rkey } = recip;
    //         const { carbs, fat, proteins, img } = recip.bzhu;

    //         return (
    //             <RecipeResponse
    //             >
    //                 <FavoriteRecipeCard
    //                     timeToCook={recip.timeToCook}
    //                     key={idx}
    //                     title={recip.header}
    //                     calories={recip.calories + " Kcal"}
    //                     likeIcon={<FavorRecCardLike />}
    //                     image={recip.img}
    //                 />
    //             </RecipeResponse>
    //         );
    //     });
    // const pageCount = Math.ceil(categoriesStore._categoryLength / categoriesStore._perPage);

    // const changePage = ({ selected }) => {
    //     categoriesStore.setCurrentPage(selected);
    // };

    // return (
    //     <SearchPageDiv>
    //         <SearchInput />

    //         {categoriesStore._currentCategory.length === 0 ? (
    //             <NoResultsCard header="Нет результатов" desc="Попробуйте другой запрос" icon={<NoResCardImage />} />
    //         ) : (
    //             <RecipeFavoriteCardDiv>
    //                 <ReactPaginate
    //                     pageCount={pageCount}
    //                     onPageChange={changePage}
    //                     previousLabel={"Prev"}
    //                     nextLabel={"Next"}
    //                     containerClassName={"paginationBtns"}
    //                     pageRangeDisplayed={1}
    //                     marginPagesDisplayed={1}
    //                     previousLinkClassName={"previousBtns"}
    //                     lastLinkClassName={"nextBtn"}
    //                     disabledClassName={"paginationDisabled"}
    //                     activeClassName={"paginationActive"}
    //                 />
    //                 {displayItems}
    //             </RecipeFavoriteCardDiv>
    //         )}

    //     </SearchPageDiv>
    // );
});

export default FavoriteRecipeList;
