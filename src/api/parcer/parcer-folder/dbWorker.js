const { parentPort } = require("worker_threads");
const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

//firebase credentials
let firebaseConfig = {
  apiKey: "AIzaSyBYLLHL3VlSNB_L9S7z3Ci9863p4DDo958",
  authDomain: "chelfood-c39f1.firebaseapp.com",
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://chelfood-c39f1-default-rtdb.europe-west1.firebasedatabase.app",
  //   databaseURL:
  //     "https://chelfood-c39f1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chelfood-c39f1",
  storageBucket: "chelfood-c39f1.appspot.com",
  messagingSenderId: "884767417811",
  appId: "1:884767417811:web:5935e9747b15955f93bb26",
};

// Initialize Firebase
admin.initializeApp(firebaseConfig);
let db = admin.firestore();

// get current data in DD-MM-YYYY format
let date = new Date();
let currDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

// recieve crawled data from main thread
parentPort.once("message", (message) => {
  console.log("Recieved data from mainWorker...");

  // store data gotten from main thread in database
  db.collection("Rates")
    .doc(currDate)
    .set({
      rates: JSON.stringify(message),
    })
    .then(() => {
      // send data back to main thread if operation was successful
      parentPort.postMessage("Data saved successfully");
    })
    .catch((err) => console.log(err));
});
