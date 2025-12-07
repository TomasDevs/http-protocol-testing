export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Try to get the static asset
    let response = await env.ASSETS.fetch(request);

    // If not found (404) and it's a navigation request, serve index.html
    if (response.status === 404 && request.headers.get('Accept')?.includes('text/html')) {
      response = await env.ASSETS.fetch(new URL('/index.html', url.origin));
    }

    return response;
  },
};
