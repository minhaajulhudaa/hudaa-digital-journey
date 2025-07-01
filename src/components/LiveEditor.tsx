
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit3, Save, Eye, EyeOff, Move, Plus, Trash2 } from 'lucide-react';
import { ThemeSection } from '@/types/theme';

interface LiveEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

const LiveEditor: React.FC<LiveEditorProps> = ({ isOpen, onClose }) => {
  const { currentTheme, updateThemeContent, toggleSection, reorderSections } = useTheme();
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [sectionContent, setSectionContent] = useState<any>({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (editingSection && currentTheme) {
      const section = currentTheme.sections.find(s => s.id === editingSection);
      if (section) {
        setSectionContent(section.content);
      }
    }
  }, [editingSection, currentTheme]);

  const handleSectionEdit = (sectionId: string) => {
    setEditingSection(sectionId);
  };

  const handleContentChange = (field: string, value: any) => {
    setSectionContent(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (editingSection) {
      await updateThemeContent(editingSection, sectionContent);
      setHasChanges(false);
      setEditingSection(null);
    }
  };

  const handleToggleSection = async (sectionId: string) => {
    await toggleSection(sectionId);
  };

  const renderSectionEditor = (section: ThemeSection) => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={sectionContent.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea
                id="subtitle"
                value={sectionContent.subtitle || ''}
                onChange={(e) => handleContentChange('subtitle', e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                value={sectionContent.buttonText || ''}
                onChange={(e) => handleContentChange('buttonText', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="backgroundImage">Background Image URL</Label>
              <Input
                id="backgroundImage"
                value={sectionContent.backgroundImage || ''}
                onChange={(e) => handleContentChange('backgroundImage', e.target.value)}
              />
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={sectionContent.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={sectionContent.description || ''}
                onChange={(e) => handleContentChange('description', e.target.value)}
                rows={5}
              />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={sectionContent.image || ''}
                onChange={(e) => handleContentChange('image', e.target.value)}
              />
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={sectionContent.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={sectionContent.subtitle || ''}
                onChange={(e) => handleContentChange('subtitle', e.target.value)}
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={sectionContent.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="content">Content (JSON)</Label>
              <Textarea
                id="content"
                value={JSON.stringify(sectionContent, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setSectionContent(parsed);
                    setHasChanges(true);
                  } catch (err) {
                    // Invalid JSON, don't update
                  }
                }}
                rows={10}
                className="font-mono text-sm"
              />
            </div>
          </div>
        );
    }
  };

  if (!isOpen || !currentTheme) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Edit3 className="w-5 h-5" />
            Live Editor
          </CardTitle>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </CardHeader>
        <CardContent className="overflow-y-auto">
          <Tabs defaultValue="sections">
            <TabsList>
              <TabsTrigger value="sections">Sections</TabsTrigger>
              <TabsTrigger value="styles">Styles</TabsTrigger>
            </TabsList>

            <TabsContent value="sections" className="space-y-4">
              {editingSection ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      Editing: {currentTheme.sections.find(s => s.id === editingSection)?.name}
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSave}
                        disabled={!hasChanges}
                        className="flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditingSection(null);
                          setHasChanges(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>

                  {renderSectionEditor(currentTheme.sections.find(s => s.id === editingSection)!)}
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Site Sections</h3>
                  {currentTheme.sections
                    .sort((a, b) => a.order - b.order)
                    .map((section) => (
                      <div
                        key={section.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={section.enabled}
                              onCheckedChange={() => handleToggleSection(section.id)}
                            />
                            {section.enabled ? (
                              <Eye className="w-4 h-4 text-green-600" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{section.name}</div>
                            <div className="text-sm text-gray-500 capitalize">
                              {section.type}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSectionEdit(section.id)}
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="styles">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Theme Styles</h3>
                <p className="text-gray-600">
                  Advanced styling options will be available in a future update.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveEditor;
