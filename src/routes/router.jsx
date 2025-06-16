import axios from "axios";
import { createBrowserRouter } from "react-router";
import Loading from "../components/Loading";
import PrivateRoute from "../contexts/PrivateRoute";
import AuthLayout from "../layouts/AuthLayout";
import HomeLayout from "../layouts/HomeLayout";
import AllArticles from "../pages/AllArticles";
import ArticleDetails from "../pages/ArticleDetails";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import PostArticle from "../pages/PostArticle";
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
                HydrateFallback: Loading,
                Component: AllArticles,
            },
            {
                path: "/article/:id",
                Component: ArticleDetails,
                HydrateFallback: Loading,
                loader: async ({ params }) => {
                    const res = await axios(
                        `${import.meta.env.VITE_BASE_API_URL}/article/${
                            params.id
                        }`
                    );
                    return res.data;
                },
            },
            {
                path: "/post-article",
                element: (
                    <PrivateRoute>
                        <PostArticle></PostArticle>
                    </PrivateRoute>
                ),
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
    {
        path: "*",
        Component: NotFound,
    },
]);

export default router;
