
import React from 'react';
import { useSite } from '@/hooks/useSite';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';

const SiteBlog = () => {
  const { currentSite } = useSite();

  if (!currentSite) return null;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Travel Blog
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest travel tips, destination guides, and inspiring stories.
          </p>
        </div>

        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blog posts available yet.</p>
          <p className="text-gray-400 mt-2">Check back soon for exciting travel content!</p>
        </div>
      </div>
    </div>
  );
};

export default SiteBlog;
