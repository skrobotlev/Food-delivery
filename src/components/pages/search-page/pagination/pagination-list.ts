import React from "react";
import withFirebasePagination from "firebase-react-paginated";
import SearchPage from "../search-page";
import { app, firebaseConfig } from "../../../../firebase";
// import firebase from "firebase";

// firebase.config(firebaseConfig);

export default withFirebasePagination(app)({
  path: "listItems",
  orderBy: ".value",
  length: 20,
})(SearchPage);
