'use client';

import { useEffect, useState } from 'react';
import SwaggerWrapper from './swagger-wrapper';

export default function ApiDocs() {
  const [spec, setSpec] = useState<any>(null);

  useEffect(() => {
    fetch('/api/docs')
      .then(res => res.json())
      .then(data => setSpec(data))
      .catch(err => console.error('Failed to load API specs:', err));
  }, []);

  if (!spec) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-indigo-600 flex items-center">
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading API documentation...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            API Documentation
          </h1>
          <p className="text-gray-600">
            Explore and test the available API endpoints
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <SwaggerWrapper spec={spec} />
        </div>
      </div>
    </div>
  );
}
