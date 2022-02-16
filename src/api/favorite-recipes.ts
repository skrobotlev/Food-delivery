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
  updates["/fullUsers/" + uid + "/rkey/"] = valKey;
  console.log(updates);
  return update(ref(database), updates);
};

export const removeFavoriteRecipe = (uid, id, valKey) => {
  const updates = {};
  // updates["/posts/" + newPostKey] = postData;
  updates[`/fullUsers/${uid}/favorites/${id}/`] = valKey;
  console.log(updates);
  return update(ref(database), updates);
};

export const pushNewRecipe = (uid, valKey) => {
  // const refer = ref(database);
  // Get a key for a new Post.
  // const newPostKey = push(child(ref(database), 'posts')).key;
  //   refer.ref(database, "/fullUsers/");
  // Write the new post's data simultaneously in the posts list and the user's post list.
  //   const updates = {};
  //   // // updates["/posts/" + newPostKey] = postData;
  //   updates["/fullUsers/" + uid + "/favorites/"] = valKey;

  // return update(ref(database), updates);
  //   return push(child(ref(database)valKey);
  console.log(valKey);
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
    // console.log(resArr.filter((val) => val !== val));
    // console.log(unique(resArr), "resARR");
    // return resArr.filter((val) => val !== val);
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
  //   get(testRequest).then((res) => {
  //     console.log(res.val());
  //   });
  // onValue(testRequest, (snapshot) => {
  //   // let resArr = [];
  //   // // resArr.push(snap.val());
  //   // if (snapshot.exists()) {
  //   //   let children;

  //   //   console.log(snapshot.val(), "SHANPSHOTvalonVALUE");
  //   //   // snapshot.forEach((valueSnap) => {
  //   //   //   let pars;
  //   //   //   // console.log(valueSnap.key, "getFAVREC");
  //   //   //   pars = valueSnap.val();
  //   //   //   children.push({ ...pars, fkey: valueSnap.key });
  //   //   //   console.log(children, "CHILDRED");
  //   //   // });
  //   //   // console.log(snapshot.val());
  //   //   return (children = snapshot.val());
  //   // } else {
  //   //   console.log("No data available");
  //   // }
  //   return get(child(refer, `/fullUsers/${uid}/favorites`)).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       let children;

  //       console.log(snapshot.val(), "SHANPSHOTvalGET");
  //       return (children = snapshot.val());
  //     }
  //     // console.log(resArr.filter((val) => val !== val));
  //     // console.log(unique(resArr), "resARR");
  //     // return resArr.filter((val) => val !== val);
  //   });
  // });
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

// export const getFavoriteRecipes = (uid) => {
//   const refer = ref(database);
//   //   const testRequest = query(ref(database, `/fullUsers/${uid}/favorites`), orderByKey());
//   //   get(testRequest).then((res) => {
//   //     console.log(res.val());
//   //   });
//   return get(child(refer, `/fullUsers/${uid}/favorites`))
//     .then((snapshot) => {
//       // const { key } = snapshot._node.children._root;
//       //   console.log(snapshot.val());
//       // console.log(Object.keys(snapshot.val()));
//       if (snapshot.exists()) {
//         const children = [];

//         snapshot.forEach((valueSnap) => {
//           console.log(valueSnap.key, "getFAVREC");

//           children.push(valueSnap.val());
//           console.log(children, "CHILDRED");
//         });
//         // console.log(snapshot.val());
//         return children;
//       } else {
//         console.log("No data available");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
