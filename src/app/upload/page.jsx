'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import UploadForm from '@/components/UploadForm';
import Header from '@/components/Header';

const UploadPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Header />
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold">Upload Code Snippet</h1>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <Suspense fallback={<div>Loading...</div>}>
            <UploadForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
