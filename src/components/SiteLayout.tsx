
import React from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '@/hooks/useSite';
import { useTheme } from '@/hooks/useTheme';
import { Loader2 } from 'lucide-react';

interface SiteLayoutProps {
  children: React.ReactNode;
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  const { currentSite, loading, error } = useSite();
  const { currentTheme } = useTheme();

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

  if (!currentTheme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const themeClasses = {
    background: currentTheme.backgroundColor,
    color: currentTheme.textColor,
    fontFamily: currentTheme.fontFamily === 'Playfair Display' ? 'font-serif' : 'font-sans'
  };

  return (
    <div 
      className={`min-h-screen flex flex-col ${themeClasses.fontFamily}`} 
      style={{ 
        backgroundColor: currentTheme.backgroundColor,
        color: currentTheme.textColor
      }}
    >
      <header 
        className="shadow-sm border-b"
        style={{ 
          backgroundColor: currentTheme.cardColor,
          borderColor: currentTheme.borderColor
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {currentSite.logo && (
                <img src={currentSite.logo} alt={currentSite.name} className="h-10 w-auto" />
              )}
              <h1 
                className="text-2xl font-bold" 
                style={{ color: currentTheme.primaryColor }}
              >
                {currentSite.name}
              </h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link 
                to={`/${currentSite.slug}`} 
                className="hover:opacity-80 transition-opacity"
                style={{ color: currentTheme.textColor }}
              >
                Home
              </Link>
              <Link 
                to={`/${currentSite.slug}/packages`} 
                className="hover:opacity-80 transition-opacity"
                style={{ color: currentTheme.textColor }}
              >
                Packages
              </Link>
              <Link 
                to={`/${currentSite.slug}/blog`} 
                className="hover:opacity-80 transition-opacity"
                style={{ color: currentTheme.textColor }}
              >
                Blog
              </Link>
              <Link 
                to={`/${currentSite.slug}/courses`} 
                className="hover:opacity-80 transition-opacity"
                style={{ color: currentTheme.textColor }}
              >
                Courses
              </Link>
              <Link 
                to={`/${currentSite.slug}/events`} 
                className="hover:opacity-80 transition-opacity"
                style={{ color: currentTheme.textColor }}
              >
                Events
              </Link>
              <Link 
                to={`/${currentSite.slug}/about`} 
                className="hover:opacity-80 transition-opacity"
                style={{ color: currentTheme.textColor }}
              >
                About
              </Link>
              <Link 
                to={`/${currentSite.slug}/contact`} 
                className="hover:opacity-80 transition-opacity"
                style={{ color: currentTheme.textColor }}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer 
        className="text-white py-8"
        style={{ 
          background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${currentTheme.gradientTo})`
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 {currentSite.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
