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
const supabase = createClient(ENV.VITE_SUPABASE_APP_URL, ENV.VITE_SUPABASE_SECRET);

const Navbar = () => {
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
    console.log(session);
    return (
        <>
            <nav className="py-4 md:py-8 flex justify-between items-center container">
                <Link
                    to="/"
                    className="text-2xl tracking-tight font-bold scroll-m-20 lg:text-3xl"
                >
                    Sonic
                </Link>
                <div className="gap-5 md:gap-10 flex items-center">
                    <Button
                        className="rounded-full py-6"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        variant={"outline"}
                    >
                        {theme === "light" ? (
                            <Moon className="h-5 w-5" />
                        ) : (
                            <Sun className="h-5 w-5" />
                        )}
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-8 w-8 rounded-full"
                            >
                                <Avatar className="h-12 w-12">
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
        </>
    );
};

export default Navbar;
