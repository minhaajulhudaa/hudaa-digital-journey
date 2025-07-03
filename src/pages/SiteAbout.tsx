
import React from 'react';
import { useSite } from '@/hooks/useSite';
import { useTheme } from '@/hooks/useTheme';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Users, Award, Clock, Shield, ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const SiteAbout = () => {
  const { currentSite } = useSite();
  const { currentTheme } = useTheme();

  if (!currentSite || !currentTheme) return null;

  const features = [
    {
      icon: Award,
      title: "Professional Excellence",
      description: "Years of experience delivering exceptional travel experiences worldwide."
    },
    {
      icon: Shield,
      title: "Trusted & Secure",
      description: "Your safety and security are our top priorities in every journey."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Dedicated professionals committed to making your travel dreams come true."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance throughout your entire travel experience."
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: currentTheme.backgroundColor }}>
      {/* Hero Section */}
      <section 
        className="relative py-32 text-white overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${currentTheme.gradientTo || currentTheme.accentColor})` 
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8 inline-flex items-center justify-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full">
              <Users className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Our Story & Values</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              About
              <span className="block text-5xl md:text-6xl bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {currentSite.name}
              </span>
            </h1>
            {currentSite.description && (
              <p className="text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
                {currentSite.description}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to={`/${currentSite.slug}/packages`}>
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-6 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all">
                  <ArrowRight className="w-5 h-5 mr-3" />
                  Explore Our Packages
                </Button>
              </Link>
              <Link to={`/${currentSite.slug}/contact`}>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-12 py-6 text-lg rounded-full backdrop-blur-sm">
                  <MessageSquare className="w-5 h-5 mr-3" />
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}>
              <CardContent className="p-12">
                <h2 
                  className="text-3xl font-bold mb-8 text-center"
                  style={{ color: currentTheme.primaryColor }}
                >
                  Our Story
                </h2>
                <div className="prose max-w-none" style={{ color: currentTheme.textColor }}>
                  <p className="text-lg leading-relaxed mb-6">
                    Welcome to {currentSite.name}, where your journey begins with a dream and transforms into an unforgettable reality. 
                    Founded with a passion for creating meaningful travel experiences, we have been serving travelers from around the world 
                    with dedication, expertise, and genuine care.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    Our commitment goes beyond just booking trips – we craft experiences that touch your heart, broaden your perspective, 
                    and create lasting memories. Every destination we offer, every service we provide, is carefully curated to ensure 
                    your journey exceeds expectations.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Whether you're seeking spiritual enlightenment, cultural immersion, or simply a peaceful getaway, 
                    {currentSite.name} is your trusted companion every step of the way.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16" style={{ backgroundColor: `${currentTheme.accentColor}10` }}>
        <div className="container mx-auto px-4">
          <h2 
            className="text-3xl font-bold text-center mb-12"
            style={{ color: currentTheme.primaryColor }}
          >
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="text-center hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}
                >
                  <CardContent className="p-8">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ backgroundColor: `${currentTheme.accentColor}20` }}
                    >
                      <IconComponent 
                        className="w-8 h-8"
                        style={{ color: currentTheme.accentColor }}
                      />
                    </div>
                    <h3 
                      className="font-semibold text-xl mb-4"
                      style={{ color: currentTheme.primaryColor }}
                    >
                      {feature.title}
                    </h3>
                    <p style={{ color: currentTheme.textColor }}>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 
              className="text-3xl font-bold text-center mb-12"
              style={{ color: currentTheme.primaryColor }}
            >
              Get In Touch
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {currentSite.contactEmail && (
                <Card 
                  className="text-center hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}
                >
                  <CardContent className="p-8">
                    <Mail 
                      className="w-12 h-12 mx-auto mb-4"
                      style={{ color: currentTheme.accentColor }}
                    />
                    <h3 
                      className="font-semibold text-lg mb-2"
                      style={{ color: currentTheme.primaryColor }}
                    >
                      Email Us
                    </h3>
                    <p style={{ color: currentTheme.textColor }}>
                      {currentSite.contactEmail}
                    </p>
                  </CardContent>
                </Card>
              )}

              {currentSite.contactPhone && (
                <Card 
                  className="text-center hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}
                >
                  <CardContent className="p-8">
                    <Phone 
                      className="w-12 h-12 mx-auto mb-4"
                      style={{ color: currentTheme.accentColor }}
                    />
                    <h3 
                      className="font-semibold text-lg mb-2"
                      style={{ color: currentTheme.primaryColor }}
                    >
                      Call Us
                    </h3>
                    <p style={{ color: currentTheme.textColor }}>
                      {currentSite.contactPhone}
                    </p>
                  </CardContent>
                </Card>
              )}

              <Card 
                className="text-center hover:shadow-lg transition-shadow"
                style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}
              >
                <CardContent className="p-8">
                  <MapPin 
                    className="w-12 h-12 mx-auto mb-4"
                    style={{ color: currentTheme.accentColor }}
                  />
                  <h3 
                    className="font-semibold text-lg mb-2"
                    style={{ color: currentTheme.primaryColor }}
                  >
                    Visit Us
                  </h3>
                  <p style={{ color: currentTheme.textColor }}>
                    Contact us for office locations
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Link to={`/${currentSite.slug}/contact`}>
                <Button 
                  size="lg"
                  style={{ backgroundColor: currentTheme.accentColor }}
                  className="text-white"
                >
                  Send Us a Message
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SiteAbout;
