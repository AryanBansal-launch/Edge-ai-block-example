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


export default async function handler(request) {
    const redirectHosts = [
      'www1.csnonprod.com',
      'www2.csnonprod.com',
      'www3.csnonprod.com',
      'www4.csnonprod.com',
    ];
  
    const url = new URL(request.url);
  
    if (redirectHosts.includes(url.hostname)) {
      url.hostname = 'www.csnonprod.com';
      return Response.redirect(url.toString(), 308);
    }
  
    return fetch(request);
  }