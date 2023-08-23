import { createClient, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";

import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { ENV } from "./lib/env";
import { protectedRoutes, publicRoutes } from "./Routes";

const supabase = createClient(ENV.VITE_SUPABASE_APP_URL, ENV.VITE_SUPABASE_SECRET);
function App() {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <ThemeProvider defaultTheme="light" storageKey="color-theme">
            <RouterProvider router={session ? protectedRoutes : publicRoutes} />
            <Toaster />
        </ThemeProvider>
    );
}

export default App;
