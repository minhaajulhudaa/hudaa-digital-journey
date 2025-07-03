
import React from 'react';
import { useSite } from '@/hooks/useSite';
import { useTheme } from '@/hooks/useTheme';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, MapPin, Star, Users, Award, Clock, Shield, Calendar, MessageSquare, ArrowRight, CheckCircle, Globe, Mail, Phone, Compass, Camera, Heart, TrendingUp, Gift, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const SiteIndex = () => {
  const { currentSite } = useSite();
  const { currentTheme } = useTheme();

  if (!currentSite || !currentTheme) return null;

  const features = [
    {
      icon: Award,
      title: "Premium Experience",
      description: "Carefully curated travel experiences with attention to every detail"
    },
    {
      icon: Shield,
      title: "Trusted & Secure",
      description: "Your safety and security are our top priorities throughout your journey"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance whenever you need help during your travels"
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Professional guides and local experts to enhance your travel experience"
    }
  ];

  const stats = [
    { number: "2500+", label: "Happy Travelers", icon: Users },
    { number: "150+", label: "Destinations", icon: MapPin },
    { number: "15+", label: "Years Experience", icon: Calendar },
    { number: "99%", label: "Satisfaction Rate", icon: Star }
  ];

  const services = [
    {
      icon: Plane,
      title: "Flight Bookings",
      description: "Best prices on flights worldwide with flexible booking options"
    },
    {
      icon: MapPin,
      title: "Accommodation",
      description: "Handpicked hotels and resorts that match your preferences"
    },
    {
      icon: Compass,
      title: "Guided Tours",
      description: "Expert-led tours to discover hidden gems and local culture"
    },
    {
      icon: Camera,
      title: "Photo Packages",
      description: "Professional photography to capture your precious memories"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Adventure Traveler",
      text: "An absolutely incredible experience! The attention to detail and customer service exceeded all expectations. Every moment was perfectly planned.",
      rating: 5,
      image: "SJ"
    },
    {
      name: "Ahmed Hassan",
      role: "Business Executive",
      text: "Professional, reliable, and truly transformative. This journey changed my perspective completely and provided memories I'll treasure forever.",
      rating: 5,
      image: "AH"
    },
    {
      name: "Maria Garcia",
      role: "Family Traveler",
      text: "Perfect for families! Every aspect was handled with care, making our trip stress-free and memorable for both adults and children.",
      rating: 5,
      image: "MG"
    }
  ];

  const destinations = [
    { name: "Dubai", description: "Luxury & Adventure", price: "From $1,299" },
    { name: "Maldives", description: "Paradise Resort", price: "From $2,499" },
    { name: "Istanbul", description: "Cultural Heritage", price: "From $899" },
    { name: "Bali", description: "Tropical Escape", price: "From $1,199" }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: currentTheme.backgroundColor }}>
      {/* Hero Section */}
      <section 
        className="relative py-32 text-white overflow-hidden min-h-screen flex items-center"
        style={{ 
          background: `linear-gradient(135deg, ${currentTheme.primaryColor}E6, ${currentTheme.gradientTo || currentTheme.accentColor}E6)` 
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-8 inline-flex items-center justify-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full">
                  <Sparkles className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Premium Travel Experiences</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                  Discover
                  <span className="block text-5xl md:text-6xl bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    {currentSite.name}
                  </span>
                </h1>
                {currentSite.description && (
                  <p className="text-xl mb-12 opacity-90 max-w-2xl leading-relaxed">
                    {currentSite.description}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link to={`/${currentSite.slug}/packages`}>
                    <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-6 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all">
                      <Plane className="w-6 h-6 mr-3" />
                      Explore Packages
                      <ArrowRight className="w-5 h-5 ml-3" />
                    </Button>
                  </Link>
                  <Link to={`/${currentSite.slug}/contact`}>
                    <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-12 py-6 text-lg rounded-full backdrop-blur-sm">
                      <MessageSquare className="w-6 h-6 mr-3" />
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-3xl backdrop-blur-sm"></div>
                  <div className="p-8 space-y-6">
                    {stats.slice(0, 2).map((stat, index) => (
                      <div key={index} className="flex items-center space-x-4 bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <stat.icon className="w-12 h-12 text-white" />
                        <div>
                          <div className="text-3xl font-bold">{stat.number}</div>
                          <div className="text-sm opacity-80">{stat.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8" style={{ borderColor: currentTheme.borderColor }}>
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-10 h-10 mx-auto mb-4" style={{ color: currentTheme.accentColor }} />
                  <div 
                    className="text-3xl font-bold mb-2"
                    style={{ color: currentTheme.primaryColor }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 
              className="text-5xl font-bold mb-6"
              style={{ color: currentTheme.primaryColor }}
            >
              Popular Destinations
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: currentTheme.textColor }}>
              Explore our most sought-after destinations, each offering unique experiences and unforgettable memories.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((destination, index) => (
              <Card 
                key={index}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-4 group"
                style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}
              >
                <div 
                  className="h-48 relative"
                  style={{ 
                    background: `linear-gradient(45deg, ${currentTheme.primaryColor}40, ${currentTheme.accentColor}40)` 
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Globe className="w-16 h-16 text-white opacity-80" />
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-2xl font-bold">{destination.name}</div>
                    <div className="text-sm opacity-90">{destination.description}</div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <span 
                      className="text-2xl font-bold"
                      style={{ color: currentTheme.accentColor }}
                    >
                      {destination.price}
                    </span>
                    <Button 
                      size="sm"
                      style={{ backgroundColor: currentTheme.primaryColor }}
                      className="text-white group-hover:scale-105 transition-transform"
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20" style={{ backgroundColor: `${currentTheme.primaryColor}05` }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 
              className="text-5xl font-bold mb-6"
              style={{ color: currentTheme.primaryColor }}
            >
              Our Services
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: currentTheme.textColor }}>
              Comprehensive travel solutions designed to make your journey seamless and extraordinary.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={index}
                  className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                  style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}
                >
                  <CardHeader className="pb-4">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${currentTheme.accentColor}20` }}
                    >
                      <IconComponent 
                        className="w-10 h-10"
                        style={{ color: currentTheme.accentColor }}
                      />
                    </div>
                    <CardTitle style={{ color: currentTheme.primaryColor }}>
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p style={{ color: currentTheme.textColor }}>
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 
                className="text-5xl font-bold mb-8"
                style={{ color: currentTheme.primaryColor }}
              >
                Why Choose {currentSite.name}?
              </h2>
              <p className="text-xl mb-8" style={{ color: currentTheme.textColor }}>
                We're not just a travel company – we're your partners in creating life-changing experiences that stay with you forever.
              </p>
              <div className="space-y-6">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${currentTheme.accentColor}20` }}
                      >
                        <IconComponent 
                          className="w-6 h-6"
                          style={{ color: currentTheme.accentColor }}
                        />
                      </div>
                      <div>
                        <h3 
                          className="text-xl font-semibold mb-2"
                          style={{ color: currentTheme.primaryColor }}
                        >
                          {feature.title}
                        </h3>
                        <p style={{ color: currentTheme.textColor }}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <div 
                className="aspect-square rounded-3xl flex items-center justify-center text-white relative overflow-hidden"
                style={{ 
                  background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${currentTheme.gradientTo})` 
                }}
              >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="text-center relative z-10">
                  <TrendingUp className="w-24 h-24 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold mb-4">Growing Community</h3>
                  <p className="text-lg opacity-90">Join thousands of satisfied travelers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20" style={{ backgroundColor: `${currentTheme.accentColor}10` }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 
              className="text-5xl font-bold mb-6"
              style={{ color: currentTheme.primaryColor }}
            >
              What Our Travelers Say
            </h2>
            <p className="text-xl" style={{ color: currentTheme.textColor }}>
              Real experiences from real travelers who trusted us with their dreams
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}
              >
                <CardContent className="p-8">
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5 fill-current"
                        style={{ color: currentTheme.accentColor }}
                      />
                    ))}
                  </div>
                  <p className="mb-6 italic text-lg leading-relaxed" style={{ color: currentTheme.textColor }}>
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: currentTheme.primaryColor }}
                    >
                      {testimonial.image}
                    </div>
                    <div>
                      <div 
                        className="font-semibold text-lg"
                        style={{ color: currentTheme.primaryColor }}
                      >
                        {testimonial.name}
                      </div>
                      <div 
                        className="text-sm"
                        style={{ color: `${currentTheme.textColor}80` }}
                      >
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card 
            className="overflow-hidden"
            style={{ 
              background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${currentTheme.gradientTo})`,
              borderColor: 'transparent'
            }}
          >
            <CardContent className="p-16 text-center text-white">
              <Gift className="w-16 h-16 mx-auto mb-8" />
              <h2 className="text-5xl font-bold mb-6">Limited Time Offer</h2>
              <p className="text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                Book your dream vacation now and save up to 30% on selected packages. Don't miss out on this incredible opportunity!
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to={`/${currentSite.slug}/packages`}>
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-6 text-xl rounded-full shadow-2xl">
                    <ArrowRight className="w-6 h-6 mr-3" />
                    View Offers
                  </Button>
                </Link>
                <Link to={`/${currentSite.slug}/contact`}>
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-12 py-6 text-xl rounded-full">
                    <Phone className="w-6 h-6 mr-3" />
                    Call Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20" style={{ backgroundColor: `${currentTheme.primaryColor}10` }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 
              className="text-4xl font-bold mb-6"
              style={{ color: currentTheme.primaryColor }}
            >
              Stay Updated with Latest Travel Deals
            </h2>
            <p className="text-xl mb-8" style={{ color: currentTheme.textColor }}>
              Subscribe to our newsletter and never miss exclusive offers, travel tips, and destination guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border-2 focus:outline-none focus:ring-2 text-lg"
                style={{ borderColor: currentTheme.borderColor }}
              />
              <Button 
                style={{ backgroundColor: currentTheme.accentColor }}
                className="text-white px-12 py-4 rounded-full text-lg hover:scale-105 transition-transform"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-sm opacity-70" style={{ color: currentTheme.textColor }}>
              Join 10,000+ travelers getting exclusive deals
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 
            className="text-6xl font-bold mb-8"
            style={{ color: currentTheme.primaryColor }}
          >
            Ready for Your Next Adventure?
          </h2>
          <p className="text-2xl mb-12 max-w-4xl mx-auto" style={{ color: currentTheme.textColor }}>
            Let {currentSite.name} turn your travel dreams into reality. Contact us today and start planning your perfect getaway.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
            {currentSite.contactEmail && (
              <div className="flex items-center justify-center gap-3 bg-white rounded-2xl p-6 shadow-lg" style={{ borderColor: currentTheme.borderColor }}>
                <Mail className="w-8 h-8" style={{ color: currentTheme.accentColor }} />
                <span className="text-lg font-medium" style={{ color: currentTheme.textColor }}>
                  {currentSite.contactEmail}
                </span>
              </div>
            )}
            {currentSite.contactPhone && (
              <div className="flex items-center justify-center gap-3 bg-white rounded-2xl p-6 shadow-lg" style={{ borderColor: currentTheme.borderColor }}>
                <Phone className="w-8 h-8" style={{ color: currentTheme.accentColor }} />
                <span className="text-lg font-medium" style={{ color: currentTheme.textColor }}>
                  {currentSite.contactPhone}
                </span>
              </div>
            )}
          </div>
          <Link to={`/${currentSite.slug}/contact`}>
            <Button 
              size="lg"
              style={{ backgroundColor: currentTheme.accentColor }}
              className="text-white px-16 py-8 text-2xl rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
            >
              <Heart className="w-8 h-8 mr-4" />
              Start Your Journey
              <ArrowRight className="w-8 h-8 ml-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SiteIndex;
