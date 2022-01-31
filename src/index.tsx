import React, { createContext, StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";

import "./global.scss";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import AppRouter from "./components/routing/app-router";
import LoginPage from "./components/pages/authentication/log-in";
import RegisterPage from "./components/pages/authentication/registration";
import { Provider } from "react-redux";
import UserStore, { PersistStore } from "./stores/user-store";
import CategoriesStore from "./stores/categories-store";
// import store from "./redux/store";

export const Context = createContext(null);


ReactDOM.render(
	<StrictMode>
		<Context.Provider value={{
			userStore: new UserStore(),
			categoriesStore: new CategoriesStore(),
			persist: new PersistStore()
		}}>
			<Router>
				<AppRouter />
			</Router>
		</Context.Provider>
	</StrictMode >,
	document.getElementById("app")
);


