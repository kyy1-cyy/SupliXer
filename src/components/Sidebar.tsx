"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Film, Tv, Search, Clock, Heart, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Film, label: "Movies", href: "/movie" },
    { icon: Tv, label: "TV Shows", href: "/tv" },
    { icon: Sparkles, label: "Anime", href: "/anime" },
    { icon: Star, label: "Top Rated", href: "/top-rated" },
];

const secondaryItems = [
    { icon: Clock, label: "History", href: "/history" },
    { icon: Heart, label: "Watchlist", href: "/watchlist" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-64 flex-col border-r border-white/10 bg-black pt-8 px-4 max-lg:hidden">
            <div className="mb-10 px-4">
                <Link href="/" className="text-2xl font-bold tracking-tighter">
                    Supli<span className="text-white/40">Xer</span>
                </Link>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">
                        Menu
                    </p>
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 rounded-none px-4 py-2.5 text-sm font-bold transition-all duration-200",
                                pathname === item.href
                                    ? "bg-white/10 text-white border-l-2 border-white"
                                    : "text-white/40 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon className={cn("h-4 w-4", pathname === item.href ? "text-white" : "group-hover:text-white")} />
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
