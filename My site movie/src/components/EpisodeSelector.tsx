"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSeasonEpisodes } from "@/app/actions";

interface EpisodeSelectorProps {
    id: string;
    seasons: { season_number: number; name: string; episode_count?: number }[];
    currentSeason: string;
    currentEpisode: string;
}

export default function EpisodeSelector({ id, seasons, currentSeason, currentEpisode }: EpisodeSelectorProps) {
    const router = useRouter();
    const [selectedSeason, setSelectedSeason] = useState(parseInt(currentSeason));
    const [episodes, setEpisodes] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchEpisodes() {
            setIsLoading(true);
            try {
                const epCount = await getSeasonEpisodes(id, selectedSeason);
                setEpisodes(Array.from({ length: epCount }, (_, i) => i + 1));
            } catch (error) {
                console.error("Failed to fetch episodes", error);
                // Fallback to an empty array if fetching fails, or a default range if desired
                setEpisodes([]);
            } finally {
                setIsLoading(false);
            }
        }
        fetchEpisodes();
    }, [id, selectedSeason]);

    const seasonsList = seasons.filter(s => s.season_number > 0 || (s.season_number === 0 && (s.episode_count && s.episode_count > 0)));

    const handleEpisodeSelect = (e: number) => {
        router.push(`/watch/tv/${id}?season=${selectedSeason}&episode=${e}`);
        const player = document.getElementById("player-container");
        if (player) {
            player.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div className="flex flex-col gap-6 mt-12 border-t border-white/10 pt-8">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 sticky left-0 bg-black/50 backdrop-blur-sm pr-4">Seasons</h3>
                <div className="flex gap-2">
                    {seasonsList.map((s) => (
                        <button
                            key={s.season_number}
                            onClick={() => setSelectedSeason(s.season_number)}
                            className={cn(
                                "border px-4 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap",
                                selectedSeason === s.season_number
                                    ? "border-white bg-white text-black"
                                    : "border-white/10 text-white/40 hover:border-white/40 hover:text-white"
                            )}
                        >
                            {s.season_number === 0 ? "Specials" : `Season ${s.season_number}`}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4 min-h-[100px] justify-center">
                <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Episodes</h3>
                    {isLoading && <Loader2 className="h-3 w-3 animate-spin text-white/20" />}
                </div>
                {episodes.length > 0 ? (
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
                        {episodes.map((e) => (
                            <button
                                key={e}
                                onClick={() => handleEpisodeSelect(e)}
                                className={cn(
                                    "border aspect-square flex items-center justify-center text-xs font-bold transition-all cursor-pointer hover:scale-105 active:scale-95",
                                    (selectedSeason === parseInt(currentSeason) && e === parseInt(currentEpisode))
                                        ? "border-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                        : "border-white/10 text-white/40 hover:border-white/40 hover:text-white"
                                )}
                            >
                                {e}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center py-10 border border-dashed border-white/10 text-white/20 text-[10px] uppercase font-bold tracking-widest">
                        No episodes available for this season
                    </div>
                )}
            </div>
        </div>
    );
}
