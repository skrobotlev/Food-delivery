import { ref, child, get, query, orderByChild, orderByKey, orderByValue, equalTo, limitToFirst, limitToLast } from "firebase/database";
import { startAt } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import { json } from "stream/consumers";
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

export const testData = () => {
  const { push } = useHistory();
  // const refer = ref(database); // tslint:disable-next-line
  // const testRequest = query(ref(database, "fullUsers"), limitToFirst(6));
  const testRequest = query(ref(database, "/categories/TEST"), equalTo("header"));
  // const testRequest = query(ref(database, "fullUsers"), orderByKey());
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
// testData();
