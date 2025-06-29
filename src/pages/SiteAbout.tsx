
import React from 'react';
import { useSite } from '@/hooks/useSite';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

const SiteAbout = () => {
  const { currentSite } = useSite();

  if (!currentSite) return null;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About {currentSite.name}
          </h1>
          {currentSite.description && (
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {currentSite.description}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We are dedicated to providing exceptional travel experiences that create lasting memories. 
                Our team of experts ensures every journey is carefully planned and executed with the highest standards of service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Excellence in service delivery</li>
                <li>• Authentic cultural experiences</li>
                <li>• Safety and comfort of our travelers</li>
                <li>• Sustainable and responsible tourism</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentSite.contactEmail && (
              <div className="flex flex-col items-center">
                <Mail className="w-8 h-8 text-green-600 mb-2" />
                <p className="text-gray-600">{currentSite.contactEmail}</p>
              </div>
            )}
            {currentSite.contactPhone && (
              <div className="flex flex-col items-center">
                <Phone className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-gray-600">{currentSite.contactPhone}</p>
              </div>
            )}
            <div className="flex flex-col items-center">
              <Globe className="w-8 h-8 text-purple-600 mb-2" />
              <p className="text-gray-600">travelwith.com/{currentSite.slug}</p>
            </div>
            {currentSite.ownerEmail && (
              <div className="flex flex-col items-center">
                <Mail className="w-8 h-8 text-orange-600 mb-2" />
                <p className="text-gray-600 text-sm">Owner: {currentSite.ownerEmail}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteAbout;
