import {
    Heart,
    Play,
    Repeat,
    Shuffle,
    SkipBack,
    SkipForward,
    Volume2,
} from "lucide-react";
import { Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";

import Navbar from "../common/Navbar";

const ProtectedLayout = () => {
    return (
        <>
            <Navbar />
            <main className="container">
                <Outlet />
            </main>
            <footer className="sticky bottom-0">
                <Sheet>
                    <SheetTrigger asChild>
                        <div>
                            <Card className="px-10 hidden md:flex justify-between md:py-4">
                                <div className="flex items-center gap-2">
                                    <img
                                        className="h-14 w-14 rounded shadow-md"
                                        src={
                                            "https://www.udiscovermusic.com/wp-content/uploads/2019/06/Imagine-Dragons-Evolve-album-cover-820-1536x1536.jpg"
                                        }
                                        alt="song"
                                    />
                                    <div className="pl-2">
                                        <h5 className="scroll-m-20 text-base font-medium tracking-tight pt-1">
                                            Believer
                                        </h5>
                                        <p className="leading-4 text-xs">
                                            Imagine Dragons
                                        </p>
                                    </div>
                                    <Button variant={"ghost"}>
                                        <Heart className="hover:fill-red-500" />
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2 pr-4">
                                    <div className="flex items-center gap-4">
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            variant={"ghost"}
                                            className="rounded-full "
                                            size={"icon"}
                                        >
                                            <Shuffle className="h-5 w-5 hover:stroke-primary/90" />
                                        </Button>
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            variant={"ghost"}
                                            className="rounded-full "
                                            size={"icon"}
                                        >
                                            <SkipBack className="fill-foreground stroke-foreground" />
                                        </Button>
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            variant={"outline"}
                                            size="icon"
                                            className="rounded-full"
                                        >
                                            <Play className="h-4 w-4 fill-foreground stroke-foreground" />
                                        </Button>
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            variant={"ghost"}
                                            className="rounded-full "
                                            size={"icon"}
                                        >
                                            <SkipForward className="fill-foreground stroke-foreground" />
                                        </Button>
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            variant={"ghost"}
                                            className="rounded-full "
                                            size={"icon"}
                                        >
                                            <Repeat className="h-5 w-5 hover:stroke-primary/90" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <Volume2 />
                                    <Slider
                                        defaultValue={[33]}
                                        max={100}
                                        step={1}
                                        className="w-36"
                                    />
                                </div>
                            </Card>

                            {/* mobile footer */}
                            <Card className="flex md:hidden justify-between">
                                <div className="flex items-center">
                                    <img
                                        className="h-14 w-14 rounded shadow-md"
                                        src={
                                            "https://www.udiscovermusic.com/wp-content/uploads/2019/06/Imagine-Dragons-Evolve-album-cover-820-1536x1536.jpg"
                                        }
                                        alt="song"
                                    />
                                    <div className="pl-2">
                                        <h5 className="scroll-m-20 text-base font-medium tracking-tight pt-1">
                                            Believer
                                        </h5>
                                        <p className="leading-4 text-xs">
                                            Imagine Dragons
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 pr-4">
                                    <SkipBack className="fill-foreground stroke-foreground" />
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                        variant={"outline"}
                                        className="rounded-full py-2 px-3"
                                    >
                                        <Play className="h-4 w-4 fill-foreground stroke-foreground" />
                                    </Button>
                                    <SkipForward className="fill-foreground stroke-foreground" />
                                </div>
                            </Card>
                        </div>
                    </SheetTrigger>
                    <SheetContent
                        side="bottom"
                        className="w-full h-5/6 flex flex-col justify-between"
                    >
                        <SheetHeader>
                            <SheetTitle className="md:text-center text-xl">
                                Now Playing
                            </SheetTitle>
                            <div className="md:flex md:gap-5 ">
                                <img
                                    className="w-full rounded shadow-md md:w-64"
                                    src={
                                        "https://www.udiscovermusic.com/wp-content/uploads/2019/06/Imagine-Dragons-Evolve-album-cover-820-1536x1536.jpg"
                                    }
                                    alt="song"
                                />
                                <SheetDescription className="pb-8 md:py-6">
                                    <h2 className="pb-2 text-xl md:text-8xl font-semibold tracking-tight transition-colors">
                                        Believer
                                    </h2>
                                    <p className="font-medium text-xl tracking-tight">
                                        Imagine Dragons
                                    </p>
                                </SheetDescription>
                            </div>
                        </SheetHeader>
                        <SheetFooter>
                            <Card className="w-full gap-5 flex flex-col items-center py-8">
                                <div className="flex flex-col w-full px-4 gap-2">
                                    <Slider
                                        defaultValue={[33]}
                                        max={100}
                                        step={1}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between">
                                        <p>0:00</p>
                                        <p>3.34</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pr-4">
                                    <div className="flex items-center gap-4">
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            variant={"ghost"}
                                            className="rounded-full "
                                            size={"icon"}
                                        >
                                            <Shuffle className="h-5 w-5 hover:stroke-primary/90" />
                                        </Button>
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            variant={"ghost"}
                                            className="rounded-full "
                                            size={"icon"}
                                        >
                                            <SkipBack className="fill-foreground stroke-foreground" />
                                        </Button>
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            variant={"outline"}
                                            size="icon"
                                            className="rounded-full"
                                        >
                                            <Play className="h-4 w-4 fill-foreground stroke-foreground" />
                                        </Button>
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            variant={"ghost"}
                                            className="rounded-full "
                                            size={"icon"}
                                        >
                                            <SkipForward className="fill-foreground stroke-foreground" />
                                        </Button>
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            variant={"ghost"}
                                            className="rounded-full "
                                            size={"icon"}
                                        >
                                            <Repeat className="h-5 w-5 hover:stroke-primary/90" />
                                        </Button>
                                    </div>
                                </div>
                                {/* <div className="flex gap-4 items-center">
                                        <Volume2 />
                                        <Slider
                                            defaultValue={[33]}
                                            max={100}
                                            step={1}
                                            className="w-36"
                                        />
                                    </div> */}
                            </Card>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </footer>
        </>
    );
};

export default ProtectedLayout;
