import { child, equalTo, get, onValue, orderByChild, orderByKey, orderByValue, push, query, ref, update } from "firebase/database";
import { database } from "../firebase";

export const writeNewRecipe = (uid, valKey) => {
  // A post entry.
  // const postData = {
  //   author: username,
  //   uid: uid,
  //   body: body,
  //   title: title,
  //   starCount: 0,
  //   authorPic: picture,
  // };

  // Get a key for a new Post.
  // const newPostKey = push(child(ref(database), 'posts')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  // updates["/posts/" + newPostKey] = postData;
  updates["/fullUsers/" + uid + "/rkey"] = valKey;

  return update(ref(database), updates);
};

export const pushNewRecipe = (uid, valKey) => {
  const refer = ref(database);
  // Get a key for a new Post.
  // const newPostKey = push(child(ref(database), 'posts')).key;
  //   refer.ref(database, "/fullUsers/");
  // Write the new post's data simultaneously in the posts list and the user's post list.
  //   const updates = {};
  //   // // updates["/posts/" + newPostKey] = postData;
  //   updates["/fullUsers/" + uid + "/favorites/"] = valKey;

  // return update(ref(database), updates);
  //   return push(child(ref(database)valKey);
  return push(ref(database, `/fullUsers/${uid}/favorites`), valKey);
};

export const updateRecipes = (uid) => {
  const refer = ref(database);
  return get(child(refer, `/fullUsers/${uid}/favorites`))
    .then((snapshot) => {
      // const { key } = snapshot._node.children._root;
      //   console.log(snapshot.val());
      // console.log(Object.keys(snapshot.val()));
      if (snapshot.exists()) {
        const children = [];
        snapshot.forEach((valueSnap) => {
          // console.log(valueSnap.val());
          children.push(valueSnap.val());
        });
        // console.log(snapshot.val());
        return children;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const searchingOnDb = async (key) => {
  const categories = ["beverages", "canning", "deserts", "first-dishes", "salads", "sauces", "second-dishes"];
  // const refer = database.ref(`categories/${categories[i]}/`);
  let resRec = [];
  console.log(key.length);
  for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < key.length; j++) {
      const testRequest = query(ref(database, `categories/${categories[i]}/${key[j]}`));

      await get(testRequest).then((snap) => {
        let results = [];
        if (snap.exists()) {
          resRec.push(JSON.parse(snap.val()));
        }
        // else {
        //   console.log("No Favorite Recipes Data");
        // }
        // console.log(results, "RSLTS");
        // console.log(resRec.length, "1");
        // if (resRec.length === 2) {
        //   console.log(resRec.length, "===2");
        //   return resRec;
        // }
        // return resRec;
      });
    }
  }
  // console.log(resRec, "rsREC2");
  // if (resRec.length === 3) {
  //   console.log("rsREC2push");
  //   return resRec;
  // }
  return resRec;
};

export const getFavoriteRecipes = (uid) => {
  const refer = ref(database);
  //   const testRequest = query(ref(database, `/fullUsers/${uid}/favorites`), orderByKey());
  //   get(testRequest).then((res) => {
  //     console.log(res.val());
  //   });
  return get(child(refer, `/fullUsers/${uid}/favorites`))
    .then((snapshot) => {
      // const { key } = snapshot._node.children._root;
      //   console.log(snapshot.val());
      // console.log(Object.keys(snapshot.val()));
      if (snapshot.exists()) {
        const children = [];
        snapshot.forEach((valueSnap) => {
          // console.log(valueSnap.val());
          children.push(valueSnap.val());
        });
        // console.log(snapshot.val());
        return children;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
