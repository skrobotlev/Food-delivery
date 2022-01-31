import { SearchInput } from "./searching/search-input";
import React, { useContext, useEffect } from "react";
import { RecipeFavoriteCardDiv } from "../../../components/tabulation/all-tabs/recipe-tab";
// import { Pagination } from "./pagination/pagination";
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

const Searching = () => {
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

    const Shower = ({ current }) => {
        let showCateg;
        if (current === "salads") showCateg = categoriesStore._salads;
        if (current === "deserts") showCateg = categoriesStore._deserts;
        if (current === "first-dishes") showCateg = categoriesStore._firstDishes;
        if (current === "second-dishes") showCateg = categoriesStore._secondDishes;
        if (current === "beverages") showCateg = categoriesStore._beverages;
        if (current === "canning") showCateg = categoriesStore._canning;
        if (current === "sauces") showCateg = categoriesStore._sauces;
        return showCateg.map((recip, idx) => {
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
    };
    return (
        <SearchPageDiv>
            <SearchInput />
            <RecipeFavoriteCardDiv>
                {/* {!userStore._category ? <NoResultsCard header="Нет результатов" desc="Попробуйте другой запрос" icon={<NoResCardImage />} /> : null} */}

                <ShowData category={query.get("category")} />

                <Shower current={currCategory} />

                {/* {categoriesStore._salads.map((recip, idx) => {
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
                {/* {userStore._currentItems.map((recip, idx) => {
                    console.log(recip);
                    console.log(idx);
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
};

export default Searching;
