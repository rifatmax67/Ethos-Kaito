import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

Deno.serve(async (req) => {
  const url = new URL(req.url);

  if (url.pathname === "/api/leaderboard") {
    const apiUrl =
      "https://hub.kaito.ai/api/v1/gateway/ai/kol/mindshare/top-leaderboard?duration=7d&topic_id=ETHOSNETWORK&top_n=100&customized_community=customized&community_yaps=true";

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response("Failed to fetch leaderboard", { status: 500 });
    }
  }

  // serve static files
  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
  });
});
