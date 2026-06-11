export default {
  async fetch(request) {
    const url = new URL(request.url);
    // 只允许转发到 GitHub API
    const target = 'https://api.github.com' + url.pathname;

    const headers = new Headers(request.headers);
    headers.set('Host', 'api.github.com');

    const resp = await fetch(target, {
      method: request.method,
      headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.text() : undefined,
    });

    // CORS
    const out = new Response(resp.body, resp);
    out.headers.set('Access-Control-Allow-Origin', '*');
    out.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    out.headers.set('Access-Control-Allow-Headers', '*');
    return out;
  }
};
