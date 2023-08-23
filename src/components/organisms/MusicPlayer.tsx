import {
    Pause,
    Play,
    Repeat,
    Shuffle,
    SkipBack,
    SkipForward,
    Volume2,
} from "lucide-react";
import React, { ElementRef, useEffect, useRef, useState } from "react";

import { formatTime } from "@/lib/utils";
import { useStore } from "@/stores/store";

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Slider } from "../ui/slider";

const MusicPlayer = () => {
    const audioPlayer = useRef<ElementRef<"audio">>(null);
    const [volume, setVolume] = useState<number>(20);
    const [currentTime, setCurrentTime] = useState<number>(0);

    const { currentSong, isPlaying, setIsPlaying, songs, setCurrentSong } = useStore(
        (state) => state,
    );

    useEffect(() => {
        if (audioPlayer.current) {
            audioPlayer.current.src = currentSong?.previewUrl ?? "";
            audioPlayer.current.volume = volume / 100;
            setIsPlaying(true);
        }
    }, [currentSong?.previewUrl, setIsPlaying]);

    const togglePlayPause = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        if (isPlaying) {
            audioPlayer.current?.pause();
            setIsPlaying(false);
        } else {
            audioPlayer.current?.play();
            setIsPlaying(true);
        }
    };

    const handleSongChange = (direction: "next" | "prev") => {
        const currentIndex = songs.findIndex(
            (song) => song.collectionId === currentSong?.collectionId,
        );

        let newIndex;
        if (direction === "prev") {
            newIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
        } else if (direction === "next") {
            const nextIndex = currentIndex + 1;
            newIndex = nextIndex >= songs.length ? 0 : nextIndex;
        }
        if (newIndex !== undefined) {
            const newSong = songs.at(newIndex);
            newSong && setCurrentSong(newSong);
            setIsPlaying(true);
        }
    };

    if (!currentSong) return null;

    return (
        <div>
            <Card className="justify-between hidden px-10 md:flex md:flex-col md:items-center md:py-4">
                {/* <div className="flex items-center gap-2">
                    <img
                        className="rounded shadow-md h-14 w-14"
                        src={
                            "https://www.udiscovermusic.com/wp-content/uploads/2019/06/Imagine-Dragons-Evolve-album-cover-820-1536x1536.jpg"
                        }
                        alt="currentSong"
                    />
                    <div className="pl-2">
                        <h5 className="pt-1 text-base font-medium tracking-tight scroll-m-20">
                            Believer
                        </h5>
                        <p className="text-xs leading-4">Imagine Dragons</p>
                    </div>
                    <Button variant={"ghost"}>
                        <Heart className="hover:fill-red-500" />
                    </Button>
                </div>
                <div className="flex items-center gap-2 pr-4">
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={handlePlay}
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
                        <audio
                            ref={audioRef}
                            src={currentSong?.previewUrl}
                            autoPlay
                            onTimeUpdate={() =>
                                audioRef?.current &&
                                setCurrentTime(audioRef.current?.currentTime)
                            }
                            onDurationChange={() =>
                                audioRef?.current &&
                                setSeekTime(audioRef.current.duration)
                            }
                            // onEnded={handleSongEnded}
                        />
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
                <div className="flex items-center gap-4">
                    <Volume2 />
                    <Slider defaultValue={[33]} max={100} step={1} className="w-36" />
                </div> */}
                <div className="flex flex-col w-full gap-2 px-4">
                    {/* progress bar */}
                    <Slider
                        onClick={(e) => e.preventDefault()}
                        step={1}
                        className="w-full"
                        value={[currentTime ?? 0]}
                        max={audioPlayer.current ? audioPlayer.current.duration : 0}
                        onValueChange={(value) => {
                            if (audioPlayer.current)
                                audioPlayer.current.currentTime = value.at(0)!;
                        }}
                    />
                    <audio
                        ref={audioPlayer}
                        src={currentSong?.previewUrl}
                        autoPlay
                        onTimeUpdate={() =>
                            audioPlayer.current &&
                            setCurrentTime(audioPlayer.current.currentTime)
                        }
                        onEnded={() => setIsPlaying(false)}
                    />
                    {/* timer values */}
                    <div className="flex justify-between">
                        <p>
                            {audioPlayer.current?.currentTime
                                ? formatTime(audioPlayer.current.currentTime)
                                : "-:-"}
                        </p>
                        <p>
                            {audioPlayer.current?.duration
                                ? formatTime(audioPlayer.current.duration)
                                : "-:-"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between w-full gap-2 pr-4 ">
                    <div className="flex gap-4 px-4 py-2">
                        <img
                            className="w-14 h-14"
                            src={currentSong?.artworkUrl100}
                            alt="album art"
                        />
                        <div>
                            <h3 className="text-base font-medium">
                                {currentSong.trackName}
                            </h3>
                            <p className="text-sm">{currentSong.artistName}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={togglePlayPause}
                            variant={"ghost"}
                            className="rounded-full"
                            size={"icon"}
                        >
                            <Shuffle className="w-5 h-5 hover:stroke-primary/90" />
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSongChange("prev");
                            }}
                            variant={"ghost"}
                            className="rounded-full "
                            size={"icon"}
                        >
                            <SkipBack className="fill-foreground stroke-foreground" />
                        </Button>
                        <Button
                            onClick={togglePlayPause}
                            variant={"outline"}
                            size="icon"
                            className="rounded-full"
                        >
                            {isPlaying ? (
                                <Pause className="w-4 h-4 fill-foreground stroke-foreground" />
                            ) : (
                                <Play className="w-4 h-4 fill-foreground stroke-foreground" />
                            )}
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSongChange("next");
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
                    <div className="flex items-center gap-4">
                        <Volume2 />
                        <Slider
                            defaultValue={[33]}
                            max={100}
                            value={[volume]}
                            min={0}
                            step={1}
                            className="w-36"
                            onValueChange={(value) => {
                                if (audioPlayer.current)
                                    audioPlayer.current.volume = value[0] / 100;
                                setVolume(value[0]);
                            }}
                        />
                    </div>
                </div>
            </Card>

            {/* mobile footer */}
            <Card className="flex justify-between md:hidden">
                <div className="flex items-center">
                    <img
                        className="rounded shadow-md h-14 w-14"
                        src={
                            "https://www.udiscovermusic.com/wp-content/uploads/2019/06/Imagine-Dragons-Evolve-album-cover-820-1536x1536.jpg"
                        }
                        alt="currentSong"
                    />
                    <div className="pl-2">
                        <h5 className="pt-1 text-base font-medium tracking-tight scroll-m-20">
                            Believer
                        </h5>
                        <p className="text-xs leading-4">Imagine Dragons</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 pr-4">
                    <SkipBack className="fill-foreground stroke-foreground" />
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        variant={"outline"}
                        className="px-3 py-2 rounded-full"
                    >
                        <Play className="w-4 h-4 fill-foreground stroke-foreground" />
                    </Button>
                    <SkipForward className="fill-foreground stroke-foreground" />
                </div>
            </Card>
        </div>
    );
};

export default MusicPlayer;
