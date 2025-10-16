'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSnippets } from '@/context/SnippetContext';

const UploadForm = () => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const { addSnippet, editSnippet, getSnippetById } = useSnippets();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const editParam = searchParams.get('edit');
    if (editParam) {
      const snippet = getSnippetById(editParam);
      if (snippet) {
        setTitle(snippet.title);
        setCode(snippet.code);
        setLanguage(snippet.language);
        setDescription(snippet.description);
        setIsEditing(true);
        setEditId(editParam);
      }
    }
  }, [searchParams, getSnippetById]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && code) {
      if (isEditing) {
        editSnippet(editId, { title, code, language, description });
      } else {
        addSnippet({ title, code, language, description });
      }
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      {/* Title + Language (responsive grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="sm:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Debounce utility"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Short summary of what this snippet does"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Code
        </label>
        <textarea
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={12}
          placeholder="Paste your code here"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 text-sm font-medium transition-colors shadow-sm"
      >
        {isEditing ? 'Update Snippet' : 'Upload Snippet'}
      </button>
    </form>
  );
};

export default UploadForm;
