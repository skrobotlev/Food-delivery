import { getAuth, onAuthStateChanged, connectAuthEmulator, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../firebase";

export interface AuthForm {
  email: string;
  password: string;
}

interface CreateUserPayload extends AuthForm {
  userId: string;
}

export const loginEmailPassword = async ({ password, email }: AuthForm) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

// {
//   "rules": {
//     ".read": "now < 1644433200000",  // 2022-2-10
//     ".write": "now < 1644433200000",  // 2022-2-10
//   }
// }

// function writeUserData(user): any {
//   set(ref(database, "users/" + user.uid), user);
// }
function writeUserData({ email, uid }): any {
  set(ref(database, "users/" + uid), {
    email,
  });
}

export const createUser = async ({ email, password }: AuthForm) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("user add", user);
      writeUserData(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

// const db = getFirestore(app);
// db.collection("todos").getDocs();
// const todosCol = collection(db, "todos");
// const snapshot = await getDocs(todosCol);
