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

export default function handler(request) {
  const parsedUrl = new URL(request.url);
  const route = parsedUrl.pathname;
  if (route === '/appliances') {
    const response = {
      time: new Date()
    }
    return new Response(JSON.stringify(response))
  }
  return fetch(request)
 }