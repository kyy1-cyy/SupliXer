"use client";

import React, { useEffect, useState } from "react";
import Section from "./Section";
import MovieCard from "./MovieCard";
import { Movie } from "@/types";
import { Play, Trash2 } from "lucide-react";

export default function ContinueWatching() {
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("suplixer_history") || "[]");
        // Deduplicate history based on ID
        const unique = stored.filter((item: any, index: number, self: any[]) =>
            index === self.findIndex((t) => String(t.id) === String(item.id))
        );
        if (unique.length !== stored.length) {
            localStorage.setItem("suplixer_history", JSON.stringify(unique));
        }
        setHistory(unique);
    }, []);

    const removeFromHistory = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const updated = history.filter(item => String(item.id) !== String(id)); // Loose comparison
        setHistory(updated);
        localStorage.setItem("suplixer_history", JSON.stringify(updated));
    };

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        if (hrs > 0) return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (history.length === 0) return null;

    return (
        <Section
            title="Continue Watching"
            subtitle="Pick up where you left off"
        >
            {history.map((item) => {
                const movie: Movie = {
                    id: parseInt(item.id || "0"),
                    title: item.title,
                    name: item.title,
                    overview: "",
                    poster_path: item.poster_path,
                    backdrop_path: "",
                    media_type: item.type,
                    vote_average: 0,
                    genre_ids: item.genre_ids,
                    season: item.season,
                    episode: item.episode
                };

                const progress = (item.watched_time / item.duration) * 100 || 0;

                return (
                    <div key={item.id} className="relative group">
                        <MovieCard movie={movie} />

                        {/* Trash Icon (Top Left, Always Visible) */}
                        <button
                            onClick={(e) => removeFromHistory(item.id, e)}
                            className="absolute left-2 top-2 z-30 flex h-7 w-7 items-center justify-center bg-black/80 text-white/40 hover:text-red-500 border border-white/10 transition-all cursor-pointer backdrop-blur-md hover:scale-110 active:scale-90"
                            title="Remove from history"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </button>

                        {item.type === "tv" && (
                            <div className="absolute bottom-16 right-2 z-20 bg-black/90 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white/80 border border-white/10 backdrop-blur-md shadow-2xl">
                                S{item.season} E{item.episode}
                            </div>
                        )}
                    </div>
                );
            })}
        </Section>
    );
}
