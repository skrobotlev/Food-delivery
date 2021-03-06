import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { Context } from "@/store";
import { auth } from "@/firebase";
import Layout from "@/layout";
import { LOADER_ROUTE } from "./consts";
import { authRoutes, notAuthRoutes } from "./routes";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "@/pages/loader";


const AppRouter = observer(() => {
    const { userStore } = useContext(Context);
    const history = useHistory();
    const [user, loading, error] = useAuthState(auth);
    // const { path } = authRoutes;

    useEffect(() => {
        const { pathname } = history.location;
        // if (user) userStore.setUser(user), userStore.setIsAuth(true);

        if (!loading) {
            if (user) userStore.user = user, userStore.isAuth = true;
            if (!user && notAuthRoutes.map((r) => r.path).includes(pathname)) history.goForward();
            else if (!user && authRoutes.map((r) => r.path).includes(pathname)) history.push("/login");
            else if (user && notAuthRoutes.map((r) => r.path).includes(pathname)) history.push("/home");
            else if (user && authRoutes.map((r) => r.path).includes(pathname)) history.goForward();
        }
    }, [loading]);

    if (loading) {
        return <Loader />;
    }
    return (
        <Switch>
            {notAuthRoutes.map(({ path, Component }) => {
                return <Route key={path} path={path} component={Component} exact />;
            })}
            <Layout>
                {user && authRoutes.map(({ path, Component }) => {
                    return <Route key={path} path={path} component={Component} exact />;
                })}
            </Layout>
            <Redirect to={LOADER_ROUTE} />
        </Switch>
    );
});

export default AppRouter;
