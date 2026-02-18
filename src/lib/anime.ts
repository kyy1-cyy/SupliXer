import { fetchTMDB } from "./tmdb";

export const anime = {
    getTrending: (page: string = "1") =>
        fetchTMDB("/trending/tv/week", { with_genres: "16", page }),

    getDiscover: (page: string = "1") =>
        fetchTMDB("/discover/tv", {
            with_genres: "16",
            with_keywords: "210024",
            page
        })
};
