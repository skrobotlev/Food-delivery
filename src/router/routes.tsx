import LoginPage from "@/pages/authentication/log-in";
import PasswordRecovery from "@/pages/authentication/password-recovery";
import RegistrationPage from "@/pages/authentication/registration";
import FavoriteItemsPage from "@/pages/favorite-items-page/favorite-items-page";
import GetStartedPage from "@/pages/get-started";
import HomePage from "@/pages/home-page/home-page";
import Loader from "@/pages/loader";
import ProfilePage from "@/pages/profile-page/profile-page";
import ModalWindow from "@/pages/search-page/modal-window";
import SearchPage from "@/pages/search-page/search-page";
import {
    FAVORITES_ROUTE, GET_STARTED_ROUTE, HOME_ROUTE, LOADER_ROUTE,
    LOGIN_PAGE, MODAL_WINDOW, PASSWORD_RECOVERY, PROFILE_ROUTE,
    REGISTRATION_PAGE, SEARCH_ROUTE
} from "./consts";


export const notAuthRoutes = [
    {
        path: LOADER_ROUTE,
        Component: Loader
    },
    {
        path: GET_STARTED_ROUTE,
        Component: GetStartedPage
    },
    {
        path: REGISTRATION_PAGE,
        Component: RegistrationPage
    },
    {
        path: LOGIN_PAGE,
        Component: LoginPage
    },
    {
        path: PASSWORD_RECOVERY,
        Component: PasswordRecovery
    },
];

export const authRoutes = [
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
    },
    {
        path: MODAL_WINDOW,
        Component: ModalWindow
    }

];
