"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Film, Tv, Sparkles, Star, Clock, Heart } from "lucide-react";
import SearchInput from "./SearchInput";
import { cn } from "@/lib/utils";

const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Film, label: "Movies", href: "/movie" },
    { icon: Tv, label: "TV Shows", href: "/tv" },
    { icon: Sparkles, label: "Anime", href: "/anime" },
    { icon: Star, label: "Top Rated", href: "/top-rated" },
    { icon: Clock, label: "History", href: "/history" },
    { icon: Heart, label: "Watchlist", href: "/watchlist" },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <nav className="glass-nav flex items-center gap-4 px-4 py-3 lg:px-8 lg:py-4 -mx-4 lg:-mx-8 mb-6 h-16 sticky top-0 z-50">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 text-white/70 hover:text-white"
            >
                <Menu className="h-6 w-6" />
            </button>

            {/* Mobile Drawer */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[60] lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Sidebar Content */}
                    <div className="absolute left-0 top-0 bottom-0 w-[240px] bg-black border-r border-white/10 p-6 flex flex-col gap-8 animate-slide-in-left">
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-black tracking-tighter">SUPLI<span className="text-white/40">XER</span></span>
                            <button onClick={() => setIsMenuOpen(false)}>
                                <X className="h-6 w-6 text-white/50 hover:text-white" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-md transition-all",
                                        pathname === item.href
                                            ? "bg-white text-black"
                                            : "text-white/40 hover:bg-white/10 hover:text-white"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex-1 max-w-2xl">
                <Suspense fallback={<div className="h-10 w-full bg-white/5 animate-pulse" />}>
                    <SearchInput />
                </Suspense>
            </div>
        </nav>
    );
}
