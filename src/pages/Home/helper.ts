const API_BASE_URL = "https://itunes.apple.com/search/?limit=12&country=in&media=music";

export const fetchNextResults = (
    pageIndex: number,
    previousPageData: APIResponse,
    search: string = "Imagine+Dragons",
) => {
    console.log(search);
    if (previousPageData && !previousPageData.results.length) return null;
    return `${API_BASE_URL}&term=${search || "Imagine+Dragons"}&offset=${pageIndex * 10}`;
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
