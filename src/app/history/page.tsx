import React from "react";
import Section from "@/components/Section";

export default function HistoryPage() {
    return (
        <div className="flex flex-col gap-12 py-8 animate-fade-in">
            <Section title="History" subtitle="Everything you've watched on SupliXer">
                <div className="flex flex-col items-center justify-center py-20 text-white/20">
                    <p className="text-sm font-bold uppercase tracking-widest text-center">
                        Development in progress...<br /> soon you'll see your history here.
                    </p>
                </div>
            </Section>
        </div>
    );
}
