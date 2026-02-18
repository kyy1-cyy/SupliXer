import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#000000",
                foreground: "#ffffff",
                card: {
                    DEFAULT: "#000000",
                    foreground: "#ffffff",
                    border: "rgba(255, 255, 255, 0.1)",
                    hover: "rgba(255, 255, 255, 0.2)",
                },
                primary: {
                    DEFAULT: "#ffffff",
                    foreground: "#000000",
                },
                muted: {
                    DEFAULT: "#1a1a1a",
                    foreground: "rgba(255, 255, 255, 0.5)",
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-out",
                "slide-up": "slideUp 0.5s ease-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
