/* eslint-disable no-constant-condition */
import { Heart } from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const SongCard = ({ song }: { song: MusicTrack }) => {
    return (
        <Card
            className={`rounded-lg p-3 hover:cursor-pointer ${
                false
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
            <CardContent className="p-0 pt-3 flex justify-between items-center">
                <div>
                    <h4 className="scroll-m-20 text-base font-medium tracking-tight pt-1 text-clip">
                        {song.trackName}
                    </h4>
                    <p className="leading-4 text-xs text-ellipsis">{song.artistName}</p>
                </div>

                <Button variant={"link"} className="rounded-full px-2 right-1 bottom-2">
                    <Heart className="h-5 w-5 stroke-" />
                </Button>
            </CardContent>
        </Card>
    );
};

export default SongCard;
