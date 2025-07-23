import Image from "next/image";
import { headers } from 'next/headers';

// Constants
const FALLBACK_URL = 'http://localhost:3000';
const DEFAULT_PROTOCOL = 'http';
const TEST_USER_AGENT = 'GPTbot';

// Content data based on official sources
const CONTENT_DATA = {
  title: "Contentstack Launch Edge Functions: AI Crawler Management",
  learnMoreUrl: "https://www.contentstack.com/docs/developers/launch/edge-functions",
  testAgents: [
    { name: "GPTbot", userAgent: "GPTbot", category: "AI Crawler" },
    { name: "ChatGPT", userAgent: "ChatGPT-User", category: "AI Crawler" },
    { name: "Claude", userAgent: "anthropic-ai", category: "AI Crawler" },
    { name: "Googlebot", userAgent: "Googlebot", category: "Search Engine" },
    { name: "Bingbot", userAgent: "bingbot", category: "Search Engine" }
  ]
};

async function getBaseUrl(): Promise<string> {
  try {
    const headersList = await headers();
    const referer = headersList.get('referer');
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || DEFAULT_PROTOCOL;
    
    if (referer) {
      const url = new URL(referer);
      return `${url.protocol}//${url.host}`;
    }
    
    if (host) {
      return `${protocol}://${host}`;
    }
  } catch (error) {
    console.warn('Failed to get headers:', error);
  }
  
  return FALLBACK_URL;
}

function FeatureCard({ title, features }: { title: string; features: string[] }) {
  return (
    <div className="bg-purple-50 rounded-lg p-6">
      <h4 className="text-purple-800 font-semibold mb-3">{title}</h4>
      <ul className="text-gray-700 space-y-2">
        {features.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
      </ul>
    </div>
  );
}

function TestAgentCard({ name, userAgent, category }: { name: string; userAgent: string; category: string }) {
  return (
    <div className="bg-purple-50 rounded-lg p-4">
      <h4 className="text-purple-800 font-semibold mb-2">{name}</h4>
      <code className="text-sm text-gray-700">{userAgent}</code>
      <p className="text-xs text-gray-500 mt-1">{category}</p>
    </div>
  );
}

function ContentSection({ 
  title, 
  description, 
  children 
}: { 
  title: string; 
  description: string; 
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-purple-100">
      <h3 className="text-2xl font-semibold text-purple-800 mb-4">{title}</h3>
      <p className="text-gray-700 text-lg leading-relaxed mb-6">{description}</p>
      {children}
    </div>
  );
}

export default async function Home() {
  const baseUrl = await getBaseUrl();
  const curlCommand = `curl -A "${TEST_USER_AGENT}" ${baseUrl}/`;
  
  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-8 py-16">
        <main className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Image
              src="/Contentstack_Logo.jpg"
              alt="Contentstack Logo"
              width={180}
              height={90}
              className="mb-4 mx-auto"
              priority
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8">
            {CONTENT_DATA.title}
          </h1>

          {/* Contentstack Launch Edge Functions Section */}
          <ContentSection
            title="Contentstack Launch Edge Functions"
            description="Contentstack Launch Edge Functions are serverless functions that run at the edge of Contentstack's global network, closest to your users. They allow you to modify requests and responses, implement custom logic, and enhance your applications with real-time processing capabilities."
          >
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <FeatureCard
                title="Key Features"
                features={[
                  "Modify requests and responses",
                  "URL rewrites and redirects",
                  "Cache interaction and control",
                  "Real-time content transformation"
                ]}
              />
              <FeatureCard
                title="Benefits"
                features={[
                  "Global edge deployment",
                  "Low latency performance",
                  "Serverless architecture",
                  "Easy integration with Contentstack"
                ]}
              />
            </div>
          </ContentSection>

          {/* AI Crawler Management Section */}
          <ContentSection
            title="AI Crawler Management & Verification"
            description="With the recent changes in AI crawler landscape, including Cloudflare's new verification system and IAB Tech Lab standards, Edge Functions enable intelligent crawler detection and control mechanisms. This allows you to manage how AI models access your content while ensuring proper attribution and protecting your intellectual property."
          >
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <FeatureCard
                title="AI Crawler Management"
                features={[
                  "Detect and identify AI crawlers",
                  "Implement verification systems",
                  "Control access and rate limiting",
                  "Custom response handling"
                ]}
              />
              <FeatureCard
                title="Use Cases"
                features={[
                  "Content protection strategies",
                  "Ethical AI training data",
                  "Brand safety and control",
                  "Compliance with AI policies"
                ]}
              />
            </div>
          </ContentSection>

          {/* Our Edge Function Solution Section */}
          <ContentSection
            title="Our Edge Function Solution: AI Crawler Protection"
            description="This Edge Function implements a comprehensive AI crawler protection system that detects and blocks known AI crawlers and bots. It provides a robust solution for protecting your content from unauthorized AI training while allowing legitimate traffic to pass through."
          >
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <FeatureCard
                title="What Our Edge Function Does"
                features={[
                  "Detects AI crawlers by user agent analysis",
                  "Blocks known AI training bots (GPTbot, Claude, etc.)",
                  "Allows legitimate search engines to pass through",
                  "Returns 403 Forbidden for blocked requests"
                ]}
              />
              <FeatureCard
                title="Solution Benefits"
                features={[
                  "Protects content from AI training",
                  "Maintains SEO with search engines",
                  "Easy to deploy and configure",
                  "Real-time protection at the edge"
                ]}
              />
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 mt-6 border border-green-200">
              <h4 className="text-green-800 font-semibold mb-3">How It Works</h4>
              <div className="text-green-700 space-y-2">
                <p className="text-sm">
                  <strong>1. Request Interception:</strong> Every request to your site is intercepted by the Edge Function
                </p>
                <p className="text-sm">
                  <strong>2. User Agent Analysis:</strong> The function analyzes the User-Agent header to identify crawlers
                </p>
                <p className="text-sm">
                  <strong>3. Decision Making:</strong> Known AI crawlers are blocked, while legitimate traffic proceeds
                </p>
                <p className="text-sm">
                  <strong>4. Response:</strong> Blocked requests receive a 403 Forbidden response with custom message
                </p>
              </div>
            </div>
          </ContentSection>

          {/* IAB Tech Lab Standards Section */}
          <ContentSection
            title="IAB Tech Lab Bots & Spiders Standards"
            description="The IAB Tech Lab maintains a comprehensive list of bots and spiders, categorizing them as good bots (search engines, social media) and bad bots (scrapers, malicious crawlers). This standard helps in implementing proper bot management strategies."
          >
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <FeatureCard
                title="Good Bots (Allow)"
                features={[
                  "Search engine crawlers",
                  "Social media bots",
                  "Analytics and monitoring",
                  "Content verification bots"
                ]}
              />
              <FeatureCard
                title="Bad Bots (Block)"
                features={[
                  "Scraping bots",
                  "Malicious crawlers",
                  "Spam bots",
                  "Unauthorized AI crawlers"
                ]}
              />
            </div>
          </ContentSection>

          {/* Test Section */}
          <ContentSection
            title="Test Your Edge Function"
            description="Use the curl command below to test how your Edge Function responds to different user agents. Try different user agents to see how the function behaves with various crawler types."
          >
            <div className="bg-gray-900 rounded-lg p-6 mb-4">
              <div className="mb-2">
                <span className="text-green-400 text-sm font-mono">Terminal Command</span>
              </div>
              <code className="text-green-400 font-mono text-sm break-all">
                {curlCommand}
              </code>
              <p className="text-gray-400 text-xs mt-2">
                Select and copy the command above to test your Edge Function
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {CONTENT_DATA.testAgents.map((agent) => (
                <TestAgentCard
                  key={agent.name}
                  name={agent.name}
                  userAgent={agent.userAgent}
                  category={agent.category}
                />
              ))}
            </div>
          </ContentSection>

          {/* Learn More Button */}
          <a
            href={CONTENT_DATA.learnMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Learn More About Edge Functions
          </a>
        </main>
      </div>
    </div>
  );
}
