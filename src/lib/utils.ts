import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export const getURL = () => {
    let url =
        import.meta.env.NEXT_PUBLIC_SITE_URL ??
        import.meta.env.NEXT_PUBLIC_VERCEL_URL ??
        "sonic-two.vercel.app/" ??
        "http://localhost:5173/";
    url = url.includes("http") ? url : `https://${url}`;
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    console.log({url});
    return url;
};
