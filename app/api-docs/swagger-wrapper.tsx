'use client';

import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

// Suppress specific React warnings for Swagger UI
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('UNSAFE_') &&
    args[0].includes('will be removed in a future version')
  ) {
    return;
  }
  originalConsoleError.apply(console, args);
};

interface SwaggerWrapperProps {
  spec: any;
}

const SwaggerWrapper: React.FC<SwaggerWrapperProps> = ({ spec }) => {
  return (
    <div className="swagger-wrapper">
      <SwaggerUI 
        spec={spec}
        docExpansion="list"
        defaultModelsExpandDepth={-1}
        filter={true}
        supportedSubmitMethods={[
          'get',
          'post',
          'put',
          'delete',
          'patch',
          'options',
          'head'
        ]}
      />
      <style jsx global>{`
        .swagger-ui {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        /* Base theme colors */
        .swagger-ui {
          --primary-color: #4F46E5;
          --secondary-color: #6366F1;
          --success-color: #22C55E;
          --warning-color: #F59E0B;
          --error-color: #EF4444;
          --dark-bg: #1F2937;
          --light-bg: #F9FAFB;
        }

        /* Header & Navigation */
        .swagger-ui .topbar {
          background-color: var(--dark-bg);
          padding: 1rem;
        }

        .swagger-ui .info {
          margin: 30px 0;
        }

        .swagger-ui .info .title {
          color: var(--dark-bg);
          font-size: 2.25rem;
          font-weight: 600;
        }

        .swagger-ui .info .title small.version-stamp {
          background-color: var(--primary-color);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
        }

        /* Operation Blocks */
        .swagger-ui .opblock {
          margin: 0 0 15px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .swagger-ui .opblock.opblock-post {
          background: rgba(73, 204, 144, 0.02);
          border-color: var(--success-color);
        }

        .swagger-ui .opblock.opblock-get {
          background: rgba(97, 175, 254, 0.02);
          border-color: var(--primary-color);
        }

        .swagger-ui .opblock.opblock-put {
          background: rgba(252, 161, 48, 0.02);
          border-color: var(--warning-color);
        }

        .swagger-ui .opblock.opblock-delete {
          background: rgba(249, 62, 62, 0.02);
          border-color: var(--error-color);
        }

        /* Operation Headers */
        .swagger-ui .opblock .opblock-summary {
          padding: 1rem;
        }

        .swagger-ui .opblock .opblock-summary-method {
          font-size: 0.875rem;
          font-weight: 600;
          min-width: 80px;
          text-align: center;
          border-radius: 4px;
        }

        /* Parameters & Responses */
        .swagger-ui .parameters-container, 
        .swagger-ui .responses-wrapper {
          background-color: var(--light-bg);
          border-radius: 6px;
          margin: 1rem 0;
        }

        .swagger-ui table.parameters {
          border-radius: 6px;
          overflow: hidden;
        }

        .swagger-ui .parameters thead tr th {
          color: #374151;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          background-color: #F3F4F6;
        }

        .swagger-ui .parameter__name {
          color: #111827;
          font-weight: 600;
        }

        .swagger-ui .parameter__type {
          color: #6B7280;
          font-size: 0.875rem;
        }

        /* Models */
        .swagger-ui section.models {
          background-color: var(--light-bg);
          border-radius: 8px;
          margin: 2rem 0;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .swagger-ui section.models h4 {
          color: #111827;
          font-size: 1.25rem;
          padding: 1rem;
        }

        /* Buttons */
        .swagger-ui .btn {
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .swagger-ui .btn.try-out__btn {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
          color: white;
        }

        .swagger-ui .btn.execute {
          background-color: var(--success-color);
          border-color: var(--success-color);
          color: white;
        }

        .swagger-ui .btn.authorize {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
          color: white;
        }

        /* Response section */
        .swagger-ui .responses-inner {
          background-color: var(--light-bg);
          padding: 1rem;
          border-radius: 6px;
        }

        .swagger-ui .response-col_status {
          color: #111827;
          font-size: 0.875rem;
        }

        /* Code blocks */
        .swagger-ui .highlight-code {
          background-color: #F3F4F6;
          border-radius: 6px;
          padding: 1rem;
        }

        /* Schema tables */
        .swagger-ui .model-box {
          background-color: var(--light-bg);
          border-radius: 6px;
          padding: 1rem;
        }

        .swagger-ui .model {
          color: #111827;
        }

        /* Markdown content */
        .swagger-ui .markdown p, 
        .swagger-ui .markdown li {
          color: #374151;
          line-height: 1.6;
        }

        /* Search box */
        .swagger-ui .operation-filter-input {
          border: 1px solid #D1D5DB;
          border-radius: 6px;
          padding: 0.5rem;
          width: 100%;
          max-width: 300px;
          margin-bottom: 1rem;
        }

        /* Scrollbars */
        .swagger-ui ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        .swagger-ui ::-webkit-scrollbar-track {
          background: #F3F4F6;
          border-radius: 3px;
        }

        .swagger-ui ::-webkit-scrollbar-thumb {
          background: #D1D5DB;
          border-radius: 3px;
        }

        .swagger-ui ::-webkit-scrollbar-thumb:hover {
          background: #9CA3AF;
        }

        /* Authentication section */
        .swagger-ui .auth-wrapper {
          display: flex;
          justify-content: flex-end;
          padding: 1rem;
          background-color: var(--light-bg);
          border-radius: 8px;
          margin-bottom: 2rem;
        }

        .swagger-ui .auth-container {
          padding: 1rem;
          background-color: white;
          border-radius: 6px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        /* Schema description */
        .swagger-ui .property-description {
          color: #6B7280;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }

        /* Required fields */
        .swagger-ui .required {
          color: var(--error-color);
          font-weight: 600;
        }

        /* Example values */
        .swagger-ui .example {
          color: #6B7280;
          font-size: 0.875rem;
          font-family: monospace;
        }
      `}</style>
    </div>
  );
};

export default SwaggerWrapper;
