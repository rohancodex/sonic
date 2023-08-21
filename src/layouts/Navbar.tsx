import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

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
import { useTheme } from "@/providers/ThemeProvider";

const Navbar = () => {
    const { theme, setTheme } = useTheme();
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
                                        src="https://github.com/shadcn.png"
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>R</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Rohan
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        rohan.desai@torinit.com
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
            <Separator />
        </>
    );
};

export default Navbar;
