import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import sdk from '@/lib/sdk';

interface Site {
  id: string;
  name: string;
  slug: string;
  ownerEmail: string;
  ownerName?: string;
  description?: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  contactEmail?: string;
  contactPhone?: string;
  theme?: string;
  status: string;
  [key: string]: any;
}

interface SiteContextType {
  currentSite: Site | null;
  loading: boolean;
  error: string | null;
  getSiteBySlug: (slug: string) => Promise<Site | null>;
  createSite: (siteData: Partial<Site>) => Promise<Site>;
  updateSite: (siteId: string, updates: Partial<Site>) => Promise<Site>;
  baseUrl: string;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const useSite = () => {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};

interface SiteProviderProps {
  children: ReactNode;
}

export const SiteProvider = ({ children }: SiteProviderProps) => {
  const [currentSite, setCurrentSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState('');
  const location = useLocation();

  // Initialize base URL from window.location
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const protocol = window.location.protocol;
      const host = window.location.host;
      setBaseUrl(`${protocol}//${host}`);
      console.log('Base URL detected:', `${protocol}//${host}`);
    }
  }, []);

  // Extract site slug from URL path
  const getSiteSlugFromPath = (pathname: string): string | null => {
    try {
      const pathParts = pathname.split('/').filter(part => part);
      
      // Skip if no path parts
      if (pathParts.length === 0) return null;
      
      // Reserved routes that should not be treated as site slugs
      const reservedRoutes = [
        'admin', 'login', 'register', 'sites', 'register-site', 
        'packages', 'blog', 'courses', 'events', 'knowledge-base',
        'about', 'contact', 'booking', 'terms', 'privacy'
      ];
      
      const firstPath = pathParts[0];
      
      // If first path is reserved, it's not a site slug
      if (reservedRoutes.includes(firstPath)) {
        return null;
      }
      
      // Otherwise, treat it as a site slug
      console.log('Site slug detected from path:', firstPath);
      return firstPath;
    } catch (err) {
      console.error('Error parsing site slug from path:', err);
      return null;
    }
  };

  const getSiteBySlug = async (slug: string): Promise<Site | null> => {
    try {
      console.log('Fetching site by slug:', slug);
      const sites = await sdk.get<Site>('sites');
      const site = sites.find(site => site.slug === slug && site.status === 'active');
      console.log('Site found:', site);
      return site || null;
    } catch (err) {
      console.error('Error fetching site:', err);
      return null;
    }
  };

  const createSite = async (siteData: Partial<Site>): Promise<Site> => {
    try {
      const site = await sdk.insert<Site>('sites', {
        ...siteData,
        status: 'active',
        theme: 'default'
      });
      console.log('Site created:', site);
      return site;
    } catch (err) {
      console.error('Error creating site:', err);
      throw err;
    }
  };

  const updateSite = async (siteId: string, updates: Partial<Site>): Promise<Site> => {
    try {
      const site = await sdk.update<Site>('sites', siteId, updates);
      console.log('Site updated:', site);
      return site;
    } catch (err) {
      console.error('Error updating site:', err);
      throw err;
    }
  };

  useEffect(() => {
    const loadCurrentSite = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Current location pathname:', location.pathname);
        const siteSlug = getSiteSlugFromPath(location.pathname);
        
        if (siteSlug) {
          console.log('Loading site for slug:', siteSlug);
          const site = await getSiteBySlug(siteSlug);
          if (site) {
            setCurrentSite(site);
            console.log('Current site set:', site);
          } else {
            setError(`Site "${siteSlug}" not found or inactive`);
            setCurrentSite(null);
            console.log('Site not found:', siteSlug);
          }
        } else {
          setCurrentSite(null);
          console.log('No site slug detected, showing main platform');
        }
      } catch (err) {
        console.error('Error loading site:', err);
        setError('Failed to load site information');
        setCurrentSite(null);
      } finally {
        setLoading(false);
      }
    };

    loadCurrentSite();
  }, [location.pathname]);

  const value: SiteContextType = {
    currentSite,
    loading,
    error,
    getSiteBySlug,
    createSite,
    updateSite,
    baseUrl,
  };

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
};
