const KNOWN_BOTS = [
    'claudebot',
    'gptbot',
    'googlebot',
    'bingbot',
    'ahrefsbot',
    'yandexbot',
    'semrushbot',
    'mj12bot',
    'facebookexternalhit',
    'twitterbot',
    //more bots can be added here
  ];
  
  export default function handler(request) {
    const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
  
    const isBot = KNOWN_BOTS.some(bot => userAgent.includes(bot));
  
    if (isBot) {
      console.warn(`:no_entry: Blocked bot: UA="${userAgent}"`);return new Response('Forbidden: AI crawlers are not allowed.', { status: 403 });
    }
  
    return fetch(request);
  }
