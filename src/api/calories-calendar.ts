import { child, get, onValue, push, query, ref, update } from "firebase/database";
import { database } from "@/firebase";
import { requestCurrentCategory } from "./categories";

export const addDailyRecipeFirebase = (uid, date, meal, valkey) => {
  return push(ref(database, `/fullUsers/${uid}/calories-calendar/${date}/${meal}`), valkey);
};

export const deleteDailyRecipeFirebase = (uid, id, valKey) => {
  const updates = {};

  updates[`/fullUsers/${uid}/favorites/${id}`] = valKey;

  return update(ref(database), updates);
};

export const getFullDayRecipes = (uid, date) => {
  const refer = ref(database);
  const testRequest = query(ref(database, `/fullUsers/${uid}/calories-calendar/${date}`));

  return get(child(refer, `/fullUsers/${uid}/calories-calendar/${date}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let children;
        return (children = snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const searchingDailyRecipes = async (arr) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    const recipe = await get(query(ref(database, `categories/${item.categories}/${item.recipeId}`)));
    item.recipe = JSON.parse(recipe.val());
    result.push(item);
  }
  return result;
};

export const requestColumnSearchingDinner = (caloriesStore, currentCategory) => {
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
};

export const requestShowerRecipes = (uid, date, caloriesStore) => {
  return getFullDayRecipes(uid, date).then((ress) => {
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
      console.log(array, "resss");
      return array;
    }, []);
    return searchingDailyRecipes(favoriteRecipeIds).then((result) => {
      console.log(result, "resULT");
      caloriesStore.breakfast = result;
      console.log(caloriesStore.breakfast, "updStorage");
    });

    // const favoriteRecipeIds = Object.entries(ress).reduce((array, item: any) => {
    //   console.log(item, "itemmmmm");
    //   let key = Object.keys(item[1]);

    //   const recipe = {
    //     caloriesId: key,
    //     recipeId: item[1].recipeId,
    //     categories: item[1].category,
    //   };
    //   array.push(recipe);
    //   //   console.log(array, "resss");
    //   return array;
    // }, []);
    // console.log(favoriteRecipeIds, "favRecIds");
  });
};
