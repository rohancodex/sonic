import { Heart } from "lucide-react";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const SongCard = ({ id }: { id: number }) => {
    return (
        <Card
            className={`rounded-lg p-3 ${
                id === 2
                    ? "animate-border from-pink-500 via-red-500 to-yellow-500 bg-[length:400%_400%] [animation-duration:_4s] bg-gradient-to-r"
                    : ""
            }`}
        >
            {/* <CardHeader> */}
            {/* </CardHeader> */}

            <img
                className="w-full rounded shadow-md"
                src={
                    "https://www.udiscovermusic.com/wp-content/uploads/2019/06/Imagine-Dragons-Evolve-album-cover-820-1536x1536.jpg"
                }
                alt="song"
            />
            <CardContent className="p-0 pt-3 flex justify-between items-center">
                <div>
                    <h4 className="scroll-m-20 text-base font-medium tracking-tight pt-1">
                        Believer
                    </h4>
                    <p className="leading-4 text-xs">Imagine Dragons {id}</p>
                </div>

                <Button variant={"link"} className="rounded-full px-2 right-1 bottom-2">
                    <Heart className="h-5 w-5 stroke-" />
                </Button>
            </CardContent>
        </Card>
    );
};

export default SongCard;
