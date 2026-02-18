"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Play, Monitor, Settings, Loader2 } from "lucide-react";
import { SERVERS, getPlayerUrl } from "@/lib/servers";
import { cn } from "@/lib/utils";

interface PlayerProps {
    id: string;
    type: "movie" | "tv";
    season?: string;
    episode?: string;
    title?: string;
    poster_path?: string;
    genre_ids?: number[];
    duration?: number; // combined runtime or episode duration
}

export default function Player({ id, type, season, episode, title, poster_path, genre_ids, duration }: PlayerProps) {
    const [currentServer, setCurrentServer] = useState(SERVERS[0].id);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [sessionTime, setSessionTime] = useState(0);
    const [initialTime, setInitialTime] = useState(0);

    // Smarter default duration if API missing it
    const safeDuration = duration || (type === 'movie' ? 120 : 24);

    const playerUrl = getPlayerUrl(currentServer, type, { id, season, episode });

    // 1. Initialize start time from history
    useEffect(() => {
        const history = JSON.parse(localStorage.getItem("suplixer_history") || "[]");
        // For movies, id is unique. For TV, we need to handle episode changes.
        // If we found an existing record for this SHOW (id), check if it's the same episode.
        const existing = history.find((item: any) => String(item.id) === String(id));

        if (existing) {
            // If it's a TV show and the episode is different, start from 0
            if (type === 'tv' && (String(existing.season) !== String(season) || String(existing.episode) !== String(episode))) {
                setInitialTime(0);
            } else {
                setInitialTime(existing.watched_time || 0);
            }
        } else {
            setInitialTime(0);
        }
        setSessionTime(0); // Reset session time on id/season/ep change
    }, [id, season, episode, type]);

    // 2. Track session time
    useEffect(() => {
        const interval = setInterval(() => {
            setSessionTime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Attempt to resume playback
    const resumedUrl = initialTime > 10
        ? `${playerUrl}${playerUrl.includes('?') ? '&' : '?'}t=${Math.floor(initialTime)}&start=${Math.floor(initialTime)}`
        : playerUrl;

    // Loading state management with safety timeout
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 8000); // 8s fallback
        return () => clearTimeout(timer);
    }, [resumedUrl]);

    // 3. Save to History
    useEffect(() => {
        // Update every 5 seconds to prevent spamming
        if (sessionTime > 0 && sessionTime % 5 === 0) {
            const history = JSON.parse(localStorage.getItem("suplixer_history") || "[]");

            // Re-check initial time from storage if check was 0 (double safety)
            let baseTime = initialTime;
            if (baseTime === 0) {
                const doubleCheck = history.find((item: any) => String(item.id) === String(id));
                if (doubleCheck) baseTime = doubleCheck.watched_time || 0;
            }

            const totalWatched = baseTime + sessionTime;
            const durationSec = safeDuration * 60;

            const newItem = {
                id,
                type,
                title,
                poster_path,
                genre_ids,
                season,
                episode,
                timestamp: Date.now(),
                watched_time: totalWatched,
                duration: durationSec
            };

            const filtered = history.filter((item: any) => String(item.id) !== String(id));
            localStorage.setItem("suplixer_history", JSON.stringify([newItem, ...filtered].slice(0, 20)));
        }
    }, [sessionTime, initialTime, id, type, season, episode, title, poster_path, genre_ids, safeDuration]);

    return (
        <div className="flex flex-col gap-4 w-full" id="player-container">
            {/* Player Container */}
            <div className="group relative aspect-video w-full overflow-hidden bg-black border border-white/10">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                        <Loader2 className="h-10 w-10 animate-spin text-white/20" />
                    </div>
                )}
                <iframe
                    key={resumedUrl} // Force reload on URL change
                    src={resumedUrl}
                    className="h-full w-full"
                    allowFullScreen
                    scrolling="no"
                    frameBorder="0"
                    onLoad={() => setIsLoading(false)}
                />
            </div>

            {/* Controls / Server Selection */}
            <div className="flex items-center justify-between border border-white/10 bg-black/50 p-3 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40">
                        <Monitor className="h-3 w-3" />
                        <span>Server</span>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 border border-white/20 px-3 py-1.5 text-xs font-bold transition-all hover:border-white/50 hover:bg-white/5"
                        >
                            {SERVERS.find(s => s.id === currentServer)?.name}
                            <ChevronDown className={cn("h-3 w-3 transition-transform", isDropdownOpen && "rotate-180")} />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute bottom-full left-0 mb-2 z-50 flex flex-col border border-white/10 bg-black shadow-2xl min-w-[200px]">
                                {SERVERS.map((server) => (
                                    <button
                                        key={server.id}
                                        onClick={() => {
                                            setCurrentServer(server.id);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={cn(
                                            "px-4 py-3 text-left text-xs font-bold uppercase tracking-widest transition-all hover:bg-white hover:text-black",
                                            currentServer === server.id ? "bg-white/10 text-white" : "text-white/40"
                                        )}
                                    >
                                        {server.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-[10px] text-white/20 italic">If movie is slow, try switching servers</div>
                </div>
            </div>
        </div>
    );
}
