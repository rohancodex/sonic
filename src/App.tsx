/* eslint-disable no-constant-condition */
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "./providers/ThemeProvider";
import { protectedRoutes, publicRoutes } from "./Routes";

function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="color-theme">
            <RouterProvider router={false ? protectedRoutes : publicRoutes} />
        </ThemeProvider>
    );
}

export default App;
