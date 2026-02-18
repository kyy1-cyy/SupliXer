"use client";

import { motion } from "framer-motion";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SectionProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export default function Section({ title, subtitle, children }: SectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-8 py-8"
        >
            <div className="flex items-end justify-between border-b border-white/10 pb-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tighter uppercase">{title}</h2>
                    {subtitle && (
                        <p className="text-xs text-white/40 font-black tracking-[0.2em] uppercase mt-1">
                            {subtitle}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-2 mb-1">
                    <button
                        onClick={() => scroll("left")}
                        className="group flex h-10 w-10 items-center justify-center border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black cursor-pointer active:scale-95"
                        aria-label="Scroll Left"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="group flex h-10 w-10 items-center justify-center border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black cursor-pointer active:scale-95"
                        aria-label="Scroll Right"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth px-1"
            >
                <div className="flex gap-6 min-w-full pb-4">
                    {React.Children.map(children, (child) => (
                        <div className="min-w-[180px] sm:min-w-[220px] lg:min-w-[260px] flex-shrink-0 transition-transform duration-300 hover:z-10">
                            {child}
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
