import { tmdb } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types";
import SearchInput from "@/components/SearchInput";

interface Props {
    searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
    const { q } = await searchParams;
    let results: Movie[] = [];

    if (q) {
        const data = await tmdb.search(q);
        results = data.results.filter((m: Movie) => m.poster_path); // Filter only items with images
    }

    return (
        <div className="flex flex-col gap-10 animate-fade-in">
            <div className="flex flex-col gap-6 border-b border-white/10 pb-10">
                <h1 className="text-4xl font-black tracking-tighter uppercase sm:text-5xl">
                    {q ? `Search: ${q.toUpperCase()}` : "Search"}
                </h1>
                <SearchInput />
            </div>

            {!q ? (
                <div className="flex flex-col items-center justify-center py-40 border border-dashed border-white/10 opacity-40">
                    <p className="text-xs font-bold uppercase tracking-[0.5em]">Explore the library</p>
                </div>
            ) : results.length > 0 ? (
                <div className="movie-grid">
                    {results.map((item) => (
                        <MovieCard
                            key={item.id}
                            movie={item}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-40">
                    <p className="text-xs font-bold uppercase tracking-[0.5em] text-white/40">No results found for {q}</p>
                </div>
            )}
        </div>
    );
}
