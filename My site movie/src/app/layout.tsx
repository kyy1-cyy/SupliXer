import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

import AntiDevTools from "@/components/AntiDevTools";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SupliXer - Premium Streaming",
    description: "Experience high-quality entertainment on SupliXer. Stream your favorite movies, TV shows, and anime with zero interruptions.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
            <body className={`${inter.className} bg-black text-white antialiased selection:bg-white selection:text-black custom-scrollbar`}>
                <AntiDevTools />
                <div className="flex min-h-screen">
                    <Sidebar />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto px-4 lg:px-8">
                        <Navbar />
                        <div className="pb-12">
                            {children}
                        </div>
                    </main>
                </div>
            </body>
        </html>
    );
}
