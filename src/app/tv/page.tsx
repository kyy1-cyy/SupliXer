import { tmdb } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import { Movie } from "@/types";

interface Props {
    searchParams: Promise<{ page?: string }>;
}

export default async function TVShowsPage({ searchParams }: Props) {
    const { page = "1" } = await searchParams;
    const data = await tmdb.getPopular("tv", page);
    const results: Movie[] = data.results;

    return (
        <div className="flex flex-col gap-12 animate-fade-in py-8">
            <section className="flex flex-col gap-8">
                <div className="flex items-end justify-between border-b border-white/10 pb-4">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter uppercase">TV Shows</h1>
                        <p className="text-xs text-white/40 font-black tracking-[0.2em] uppercase">Top Trending Series</p>
                    </div>
                </div>

                <div className="movie-grid">
                    {results.map((item) => (
                        <MovieCard
                            key={item.id}
                            movie={{ ...item, media_type: "tv" }}
                        />
                    ))}
                </div>

                <Pagination currentPage={parseInt(page)} baseUrl="/tv" />
            </section>
        </div>
    );
}
