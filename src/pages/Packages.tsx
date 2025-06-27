
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, MapPin, Calendar, Users, Star, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import sdk from '@/lib/sdk';

interface Package {
  id: string;
  title: string;
  type: string;
  price: number;
  duration: string;
  description: string;
  inclusions: string[];
  gallery: string[];
  featured: boolean;
  status: string;
}

const Packages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPackages();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredPackages(packages);
    } else {
      setFilteredPackages(packages.filter(pkg => pkg.type.toLowerCase() === filter));
    }
  }, [packages, filter]);

  const loadPackages = async () => {
    try {
      const data = await sdk.get<Package>('packages');
      setPackages(data.filter(pkg => pkg.status === 'active'));
    } catch (error) {
      console.error('Error loading packages:', error);
      // Load sample data if SDK fails
      setPackages(samplePackages);
    } finally {
      setLoading(false);
    }
  };

  const samplePackages: Package[] = [
    {
      id: '1',
      title: 'Premium Hajj Package 2024',
      type: 'hajj',
      price: 5500,
      duration: '15 Days',
      description: 'Complete Hajj package with 5-star accommodations near Haram, experienced guides, and comprehensive spiritual preparation.',
      inclusions: ['5-star hotel near Haram', 'All meals included', 'Expert Sheikh guidance', 'Group transportation', 'Pre-travel training', 'Travel insurance'],
      gallery: [],
      featured: true,
      status: 'active'
    },
    {
      id: '2',
      title: 'Umrah Express Package',
      type: 'umrah',
      price: 2200,
      duration: '7 Days',
      description: 'Perfect for first-time pilgrims with comfortable accommodations and dedicated support throughout your journey.',
      inclusions: ['4-star hotel accommodation', 'Breakfast & dinner', 'Group guide', 'Airport transfers', 'Ziyarat tours'],
      gallery: [],
      featured: true,
      status: 'active'
    },
    {
      id: '3',
      title: 'VIP Umrah Experience',
      type: 'umrah',
      price: 3800,
      duration: '10 Days',
      description: 'Luxury Umrah experience with premium services, private transportation, and exclusive accommodations.',
      inclusions: ['5-star luxury hotel', 'Private transportation', 'All meals included', 'Personal guide', 'VIP Ziyarat', 'Spa services'],
      gallery: [],
      featured: true,
      status: 'active'
    },
    {
      id: '4',
      title: 'Family Hajj Package',
      type: 'hajj',
      price: 4800,
      duration: '18 Days',
      description: 'Family-friendly Hajj package designed for pilgrims traveling with children and elderly family members.',
      inclusions: ['Family rooms', 'Child-friendly meals', 'Medical support', 'Flexible itinerary', 'Family guide', 'Educational activities'],
      gallery: [],
      featured: false,
      status: 'active'
    },
    {
      id: '5',
      title: 'Budget Umrah Package',
      type: 'umrah',
      price: 1500,
      duration: '5 Days',
      description: 'Affordable Umrah package without compromising on essential services and spiritual guidance.',
      inclusions: ['3-star hotel', 'Basic meals', 'Group guide', 'Shared transportation', 'Essential Ziyarat'],
      gallery: [],
      featured: false,
      status: 'active'
    },
    {
      id: '6',
      title: 'Ramadan Umrah Special',
      type: 'umrah',
      price: 2800,
      duration: '12 Days',
      description: 'Special Ramadan Umrah package to experience the blessed month in the holy cities.',
      inclusions: ['Iftar arrangements', 'Tarawih prayers guidance', 'Night of Qadr activities', 'Spiritual lectures', 'Comfortable accommodations'],
      gallery: [],
      featured: true,
      status: 'active'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-600">Loading packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-900 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Hajj & Umrah Packages</h1>
            <p className="text-xl text-green-100">
              Choose from our carefully curated packages designed to make your spiritual journey 
              memorable, comfortable, and transformative.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-green-900">Our Packages</h2>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {filteredPackages.length} Available
              </Badge>
            </div>
            
            <div className="flex gap-4">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Packages</SelectItem>
                  <SelectItem value="hajj">Hajj Packages</SelectItem>
                  <SelectItem value="umrah">Umrah Packages</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      {filteredPackages.filter(pkg => pkg.featured).length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-900 mb-4">Featured Packages</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our most popular and comprehensive packages, carefully selected for exceptional value and experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.filter(pkg => pkg.featured).map((pkg) => (
                <Card key={pkg.id} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-green-50 relative overflow-hidden">
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-green-600 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="border-green-600 text-green-600">
                        {pkg.type.toUpperCase()}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl text-green-900 group-hover:text-green-700 transition-colors">
                      {pkg.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-gray-600 leading-relaxed">{pkg.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-green-600" />
                        {pkg.duration}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2 text-green-600" />
                        Group Package
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-green-900">Package Includes:</h4>
                      <ul className="space-y-1">
                        {pkg.inclusions.slice(0, 4).map((inclusion, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <Shield className="w-3 h-3 mr-2 text-green-600 flex-shrink-0" />
                            {inclusion}
                          </li>
                        ))}
                        {pkg.inclusions.length > 4 && (
                          <li className="text-sm text-green-600 font-medium">
                            +{pkg.inclusions.length - 4} more inclusions
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-3xl font-bold text-green-900">${pkg.price}</span>
                          <span className="text-gray-600 ml-2">per person</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button className="flex-1 bg-green-600 hover:bg-green-700">
                          Book Now
                        </Button>
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Packages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-900 mb-4">All Available Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our complete range of Hajj and Umrah packages to find the perfect fit for your spiritual journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="group hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-green-600 text-green-600">
                      {pkg.type.toUpperCase()}
                    </Badge>
                    {pkg.featured && (
                      <Badge className="bg-green-600 text-white text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl text-green-900 group-hover:text-green-700 transition-colors">
                    {pkg.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{pkg.description}</p>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-green-600" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-green-600" />
                      Group
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-green-900">${pkg.price}</span>
                        <span className="text-gray-600 ml-1 text-sm">per person</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-sm">
                        Book Now
                      </Button>
                      <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-900 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Need Help Choosing the Perfect Package?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Our spiritual travel experts are here to guide you in selecting the package that best suits your needs, budget, and spiritual goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-900 hover:bg-green-50 px-8">
                Speak with an Advisor
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8">
                Request Custom Package
              </Button>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Personalized Service</h3>
                <p className="text-green-100 text-sm">Tailored packages to meet your specific needs</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Trusted Experience</h3>
                <p className="text-green-100 text-sm">15+ years of organizing spiritual journeys</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                <p className="text-green-100 text-sm">Round-the-clock assistance during your journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
