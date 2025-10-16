import React from 'react';
import Link from 'next/link';

const Header = () => {
  const handleClearAll = () => {
    if (typeof window !== 'undefined' && window.confirm('Are you sure you want to clear all snippets?')) {
      localStorage.removeItem('snippets');
      window.location.reload();
    }
  };

  return (
    <header className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <Link href="/" className="flex items-center gap-3">
          <img src="/pic.png" alt="Code Exchanger icon" className="w-8 h-8 sm:w-9 sm:h-9" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Code Exchanger
          </h1>
        </Link>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={handleClearAll}
            className="inline-flex items-center rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-700 dark:bg-red-900/30 dark:text-red-200 px-3 py-2 text-sm font-medium transition-colors shadow-sm"
          >
            Clear All
          </button>
          <Link
            href="/upload"
            className="inline-flex items-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium transition-colors shadow-sm"
          >
            Upload Snippet
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
