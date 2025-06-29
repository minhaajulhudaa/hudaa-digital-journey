
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
  const location = useLocation();

  // Extract site slug from URL path
  const getSiteSlugFromPath = (pathname: string): string | null => {
    const pathParts = pathname.split('/').filter(part => part);
    // If path starts with a slug (not 'admin', 'login', etc.), it's a site slug
    if (pathParts.length > 0 && !['admin', 'login', 'register', 'sites'].includes(pathParts[0])) {
      return pathParts[0];
    }
    return null;
  };

  const getSiteBySlug = async (slug: string): Promise<Site | null> => {
    try {
      const sites = await sdk.get<Site>('sites');
      return sites.find(site => site.slug === slug && site.status === 'active') || null;
    } catch (err) {
      console.error('Error fetching site:', err);
      return null;
    }
  };

  const createSite = async (siteData: Partial<Site>): Promise<Site> => {
    try {
      const site = await sdk.insert<Site>('sites', siteData);
      return site;
    } catch (err) {
      console.error('Error creating site:', err);
      throw err;
    }
  };

  const updateSite = async (siteId: string, updates: Partial<Site>): Promise<Site> => {
    try {
      const site = await sdk.update<Site>('sites', siteId, updates);
      return site;
    } catch (err) {
      console.error('Error updating site:', err);
      throw err;
    }
  };

  useEffect(() => {
    const loadCurrentSite = async () => {
      setLoading(true);
      setError(null);
      
      const siteSlug = getSiteSlugFromPath(location.pathname);
      
      if (siteSlug) {
        try {
          const site = await getSiteBySlug(siteSlug);
          if (site) {
            setCurrentSite(site);
          } else {
            setError(`Site "${siteSlug}" not found`);
          }
        } catch (err) {
          setError('Failed to load site');
          console.error('Error loading site:', err);
        }
      } else {
        setCurrentSite(null);
      }
      
      setLoading(false);
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
  };

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
};
