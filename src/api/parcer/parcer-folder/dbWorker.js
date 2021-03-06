const { parentPort } = require("worker_threads");
const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
var serviceAccountBackup = require("./serviceAccountBackupKey.json");
const { getDatabase } = require("firebase-admin/database");
const { set, ref } = require("firebase/database");

let firebaseConfigBackup = {
  apiKey: "AIzaSyCsrrRayo63GZsRzHJLSBFkmoXZ4uSYu0k",
  authDomain: "chelfoodbackup.firebaseapp.com",
  credential: admin.credential.cert(serviceAccountBackup),
  databaseURL: "https://chelfoodbackup-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chelfoodbackup",
  storageBucket: "chelfoodbackup.appspot.com",
  messagingSenderId: "603193770650",
  appId: "1:603193770650:web:8b6dadd433e1c5303d9523",
};

let firebaseConfig = {
  apiKey: "AIzaSyBYLLHL3VlSNB_L9S7z3Ci9863p4DDo958",
  authDomain: "chelfood-c39f1.firebaseapp.com",
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chelfood-c39f1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chelfood-c39f1",
  storageBucket: "chelfood-c39f1.appspot.com",
  messagingSenderId: "884767417811",
  appId: "1:884767417811:web:5935e9747b15955f93bb26",
};

admin.initializeApp(firebaseConfigBackup);
// let db = admin.firestore();
const db = getDatabase();
// const refSalads = db.ref("categories/first-dishes");
// const refSecDish = db.ref("categories/second-dishes");

// const ref = db.ref("categories/beverages");

// module.exports = takeData = () => {
//   ref.once("value").then(function (snapshot) {
//     // let key = snapshot.key;
//     // console.log(key);
//     let childKey = snapshot.child("/-Mtrpl7Yy0orycDABoM2").val();
//     console.log(JSON.parse(childKey));
//     return childKey;
//   });
// };
// module.exports = takeDataCat = (category, arr) => {
//   const ref = db.ref(`categories/${category}`);
//   ref.once("value").then(function (snapshot, arr) {
//     // let key = snapshot.key;
//     // console.log(typeof snapshot.child("/-Mtrpl7Yy0orycDABoM2").val());
//     // let childKey = snapshot.child("/-Mtrpl7Yy0orycDABoM2").val();
//     // console.log(snapshot.child().forEach((res) => console.log(res)));
//     // snapshot.forEach(function (childSnapshot) {
//     //   console.log(childSnapshot.val());
//     // });
//     // const childs = [];
//     let eachChild = snapshot.forEach((val) => {
//       // console.log(val.val());
//       arr.push(val.val());
//       // return JSON.parse(val.val());
//     });
//     console.log(typeof childs);
//     return childs;
//     // console.log(JSON.parse(childKey));
//     // console.log(eachChild);
//     // return eachChild;
//     // return JSON.parse(childKey);
//   });
// };

// console.log(db);
// // get current data in DD-MM-YYYY format
// let date = new Date();
// let currDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
// export const saveData = (array) => {
//   ref.set(JSON.stringify(array));
// };
// module.exports = writeRecipeData = (recip) => {
//   recip.forEach((item, idx) => {
//     const { header, img, timeToCook, desc, bzhu } = item;
//     console.log(item);
//     return set(ref(db, "/categories/beverages", ++idx), {
//       img,
//       desc,
//       timeToCook,
//       bzhu,
//     }).catch((error) => {
//       console.log(error);
//     });
//   });
// };

module.exports = saveData = (array) => {
  const ref = db.ref("categories/canning");

  // ref.set(JSON.stringify(array));
  array.forEach((element) => {
    ref.push(JSON.stringify(element));
  });
};

// recieve crawled data from main thread
// parentPort.once("message", (message) => {
//   console.log("Recieved data from mainWorker...");

//   // store data gotten from main thread in database
//   db.collection("Rates")
//     .doc(currDate)
//     .set({
//       rates: JSON.stringify(message),
//     })
//     .then(() => {
//       // send data back to main thread if operation was successful
//       parentPort.postMessage("Data saved successfully");
//     })
//     .catch((err) => console.log(err));
// });
// takeDataCat("canning");
