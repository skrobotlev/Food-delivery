import {
  getAuth,
  onAuthStateChanged,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { useHistory } from "react-router-dom";
import { RegisterForm } from "../components/pages/authentication/registration";
import { auth, database } from "../firebase";

export interface AuthForm {
  email: string;
  password: string;
}

interface CreateUserPayload extends AuthForm {
  userId: string;
}

export const forgotPassword = (email) => {
  return sendPasswordResetEmail(auth, email, {
    url: "http://localhost:3000/login",
  });
};

export const signOutButton = () => {
  signOut(auth)
    .then(() => {})
    .catch((error) => {});
};

export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((user) => console.log(user))
    .catch((error) => console.log(error));
};

export const loginEmailPassword = ({ password, email }: AuthForm) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // console.log(userCredential);
      const user = userCredential.user;
      // console.log(user);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

function writeFullUserData({ email, uid, name, lastName }: any) {
  return set(ref(database, "fullUsers/" + uid), {
    email,
    name,
    lastName,
  }).catch((error) => {
    console.log(error);
  });
}
export const createFullUser = async ({ email, password, name, lastName }: RegisterForm) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // console.log(userCredential);
      const user = userCredential.user;
      const json = user.toJSON();
      // console.log(json);
      return writeFullUserData({ ...user, email, name, lastName }).then(() => user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("CODE:" + errorCode, "MESSAGE:" + errorMessage);
    });
};

function writeUserData({ email, uid }: any) {
  debugger;
  set(ref(database, "/users/" + uid), {
    email,
  }).catch((error) => {
    console.log(error);
  });
}
export const createUser = ({ email, password }: AuthForm) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // console.log(user);
      writeUserData(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
