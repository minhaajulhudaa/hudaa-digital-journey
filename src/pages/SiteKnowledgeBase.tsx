
import React from 'react';
import { useSite } from '@/hooks/useSite';

const SiteKnowledgeBase = () => {
  const { currentSite } = useSite();

  if (!currentSite) return null;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Knowledge Base
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to frequently asked questions and helpful travel information.
          </p>
        </div>

        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Knowledge base coming soon.</p>
          <p className="text-gray-400 mt-2">We're preparing helpful resources for you!</p>
        </div>
      </div>
    </div>
  );
};

export default SiteKnowledgeBase;
