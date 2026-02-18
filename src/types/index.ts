export interface Movie {
    id: number;
    title?: string;
    name?: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    media_type: "movie" | "tv";
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
    genre_ids?: number[];
    original_language?: string;
    season?: number | string;
    episode?: number | string;
}

export interface MovieDetails extends Movie {
    genres: { id: number; name: string }[];
    runtime?: number;
    credits: {
        cast: { id: number; name: string; character: string; profile_path: string }[];
    };
    recommendations: {
        results: Movie[];
    };
    seasons?: {
        id: number;
        name: string;
        season_number: number;
        episode_count: number;
    }[];
}
