
import React from 'react';
import { useSite } from '@/hooks/useSite';

const SiteEvents = () => {
  const { currentSite } = useSite();

  if (!currentSite) return null;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Events
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our upcoming events, workshops, and community gatherings.
          </p>
        </div>

        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No events scheduled yet.</p>
          <p className="text-gray-400 mt-2">We'll announce exciting events soon!</p>
        </div>
      </div>
    </div>
  );
};

export default SiteEvents;
