import React, { Suspense } from "react";
import { tmdb } from "@/lib/tmdb";
import { anime } from "@/lib/anime";
import MovieCard from "@/components/MovieCard";
import Section from "@/components/Section";
import ContinueWatching from "@/components/ContinueWatching";
import { Movie } from "@/types";

async function TrendingMovies() {
    const data = await tmdb.getTrending("movie");
    return (
        <Section title="Trending Movies" subtitle="The most watched movies this week">
            {data.results.slice(0, 12).map((movie: Movie) => (
                <MovieCard key={movie.id} movie={{ ...movie, media_type: "movie" }} />
            ))}
        </Section>
    );
}

async function TrendingTV() {
    const data = await tmdb.getTrending("tv");
    return (
        <Section title="Trending TV Shows" subtitle="Must-watch series currently airing">
            {data.results.slice(0, 12).map((tv: Movie) => (
                <MovieCard key={tv.id} movie={{ ...tv, media_type: "tv" }} />
            ))}
        </Section>
    );
}

async function LatestAnime() {
    const data = await anime.getDiscover();
    return (
        <Section title="Latest Anime" subtitle="Top animated series from Japan">
            {data.results.slice(0, 12).map((a: Movie) => (
                <MovieCard key={a.id} movie={{ ...a, media_type: "tv" }} />
            ))}
        </Section>
    );
}

async function PopularMovies() {
    const data = await tmdb.getPopular("movie");
    return (
        <Section title="Popular Movies" subtitle="Evergreen hits everyone is talking about">
            {data.results.slice(0, 12).map((movie: Movie) => (
                <MovieCard key={movie.id} movie={{ ...movie, media_type: "movie" }} />
            ))}
        </Section>
    );
}

function SectionSkeleton() {
    return (
        <div className="flex flex-col gap-8 py-8 animate-pulse">
            <div className="h-10 w-64 bg-white/5 border-b border-white/10" />
            <div className="movie-grid">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-[2/3] bg-white/5 border border-white/10" />
                ))}
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <div className="flex flex-col gap-4">
            <ContinueWatching />

            <Suspense fallback={<SectionSkeleton />}>
                <TrendingMovies />
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
                <TrendingTV />
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
                <LatestAnime />
            </Suspense>

            <Suspense fallback={<SectionSkeleton />}>
                <PopularMovies />
            </Suspense>
        </div>
    );
}

