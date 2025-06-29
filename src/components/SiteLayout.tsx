
import React from 'react';
import { useSite } from '@/hooks/useSite';
import { Loader2 } from 'lucide-react';

interface SiteLayoutProps {
  children: React.ReactNode;
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  const { currentSite, loading, error } = useSite();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !currentSite) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Site Not Found</h1>
          <p className="text-gray-600">{error || 'The requested site could not be found.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ '--primary-color': currentSite.primaryColor || '#004225' } as React.CSSProperties}>
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {currentSite.logo && (
                <img src={currentSite.logo} alt={currentSite.name} className="h-10 w-auto" />
              )}
              <h1 className="text-2xl font-bold" style={{ color: currentSite.primaryColor || '#004225' }}>
                {currentSite.name}
              </h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href={`/${currentSite.slug}`} className="text-gray-700 hover:text-gray-900">Home</a>
              <a href={`/${currentSite.slug}/packages`} className="text-gray-700 hover:text-gray-900">Packages</a>
              <a href={`/${currentSite.slug}/blog`} className="text-gray-700 hover:text-gray-900">Blog</a>
              <a href={`/${currentSite.slug}/courses`} className="text-gray-700 hover:text-gray-900">Courses</a>
              <a href={`/${currentSite.slug}/events`} className="text-gray-700 hover:text-gray-900">Events</a>
              <a href={`/${currentSite.slug}/about`} className="text-gray-700 hover:text-gray-900">About</a>
              <a href={`/${currentSite.slug}/contact`} className="text-gray-700 hover:text-gray-900">Contact</a>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 {currentSite.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
