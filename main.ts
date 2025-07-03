import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

Deno.serve(async (req) => {
  const url = new URL(req.url);
  if (url.pathname === '/api/leaderboard') {
    const apiUrl = 'https://hub.kaito.ai/api/v1/gateway/ai/kol/mindshare/top-leaderboard?duration=7d&topic_id=ETHOSNETWORK&top_n=100&customized_community=customized&community_yaps=true';
    try {
      const resp = await fetch(apiUrl);
      const json = await resp.json();
      return new Response(JSON.stringify(json), { headers: { 'Content-Type': 'application/json' } });
    } catch (e) {
      console.error(e);
      return new Response('Error', { status: 500 });
    }
  }
  return serveDir(req, { fsRoot: './public', urlRoot: '' });
});
