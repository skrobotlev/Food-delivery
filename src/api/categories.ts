import { ref, child, get } from "firebase/database";
import { database } from "@/firebase";

export const takeDataCat = (category): Promise<any> => {
  const refer = ref(database);
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

export const requestCurrentCategory = (category) => {
  const refer = ref(database);
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

export const requestModalCategory = (category): Promise<any> => {
  const refer = ref(database);
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
