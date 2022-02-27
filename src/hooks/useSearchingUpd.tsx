import { requestCurrentCategory } from "@/api/categories";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useSearchingUpd(categoriesStore, currentCategory) {
    // function useQuery() {
    //     const { search } = useLocation();

    //     return React.useMemo(() => new URLSearchParams(search), [search]);
    // }

    // let query = useQuery();
    let resHeader;

    // useEffect(() => {
    //     categoriesStore.setNameCurrentCategory(query.get("category"));
    //     console.log(categoriesStore.nameCurrentCategory, "NAMcurrCATEG");
    // }, [categoriesStore.nameCurrentCategory]);
    // let currCategory = categoriesStore.nameCurrentCategory;

    useEffect(() => {

        requestCurrentCategory(currentCategory).then((fullCateg) => {
            let responseArr = [];
            const enterArr = Object.entries(fullCateg[0]);
            enterArr.map((items: any) => {
                // const pars = JSON.parse(JSON.stringify(items[1]));
                // СПРОСИТЬ ПОЧЕМУ ЗДЕСЬ ОШИБКУ ВЫДАЁТ, ВСЁ ПРАВИЛЬНО ЖЕ ПО ПРИЁМУ И ОБРАБОТКЕ ДАННЫХ
                // let pars = JSON.parse(items[1]);
                console.log(items, items[1]);
                let pars;
                try {
                    if (typeof items[1] == "string") pars = JSON.parse(items[1]);
                } catch (e) {
                    console.log(e);
                }

                console.log(typeof items[1]);
                console.log(typeof pars, "!!PROBLEM!PARS!!!");
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

            categoriesStore.setCurrentCategory(responseArr);
            categoriesStore.categoryLength = length;
        });
    }, [currentCategory]);

    // const { uid } = auth.currentUser;
    // console.log(uid)
    let showCateg = categoriesStore.currentCategory;
    const { length } = showCateg;
    categoriesStore.categoryLength = length;
    useEffect(() => {
        categoriesStore.categoryLength = length;
    }, [categoriesStore.categoryLength, length]);

}