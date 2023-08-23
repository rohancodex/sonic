import { createClient, Session } from "@supabase/supabase-js";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/contexts/ThemeProvider";
import { ENV } from "@/lib/env";
import { useStore } from "@/stores/store";
const supabase = createClient(ENV.VITE_SUPABASE_APP_URL, ENV.VITE_SUPABASE_SECRET);

const Navbar = () => {
    const { reset } = useStore((state) => state);
    const [session, setSession] = useState<Session | null>(null);
    const { theme, setTheme } = useTheme();
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast({
                title: "Whoops! Something went wrong",
                description: error.message,
            });
            return;
        }
        // reset zustand store
        reset();
        return navigate("/");
    };

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
        <header>
            <nav className="container flex items-center justify-between py-4 md:py-8">
                <Link
                    to="/"
                    className="text-2xl font-bold tracking-tight scroll-m-20 lg:text-3xl"
                >
                    Sonic
                </Link>
                <div className="flex items-center gap-5 md:gap-10">
                    <Button
                        className="py-6 rounded-full"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        variant={"outline"}
                    >
                        {theme === "light" ? (
                            <Moon className="w-5 h-5" />
                        ) : (
                            <Sun className="w-5 h-5" />
                        )}
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative w-8 h-8 rounded-full"
                            >
                                <Avatar className="w-12 h-12">
                                    <AvatarImage
                                        src={session?.user?.user_metadata?.avatar_url}
                                        alt="profile"
                                    />
                                    <AvatarFallback>
                                        {session?.user?.user_metadata?.full_name
                                            ?.at(0)
                                            ?.toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {session?.user?.user_metadata?.full_name}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {session?.user?.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem onClick={handleLogout}>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
            <Separator />
        </header>
    );
};

export default Navbar;
