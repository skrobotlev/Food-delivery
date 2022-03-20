import { child, get, onValue, push, query, ref, update } from "firebase/database";
import { database } from "@/firebase";
import { requestCurrentCategory } from "./categories";
import { useUpdateDailyRecipes } from "@/hooks/useDailyRecipes";

export const addDailyRecipeFirebase = (uid, date, meal, valkey) => {
  return push(ref(database, `/fullUsers/${uid}/calories-calendar/${date}/${meal}`), valkey);
};

export const deleteDailyRecipeFirebase = (uid, id, date, meal, valKey) => {
  const updates = {};

  updates[`/fullUsers/${uid}/calories-calendar/${date}/${meal}/${id}`] = valKey;

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
      return array;
    }, []);
    return searchingDailyRecipes(favoriteRecipeIds).then((result) => {
      caloriesStore.breakfast = result;
    });
  });
};

export const clickHeartLikeCalendarRecipe = (caloriesStore, recip, meal, active, recipeId, uid, category, caloriesId, closeSearch) => {
  caloriesStore.heartLikeRecipe = recip;
  if (meal === "breakfast" && !active) {
    caloriesStore.addRecipeBreakfast(recipeId, caloriesStore.heartLikeRecipe);
    addDailyRecipeFirebase(uid, caloriesStore.actualDay, meal, { category: category, recipeId: recipeId });
  } else if (meal === "dinner" && !active) {
    caloriesStore.addRecipeDinner(recipeId, caloriesStore.heartLikeRecipe);
    addDailyRecipeFirebase(uid, caloriesStore.actualDay, meal, { category: category, recipeId: recipeId });
  } else if (meal === "lunch" && !active) {
    caloriesStore.addRecipeLunch(recipeId, caloriesStore.heartLikeRecipe);
    addDailyRecipeFirebase(uid, caloriesStore.actualDay, meal, { category: category, recipeId: recipeId });
  } else if (meal === "breakfast" && active) {
    caloriesStore.deleteRecipeBreakfast(caloriesId);
    deleteDailyRecipeFirebase(uid, caloriesId, caloriesStore.actualDay, meal, null);
    useUpdateDailyRecipes(uid, caloriesStore.actualDay, caloriesStore);
  } else if (meal === "dinner" && active) {
    deleteDailyRecipeFirebase(uid, caloriesId, caloriesStore.actualDay, meal, null);
    caloriesStore.deleteRecipeDinner(caloriesId);
    useUpdateDailyRecipes(uid, caloriesStore.actualDay, caloriesStore);
  } else if (meal === "lunch" && active) {
    deleteDailyRecipeFirebase(uid, caloriesId, caloriesStore.actualDay, meal, null);
    caloriesStore.deleteRecipeLunch(caloriesId);
    useUpdateDailyRecipes(uid, caloriesStore.actualDay, caloriesStore);
  }
  closeSearch ? closeSearch(false) : null;
};
