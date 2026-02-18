const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_READ_TOKEN = process.env.TMDB_API_READ_ACCESS_TOKEN;

export async function fetchTMDB(endpoint: string, params: Record<string, string> = {}) {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));

    const response = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${TMDB_READ_TOKEN}`,
            "Content-Type": "application/json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
        throw new Error(`TMDB API Error: ${response.statusText}`);
    }

    return response.json();
}

export const tmdb = {
    getTrending: (type: "movie" | "tv" | "all" = "all", page: string = "1") =>
        fetchTMDB(`/trending/${type}/week`, { page }),

    getTopRated: (type: "movie" | "tv", page: string = "1") =>
        fetchTMDB(`/${type}/top_rated`, { page }),

    getPopular: (type: "movie" | "tv", page: string = "1") =>
        fetchTMDB(`/${type}/popular`, { page }),

    getDetails: (type: "movie" | "tv", id: string) =>
        fetchTMDB(`/${type}/${id}`, { append_to_response: "credits,videos,recommendations" }),

    search: (query: string) =>
        fetchTMDB("/search/multi", { query }),

    getCollection: (id: string) =>
        fetchTMDB(`/collection/${id}`),

    getCompany: (id: string) =>
        fetchTMDB(`/company/${id}`),
};
