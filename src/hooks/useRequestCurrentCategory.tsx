import { requestCurrentCategory } from "@/api/categories";
import { useEffect } from "react";

export function useColumnSearchDinner(caloriesStore, currentCategory) {
    useEffect(() => {
        requestCurrentCategory(currentCategory).then((fullCateg) => {
            console.log(fullCateg, "fullCateg");
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
                    recipeId: items[0],
                });
            });

            caloriesStore.dinnerCategory = responseArr;
            const { length } = caloriesStore.dinnerCategory;
            caloriesStore.dinnerCategoryLength = length;
        });
    }, [currentCategory]);
}

export function useColumnSearching(caloriesStore, currentCategory, meal) {
    useEffect(() => {
        requestCurrentCategory(currentCategory).then((fullCateg) => {
            console.log(fullCateg, "fullCateg");
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
                    recipeId: items[0],
                });
            });
            if (meal === "breakfast") {
                caloriesStore.breakfastCategory = responseArr;
                const { length } = caloriesStore.breakfastCategory;
                caloriesStore.breakfastCategoryLength = length;
            } else if (meal === "lunch") {
                caloriesStore.lunchCategory = responseArr;
                const { length } = caloriesStore.lunchCategory;
                caloriesStore.lunchCategoryLength = length;
            } else if (meal === "dinner") {
                caloriesStore.dinnerCategory = responseArr;
                const { length } = caloriesStore.dinnerCategory;
                caloriesStore.dinnerCategoryLength = length;
            }
            // caloriesStore.dinnerCategory = responseArr;
            // const { length } = caloriesStore.dinnerCategory;
            // caloriesStore.dinnerCategoryLength = length;
        });
    }, []);
}

export default function useRequestCurrentCategory(currentCategory, caloriesStore) {
    if (currentCategory == "breakfast") {
        console.log("brekFASTTTT");
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

            caloriesStore.breakfastCategory = responseArr;
            const { length } = caloriesStore.breakfastCategory;
            caloriesStore.breakfastCategoryLength = length;
        });
    } else if (currentCategory == "lunch") {
        console.log("LUNNNNNNNCHHC");

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

            caloriesStore.lunchCategory = responseArr;
            const { length } = caloriesStore.lunchCategory;
            caloriesStore.lunchCategoryLength = length;
        });
    }

    // caloriesStore.caloriesCategory = responseArr;
    // const { length } = caloriesStore.caloriesCategory;
    // caloriesStore.categoryLength = length;
    // });
    // }, [currentCategory]);
    else if (currentCategory == "dinner") {
        console.log("brekFASTTTT");

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

            caloriesStore.dinnerCategory = responseArr;
            const { length } = caloriesStore.dinnerCategory;
            caloriesStore.dinnerCategoryLength = length;
        });
    }
}
