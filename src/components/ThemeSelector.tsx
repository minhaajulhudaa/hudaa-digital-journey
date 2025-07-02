
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette, Eye, Check, Loader2 } from 'lucide-react';
import { Theme } from '@/types/theme';

interface ThemeSelectorProps {
  showPreview?: boolean;
  onThemeSelect?: (themeId: string) => void;
  selectedThemeId?: string;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ 
  showPreview = false, 
  onThemeSelect,
  selectedThemeId 
}) => {
  const { availableThemes, loading, error } = useTheme();
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>(selectedThemeId || '');

  useEffect(() => {
    if (selectedThemeId) {
      setSelectedTheme(selectedThemeId);
    }
  }, [selectedThemeId]);

  const handleThemeClick = (theme: Theme) => {
    console.log('Theme clicked:', theme.id);
    setSelectedTheme(theme.id);
    if (onThemeSelect) {
      onThemeSelect(theme.id);
    }
  };

  const handlePreview = (theme: Theme) => {
    console.log('Previewing theme:', theme.id);
    setPreviewTheme(theme);
    // In a real implementation, this would open a preview modal
    alert(`Preview for ${theme.name} theme would open here`);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-2">Loading themes...</span>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <p className="text-red-600 mb-2">Error loading themes</p>
            <p className="text-sm text-gray-500">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Choose Your Theme ({availableThemes.length} available)
        </CardTitle>
        <p className="text-sm text-gray-600">
          Select from our collection of professionally designed themes
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableThemes.map((theme) => (
            <div
              key={theme.id}
              className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                selectedTheme === theme.id
                  ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => handleThemeClick(theme)}
            >
              {/* Theme Preview */}
              <div 
                className="h-24 p-3 relative"
                style={{ 
                  background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.gradientTo || theme.accentColor})` 
                }}
              >
                <div className="relative z-10">
                  <div className="flex space-x-1 mb-1">
                    <div
                      className="w-2 h-2 rounded-full border border-white/30"
                      style={{ backgroundColor: theme.primaryColor }}
                    />
                    <div
                      className="w-2 h-2 rounded-full border border-white/30"
                      style={{ backgroundColor: theme.accentColor }}
                    />
                    <div
                      className="w-2 h-2 rounded-full border border-white/30"
                      style={{ backgroundColor: theme.secondaryColor }}
                    />
                  </div>
                  <div className="text-white text-xs font-medium">
                    {theme.name}
                  </div>
                </div>
                
                {selectedTheme === theme.id && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-blue-600 text-white rounded-full p-1">
                      <Check className="w-3 h-3" />
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Info */}
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {theme.category || 'General'}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    {theme.fontFamily}
                  </div>
                </div>
                
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {theme.description}
                </p>

                <div className="flex gap-2">
                  {showPreview && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreview(theme);
                      }}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Preview
                    </Button>
                  )}
                  <Button
                    variant={selectedTheme === theme.id ? 'default' : 'outline'}
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleThemeClick(theme);
                    }}
                  >
                    {selectedTheme === theme.id ? 'Selected' : 'Select'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {availableThemes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Palette className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No themes available. Please refresh the page to reload themes.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ThemeSelector;
