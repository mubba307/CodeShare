import React from 'react';
import Link from 'next/link';

const SnippetCard = ({ snippet }) => {
  return (
    <div className="group relative rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 focus-within:ring-1 ring-blue-500/20">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight mb-1">{snippet.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 break-words">{snippet.description}</p>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 px-2.5 py-1 rounded-full border border-blue-200/60 dark:border-blue-700/50">
          {snippet.language}
        </span>
        <Link
          href={`/view/${snippet.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-white transition-colors"
        >
          <span>View</span>
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </div>
  );
};

export default SnippetCard;
