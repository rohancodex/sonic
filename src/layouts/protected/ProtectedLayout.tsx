import { Outlet } from "react-router-dom";

import MusicPlayer from "@/components/organisms/MusicPlayer";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useStore } from "@/stores/store";

import Navbar from "../common/Navbar";

const ProtectedLayout = () => {
    const { isDialogOpen, setIsDialogOpen, currentSong, songDetails } = useStore(
        (state) => state,
    );
    return (
        <div className="grid min-h-screen grid-rows-[auto,1fr,auto]">
            <Navbar />
            <main className="container">
                <Outlet />
            </main>
            <footer className="sticky bottom-0">
                <Sheet
                    open={isDialogOpen}
                    onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
                >
                    <MusicPlayer />

                    <SheetContent
                        side="bottom"
                        className="flex flex-col justify-between w-full h-5/6"
                    >
                        <SheetHeader className="py-4">
                            {currentSong?.trackId === songDetails?.trackId ? (
                                <SheetTitle className="text-xl md:text-center">
                                    Now Playing
                                </SheetTitle>
                            ) : null}
                            <div className="md:flex md:gap-5 ">
                                <img
                                    className="w-full rounded shadow-md md:w-64"
                                    src={songDetails?.artworkUrl100.replace(
                                        "100x100",
                                        "500x500",
                                    )}
                                    alt="song"
                                />
                                <SheetDescription className="p-8 md:py-6">
                                    <h2 className="pb-2 text-xl font-semibold tracking-tight transition-colors md:text-8xl">
                                        {songDetails?.trackName}
                                    </h2>
                                    <p className="text-xl font-medium tracking-tight">
                                        {songDetails?.artistName}
                                    </p>
                                </SheetDescription>
                            </div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </footer>
        </div>
    );
};

export default ProtectedLayout;
