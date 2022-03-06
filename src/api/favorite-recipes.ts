import { child, get, onValue, push, query, ref, update } from "firebase/database";
import { database } from "@/firebase";

export const writeNewRecipe = (uid, valKey) => {
  const updates = {};

  updates["/fullUsers/" + uid + "/rkey/"] = valKey;

  return update(ref(database), updates);
};

export const removeFavoriteRecipe = (uid, id, valKey) => {
  const updates = {};

  updates[`/fullUsers/${uid}/favorites/${id}`] = valKey;

  return update(ref(database), updates);
};

export const pushNewFavoriteRecipe = (uid, valKey) => {
  return push(ref(database, `/fullUsers/${uid}/favorites`), valKey);
};

export const currentSnapRecipes = async (uid) => {
  const refer = ref(database);
  const testRequest = ref(database, `/fullUsers/${uid}/rkey/`);

  function unique(arr) {
    let result = [];
    console.log(arr, "arr");
    for (let str of arr) {
      console.log(str, "str");
      if (!result.includes(str)) {
        result.push(str);
      }
    }
    return result;
  }

  await onValue(testRequest, (snap) => {
    let resArr = [];

    resArr.push(snap.val());
  });
};

export const updateRecipes = (uid) => {
  const refer = ref(database);
  const testRequest = ref(database, `/fullUsers/${uid}/favorites`);

  function unique(obj) {
    let result = [];
    console.log(obj, "arr");
    for (let str in obj) {
      console.log(obj[str], "str");
      if (!result.includes(obj[str])) {
        result.push(obj[str]);
      }
    }
    return result;
  }

  onValue(testRequest, (snap) => {
    let resArr = {};
    console.log(snap.val(), "updREC");
    resArr = snap.val();
    console.log(unique(resArr), "RESarrUPDRec");
  });
};
export const searchingOnDb = async (arr) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    const recipe = await get(query(ref(database, `categories/${item.categories}/${item.recipeId}`)));
    item.recipe = JSON.parse(recipe.val());
    result.push(item);
  }
  return result;
};

export const getFavoriteRecipes = (uid) => {
  const refer = ref(database);
  const testRequest = query(ref(database, `/fullUsers/${uid}/favorites`));

  return get(child(refer, `/fullUsers/${uid}/favorites`))
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

export const updateFavoritesStorage = (uid, userStore) => {
  return getFavoriteRecipes(uid).then((ress) => {
    const favoriteRecipeIds = Object.entries(ress).reduce((array, item: any) => {
      const recipe = {
        id: item[0],
        recipeId: item[1].recipeId,
        categories: item[1].category,
      };
      array.push(recipe);
      return array;
    }, []);
    return searchingOnDb(favoriteRecipeIds).then((result) => {
      let elmg;
      console.log(result, "res");
      userStore.favoriteRecipesDb = result;
      console.log(userStore.favoriteRecipesDb, "updStorage");
    });
  });
};
const updateModalObj = (recipeId, userStore, categoriesStore) => {
  let currentKey = userStore.favoriteRecipesDb.findIndex((rec) => {
    return rec.recipeId === recipeId;
  });
  currentKey > -1 ? categoriesStore.setModalObject(userStore.favoriteRecipesDb[currentKey]) : null;
  console.log(userStore.favoriteRecipesDb[currentKey], "rkey==recipeId157");
  console.log("UPDATEmodOBJ");
};

export const updateModalRecipe = (uid, recipeId, userStore, categoriesStore) => {
  updateFavoritesStorage(uid, userStore).then(() => updateModalObj(recipeId, userStore, categoriesStore));
};
