import { requestCurrentCategory } from "@/api/categories";
import React, { useEffect } from "react";

export default function useSearchingUpd(categoriesStore, currentCategory) {
    useEffect(() => {
        let resHeader;
        requestCurrentCategory(currentCategory).then((fullCateg) => {
            let responseArr = [];
            const enterArr = Object.entries(fullCateg[0]);
            enterArr.map((items: any) => {
                // const pars = JSON.parse(JSON.stringify(items[1]));
                // СПРОСИТЬ ПОЧЕМУ ЗДЕСЬ ОШИБКУ ВЫДАЁТ, ВСЁ ПРАВИЛЬНО ЖЕ ПО ПРИЁМУ И ОБРАБОТКЕ ДАННЫХ
                // let pars = JSON.parse(items[1]);
                // console.log(items, items[1]);
                let pars;
                try {
                    if (typeof items[1] === "string") pars = JSON.parse(items[1]);
                } catch (e) {
                    console.log(e);
                }

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
            categoriesStore.crrentCategory = responseArr;
            // categoriesStore.crrentCategory = responseArr;
            // const { length } = categoriesStore.currentCategory;
            // categoriesStore.categoryLength = length;
        }).then(() => {

            const { length } = categoriesStore.currentCategory;
            categoriesStore.categoryLength = length;
        })
    }, [currentCategory]);
}