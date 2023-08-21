import { Search } from "lucide-react";

import SongCard from "@/components/molecules/SongCard";
import { Input } from "@/components/ui/input";

const Home = () => {
    return (
        <section className="py-6">
            <h1 className="text-2xl tracking-tight font-bold scroll-m-20 lg:text-3xl">
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
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id, index) => (
                    <SongCard id={id} key={index} />
                ))}
            </div>
        </section>
    );
};

export default Home;
