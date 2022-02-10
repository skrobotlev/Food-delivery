import { ref, child, get, query, orderByChild, orderByKey, orderByValue, equalTo, limitToFirst, limitToLast, update } from "firebase/database";
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

export const testData = (category) => {
  const refer = ref(database); // tslint:disable-next-line
  return get(child(refer, `/categories/${category}`))
    .then((snapshot) => {
      // console.log(snapshot.val());
      if (snapshot.exists()) {
        const children = [];

        children.push(snapshot.val());
        // snapshot.forEach((items) => {
        //   children.push(items.val());
        // });
        // children.push({
        //   key: snapshot.key,
        //   data: snapshot.val(),
        // });
        //   // children.push(valueSnap.val());
        // });
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

// export const testUserData = (category) => {
//   const { push } = useHistory();
//   // const refer = ref(database); // tslint:disable-next-line
//   // const testRequest = query(ref(database, "fullUsers"), limitToFirst(6));
//   // const testRequest = query(ref(database, "/categories/TEST"), equalTo("daily"));
//   const testRequest = query(ref(database, `categories/${category}`), orderByKey());
//   const children = [];
//   get(testRequest).then((snapshot) => {
//     // console.log(snapshot.toJSON());
//     console.log(snapshot.val());
//     children.push(snapshot.val());
//   });
//   return children;
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
