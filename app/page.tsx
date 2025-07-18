import Image from "next/image";

export default function Home() {
  // Get the current URL dynamically
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const curlCommand = `curl -A "GPTbot" ${baseUrl}/`;
  
  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-8 py-16">
        <main className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    {/* Contentstack Logo */}
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

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-8">
            This is Contentstack Launch Edge Function Example
          </h1>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-purple-100">
            <h3 className="text-2xl font-semibold text-purple-800 mb-4">
              What are Edge Functions?
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Edge Functions are serverless functions that run at the edge of Contentstack&apos;s global network, 
              closest to your users. They allow you to modify requests and responses, implement custom logic, 
              and enhance your applications with real-time processing capabilities.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-purple-50 rounded-lg p-6">
                <h4 className="text-purple-800 font-semibold mb-3">Key Features</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Modify requests and responses</li>
                  <li>• Implement custom authentication</li>
                  <li>• A/B testing and personalization</li>
                  <li>• Real-time content transformation</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6">
                <h4 className="text-purple-800 font-semibold mb-3">Benefits</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Global edge deployment</li>
                  <li>• Low latency performance</li>
                  <li>• Serverless architecture</li>
                  <li>• Easy integration with Contentstack</li>
                </ul>
              </div>
            </div>
          </div>

          {/* AI Crawlers Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-purple-100">
            <h3 className="text-2xl font-semibold text-purple-800 mb-4">
              AI Crawler Protection & Control
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              With Edge Functions, you can implement intelligent AI crawler detection and control mechanisms. 
              This allows you to manage how AI models access your content, ensuring proper attribution, 
              controlling scraping rates, and protecting your intellectual property.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-purple-50 rounded-lg p-6">
                <h4 className="text-purple-800 font-semibold mb-3">AI Crawler Management</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Detect and identify AI crawlers</li>
                  <li>• Control access and rate limiting</li>
                  <li>• Implement attribution requirements</li>
                  <li>• Custom response handling</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6">
                <h4 className="text-purple-800 font-semibold mb-3">Use Cases</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Content protection strategies</li>
                  <li>• Ethical AI training data</li>
                  <li>• Brand safety and control</li>
                  <li>• Compliance with AI policies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Test Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-purple-100">
            <h3 className="text-2xl font-semibold text-purple-800 mb-4">
              Test Your Edge Function
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Use the curl command below to test how your Edge Function responds to different user agents. 
              Try different user agents to see how the function behaves.
            </p>
            
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
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="text-purple-800 font-semibold mb-2">GPTbot</h4>
                <code className="text-sm text-gray-700">GPTbot</code>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="text-purple-800 font-semibold mb-2">ChatGPT</h4>
                <code className="text-sm text-gray-700">ChatGPT-User</code>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="text-purple-800 font-semibold mb-2">Claude</h4>
                <code className="text-sm text-gray-700">anthropic-ai</code>
              </div>
            </div>
          </div>

          {/* Learn More Button */}
          <a
            href="https://www.contentstack.com/docs/developers/launch/edge-functions"
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
