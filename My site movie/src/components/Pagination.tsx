"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    baseUrl: string;
}

export default function Pagination({ currentPage, baseUrl }: PaginationProps) {
    // Logic: Show 3 numbers starting from a base.
    // Base shifts when we reach the end of the current triplet.
    // Example: 1 2 3. If we click 3, base becomes 3. Triplet becomes 3 4 5.

    // We can calculate the start of the triplet based on the current page.
    // If currentPage is odd and > 1, maybe it's the start? 
    // "Clicking 3 shows 3 4 5" -> 3 is the start.
    // "Clicking 5 shows 5 6 7" -> 5 is the start.
    // It seems the current page is always the start if it was the end of the previous set.

    // Simpler: Start = currentPage if currentPage is last in previous set?
    // Let's use a windowing approach.
    const startPage = currentPage % 2 === 0 ? currentPage - 1 : currentPage;
    // Actually, if I'm on 3, and was just on 2, start was 1. 1 2 3.
    // If I click 3, I want 3 4 5.

    // Let's just use the user's explicit rule:
    // If currentPage is an "anchor" (3, 5, 7...), it starts there.
    let start = 1;
    if (currentPage >= 3) {
        start = currentPage % 2 === 0 ? currentPage - 1 : currentPage;
    }

    const pages = [start, start + 1, start + 2];

    return (
        <div className="flex items-center justify-center gap-4 py-12">
            {currentPage > 1 && (
                <Link
                    href={`${baseUrl}?page=${currentPage - 1}`}
                    className="flex h-10 w-10 items-center justify-center border border-white/10 bg-black text-white hover:bg-white hover:text-black transition-all"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Link>
            )}

            <div className="flex gap-2">
                {pages.map((p) => (
                    <Link
                        key={p}
                        href={`${baseUrl}?page=${p}`}
                        className={cn(
                            "flex h-10 w-10 items-center justify-center border text-sm font-black transition-all",
                            currentPage === p
                                ? "border-white bg-white text-black"
                                : "border-white/10 text-white/40 hover:border-white/40 hover:text-white"
                        )}
                    >
                        {p}
                    </Link>
                ))}
            </div>
        </div>
    );
}
