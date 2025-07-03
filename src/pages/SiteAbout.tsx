
import React from 'react';
import { useSite } from '@/hooks/useSite';
import { useTheme } from '@/hooks/useTheme';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Users, Award, Clock, Shield, ArrowRight, MessageSquare, Star, Globe, Heart, Target, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const SiteAbout = () => {
  const { currentSite } = useSite();
  const { currentTheme } = useTheme();

  if (!currentSite || !currentTheme) return null;

  const features = [
    {
      icon: Award,
      title: "Excellence in Service",
      description: "Years of experience delivering exceptional travel experiences worldwide with unmatched attention to detail."
    },
    {
      icon: Shield,
      title: "Trust & Safety First",
      description: "Your safety and security are our top priorities in every journey, backed by comprehensive insurance and support."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Dedicated professionals and local guides committed to making your travel dreams come true with personalized service."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance throughout your entire travel experience, ensuring peace of mind at every step."
    }
  ];

  const stats = [
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "5000+", label: "Happy Travelers", icon: Users },
    { number: "150+", label: "Destinations", icon: Globe },
    { number: "99%", label: "Satisfaction Rate", icon: Star }
  ];

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "Every decision we make is centered around creating the best possible experience for our travelers."
    },
    {
      icon: Target,
      title: "Quality Focus",
      description: "We never compromise on quality, ensuring every aspect of your journey meets the highest standards."
    },
    {
      icon: TrendingUp,
      title: "Continuous Growth",
      description: "We constantly evolve and improve our services based on feedback and industry best practices."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Embracing new technologies and methods to make travel planning and experiences more enjoyable."
    }
  ];

  const milestones = [
    { year: "2008", title: "Foundation", description: "Started our journey with a simple vision: make travel dreams accessible to everyone." },
    { year: "2012", title: "First Milestone", description: "Served our first 1000 travelers and expanded our destination portfolio." },
    { year: "2016", title: "Global Expansion", description: "Opened offices in multiple countries and partnered with international operators." },
    { year: "2020", title: "Digital Transformation", description: "Launched our digital platform and virtual consultation services." },
    { year: "2024", title: "Industry Leader", description: "Recognized as a leading travel company with numerous awards and certifications." }
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
              <span className="text-sm font-medium">Our Story & Mission</span>
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

      {/* Stats Section */}
      <section className="py-16 -mt-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={index}
                className="text-center shadow-lg hover:shadow-xl transition-shadow"
                style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}
              >
                <CardContent className="p-8">
                  <stat.icon 
                    className="w-12 h-12 mx-auto mb-4"
                    style={{ color: currentTheme.accentColor }}
                  />
                  <div 
                    className="text-4xl font-bold mb-2"
                    style={{ color: currentTheme.primaryColor }}
                  >
                    {stat.number}
                  </div>
                  <div style={{ color: currentTheme.textColor }}>
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 
                  className="text-5xl font-bold mb-8"
                  style={{ color: currentTheme.primaryColor }}
                >
                  Our Story
                </h2>
                <div className="space-y-6" style={{ color: currentTheme.textColor }}>
                  <p className="text-xl leading-relaxed">
                    Welcome to {currentSite.name}, where your journey begins with a dream and transforms into an unforgettable reality. 
                    Founded with a passion for creating meaningful travel experiences, we have been serving travelers from around the world 
                    with dedication, expertise, and genuine care.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Our commitment goes beyond just booking trips – we craft experiences that touch your heart, broaden your perspective, 
                    and create lasting memories. Every destination we offer, every service we provide, is carefully curated to ensure 
                    your journey exceeds expectations.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Whether you're seeking spiritual enlightenment, cultural immersion, adventure, or simply a peaceful getaway, 
                    {currentSite.name} is your trusted companion every step of the way.
                  </p>
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
                    <Globe className="w-24 h-24 mx-auto mb-6" />
                    <h3 className="text-3xl font-bold mb-4">Global Reach</h3>
                    <p className="text-lg opacity-90">Connecting travelers worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20" style={{ backgroundColor: `${currentTheme.accentColor}10` }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl font-bold mb-4"
              style={{ color: currentTheme.primaryColor }}
            >
              Our Journey Through Time
            </h2>
            <p className="text-xl" style={{ color: currentTheme.textColor }}>
              Key milestones that shaped our growth and success
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start mb-12 last:mb-0">
                <div className="flex-shrink-0 w-32 text-right mr-8">
                  <div 
                    className="text-3xl font-bold px-4 py-2 rounded-full inline-block"
                    style={{ 
                      backgroundColor: currentTheme.accentColor,
                      color: 'white'
                    }}
                  >
                    {milestone.year}
                  </div>
                </div>
                <div 
                  className="flex-shrink-0 w-6 h-6 rounded-full mr-8 mt-2"
                  style={{ backgroundColor: currentTheme.primaryColor }}
                ></div>
                <div className="flex-1">
                  <h3 
                    className="text-2xl font-bold mb-3"
                    style={{ color: currentTheme.primaryColor }}
                  >
                    {milestone.title}
                  </h3>
                  <p 
                    className="text-lg leading-relaxed"
                    style={{ color: currentTheme.textColor }}
                  >
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl font-bold mb-4"
              style={{ color: currentTheme.primaryColor }}
            >
              Why Choose Us
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: currentTheme.textColor }}>
              What sets us apart in the travel industry and makes us your best choice
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                  style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}
                >
                  <CardContent className="p-8">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ backgroundColor: `${currentTheme.accentColor}20` }}
                    >
                      <IconComponent 
                        className="w-10 h-10"
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

      {/* Values Section */}
      <section className="py-20" style={{ backgroundColor: `${currentTheme.primaryColor}05` }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl font-bold mb-4"
              style={{ color: currentTheme.primaryColor }}
            >
              Our Core Values
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: currentTheme.textColor }}>
              The principles that guide our decisions and shape our company culture
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card 
                  key={index} 
                  className="text-center hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}
                >
                  <CardContent className="p-8">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
                      style={{ backgroundColor: `${currentTheme.primaryColor}20` }}
                    >
                      <IconComponent 
                        className="w-8 h-8"
                        style={{ color: currentTheme.primaryColor }}
                      />
                    </div>
                    <h3 
                      className="font-semibold text-xl mb-4"
                      style={{ color: currentTheme.primaryColor }}
                    >
                      {value.title}
                    </h3>
                    <p style={{ color: currentTheme.textColor }}>
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 
              className="text-4xl font-bold text-center mb-12"
              style={{ color: currentTheme.primaryColor }}
            >
              Get In Touch
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
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

            <div className="text-center">
              <Link to={`/${currentSite.slug}/contact`}>
                <Button 
                  size="lg"
                  style={{ backgroundColor: currentTheme.accentColor }}
                  className="text-white px-12 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                >
                  <MessageSquare className="w-6 h-6 mr-3" />
                  Send Us a Message
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section 
        className="py-20 text-white"
        style={{ 
          background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${currentTheme.gradientTo})` 
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Journey with {currentSite.name}?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of satisfied travelers who have trusted us with their dreams. 
            Let us help you create memories that will last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={`/${currentSite.slug}/packages`}>
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-6 text-lg rounded-full">
                <ArrowRight className="w-5 h-5 mr-2" />
                View Packages
              </Button>
            </Link>
            <Link to={`/${currentSite.slug}/contact`}>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-12 py-6 text-lg rounded-full">
                Get Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SiteAbout;
