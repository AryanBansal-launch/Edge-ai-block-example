'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-8">
        <div className="mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-red-600 text-3xl font-bold">!</span>
          </div>
          <h1 className="text-4xl font-bold text-purple-900 mb-4">
            Something went wrong!
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            An unexpected error occurred. Please try again or contact support if the problem persists.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-purple-100">
          <h2 className="text-xl font-semibold text-purple-800 mb-4">
            Error Details:
          </h2>
          <div className="text-gray-700 text-sm bg-gray-50 p-4 rounded-lg">
            <p className="font-mono break-all">{error.message}</p>
            {error.digest && (
              <p className="mt-2 text-xs text-gray-500">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl mr-4"
          >
            Try Again
          </button>
          
          <Link
            href="/"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
} 