import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfigBackupProj = {
  apiKey: "AIzaSyCsrrRayo63GZsRzHJLSBFkmoXZ4uSYu0k",
  authDomain: "chelfoodbackup.firebaseapp.com",
  databaseURL: "https://chelfoodbackup-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chelfoodbackup",
  storageBucket: "chelfoodbackup.appspot.com",
  messagingSenderId: "603193770650",
  appId: "1:603193770650:web:8b6dadd433e1c5303d9523",
};

export const firebaseConfig = {
  apiKey: "AIzaSyBYLLHL3VlSNB_L9S7z3Ci9863p4DDo958",
  authDomain: "chelfood-c39f1.firebaseapp.com",
  databaseURL: "https://chelfood-c39f1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chelfood-c39f1",
  storageBucket: "chelfood-c39f1.appspot.com",
  messagingSenderId: "884767417811",
  appId: "1:884767417811:web:5935e9747b15955f93bb26",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfigBackupProj);
export const auth = getAuth(app);
export const database = getDatabase();

onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    console.log("logged in!");
  } else {
    console.log("No user");
  }
});
