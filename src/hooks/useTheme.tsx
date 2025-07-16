
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Theme, defaultSections, enhancedThemes } from '@/types/theme';
import { additionalThemes } from '@/lib/additionalThemes';
import { useSite } from './useSite';
import githubSDK from '@/lib/githubSDK';

interface ThemeContextType {
  currentTheme: Theme | null;
  availableThemes: Theme[];
  loading: boolean;
  error: string | null;
  applyTheme: (themeId: string) => Promise<void>;
  updateThemeContent: (sectionId: string, content: any) => Promise<void>;
  toggleSection: (sectionId: string) => Promise<void>;
  reorderSections: (sectionIds: string[]) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { currentSite, updateSite } = useSite();
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [availableThemes, setAvailableThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize themes on first load
  useEffect(() => {
    initializeThemes();
  }, []);

  // Load current site theme
  useEffect(() => {
    if (currentSite?.theme) {
      loadCurrentTheme(currentSite.theme);
    }
  }, [currentSite, availableThemes]);

  const initializeThemes = async () => {
    try {
      setLoading(true);
      setError(null);

      try {
        // Try to get existing themes from GitHub
        const existingThemes = await githubSDK.get<Theme>('themes');
        
        // If no themes exist, populate with all available themes
        if (existingThemes.length === 0) {
          console.log('Initializing themes in GitHub DB...');
          const allThemes = [...enhancedThemes, ...additionalThemes];
          const themesToCreate = allThemes.map((themeData, index) => ({
            id: `theme-${index + 1}`,
            name: themeData.name || 'Unnamed Theme',
            description: themeData.description || '',
            category: themeData.category || 'general',
            primaryColor: themeData.primaryColor || '#000000',
            secondaryColor: themeData.secondaryColor || '#ffffff',
            accentColor: themeData.accentColor || '#0066cc',
            backgroundColor: themeData.backgroundColor || '#ffffff',
            textColor: themeData.textColor || '#000000',
            cardColor: themeData.cardColor || '#ffffff',
            borderColor: themeData.borderColor || '#e5e7eb',
            gradientFrom: themeData.gradientFrom || themeData.primaryColor || '#000000',
            gradientTo: themeData.gradientTo || themeData.accentColor || '#0066cc',
            fontFamily: themeData.fontFamily || 'Inter',
            headerStyle: themeData.headerStyle || 'modern',
            footerStyle: themeData.footerStyle || 'clean',
            buttonStyle: themeData.buttonStyle || 'rounded',
            cardStyle: themeData.cardStyle || 'shadow',
            layout: themeData.layout || 'modern',
            sections: defaultSections,
            status: 'active' as const,
            isDefault: index === 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }));

          for (const themeData of themesToCreate) {
            await githubSDK.insert<Theme>('themes', themeData);
          }

          // Reload themes after initialization
          const newThemes = await githubSDK.get<Theme>('themes');
          setAvailableThemes(newThemes.filter(t => t.status === 'active'));
        } else {
          setAvailableThemes(existingThemes.filter(t => t.status === 'active'));
        }
      } catch (githubError) {
        console.error('GitHub themes fetch failed, using local fallback:', githubError);
        
        // Fallback to local theme data when GitHub fails
        const allThemes = [...enhancedThemes, ...additionalThemes];
        const fallbackThemes = allThemes.map((themeData, index) => ({
          id: `theme-${index + 1}`,
          name: themeData.name || 'Unnamed Theme',
          description: themeData.description || '',
          category: themeData.category || 'general',
          primaryColor: themeData.primaryColor || '#000000',
          secondaryColor: themeData.secondaryColor || '#ffffff',
          accentColor: themeData.accentColor || '#0066cc',
          backgroundColor: themeData.backgroundColor || '#ffffff',
          textColor: themeData.textColor || '#000000',
          cardColor: themeData.cardColor || '#ffffff',
          borderColor: themeData.borderColor || '#e5e7eb',
          gradientFrom: themeData.gradientFrom || themeData.primaryColor || '#000000',
          gradientTo: themeData.gradientTo || themeData.accentColor || '#0066cc',
          fontFamily: themeData.fontFamily || 'Inter',
          headerStyle: themeData.headerStyle || 'modern',
          footerStyle: themeData.footerStyle || 'clean',
          buttonStyle: themeData.buttonStyle || 'rounded',
          cardStyle: themeData.cardStyle || 'shadow',
          layout: themeData.layout || 'modern',
          sections: defaultSections,
          status: 'active' as const,
          isDefault: index === 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })) as Theme[];
        
        setAvailableThemes(fallbackThemes);
        console.log('Using local fallback themes:', fallbackThemes.length, 'themes loaded');
      }
    } catch (err) {
      console.error('Error initializing themes:', err);
      setError('Failed to load themes');
    } finally {
      setLoading(false);
    }
  };

  const loadCurrentTheme = async (themeId: string) => {
    try {
      const theme = availableThemes.find(t => t.id === themeId);
      if (theme) {
        setCurrentTheme(theme);
        applyThemeToDOM(theme);
      } else {
        // Try to load from GitHub if not in available themes
        const themeFromDB = await githubSDK.getItem<Theme>('themes', themeId);
        if (themeFromDB) {
          setCurrentTheme(themeFromDB);
          applyThemeToDOM(themeFromDB);
        }
      }
    } catch (err) {
      console.error('Error loading theme:', err);
    }
  };

  const applyThemeToDOM = (theme: Theme) => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.primaryColor);
    root.style.setProperty('--theme-secondary', theme.secondaryColor);
    root.style.setProperty('--theme-accent', theme.accentColor);
    root.style.setProperty('--theme-background', theme.backgroundColor);
    root.style.setProperty('--theme-text', theme.textColor);
    root.style.setProperty('--theme-card', theme.cardColor);
    root.style.setProperty('--theme-border', theme.borderColor);
    root.style.setProperty('--theme-gradient-from', theme.gradientFrom);
    root.style.setProperty('--theme-gradient-to', theme.gradientTo);

    // Apply custom CSS if exists
    if (theme.customCSS) {
      let styleEl = document.getElementById('theme-custom-css');
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'theme-custom-css';
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = theme.customCSS;
    }
  };

  const applyTheme = async (themeId: string) => {
    if (!currentSite) return;
    
    try {
      await updateSite(currentSite.id, { theme: themeId });
      await loadCurrentTheme(themeId);
    } catch (err) {
      console.error('Error applying theme:', err);
      setError('Failed to apply theme');
    }
  };

  const updateThemeContent = async (sectionId: string, content: any) => {
    if (!currentTheme || !currentSite) return;

    try {
      const updatedSections = currentTheme.sections.map(section =>
        section.id === sectionId ? { ...section, content: { ...section.content, ...content } } : section
      );

      const updatedTheme = {
        ...currentTheme,
        sections: updatedSections,
        updatedAt: new Date().toISOString()
      };

      await githubSDK.update<Theme>('themes', currentTheme.id, {
        sections: updatedSections,
        updatedAt: new Date().toISOString()
      });

      setCurrentTheme(updatedTheme);
    } catch (err) {
      console.error('Error updating theme content:', err);
      setError('Failed to update content');
    }
  };

  const toggleSection = async (sectionId: string) => {
    if (!currentTheme) return;

    try {
      const updatedSections = currentTheme.sections.map(section =>
        section.id === sectionId ? { ...section, enabled: !section.enabled } : section
      );

      await githubSDK.update<Theme>('themes', currentTheme.id, {
        sections: updatedSections,
        updatedAt: new Date().toISOString()
      });

      setCurrentTheme({ ...currentTheme, sections: updatedSections });
    } catch (err) {
      console.error('Error toggling section:', err);
      setError('Failed to toggle section');
    }
  };

  const reorderSections = async (sectionIds: string[]) => {
    if (!currentTheme) return;

    try {
      const updatedSections = sectionIds.map((id, index) => {
        const section = currentTheme.sections.find(s => s.id === id);
        return section ? { ...section, order: index + 1 } : null;
      }).filter(Boolean) as Theme['sections'];

      await githubSDK.update<Theme>('themes', currentTheme.id, {
        sections: updatedSections,
        updatedAt: new Date().toISOString()
      });

      setCurrentTheme({ ...currentTheme, sections: updatedSections });
    } catch (err) {
      console.error('Error reordering sections:', err);
      setError('Failed to reorder sections');
    }
  };

  const value: ThemeContextType = {
    currentTheme,
    availableThemes,
    loading,
    error,
    applyTheme,
    updateThemeContent,
    toggleSection,
    reorderSections,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
