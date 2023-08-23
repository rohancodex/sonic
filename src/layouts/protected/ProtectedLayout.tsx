import { Play, Repeat, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { Outlet } from "react-router-dom";

import MusicPlayer from "@/components/organisms/MusicPlayer";
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
                            <MusicPlayer />
                        </div>
                    </SheetTrigger>
                    <SheetContent
                        side="bottom"
                        className="flex flex-col justify-between w-full h-5/6"
                    >
                        <SheetHeader>
                            <SheetTitle className="text-xl md:text-center">
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
                                    <h2 className="pb-2 text-xl font-semibold tracking-tight transition-colors md:text-8xl">
                                        Believer
                                    </h2>
                                    <p className="text-xl font-medium tracking-tight">
                                        Imagine Dragons
                                    </p>
                                </SheetDescription>
                            </div>
                        </SheetHeader>
                        <SheetFooter>
                            <Card className="flex flex-col items-center w-full gap-5 py-8">
                                <div className="flex flex-col w-full gap-2 px-4">
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
                                            <Shuffle className="w-5 h-5 hover:stroke-primary/90" />
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
                                            <Play className="w-4 h-4 fill-foreground stroke-foreground" />
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
                                            <Repeat className="w-5 h-5 hover:stroke-primary/90" />
                                        </Button>
                                    </div>
                                </div>
                                {/* <div className="flex items-center gap-4">
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
