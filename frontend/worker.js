export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);

      // Try to get the static asset
      let response = await env.ASSETS.fetch(request);

      // If not found (404) and it's a navigation request, serve index.html
      if (response.status === 404) {
        const accept = request.headers.get('Accept') || '';
        if (accept.includes('text/html')) {
          // Create a new request for index.html
          const indexRequest = new Request(new URL('/', url.origin), request);
          response = await env.ASSETS.fetch(indexRequest);
        }
      }

      return response;
    } catch (error) {
      return new Response('Error: ' + error.message, { status: 500 });
    }
  },
};
