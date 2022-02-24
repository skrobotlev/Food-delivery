import React, { createContext, StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
import "./global.scss";
import AppRouter from "./components/routing/app-router";
import UserStore, { PersistStore } from "./store/user-store";
import CategoriesStore from "./store/categories-store";

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