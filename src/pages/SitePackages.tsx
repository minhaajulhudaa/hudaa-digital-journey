
import React, { useState } from 'react';
import { useSite } from '@/hooks/useSite';
import { useTheme } from '@/hooks/useTheme';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Star, Clock, Award } from 'lucide-react';
import BookingModal from '@/components/BookingModal';

const SitePackages = () => {
  const { currentSite } = useSite();
  const { currentTheme } = useTheme();
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!currentSite || !currentTheme) return null;

  // Enhanced mock packages with more details
  const packages = [
    {
      id: '1',
      title: 'Hajj Package Premium',
      description: 'Complete Hajj package with 5-star accommodation, expert guidance, and comprehensive spiritual journey support.',
      price: 8500,
      duration: '15 days',
      capacity: 40,
      image: '/api/placeholder/400/250',
      features: ['5-Star Hotels', 'Expert Guide', 'All Meals', 'Transportation', 'Visa Support'],
      highlights: 'Premium accommodation near Haram with spiritual guidance throughout your journey'
    },
    {
      id: '2',
      title: 'Umrah Package Deluxe',
      description: 'Spiritual journey with comfortable stay, expert guidance, and personalized religious experience.',
      price: 3200,
      duration: '10 days',
      capacity: 30,
      image: '/api/placeholder/400/250',
      features: ['4-Star Hotels', 'Religious Guide', 'Breakfast & Dinner', 'Airport Transfer', 'Group Support'],
      highlights: 'Comfortable pilgrimage with experienced religious guides and quality accommodations'
    },
    {
      id: '3',
      title: 'Family Umrah Package',
      description: 'Perfect for families seeking a meaningful spiritual journey with child-friendly accommodations.',
      price: 2800,
      duration: '7 days',
      capacity: 25,
      image: '/api/placeholder/400/250',
      features: ['Family Rooms', 'Kid-Friendly Meals', 'Family Guide', 'Flexible Schedule', 'Special Care'],
      highlights: 'Designed specifically for families with children, ensuring comfort for all ages'
    }
  ];

  const handleBookNow = (pkg: any) => {
    setSelectedPackage(pkg);
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: currentTheme.backgroundColor }}>
      {/* Hero Section */}
      <section 
        className="py-20 text-white"
        style={{ 
          background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${currentTheme.gradientTo || currentTheme.accentColor})` 
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Travel Packages</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover our carefully crafted travel packages designed to provide you with unforgettable spiritual experiences.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}
            >
              <div className="aspect-video bg-gray-200 relative overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div 
                  className="absolute top-4 right-4 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg"
                  style={{ backgroundColor: currentTheme.accentColor }}
                >
                  ${pkg.price.toLocaleString()}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  <Award className="w-4 h-4 inline mr-1" />
                  Premium Experience
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle 
                  className="text-xl mb-2"
                  style={{ color: currentTheme.primaryColor }}
                >
                  {pkg.title}
                </CardTitle>
                <p style={{ color: currentTheme.textColor }} className="text-sm leading-relaxed">
                  {pkg.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2" style={{ color: currentTheme.textColor }}>
                    <Calendar className="w-4 h-4" style={{ color: currentTheme.accentColor }} />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: currentTheme.textColor }}>
                    <Users className="w-4 h-4" style={{ color: currentTheme.accentColor }} />
                    <span>Max {pkg.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: currentTheme.textColor }}>
                    <Star className="w-4 h-4 fill-current" style={{ color: currentTheme.accentColor }} />
                    <span>Premium</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: currentTheme.textColor }}>
                    <Clock className="w-4 h-4" style={{ color: currentTheme.accentColor }} />
                    <span>All Inclusive</span>
                  </div>
                </div>

                <div className="border-t pt-4" style={{ borderColor: currentTheme.borderColor }}>
                  <h4 
                    className="font-semibold text-sm mb-2"
                    style={{ color: currentTheme.primaryColor }}
                  >
                    Package Includes:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {pkg.features.slice(0, 3).map((feature, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ 
                          backgroundColor: `${currentTheme.accentColor}20`,
                          color: currentTheme.accentColor 
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                    {pkg.features.length > 3 && (
                      <span 
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ 
                          backgroundColor: `${currentTheme.primaryColor}20`,
                          color: currentTheme.primaryColor 
                        }}
                      >
                        +{pkg.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <p 
                    className="text-xs italic mb-4"
                    style={{ color: `${currentTheme.textColor}80` }}
                  >
                    {pkg.highlights}
                  </p>
                </div>
                
                <Button 
                  onClick={() => handleBookNow(pkg)}
                  className="w-full text-white font-semibold py-3 hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: currentTheme.accentColor }}
                >
                  Book Now - ${pkg.price.toLocaleString()}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {packages.length === 0 && (
          <div className="text-center py-12">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: `${currentTheme.accentColor}20` }}
            >
              <MapPin 
                className="w-12 h-12"
                style={{ color: currentTheme.accentColor }}
              />
            </div>
            <h3 
              className="text-2xl font-semibold mb-4"
              style={{ color: currentTheme.primaryColor }}
            >
              Packages Coming Soon
            </h3>
            <p style={{ color: currentTheme.textColor }} className="mb-6">
              We're preparing amazing travel packages for you. Please check back later or contact us for custom packages.
            </p>
            <Button 
              className="text-white"
              style={{ backgroundColor: currentTheme.accentColor }}
            >
              Contact Us for Custom Packages
            </Button>
          </div>
        )}
      </div>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        packageData={selectedPackage}
      />
    </div>
  );
};

export default SitePackages;
