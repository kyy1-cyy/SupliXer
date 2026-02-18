"use server";

import { fetchTMDB } from "@/lib/tmdb";

export async function getSeasonEpisodes(seriesId: string, seasonNumber: number) {
    try {
        const data = await fetchTMDB(`/tv/${seriesId}/season/${seasonNumber}`);
        return data.episodes?.length || 0;
    } catch (error) {
        console.error("Error fetching season episodes:", error);
        return 0;
    }
}
