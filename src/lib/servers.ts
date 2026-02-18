export type Server = {
    id: string;
    name: string;
    movie: string;
    tv: string;
};

export const SERVERS: Server[] = [
    {
        id: "streamx",
        name: "Server 1 (Primary)",
        movie: "https://embed.wplay.me/embed/movie/{id}",
        tv: "https://embed.wplay.me/embed/tv/{id}/{season}/{episode}",
    },
    {
        id: "vidcc",
        name: "Server 2",
        movie: "https://vidsrc.cc/v2/embed/movie/{id}",
        tv: "https://vidsrc.cc/v2/embed/tv/{id}/{season}/{episode}",
    },
    {
        id: "vidpro",
        name: "Server 3",
        movie: "https://vidsrc.pro/v2/embed/movie/{id}",
        tv: "https://vidsrc.pro/v2/embed/tv/{id}/{season}/{episode}",
    },
    {
        id: "rive",
        name: "Server 4 (Rive)",
        movie: "https://rive.stream/embed/movie/{id}",
        tv: "https://rive.stream/embed/tv/{id}/{season}/{episode}",
    },
    {
        id: "embedcc",
        name: "Server 5",
        movie: "https://embed.cc/embed/movie/{id}",
        tv: "https://embed.cc/embed/tv/{id}/{season}/{episode}",
    },
];

export function getPlayerUrl(
    serverId: string,
    type: "movie" | "tv",
    params: { id: string; season?: string; episode?: string }
) {
    const server = SERVERS.find((s) => s.id === serverId) || SERVERS[0];
    let url = type === "movie" ? server.movie : server.tv;

    url = url.replace("{id}", params.id);
    if (type === "tv") {
        url = url.replace("{season}", params.season || "1");
        url = url.replace("{episode}", params.episode || "1");
    }

    return url;
}
