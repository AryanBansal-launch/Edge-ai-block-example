# Edge AI Block Example

A Next.js application demonstrating how to use Edge Functions to block AI crawlers and bots while allowing legitimate traffic to pass through.

## 🚀 Features

- **AI Crawler Detection**: Automatically detects and blocks known AI training bots
- **Edge Function Protection**: Runs at the edge for maximum performance and security
- **Configurable Bot List**: Easy to add or remove bots from the blocklist
- **Real-time Logging**: Detailed logs for monitoring blocked requests
- **Modern UI**: Beautiful demonstration page with testing interface

## 🛡️ Protected Against

The Edge Function blocks the following bots and crawlers:

- **AI Training Bots**: `claudebot`, `gptbot`
- **Search Engines**: `googlebot`, `bingbot`, `yandexbot`
- **SEO Tools**: `ahrefsbot`, `semrushbot`, `mj12bot`
- **Social Media**: `facebookexternalhit`, `twitterbot`

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Client Request│───▶│  Edge Function   │───▶│  Your App/API   │
│                 │    │  (Bot Detection) │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │  403 Forbidden   │
                       │  (If Bot Found)  │
                       └──────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd edge-ai-block-example
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### Test Bot Blocking

Use curl to test different user agents:

```bash
# Test AI crawler (should be blocked)
curl -A "gptbot" http://localhost:3000/

# Test regular browser (should pass through)
curl -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" http://localhost:3000/

# Test other bots
curl -A "claudebot" http://localhost:3000/
curl -A "googlebot" http://localhost:3000/
curl -A "facebookexternalhit" http://localhost:3000/
```

### Expected Results

- **Blocked Bots**: Return `403 Forbidden` with message "Forbidden: AI crawlers are not allowed."
- **Legitimate Traffic**: Pass through to your application normally

## 🔧 Configuration

### Adding/Removing Bots

Edit the `KNOWN_BOTS` array in `functions/[proxy].edge.js`:

```javascript
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
  // Add more bots here
];
```

### Customizing Response

Modify the response in the Edge Function:

```javascript
if (isBot) {
  console.warn(`:no_entry: Blocked bot: UA="${userAgent}"`);
  return new Response('Custom message here', { status: 403 });
}
```

## 📁 Project Structure

```
edge-ai-block-example/
├── functions/
│   └── [proxy].edge.js    # Edge Function for bot detection
├── app/
│   ├── page.tsx           # Main demonstration page
│   └── forbidden/
│       └── page.tsx       # 403 error page
├── public/
│   └── robots.txt         # Sample robots.txt file
└── README.md
```

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect the Edge Function
   - Deploy with zero configuration

### Environment Variables

No environment variables required for basic functionality.

## 📊 Monitoring

### View Logs

Check your deployment logs to see blocked requests:

```
:no_entry: Blocked bot: UA="gptbot"
:no_entry: Blocked bot: UA="claudebot"
```

### Analytics

The Edge Function logs all blocked requests, making it easy to:
- Monitor bot activity
- Identify new bot patterns
- Track protection effectiveness

## 🔒 Security Features

- **Edge-level Protection**: Blocks bots before they reach your application
- **Performance Optimized**: Minimal latency impact
- **Configurable**: Easy to customize for your needs
- **Reliable**: Fallback mechanisms ensure continuous protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/edge-ai-block-example/issues)
- **Documentation**: [Next.js Edge Functions](https://nextjs.org/docs/app/building-your-application/edge)
- **Community**: [Vercel Community](https://github.com/vercel/vercel/discussions)

---

Built with ❤️ using [Next.js](https://nextjs.org) and [Vercel Edge Functions](https://vercel.com/edge)
