import { Eye } from "lucide-react";

import { useStore } from "@/stores/store";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const SongCard = ({ song }: { song: MusicTrack }) => {
    const { setCurrentSong, currentSong, setIsDialogOpen, setSongDetails } = useStore(
        (state) => state,
    );
    const handleClick = () => {
        setCurrentSong(song);
    };

    const handleDetailsClick = () => {
        setIsDialogOpen(true);
        setSongDetails(song);
    };

    return (
        <Card
            onClick={handleClick}
            className={`rounded-lg p-3 hover:cursor-pointer ${
                currentSong?.trackId === song.trackId
                    ? "animate-border from-pink-500 via-red-500 to-yellow-500 bg-[length:400%_400%] [animation-duration:_4s] bg-gradient-to-r"
                    : ""
            }`}
        >
            <img
                className="w-full rounded shadow-md"
                src={
                    song.artworkUrl100.replace("100x100", "300x300") ??
                    "https://www.udiscovermusic.com/wp-content/uploads/2019/06/Imagine-Dragons-Evolve-album-cover-820-1536x1536.jpg"
                }
                alt="song"
            />
            <CardContent className="flex items-center justify-between p-0 pt-3">
                <div className="w-5/6 space-y-1">
                    <h4 className="pt-1 text-base font-medium tracking-tight line-clamp-1 scroll-m-20 text-clip">
                        {song.trackName}
                    </h4>
                    <p className="text-xs leading-4 text-ellipsis">{song.artistName}</p>
                </div>

                <Button variant={"link"} className="px-2 rounded-full right-1 bottom-2">
                    <Eye
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDetailsClick();
                        }}
                        className="w-5 h-5 stroke-foreground"
                    />
                </Button>
            </CardContent>
        </Card>
    );
};

export default SongCard;
