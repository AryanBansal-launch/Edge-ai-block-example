import Image from "next/image";

export default function Home() {
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
