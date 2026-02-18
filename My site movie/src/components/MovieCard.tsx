"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Movie } from "@/types";

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const title = movie.title || movie.name;
    const rating = movie.vote_average.toFixed(1);
    const year = new Date(movie.release_date || movie.first_air_date || "").getFullYear() || "N/A";
    const type = movie.media_type === "movie" ? "Movie" : "TV Show";

    const linkHref = movie.media_type === "tv" && movie.season && movie.episode
        ? `/watch/${movie.media_type}/${movie.id}?season=${movie.season}&episode=${movie.episode}`
        : `/watch/${movie.media_type}/${movie.id}`;

    return (
        <Link href={linkHref}>
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative flex flex-col gap-3 rounded-none bg-black p-0 transition-all duration-300"
            >
                <div className="relative aspect-[2/3] w-full overflow-hidden border border-white/10 transition-colors duration-300 group-hover:border-white/40">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={title || "Movie Poster"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    />

                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Floating Rating */}
                    <div className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-sm bg-black/80 px-2 py-1 text-[10px] font-bold backdrop-blur-md border border-white/10 text-white">
                        <Star className="h-3 w-3 fill-white text-white" />
                        {rating}
                    </div>

                </div>

                <div className="flex flex-col gap-1 px-1">
                    <div className="flex items-center justify-between text-[10px] font-medium tracking-widest text-white/50 uppercase">
                        <span>{type}</span>
                        <span>{year}</span>
                    </div>
                    <h3 className="line-clamp-1 text-sm font-semibold tracking-tight text-white group-hover:text-white/80">
                        {title}
                    </h3>
                </div>
            </motion.div>
        </Link>
    );
}
