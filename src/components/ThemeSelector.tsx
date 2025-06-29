
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

const ThemeSelector = () => {
  const { currentTheme, availableThemes, applyTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Theme Selection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableThemes.map((theme) => (
            <div
              key={theme.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                currentTheme.id === theme.id
                  ? 'border-2 border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => applyTheme(theme.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">{theme.name}</h4>
                {currentTheme.id === theme.id && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
              <div className="flex space-x-1 mb-2">
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: theme.primaryColor }}
                ></div>
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: theme.accentColor }}
                ></div>
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: theme.gradientFrom }}
                ></div>
              </div>
              <div className="text-xs text-gray-600 mb-2">
                {theme.fontFamily} • {theme.buttonStyle} • {theme.cardStyle}
              </div>
              <Button
                variant={currentTheme.id === theme.id ? 'default' : 'outline'}
                size="sm"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  applyTheme(theme.id);
                }}
              >
                {currentTheme.id === theme.id ? 'Active' : 'Apply'}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeSelector;
