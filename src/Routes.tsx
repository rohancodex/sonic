import { createBrowserRouter } from "react-router-dom";

import ProtectedLayout from "./layouts/ProtectedLayout";
import PublicLayout from "./layouts/PublicLayout";
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/SignUp/Signup";
export const publicRoutes = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout />,
        children: [
            {
                path: "login",
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
    },
]);
