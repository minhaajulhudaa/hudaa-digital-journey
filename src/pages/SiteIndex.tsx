
import React from 'react';
import { useSite } from '@/hooks/useSite';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, MapPin, Star, Users } from 'lucide-react';

const SiteIndex = () => {
  const { currentSite } = useSite();

  if (!currentSite) return null;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to {currentSite.name}
          </h1>
          {currentSite.description && (
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {currentSite.description}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Explore Packages
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide exceptional travel experiences with professional service and attention to detail.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Plane className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Premium Packages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Carefully curated travel packages with the best destinations and experiences.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Expert Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Professional tour guides and local experts to enhance your journey.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Round-the-clock customer support for peace of mind during your travels.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Ready to Start Your Journey?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today to plan your perfect travel experience with {currentSite.name}.
          </p>
          <div className="space-y-4">
            {currentSite.contactEmail && (
              <p className="text-lg">
                <strong>Email:</strong> {currentSite.contactEmail}
              </p>
            )}
            {currentSite.contactPhone && (
              <p className="text-lg">
                <strong>Phone:</strong> {currentSite.contactPhone}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SiteIndex;
