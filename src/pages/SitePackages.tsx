
import React from 'react';
import { useSite } from '@/hooks/useSite';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Star } from 'lucide-react';

const SitePackages = () => {
  const { currentSite } = useSite();

  if (!currentSite) return null;

  // Mock packages data - in production, this would come from the API
  const packages = [
    {
      id: '1',
      title: 'Hajj Package Premium',
      description: 'Complete Hajj package with 5-star accommodation and full guidance',
      price: 8500,
      duration: '15 days',
      capacity: 40,
      image: '/placeholder.svg'
    },
    {
      id: '2',
      title: 'Umrah Package Deluxe',
      description: 'Spiritual journey with comfortable stay and expert guidance',
      price: 3200,
      duration: '10 days',
      capacity: 30,
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Travel Packages
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully crafted travel packages designed to provide you with unforgettable experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 relative">
                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ${pkg.price.toLocaleString()}
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{pkg.title}</CardTitle>
                <p className="text-gray-600">{pkg.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Max {pkg.capacity} travelers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>Premium Experience</span>
                  </div>
                </div>
                
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {packages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No packages available at the moment.</p>
            <p className="text-gray-400 mt-2">Please check back later or contact us for custom packages.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SitePackages;
