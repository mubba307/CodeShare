'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSnippets } from '@/context/SnippetContext';
import SnippetCard from './SnippetCard';
import Header from './Header';

const Home = () => {
  const { snippets } = useSnippets();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  
  const handleDeleteSnippet = (id) => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      const updatedSnippets = snippets.filter((s) => s.id !== id);
      localStorage.setItem('snippets', JSON.stringify(updatedSnippets));
      window.location.reload();
    }
  };

  const handleEditSnippet = (id) => {
    window.location.href = `/upload?edit=${id}`;
  };

  // Filter snippets based on search term and selected language
  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguage === '' || snippet.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  // Get unique languages for the select dropdown
  const languages = [...new Set(snippets.map((snippet) => snippet.language))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 sm:py-10 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />

        {/* Top actions moved to Header */}

        {/* Search and Filter Section */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Search snippets..."
            aria-label="Search snippets"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sm:col-span-2 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
          <select
            value={selectedLanguage}
            aria-label="Filter by language"
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          >
            <option value="">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredSnippets.map((snippet) => (
            <div key={snippet.id} className="relative group">
              <SnippetCard snippet={snippet} />
              {/* Card action buttons */}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEditSnippet(snippet.id)}
                  className="inline-flex items-center rounded-md border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 px-2.5 py-1.5 text-xs font-medium shadow-sm hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSnippet(snippet.id)}
                  className="inline-flex items-center rounded-md border border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-200 px-2.5 py-1.5 text-xs font-medium shadow-sm hover:bg-red-100 dark:hover:bg-red-900/60 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty & filtered states */}
        {filteredSnippets.length === 0 && snippets.length > 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No snippets match your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLanguage('');
              }}
              className="inline-flex items-center rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm font-medium text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {snippets.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No code snippets yet.</p>
            <Link
              href="/upload"
              className="inline-flex items-center rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium transition-colors"
            >
              Be the first to upload one!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
