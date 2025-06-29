
import React from 'react';
import { useSite } from '@/hooks/useSite';

const SiteCourses = () => {
  const { currentSite } = useSite();

  if (!currentSite) return null;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Courses
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enhance your travel knowledge with our educational courses and training programs.
          </p>
        </div>

        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No courses available yet.</p>
          <p className="text-gray-400 mt-2">Coming soon - stay tuned!</p>
        </div>
      </div>
    </div>
  );
};

export default SiteCourses;
