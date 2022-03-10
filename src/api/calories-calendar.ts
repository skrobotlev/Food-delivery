import { child, get, onValue, push, query, ref, update } from "firebase/database";
import { database } from "@/firebase";

export const addRecipeFirebase = (uid, date, meal, valkey) => {
  return push(ref(database, `/fullUsers/${uid}/calories-calendar/${date}/${meal}`), valkey);
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

export const requestShowerRecipes = (uid, date, caloriesStore) => {
  return getFullDayRecipes(uid, date).then((ress) => {
    // console.log(ress, "ressss");
    let breakfast = Object.entries(ress.breakfast);
    let lunch = ress.lunch;
    let dinner = ress.dinner;

    const favoriteRecipeIds = Object.entries(breakfast).reduce((array, item: any) => {
      //   console.log(item, "itemmmmm");

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
