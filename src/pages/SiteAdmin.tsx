
import React from 'react';
import { useSite } from '@/hooks/useSite';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, FileText, Calendar, Users, Settings, BarChart3 } from 'lucide-react';

const SiteAdmin = () => {
  const { currentSite } = useSite();

  if (!currentSite) return null;

  const adminSections = [
    {
      icon: Package,
      title: 'Packages',
      description: 'Manage travel packages and offerings',
      color: 'text-green-600'
    },
    {
      icon: FileText,
      title: 'Blog Posts',
      description: 'Create and manage blog content',
      color: 'text-blue-600'
    },
    {
      icon: Calendar,
      title: 'Events',
      description: 'Schedule and manage events',
      color: 'text-purple-600'
    },
    {
      icon: Users,
      title: 'Customers',
      description: 'Manage customer relationships',
      color: 'text-orange-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'View performance metrics',
      color: 'text-red-600'
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'Site configuration and preferences',
      color: 'text-gray-600'
    }
  ];

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your {currentSite.name} platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => {
            const IconComponent = section.icon;
            return (
              <Card key={section.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <IconComponent className={`w-6 h-6 ${section.color}`} />
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{section.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Manage
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-600">Active Packages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-gray-600">Blog Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-gray-600">Upcoming Events</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">0</div>
                  <div className="text-sm text-gray-600">Total Customers</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SiteAdmin;
