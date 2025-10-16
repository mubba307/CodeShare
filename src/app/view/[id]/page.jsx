'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSnippets } from '@/context/SnippetContext';

const ViewSnippetPage = () => {
  const { id } = useParams();
  const { getSnippetById } = useSnippets();
  const snippet = getSnippetById(id);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (!snippet) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 sm:py-10 md:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-white mb-4 inline-block text-sm"
          >
            ← Back to Home
          </Link>
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400">Snippet not found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 sm:py-10 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-white mb-4 inline-block text-sm"
        >
          ← Back to Home
        </Link>

        <div className="bg-white dark:bg-gray-800/90 p-5 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">{snippet.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">{snippet.description}</p>
            <span className="inline-flex items-center text-xs font-medium bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 px-2.5 py-1 rounded-full border border-blue-200/60 dark:border-blue-700/50">
              {snippet.language}
            </span>
          </div>

          <div className="bg-gray-100 dark:bg-gray-900/60 p-4 sm:p-5 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Code</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 px-2 py-1 rounded border border-blue-200/60 dark:border-blue-700/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="text-sm sm:text-[0.95rem] font-mono text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">
              {snippet.code}
            </pre>
          </div>

          <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Created: {new Date(snippet.createdAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSnippetPage;
