import React from "react";
import Section from "@/components/Section";

export default function WatchlistPage() {
    return (
        <div className="flex flex-col gap-12 py-8 animate-fade-in">
            <Section title="Watchlist" subtitle="Movies and series you've saved for later">
                <div className="flex flex-col items-center justify-center py-20 text-white/20">
                    <p className="text-sm font-bold uppercase tracking-widest text-center">
                        Your watchlist is currently empty.<br /> Add titles to see them here.
                    </p>
                </div>
            </Section>
        </div>
    );
}
