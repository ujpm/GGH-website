export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle API requests
    if (url.pathname.startsWith('/api/')) {
      const apiUrl = new URL(url.pathname, 'https://backendggh.vercel.app');
      return fetch(apiUrl, request);
    }

    // Public routes - always accessible
    const publicRoutes = ['/grants', '/scholarships', '/resources'];
    if (publicRoutes.some(route => url.pathname.startsWith(route))) {
      const response = await env.ASSETS.fetch(request);
      const headers = new Headers(response.headers);
      headers.set('Cache-Control', 'public, max-age=3600');
      headers.set('Access-Control-Allow-Origin', '*');
      return new Response(response.body, {
        ...response,
        headers
      });
    }

    // Admin routes - still accessible but protected by frontend auth
    if (url.pathname.startsWith('/dashboard')) {
      const response = await env.ASSETS.fetch(request);
      const headers = new Headers(response.headers);
      headers.set('Cache-Control', 'no-store');
      return new Response(response.body, {
        ...response,
        headers
      });
    }

    // Default handling for all other routes
    return env.ASSETS.fetch(request);
  }
}
