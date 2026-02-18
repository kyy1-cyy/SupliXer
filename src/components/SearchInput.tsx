"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search as SearchIcon, X } from "lucide-react";

export default function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query.length > 2) {
                router.push(`/search?q=${encodeURIComponent(query)}`);
            } else if (query.length === 0) {
                // router.push("/"); // Optional: clear search if empty
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query, router]);

    return (
        <div className="relative w-full max-w-xl group">
            <div className="relative flex items-center">
                <div className="absolute left-4 border-r border-white/10 pr-3 pointer-events-none group-focus-within:border-white/40 transition-colors">
                    <SearchIcon className="h-4 w-4 text-white/30 group-focus-within:text-white transition-colors" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Movies..."
                    className="w-full bg-black border border-white/10 py-3 pl-14 pr-12 text-xs font-bold uppercase tracking-[0.2em] placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-all"
                />
                {query && (
                    <button
                        onClick={() => setQuery("")}
                        className="absolute right-4 text-white/20 hover:text-white transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
