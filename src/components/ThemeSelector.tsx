
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette, Eye, Edit } from 'lucide-react';
import { Theme } from '@/types/theme';

interface ThemeSelectorProps {
  showPreview?: boolean;
  onThemeSelect?: (themeId: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ 
  showPreview = false, 
  onThemeSelect 
}) => {
  const { currentTheme, availableThemes, applyTheme, loading } = useTheme();
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);

  const handleThemeClick = (theme: Theme) => {
    if (onThemeSelect) {
      onThemeSelect(theme.id);
    } else {
      applyTheme(theme.id);
    }
  };

  const handlePreview = (theme: Theme) => {
    setPreviewTheme(theme);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2">Loading themes...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Theme Selection
        </CardTitle>
        <p className="text-sm text-gray-600">
          Choose from our collection of professionally designed themes
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableThemes.map((theme) => (
            <div
              key={theme.id}
              className={`relative border rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                currentTheme?.id === theme.id
                  ? 'border-2 border-blue-500 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {/* Theme Preview */}
              <div 
                className="h-32 p-4 relative"
                style={{ 
                  background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.gradientTo})` 
                }}
              >
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{ backgroundColor: theme.backgroundColor }}
                />
                <div className="relative z-10">
                  <div className="flex space-x-1 mb-2">
                    <div
                      className="w-3 h-3 rounded-full border border-white/30"
                      style={{ backgroundColor: theme.primaryColor }}
                    />
                    <div
                      className="w-3 h-3 rounded-full border border-white/30"
                      style={{ backgroundColor: theme.accentColor }}
                    />
                    <div
                      className="w-3 h-3 rounded-full border border-white/30"
                      style={{ backgroundColor: theme.secondaryColor }}
                    />
                  </div>
                  <div className="text-white text-sm font-medium">
                    {theme.name}
                  </div>
                  <div className="text-white/80 text-xs mt-1">
                    {theme.description}
                  </div>
                </div>
              </div>

              {/* Theme Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {theme.category || 'General'}
                  </Badge>
                  {currentTheme?.id === theme.id && (
                    <Badge className="text-xs bg-blue-500">
                      Active
                    </Badge>
                  )}
                </div>
                
                <div className="text-xs text-gray-600 mb-3">
                  {theme.fontFamily} • {theme.buttonStyle} • {theme.cardStyle}
                </div>

                <div className="flex gap-2">
                  {showPreview && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => handlePreview(theme)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Preview
                    </Button>
                  )}
                  <Button
                    variant={currentTheme?.id === theme.id ? 'default' : 'outline'}
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => handleThemeClick(theme)}
                  >
                    {currentTheme?.id === theme.id ? 'Active' : 'Select'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {availableThemes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Palette className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No themes available. Please check your configuration.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ThemeSelector;
