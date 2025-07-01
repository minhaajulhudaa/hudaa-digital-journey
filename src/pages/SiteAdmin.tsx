import React, { useState } from 'react';
import { useSite } from '@/hooks/useSite';
import { useTheme } from '@/hooks/useTheme';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, FileText, Calendar, Users, Settings, BarChart3, Palette, Edit3 } from 'lucide-react';
import ThemeSelector from '@/components/ThemeSelector';
import LiveEditor from '@/components/LiveEditor';

const SiteAdmin = () => {
  const { currentSite } = useSite();
  const { currentTheme } = useTheme();
  const [isLiveEditorOpen, setIsLiveEditorOpen] = useState(false);

  if (!currentSite) return null;

  const adminSections = [
    {
      icon: Package,
      title: 'Packages',
      description: 'Manage travel packages and offerings',
      color: currentTheme?.accentColor || '#22c55e'
    },
    {
      icon: FileText,
      title: 'Blog Posts',
      description: 'Create and manage blog content',
      color: currentTheme?.primaryColor || '#004225'
    },
    {
      icon: Calendar,
      title: 'Events',
      description: 'Schedule and manage events',
      color: currentTheme?.gradientFrom || '#16a34a'
    },
    {
      icon: Users,
      title: 'Customers',
      description: 'Manage customer relationships',
      color: currentTheme?.gradientTo || '#0ea5e9'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'View performance metrics',
      color: currentTheme?.accentColor || '#22c55e'
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'Site configuration and preferences',
      color: currentTheme?.primaryColor || '#004225'
    }
  ];

  return (
    <div 
      className="min-h-screen py-8"
      style={{ backgroundColor: currentTheme?.backgroundColor || '#ffffff' }}
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ color: currentTheme?.primaryColor || '#004225' }}
            >
              Admin Dashboard
            </h1>
            <p style={{ color: currentTheme?.textColor || '#1f2937' }}>
              Manage your {currentSite.name} platform
            </p>
          </div>
          
          <Button
            onClick={() => setIsLiveEditorOpen(true)}
            className="flex items-center gap-2"
            style={{ 
              backgroundColor: currentTheme?.accentColor || '#22c55e'
            }}
          >
            <Edit3 className="w-4 h-4" />
            Live Editor
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {adminSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <Card 
                    key={section.title} 
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    style={{ 
                      backgroundColor: currentTheme?.cardColor || '#ffffff',
                      borderColor: currentTheme?.borderColor || '#e5e7eb'
                    }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <IconComponent 
                          className="w-6 h-6" 
                          style={{ color: section.color }}
                        />
                        <CardTitle 
                          className="text-lg"
                          style={{ color: currentTheme?.textColor || '#1f2937' }}
                        >
                          {section.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p 
                        className="text-sm mb-4"
                        style={{ color: `${currentTheme?.textColor || '#1f2937'}80` }}
                      >
                        {section.description}
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        style={{ 
                          borderColor: currentTheme?.borderColor || '#e5e7eb',
                          color: currentTheme?.textColor || '#1f2937'
                        }}
                      >
                        Manage
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card style={{ 
              backgroundColor: currentTheme?.cardColor || '#ffffff',
              borderColor: currentTheme?.borderColor || '#e5e7eb'
            }}>
              <CardHeader>
                <CardTitle style={{ color: currentTheme?.textColor || '#1f2937' }}>
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: currentTheme?.accentColor || '#22c55e' }}
                    >
                      0
                    </div>
                    <div 
                      className="text-sm"
                      style={{ color: `${currentTheme?.textColor || '#1f2937'}80` }}
                    >
                      Active Packages
                    </div>
                  </div>
                  <div className="text-center">
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: currentTheme?.primaryColor || '#004225' }}
                    >
                      0
                    </div>
                    <div 
                      className="text-sm"
                      style={{ color: `${currentTheme?.textColor || '#1f2937'}80` }}
                    >
                      Blog Posts
                    </div>
                  </div>
                  <div className="text-center">
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: currentTheme?.gradientFrom || '#16a34a' }}
                    >
                      0
                    </div>
                    <div 
                      className="text-sm"
                      style={{ color: `${currentTheme?.textColor || '#1f2937'}80` }}
                    >
                      Upcoming Events
                    </div>
                  </div>
                  <div className="text-center">
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: currentTheme?.gradientTo || '#0ea5e9' }}
                    >
                      0
                    </div>
                    <div 
                      className="text-sm"
                      style={{ color: `${currentTheme?.textColor || '#1f2937'}80` }}
                    >
                      Total Customers
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <div className="space-y-6">
              <Card style={{ 
                backgroundColor: currentTheme?.cardColor || '#ffffff',
                borderColor: currentTheme?.borderColor || '#e5e7eb'
              }}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle style={{ color: currentTheme?.textColor || '#1f2937' }}>
                      Content Management
                    </CardTitle>
                    <Button
                      onClick={() => setIsLiveEditorOpen(true)}
                      className="flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Content
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p style={{ color: `${currentTheme?.textColor || '#1f2937'}80` }}>
                    Use the live editor to modify your site's content, sections, and layout in real-time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="theme">
            <ThemeSelector />
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card style={{ 
                backgroundColor: currentTheme?.cardColor || '#ffffff',
                borderColor: currentTheme?.borderColor || '#e5e7eb'
              }}>
                <CardHeader>
                  <CardTitle style={{ color: currentTheme?.textColor || '#1f2937' }}>
                    Site Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p style={{ color: `${currentTheme?.textColor || '#1f2937'}80` }}>
                    Configure your site settings, contact information, and other preferences.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <LiveEditor 
        isOpen={isLiveEditorOpen}
        onClose={() => setIsLiveEditorOpen(false)}
      />
    </div>
  );
};

export default SiteAdmin;
