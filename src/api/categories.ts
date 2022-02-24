import { ref, child, get, query, orderByChild, orderByKey, orderByValue, equalTo, limitToFirst, limitToLast, update } from "firebase/database";
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
      if (snapshot.exists()) {
        const children = [];
        children.push(snapshot.val());
        return children;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

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
