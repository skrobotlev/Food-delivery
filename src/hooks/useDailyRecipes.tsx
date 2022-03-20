import { getFullDayRecipes, searchingDailyRecipes } from "@/api/calories-calendar";
import { useEffect } from "react";


export const useAllDailyRecipes = (uid, date, caloriesStore) => {
    caloriesStore.breakfast = [];
    caloriesStore.lunch = [];
    caloriesStore.dinner = [];

    useDailyRecipesBreakfast(uid, date, caloriesStore);
    useDailyRecipesLunch(uid, date, caloriesStore);
    useDailyRecipesDinner(uid, date, caloriesStore);
};

export const useUpdateDailyRecipes = (uid, date, caloriesStore) => {
    useDailyRecipesBreakfast(uid, date, caloriesStore);
    useDailyRecipesLunch(uid, date, caloriesStore);
    useDailyRecipesDinner(uid, date, caloriesStore);
};
export const useDailyRecipesBreakfast = (uid, date, caloriesStore) => {
    getFullDayRecipes(uid, date).then((ress) => {
        // console.log(ress, "ressss");
        let breakfast = Object.entries(ress.breakfast);
        let lunch = ress.lunch;
        let dinner = ress.dinner;

        const favoriteRecipeIds = Object.entries(breakfast).reduce((array, item: any) => {
            const recipe = {
                caloriesId: item[1][0],
                recipeId: item[1][1].recipeId,
                categories: item[1][1].category,
            };
            array.push(recipe);
            // console.log(array, "resss");
            return array;
        }, []);
        return searchingDailyRecipes(favoriteRecipeIds).then((result) => {
            // console.log(result, "resULT");
            caloriesStore.breakfast = result;
            // console.log(caloriesStore.breakfast, "updStorage");
        });
    });
};



export const useDailyRecipesLunch = (uid, date, caloriesStore) => {
    getFullDayRecipes(uid, date).then((ress) => {
        // console.log(ress, "ressss");
        let breakfast = Object.entries(ress.breakfast);
        let lunch = Object.entries(ress.lunch);
        let dinner = Object.entries(ress.dinner);

        const favoriteRecipeIds = Object.entries(lunch).reduce((array, item: any) => {
            //   console.log(item, "itemmmmm");

            const recipe = {
                caloriesId: item[1][0],
                recipeId: item[1][1].recipeId,
                categories: item[1][1].category,
            };
            array.push(recipe);
            // console.log(array, "resss");
            return array;
        }, []);
        return searchingDailyRecipes(favoriteRecipeIds).then((result) => {
            // console.log(result, "resULT");
            caloriesStore.lunch = result;
            // console.log(caloriesStore.breakfast, "updStorage");
        });
    });
};


export const useDailyRecipesDinner = (uid, date, caloriesStore) => {

    getFullDayRecipes(uid, date).then((ress) => {
        // console.log(ress, "ressss");
        let breakfast = Object.entries(ress.breakfast);
        let lunch = ress.lunch;
        let dinner = Object.entries(ress.dinner);

        const favoriteRecipeIds = Object.entries(dinner).reduce((array, item: any) => {
            //   console.log(item, "itemmmmm");

            const recipe = {
                caloriesId: item[1][0],
                recipeId: item[1][1].recipeId,
                categories: item[1][1].category,
            };
            array.push(recipe);
            // console.log(array, "resss");
            return array;
        }, []);
        return searchingDailyRecipes(favoriteRecipeIds).then((result) => {
            // console.log(result, "resULT");
            caloriesStore.dinner = result;
            // console.log(caloriesStore.breakfast, "updStorage");
        });
    });
};

// export const useDailyRecipesBreakfast = (uid, date, caloriesStore) => {
//     useEffect(() => {
//         getFullDayRecipes(uid, date).then((ress) => {
//             // console.log(ress, "ressss");
//             let breakfast = Object.entries(ress.breakfast);
//             let lunch = ress.lunch;
//             let dinner = ress.dinner;

//             const favoriteRecipeIds = Object.entries(breakfast).reduce((array, item: any) => {
//                 const recipe = {
//                     caloriesId: item[1][0],
//                     recipeId: item[1][1].recipeId,
//                     categories: item[1][1].category,
//                 };
//                 array.push(recipe);
//                 console.log(array, "resss");
//                 return array;
//             }, []);
//             return searchingDailyRecipes(favoriteRecipeIds).then((result) => {
//                 console.log(result, "resULT");
//                 caloriesStore.breakfast = result;
//                 console.log(caloriesStore.breakfast, "updStorage");
//             });
//         });
//     }, [date]);
// };



// export const useDailyRecipesLunch = (uid, date, caloriesStore) => {
//     useEffect(() => {
//         getFullDayRecipes(uid, date).then((ress) => {
//             // console.log(ress, "ressss");
//             let breakfast = Object.entries(ress.breakfast);
//             let lunch = Object.entries(ress.lunch);
//             let dinner = Object.entries(ress.dinner);

//             const favoriteRecipeIds = Object.entries(lunch).reduce((array, item: any) => {
//                 //   console.log(item, "itemmmmm");

//                 const recipe = {
//                     caloriesId: item[1][0],
//                     recipeId: item[1][1].recipeId,
//                     categories: item[1][1].category,
//                 };
//                 array.push(recipe);
//                 // console.log(array, "resss");
//                 return array;
//             }, []);
//             return searchingDailyRecipes(favoriteRecipeIds).then((result) => {
//                 // console.log(result, "resULT");
//                 caloriesStore.lunch = result;
//                 // console.log(caloriesStore.breakfast, "updStorage");
//             });
//         });
//     }, [date]);
// };


// export const useDailyRecipesDinner = (uid, date, caloriesStore) => {
//     useEffect(() => {
//         getFullDayRecipes(uid, date).then((ress) => {
//             // console.log(ress, "ressss");
//             let breakfast = Object.entries(ress.breakfast);
//             let lunch = ress.lunch;
//             let dinner = Object.entries(ress.dinner);

//             const favoriteRecipeIds = Object.entries(dinner).reduce((array, item: any) => {
//                 //   console.log(item, "itemmmmm");

//                 const recipe = {
//                     caloriesId: item[1][0],
//                     recipeId: item[1][1].recipeId,
//                     categories: item[1][1].category,
//                 };
//                 array.push(recipe);
//                 console.log(array, "resss");
//                 return array;
//             }, []);
//             return searchingDailyRecipes(favoriteRecipeIds).then((result) => {
//                 // console.log(result, "resULT");
//                 caloriesStore.dinner = result;
//                 // console.log(caloriesStore.breakfast, "updStorage");
//             });
//         });
//     }, [date]);
// };