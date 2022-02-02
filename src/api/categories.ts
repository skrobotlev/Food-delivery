import { ref, child, get, query, orderByChild, orderByKey, orderByValue, equalTo, limitToFirst, limitToLast } from "firebase/database";
import { startAt } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { json } from "stream/consumers";
import { Context } from "..";
import { database } from "../firebase";

export const takeDataCat = (category): Promise<any> => {
  const refer = ref(database); // tslint:disable-next-line
  return get(child(refer, `/categories/${category}`))
    .then((snapshot) => {
      // const { key } = snapshot._node.children._root;
      if (snapshot.exists()) {
        const children = [];
        snapshot.forEach((valueSnap) => {
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

export const categoriesWithKey = (category): Promise<any> => {
  const refer = ref(database); // tslint:disable-next-line
  return get(child(refer, `/categories/${category}`))
    .then((snapshot) => {
      // const { key } = snapshot._node.children._root;
      // console.log(snapshot.val());
      // console.log(Object.keys(snapshot.val()));
      if (snapshot.exists()) {
        const children = [];
        snapshot.forEach((valueSnap) => {
          // console.log(valueSnap.key);
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

// export const categoriesDataWithKey = (category) => {
//   const { categoriesStore } = useContext(Context);

//   // console.log(categoriesStore._salads);
//   // console.log(userStore._category);
//   const arr = [];
//   requestCategories(category)
//     .then((items) => {
//       items.map((item) => {
//         return arr.push(JSON.parse(item));
//       });
//       return categoriesStore.setSalads(arr);
//     })
//     .then(() => console.log(categoriesStore._salads));
// };

export const requestCategories = (category): Promise<any> => {
  const refer = ref(database); // tslint:disable-next-line
  return get(child(refer, `/categories/${category}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const children = [];
        snapshot.forEach((valueSnap) => {
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

export const testData = (category) => {
  const { push } = useHistory();
  // const refer = ref(database); // tslint:disable-next-line
  // const testRequest = query(ref(database, "fullUsers"), limitToFirst(6));
  // const testRequest = query(ref(database, "/categories/TEST"), equalTo("daily"));
  const testRequest = query(ref(database, `categories/${category}`), orderByKey());
  const children = [];
  get(testRequest).then((snapshot) => {
    // console.log(snapshot.toJSON());
    console.log(snapshot.val());
    children.push(snapshot.val());
  });
  return children;
  // push("/search");
  // get(testRequest).then((snapshot) => {
  //   console.log(snapshot);
  // });

  // return testRequest;
  // mostViewedPosts();
  // return get(child(refer, `/categories/${category}`))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       const children = [];
  //       snapshot.forEach((valueSnap) => {
  //         children.push(valueSnap.val());
  //       });
  //       console.log(snapshot.val());
  //       return children;
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
};
