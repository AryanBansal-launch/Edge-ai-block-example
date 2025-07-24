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

// Cache for bot list with TTL
let botListCache = {
  bots: [],
  timestamp: 0,
  ttl: 60 * 60 * 1000 // 1 hour in milliseconds
};

// Default bot list as fallback
const DEFAULT_BOTS = [
  'claudebot',
  'googlebot',
  'bingbot',
  'ahrefsbot',
  'yandexbot',
  'semrushbot',
  'mj12bot',
  'facebookexternalhit',
  'twitterbot',
];

async function parseRobotsTxt(robotsTxtContent) {
  const bots = new Set();
  
  // Parse robots.txt content
  const lines = robotsTxtContent.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim().toLowerCase();
    
    // Look for User-agent directives
    if (trimmedLine.startsWith('user-agent:')) {
      const userAgent = trimmedLine.replace('user-agent:', '').trim();
      if (userAgent && userAgent !== '*') {
        bots.add(userAgent);
      }
    }
    
    // Also look for Disallow directives that might indicate bots
    if (trimmedLine.startsWith('disallow:') && trimmedLine.includes('bot')) {
      // Extract bot names from disallow paths
      const disallowPath = trimmedLine.replace('disallow:', '').trim();
      const botMatches = disallowPath.match(/\/([^\/]+bot)/gi);
      if (botMatches) {
        botMatches.forEach(match => {
          const botName = match.replace('/', '').replace('/', '');
          if (botName) bots.add(botName);
        });
      }
    }
  }
  
  return Array.from(bots);
}

async function fetchRobotsTxt(baseUrl) {
  try {
    // Try to fetch robots.txt from the same domain
    const robotsUrl = new URL('/robots.txt', baseUrl).href;
    console.log('Attempting to fetch robots.txt from:', robotsUrl);
    
    const response = await fetch(robotsUrl, {
      headers: {
        'User-Agent': 'Edge-Function-Bot-Detector/1.0'
      }
    });
    
    console.log('Robots.txt response status:', response.status);
    console.log('Robots.txt response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      throw new Error(`Robots.txt not found: ${response.status}`);
    }
    
    const robotsTxtContent = await response.text();
    console.log('Robots.txt content length:', robotsTxtContent.length);
    console.log('Robots.txt content preview:', robotsTxtContent.substring(0, 200));
    
    const bots = await parseRobotsTxt(robotsTxtContent);
    
    // If we found bots in robots.txt, use them
    if (bots.length > 0) {
      console.log(`Found ${bots.length} bots in robots.txt:`, bots);
      return bots;
    }
    
    // If robots.txt exists but no bots found, return empty array
    console.log('Robots.txt found but no bot patterns detected');
    return [];
    
  } catch (error) {
    console.warn('Failed to fetch or parse robots.txt:', error.message);
    console.warn('Full error:', error);
    return null; // Indicates robots.txt not available
  }
}

async function getBotList(request) {
  const now = Date.now();
  
  // Check if cache is still valid
  if (botListCache.timestamp + botListCache.ttl > now && botListCache.bots.length > 0) {
    return botListCache.bots;
  }
  
  // Get the base URL from the request
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  console.log('Request URL:', request.url);
  console.log('Base URL for robots.txt:', baseUrl);
  
  // Try to fetch bots from robots.txt
  const robotsBots = await fetchRobotsTxt(baseUrl);
  
  let finalBotList;
  
  if (robotsBots === null) {
    // robots.txt not available, use default list
    console.log('Using default bot list (robots.txt not available)');
    finalBotList = DEFAULT_BOTS;
  } else if (robotsBots.length === 0) {
    // robots.txt available but no bots specified, use default list
    console.log('Using default bot list (robots.txt has no bot patterns)');
    finalBotList = DEFAULT_BOTS;
  } else {
    // Use bots from robots.txt
    console.log('Using bot list from robots.txt');
    finalBotList = robotsBots;
  }
  
  // Update cache
  botListCache = {
    bots: finalBotList,
    timestamp: now,
    ttl: botListCache.ttl
  };
  
  return finalBotList;
}

export default async function handler(request) {
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
  
  // Get the current bot list (from robots.txt or default)
  const knownBots = await getBotList(request);
  
  const isBot = knownBots.some(bot => userAgent.includes(bot.toLowerCase()));
  
  if (isBot) {
    console.warn(`:no_entry: Blocked bot: UA="${userAgent}"`);
    return new Response('Forbidden: AI crawlers are not allowed.', { status: 403 });
  }
  
  return fetch(request);
}

