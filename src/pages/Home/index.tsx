import { Search } from "lucide-react";
import { useEffect } from "react";
import useSWRInfinite from "swr/infinite";

import SongCard from "@/components/molecules/SongCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/stores/store";

import { fetcher, fetchNextResults } from "./helper";

const Home = () => {
    const { setSongs } = useStore((state) => state);
    const { data, error, size, setSize, isLoading } = useSWRInfinite<APIResponse>(
        fetchNextResults,
        fetcher,
    );
    const songs = data ? data.flatMap((page) => page.results) : [];

    const loadMore = () => {
        setSize(size + 1);
    };

    useEffect(() => {
        setSongs(songs);
    }, [songs.length, setSongs]);

    if (error) throw new Error("Error fetching songs...");

    return (
        <section className="py-6">
            <h1 className="text-2xl font-bold tracking-tight text-left scroll-m-20 lg:text-3xl">
                Keep grooving,
            </h1>
            {/* Search */}
            <div className="relative py-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 stroke-gray-500" />
                </div>
                <Input
                    type="search"
                    className="block w-full p-4 py-6 pl-10"
                    placeholder="Artists, songs, or podcasts"
                />
            </div>
            <div className="grid grid-cols-2 gap-2 py-4 lg:grid-cols-4">
                {songs.map((song) => (
                    <SongCard song={song} key={song.trackId} />
                ))}
            </div>
            <div className="flex justify-center">
                <Button isLoading={isLoading} onClick={loadMore}>
                    Load More...
                </Button>
            </div>
        </section>
    );
};

export default Home;
