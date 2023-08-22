import { Search } from "lucide-react";
import useSWRInfinite from "swr/infinite";

import SongCard from "@/components/molecules/SongCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { fetcher, fetchNextResults } from "./helper";

const Home = () => {
    const { data, error, size, setSize, isLoading } = useSWRInfinite<APIResponse>(
        fetchNextResults,
        fetcher,
    );
    const songs = data ? data.flatMap((page) => page.results) : [];

    const loadMore = () => {
        setSize(size + 1);
    };

    if (error) throw new Error("Error fetching songs...");

    return (
        <section className="py-6">
            <h1 className="text-left text-2xl tracking-tight font-bold scroll-m-20 lg:text-3xl">
                Keep grooving,
            </h1>
            {/* Search */}
            <div className="relative py-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="stroke-gray-500 h-4" />
                </div>
                <Input
                    type="search"
                    className="block w-full p-4 py-6 pl-10"
                    placeholder="Artists, songs, or podcasts"
                />
            </div>
            <div className="py-4 grid grid-cols-2 lg:grid-cols-4 gap-2">
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
