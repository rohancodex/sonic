const API_BASE_URL =
    "https://itunes.apple.com/search/?limit=10&country=in&media=music&term=Imagine+dragons";

export const fetchNextResults = (pageIndex: number, previousPageData: APIResponse) => {
    if (previousPageData && !previousPageData.results.length) return null;
    return `${API_BASE_URL}&offset=${pageIndex * 10}`;
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
