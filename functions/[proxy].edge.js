// const KNOWN_BOTS = [
//     'claudebot',
//     'gptbot',
//     'googlebot',
//     'bingbot',
//     'ahrefsbot',
//     'yandexbot',
//     'semrushbot',
//     'mj12bot',
//     'facebookexternalhit',
//     'twitterbot',
//   ];
  
//   export default function handler(request) {
//     const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
  
//     const isBot = KNOWN_BOTS.some(bot => userAgent.includes(bot));
  
//     if (isBot) {
//       console.warn(`:no_entry: Blocked bot: UA="${userAgent}"`);
//       return new Response('Forbidden: AI crawlers are not allowed.', { status: 403 });
//     }
  
//     return fetch(request);
//   }

export default async function handler(request, context) {
    const redirectHosts = [
      'https://nextjs-launch-challenge-eee898.devcontentstackapps.com',
      'https://nextjs-app-router-csr.devcontentstackapps.com/'
    ];
  
    const url = new URL(request.url);
  
    if (redirectHosts.includes(url.hostname)) {
      url.hostname = 'https://consent-test.devcontentstackapps.com/';
      return Response.redirect(url.toString(), 308); // permanent redirect
    }
  
    // Continue with normal request
    return fetch(request);
  }