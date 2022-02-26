import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ContextProvider } from "./store";

import "./global.scss";
import AppRouter from "./router";

ReactDOM.render(
	<StrictMode>
		<ContextProvider>
			<Router>
				<AppRouter />
			</Router>
		</ContextProvider>
	</StrictMode >,
	document.getElementById("app")
);


