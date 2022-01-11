import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { HOME_ROUTE, LOADER_ROUTE } from "./consts";
import { authRoutes } from "./routes";

const AppRouter = () => {
    return (
        <Switch>
            {authRoutes.map(({ path, Component }) => {
                return <Route key={path} path={path} component={Component} exact />;
            })}
            <Redirect to={LOADER_ROUTE} />
        </Switch>
    );
};

export default AppRouter;