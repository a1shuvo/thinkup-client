import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import HomeLayout from "../layouts/HomeLayout";
import AllArticles from "../pages/AllArticles";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home";
import { articlesLoader } from "./articlesLoader";

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "/articles",
                loader: articlesLoader,
                hydrateFallbackElement: <p>Loading...</p>,
                Component: AllArticles,
            },
        ],
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                index: true,
                Component: Login,
            },
            {
                path: "/auth/login",
                Component: Login,
            },
            {
                path: "/auth/register",
                Component: Register,
            },
            {
                path: "/auth/forgot-password",
                Component: ForgotPassword,
            },
        ],
    },
]);

export default router;
