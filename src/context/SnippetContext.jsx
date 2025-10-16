'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const SnippetContext = createContext();

export const useSnippets = () => {
  const context = useContext(SnippetContext);
  if (!context) {
    throw new Error('useSnippets must be used within a SnippetProvider');
  }
  return context;
};

export const SnippetProvider = ({ children }) => {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem('snippets');
    if (stored) {
      setSnippets(JSON.parse(stored));
    } else {
      // Start with empty array if no data
      setSnippets([]);
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever snippets change
    localStorage.setItem('snippets', JSON.stringify(snippets));
  }, [snippets]);

  const addSnippet = (snippet) => {
    const newSnippet = {
      ...snippet,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setSnippets((prev) => [newSnippet, ...prev]);
  };

  const getSnippetById = (id) => {
    return snippets.find((s) => s.id === parseInt(id));
  };

  const editSnippet = (id, updatedSnippet) => {
    setSnippets((prev) =>
      prev.map((s) => (s.id === parseInt(id) ? { ...s, ...updatedSnippet } : s))
    );
  };

  return (
    <SnippetContext.Provider value={{ snippets, addSnippet, getSnippetById, editSnippet }}>
      {children}
    </SnippetContext.Provider>
  );
};
