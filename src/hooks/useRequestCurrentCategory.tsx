import { requestCurrentCategory } from "@/api/categories";
import { useEffect } from "react";

export default function useRequestCurrentCategory(currentCategory, caloriesStore) {

    if (currentCategory == "breakfast") {
        useEffect(() => {
            requestCurrentCategory(currentCategory).then((fullCateg) => {
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

                caloriesStore.caloriesCategory = responseArr;
                const { length } = caloriesStore.caloriesCategory;
                caloriesStore.categoryLength = length;
            });
        }, [currentCategory]);
    }

    else if (currentCategory == "lunch") {
        useEffect(() => {
            requestCurrentCategory(currentCategory).then((fullCateg) => {
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

                caloriesStore.caloriesCategory = responseArr;
                const { length } = caloriesStore.caloriesCategory;
                caloriesStore.categoryLength = length;
            });
        }, [currentCategory]);
    }

    // caloriesStore.caloriesCategory = responseArr;
    // const { length } = caloriesStore.caloriesCategory;
    // caloriesStore.categoryLength = length;
    // });
    // }, [currentCategory]);
    else if (currentCategory == "dinner") {
        useEffect(() => {
            requestCurrentCategory(currentCategory).then((fullCateg) => {
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

                caloriesStore.caloriesCategory = responseArr;
                const { length } = caloriesStore.caloriesCategory;
                caloriesStore.categoryLength = length;
            });
        }, [currentCategory]);
    }
}