import NoResCardImage from "@/components/images/no-results";
import FavoriteRecipeCard from "@/components/recipe-cards/favorite-recipe-card";
import { RecipeFavoriteCardDiv } from "@/components/tabulation/all-tabs/recipe-tab";
import { useStore } from "@/hooks/useStore";
import React, { useEffect, useState } from "react";
import usePagination from "../../search-page/pagination-logic";
import { RecipeResponse } from "../../search-page/search-page";
import NoResultsCard from "../../search-page/searching/no-results-card";
import Pagination from "@mui/material/Pagination";
import { requestCurrentCategory } from "@/api/categories";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import FavorRecCardLike from "@/components/images/heart-like";
import CalendarRecipeCard from "../calendar-stuff/calendar-recipe-card";
import useRequestCurrentCategory from "@/hooks/useRequestCurrentCategory";

interface CaloriesResultProps {
    category?: string;
    closeSearch?: any;
    meal?: any;
}

const CalendarCategoriesDiv = styled.div``;

const CaloriesColumnSearchingDinner: React.FC<CaloriesResultProps> = observer(({ closeSearch, meal }) => {
    const [showedCategory, setShowedCategory] = useState([]);

    const { userStore, categoriesStore, caloriesStore } = useStore();
    // let currentCategory = caloriesStore.nameCaloriesCategory;
    let currentCategory;

    if (meal == "breakfast") currentCategory = caloriesStore.breakfastCategoryName;
    else if (meal == "lunch") currentCategory = caloriesStore.lunchCategoryName;
    else if (meal == "dinner") currentCategory = caloriesStore.dinnerCategoryName;
    //     useRequestCurrentCategory(currentCategory, caloriesStore);
    console.log(currentCategory, "currCateg");
    useEffect(() => {
        requestCurrentCategory(currentCategory).then((fullCateg) => {
            console.log(fullCateg);
            let resHeader;
            let responseArr = [];
            const enterArr = Object.entries(fullCateg[0]);
            enterArr.map((items: any) => {
                let pars;
                try {
                    if (typeof items[1] === "string") pars = JSON.parse(items[1]);
                } catch (e) {
                    console.log(e);
                }
                // console.log(pars, "pars");
                const { bzhu, calories, header, img, timeToCook, desc } = pars;
                resHeader = header;
                responseArr.push({
                    img: img,
                    header: header,
                    bzhu: bzhu,
                    desc: desc,
                    calories: calories,
                    timeToCook: timeToCook,
                    category: currentCategory,
                    rkey: items[0],
                });
            });

            caloriesStore.dinnerCategory = responseArr;
            const { length } = caloriesStore.dinnerCategory;
            caloriesStore.dinnerCategoryLength = length;
        });
    }, [currentCategory]);

    // const { breakfast, lunch, dinner } = caloriesStore.caloriesHashTable;

    // useRecipesHash(breakfast, recipeId, active, setActive, caloriesStore.breakfast);

    // const DialogSearchingColumnData = usePagination(caloriesStore.valFilter(), caloriesStore.perPage);
    // console.log(caloriesStore.dinnerCategory, "dinnrtCATREGO")

    const DialogSearchingColumnData = usePagination(caloriesStore.dinnerCategory, caloriesStore.perPage);

    const pagesCount = Math.ceil(caloriesStore.dinnerCategoryLength / caloriesStore.perPage);
    const handleChange = (e, p) => {
        setPage(p);
        DialogSearchingColumnData.jump(p);
    };

    // useEffect(() => {
    //     console.log(caloriesStore.dinnerCategory, "dinnrtCATREGO")
    //     console.log(DialogSearchingColumnData.currentData(), "DialogSearchingColumnData");
    // }, [DialogSearchingColumnData]);

    // const classes = useStyles();
    let [page, setPage] = useState(1);
    return (
        <CalendarCategoriesDiv>
            {/* {caloriesStore.valFilter() == "" ? (
                <NoResultsCard header="Нет результатов" desc="Попробуйте другой запрос" icon={<NoResCardImage />} />
            ) : ( */}
            <RecipeFavoriteCardDiv>
                {DialogSearchingColumnData.currentData().map((recip, idx) => {
                    console.log(recip, "recipppppppppppppppppp");
                    return (
                        <RecipeResponse>
                            <CalendarRecipeCard
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
                                closeSearch={closeSearch}
                                meal={meal}
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
                    // classes={{
                    //     // root: classes.root,
                    //     ul: classes.ul,
                    // }}
                    onChange={handleChange}
                />
            </RecipeFavoriteCardDiv>
            {/* // )
            } */}
        </CalendarCategoriesDiv>
    );
});

export default CaloriesColumnSearchingDinner;
