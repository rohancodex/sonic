import { debounce } from "lodash";
import { Search } from "lucide-react";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import useSWRInfinite from "swr/infinite";

import SongCard from "@/components/molecules/SongCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/Loader";
import { useStore } from "@/stores/store";

import { fetcher, fetchNextResults } from "./helper";

const Home = () => {
    const [search, setSearch] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const { setSongs } = useStore((state) => state);

    const { data, error, size, setSize, isLoading } = useSWRInfinite<APIResponse>(
        (pageIndex, previousPageData) =>
            fetchNextResults(pageIndex, previousPageData, debouncedSearchTerm),
        fetcher,
        { parallel: true, revalidateFirstPage: false },
    );
    const songs = data ? data.flatMap((page) => page.results) : [];

    const loadMore = () => {
        setSize(size + 1);
    };

    const isLoadingMore =
        isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

    useEffect(() => {
        setSongs(songs);
    }, [songs.length, setSongs]);

    const debouncedSearch = useMemo(
        () =>
            debounce((searchTerm) => {
                setDebouncedSearchTerm(searchTerm);
            }, 500),
        [],
    );

    const handleInputChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            setSearch(value);
            debouncedSearch(value);
        },
        [debouncedSearch],
    );

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
                    value={search}
                    onChange={handleInputChange}
                    type="search"
                    className="block w-full p-4 py-6 pl-10"
                    placeholder="Artists, songs, or podcasts"
                />
            </div>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="grid grid-cols-2 gap-2 py-4 lg:grid-cols-4">
                    {songs.length ? (
                        songs.map((song) => <SongCard song={song} key={song.trackId} />)
                    ) : (
                        <h2 className="mx-auto text-2xl font-semibold text-center">
                            No results found!
                        </h2>
                    )}
                </div>
            )}
            {songs.length ? (
                <div className="flex justify-center">
                    <Button
                        isLoading={isLoadingMore}
                        variant={"outline"}
                        className="rounded-full"
                        onClick={loadMore}
                    >
                        Load More...
                    </Button>
                </div>
            ) : null}
        </section>
    );
};

export default Home;
