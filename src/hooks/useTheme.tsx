
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Theme, themes } from '@/types/theme';
import { useSite } from './useSite';

interface ThemeContextType {
  currentTheme: Theme;
  availableThemes: Theme[];
  applyTheme: (themeId: string) => void;
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
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    if (currentSite?.theme) {
      const theme = themes.find(t => t.id === currentSite.theme) || themes[0];
      setCurrentTheme(theme);
      applyThemeToDOM(theme);
    }
  }, [currentSite]);

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
  };

  const applyTheme = async (themeId: string) => {
    if (!currentSite) return;
    
    const theme = themes.find(t => t.id === themeId);
    if (!theme) return;

    try {
      await updateSite(currentSite.id, { theme: themeId });
      setCurrentTheme(theme);
      applyThemeToDOM(theme);
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  };

  const value: ThemeContextType = {
    currentTheme,
    availableThemes: themes,
    applyTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
