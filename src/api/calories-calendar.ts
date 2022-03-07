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

export const requestShowerRecipes = (uid, date, userStore) => {
  return getFullDayRecipes(uid, date).then((ress) => {
    console.log(ress, "resss");
    const favoriteRecipeIds = Object.entries(ress).reduce((array, item: any) => {
      const recipe = {
        id: item[0],
        recipeId: item[1].recipeId,
        categories: item[1].category,
      };
      array.push(recipe);
      return array;
    }, []);
    // return searchingOnDb(favoriteRecipeIds).then((result) => {
    //   console.log(result, "res");
    //   userStore.favoriteRecipesDb = result;
    //   console.log(userStore.favoriteRecipesDb, "updStorage");
    // });
  });
};
