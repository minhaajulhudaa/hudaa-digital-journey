import React, { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useSite } from '@/hooks/useSite';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Eye, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ThemeSelectorProps {
  onThemeSelect?: (themeId: string) => void;
  selectedThemeId?: string;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onThemeSelect, selectedThemeId }) => {
  const { currentTheme, availableThemes, applyTheme, loading } = useTheme();
  const { currentSite } = useSite();
  const { toast } = useToast();
  const [previewTheme, setPreviewTheme] = useState<string | null>(null);
  const [applying, setApplying] = useState<string | null>(null);

  const handlePreview = (themeId: string) => {
    const theme = availableThemes.find(t => t.id === themeId);
    if (theme) {
      setPreviewTheme(themeId);
      // Apply theme temporarily to DOM for preview
      const root = document.documentElement;
      root.style.setProperty('--theme-primary', theme.primaryColor);
      root.style.setProperty('--theme-secondary', theme.secondaryColor);
      root.style.setProperty('--theme-accent', theme.accentColor);
      root.style.setProperty('--theme-background', theme.backgroundColor);
      root.style.setProperty('--theme-text', theme.textColor);
      root.style.setProperty('--theme-card', theme.cardColor);
      root.style.setProperty('--theme-border', theme.borderColor);
      
      toast({
        title: "Theme Preview",
        description: `Previewing ${theme.name}. Click 'Select Theme' to apply permanently.`
      });
    }
  };

  const handleApplyTheme = async (themeId: string) => {
    setApplying(themeId);
    try {
      if (onThemeSelect) {
        onThemeSelect(themeId);
      } else {
        await applyTheme(themeId);
      }
      setPreviewTheme(null);
      toast({
        title: "Theme Applied",
        description: "Your new theme has been applied successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to apply theme. Please try again.",
        variant: "destructive"
      });
    } finally {
      setApplying(null);
    }
  };

  
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Palette className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading themes...</p>
        </div>
      </div>
    );
  }

  const activeThemeId = selectedThemeId || currentTheme?.id;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Choose Your Theme</h2>
        <p className="text-gray-600 mb-8">
          Select a theme that best represents your brand and appeals to your audience.
          You can preview each theme before applying it.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableThemes.map((theme) => (
          <Card 
            key={theme.id} 
            className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${
              activeThemeId === theme.id ? 'ring-2 ring-blue-500' : ''
            } ${previewTheme === theme.id ? 'ring-2 ring-orange-500' : ''}`}
          >
            <div 
              className="h-32 p-4 relative"
              style={{ 
                background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.gradientTo || theme.accentColor})` 
              }}
            >
              <div className="absolute top-2 right-2">
                {activeThemeId === theme.id && (
                  <Badge className="bg-white text-green-600">
                    <Check className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                )}
                {previewTheme === theme.id && (
                  <Badge className="bg-white text-orange-600">
                    <Eye className="w-3 h-3 mr-1" />
                    Preview
                  </Badge>
                )}
              </div>
              <div className="text-white">
                <div className="text-lg font-bold mb-2">{theme.name}</div>
                <div className="text-sm opacity-90">{theme.category}</div>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{theme.name}</CardTitle>
              <p className="text-sm text-gray-600">{theme.description}</p>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex gap-2 mb-4">
                <div 
                  className="w-6 h-6 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: theme.primaryColor }}
                  title="Primary Color"
                />
                <div 
                  className="w-6 h-6 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: theme.accentColor }}
                  title="Accent Color"
                />
                <div 
                  className="w-6 h-6 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: theme.backgroundColor }}
                  title="Background Color"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => handlePreview(theme.id)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  disabled={previewTheme === theme.id}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  {previewTheme === theme.id ? 'Previewing' : 'Preview'}
                </Button>
                
                <Button
                  onClick={() => handleApplyTheme(theme.id)}
                  size="sm"
                  className="flex-1"
                  disabled={activeThemeId === theme.id || applying === theme.id}
                  style={{ backgroundColor: theme.accentColor }}
                >
                  {applying === theme.id ? 'Applying...' : 
                   activeThemeId === theme.id ? 'Active' : 'Select'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {previewTheme && (
        <div className="fixed bottom-4 right-4 bg-white border rounded-lg shadow-lg p-4 z-50">
          <p className="text-sm font-medium mb-2">Preview Mode Active</p>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setPreviewTheme(null);
                // Restore current theme
                if (currentTheme) {
                  const root = document.documentElement;
                  root.style.setProperty('--theme-primary', currentTheme.primaryColor);
                  root.style.setProperty('--theme-secondary', currentTheme.secondaryColor);
                  root.style.setProperty('--theme-accent', currentTheme.accentColor);
                  root.style.setProperty('--theme-background', currentTheme.backgroundColor);
                  root.style.setProperty('--theme-text', currentTheme.textColor);
                  root.style.setProperty('--theme-card', currentTheme.cardColor);
                  root.style.setProperty('--theme-border', currentTheme.borderColor);
                }
              }}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleApplyTheme(previewTheme)}
              size="sm"
              disabled={applying === previewTheme}
            >
              {applying === previewTheme ? 'Applying...' : 'Apply Theme'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
