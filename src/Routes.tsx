import { createBrowserRouter } from "react-router-dom";

import ProtectedLayout from "./layouts/protected/ProtectedLayout";
import PublicLayout from "./layouts/public/PublicLayout";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/SignUp";
import Home from "./pages/Home";
export const publicRoutes = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout />,
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "signup",
                element: <Signup />,
            },
        ],
    },
]);

export const protectedRoutes = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
]);
