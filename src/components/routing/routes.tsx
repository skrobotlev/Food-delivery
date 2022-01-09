import React from "react";
import FavoriteItemsPage from "../pages/favorite-items-page/favorite-items-page";
import GetStartedPage from "../pages/get-started";
import HomePage from "../pages/home-page/home-page";
import Loader from "../pages/loader";
import ProfilePage from "../pages/profile-page/profile-page";
import SearchPage from "../pages/search-page/search-page";
import { FAVORITES_ROUTE, GET_STARTED_ROUTE, HOME_ROUTE, LOADER_ROUTE, PROFILE_ROUTE, SEARCH_ROUTE } from "./consts";

export const authRoutes = [
    {
        path: LOADER_ROUTE,
        Component: Loader
    },
    {
        path: GET_STARTED_ROUTE,
        Component: GetStartedPage
    },
    {
        path: HOME_ROUTE,
        Component: HomePage
    },
    {
        path: SEARCH_ROUTE,
        Component: SearchPage
    },
    {
        path: FAVORITES_ROUTE,
        Component: FavoriteItemsPage
    },
    {
        path: PROFILE_ROUTE,
        Component: ProfilePage
    }

];