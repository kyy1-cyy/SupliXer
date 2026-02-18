import Image from "next/image";
import { Star, Clock, Calendar, Users } from "lucide-react";
import { tmdb } from "@/lib/tmdb";
import Player from "@/components/Player";
import MovieCard from "@/components/MovieCard";
import { MovieDetails } from "@/types";

import EpisodeSelector from "@/components/EpisodeSelector";

// @ts-expect-error - Next.js 15 params type workaround
interface Props {
    params: Promise<{ type: "movie" | "tv"; id: string }>;
    searchParams: Promise<{ season?: string; episode?: string }>;
}

export default async function WatchPage({ params, searchParams }: Props) {
    const { type, id } = await params;
    const { season = "1", episode = "1" } = await searchParams;

    const movie: MovieDetails & { number_of_seasons?: number } = await tmdb.getDetails(type, id);

    const title = movie.title || movie.name;
    const banner = movie.backdrop_path || movie.poster_path;
    const rating = movie.vote_average.toFixed(1);
    const year = new Date(movie.release_date || movie.first_air_date || "").getFullYear();
    const cast = movie.credits.cast.slice(0, 5);

    return (
        <div className="flex flex-col gap-12 animate-fade-in">
            {/* Hero Section with Backdrop */}
            <div className="relative -mx-4 -mt-6 aspect-[21/9] w-[calc(100%+2rem)] overflow-hidden lg:-mx-8 lg:w-[calc(100%+4rem)]">
                <Image
                    src={`https://image.tmdb.org/t/p/original${banner}`}
                    alt={title || "Background"}
                    fill
                    className="object-cover opacity-30 grayscale-[0.5]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-8 left-4 flex flex-col gap-4 lg:left-8">
                    <h1 className="text-5xl font-black tracking-tighter uppercase sm:text-6xl lg:text-7xl">
                        {title}
                    </h1>
                    <div className="flex items-center gap-6 text-sm font-bold uppercase tracking-widest text-white/60">
                        <div className="flex items-center gap-1.5">
                            <Star className="h-4 w-4 fill-white text-white" />
                            <span className="text-white">{rating}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            <span>{year}</span>
                        </div>
                        {movie.runtime && (
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4" />
                                <span>{movie.runtime} Min</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                {/* Left Aspect: The Player */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <Player
                        id={id}
                        type={type}
                        season={season}
                        episode={episode}
                        title={title}
                        poster_path={movie.poster_path}
                        genre_ids={movie.genres.map(g => g.id)}
                        duration={movie.runtime}
                    />

                    {type === "tv" && movie.seasons && (
                        <EpisodeSelector
                            id={id}
                            seasons={movie.seasons}
                            currentSeason={season}
                            currentEpisode={episode}
                        />
                    )}

                    <div className="flex flex-col gap-4">
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white/30">Overview</h2>
                        <p className="text-lg leading-relaxed text-white/80 max-w-3xl">
                            {movie.overview}
                        </p>
                    </div>
                </div>

                {/* Right Aspect: Meta Info */}
                <div className="flex flex-col gap-10">
                    {/* Cast */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white/30 flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Leading Cast
                        </h2>
                        <div className="flex flex-col gap-4">
                            {cast.map((person) => (
                                <div key={person.id} className="flex items-center gap-4 group">
                                    <div className="relative h-12 w-12 overflow-hidden border border-white/10 grayscale transition-all group-hover:grayscale-0">
                                        <Image
                                            src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : "/placeholder-user.png"}
                                            alt={person.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold tracking-tight">{person.name}</span>
                                        <span className="text-[10px] uppercase tracking-widest text-white/40">{person.character}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Genres */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white/30">Genres</h2>
                        <div className="flex flex-wrap gap-2">
                            {movie.genres.map(genre => (
                                <span key={genre.id} className="border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-default">
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommendations */}
            <section className="mt-12 flex flex-col gap-8 border-t border-white/10 pt-12">
                <h2 className="text-2xl font-black tracking-tighter uppercase">More Like This</h2>
                <div className="movie-grid">
                    {movie.recommendations.results.slice(0, 6).map((rec) => (
                        <MovieCard key={rec.id} movie={{ ...rec, media_type: type }} />
                    ))}
                </div>
            </section>
        </div>
    );
}
