
import React from 'react';
import { useSite } from '@/hooks/useSite';
import { useTheme } from '@/hooks/useTheme';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, MapPin, Star, Users, Award, Clock, Shield, Calendar, MessageSquare, ArrowRight, CheckCircle, Globe, Mail, Phone } from 'lucide-react';
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
    { number: "500+", label: "Happy Travelers" },
    { number: "50+", label: "Destinations" },
    { number: "10+", label: "Years Experience" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Travel Enthusiast",
      text: "An absolutely incredible experience! The attention to detail and customer service exceeded all expectations.",
      rating: 5
    },
    {
      name: "Ahmed Hassan",
      role: "Business Executive",
      text: "Professional, reliable, and truly transformative. This journey changed my perspective completely.",
      rating: 5
    },
    {
      name: "Maria Garcia",
      role: "Family Traveler",
      text: "Perfect for families! Every aspect was handled with care, making our trip stress-free and memorable.",
      rating: 5
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
            <div className="mb-8 inline-flex items-center justify-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
              <Globe className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Premium Travel Experiences</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-bold mb-8 leading-tight">
              Welcome to
              <span className="block text-6xl md:text-7xl bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
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
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
      </section>

      {/* Features Banner */}
      <section className="py-8" style={{ backgroundColor: `${currentTheme.accentColor}20` }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6" style={{ color: currentTheme.accentColor }} />
              <span className="font-semibold" style={{ color: currentTheme.textColor }}>
                Trusted by 500+ Travelers
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6" style={{ color: currentTheme.accentColor }} />
              <span className="font-semibold" style={{ color: currentTheme.textColor }}>
                50+ Destinations Worldwide
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6" style={{ color: currentTheme.accentColor }} />
              <span className="font-semibold" style={{ color: currentTheme.textColor }}>
                24/7 Customer Support
              </span>
            </div>
          </div>
        </div>
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
                  <div 
                    className="text-4xl font-bold mb-2"
                    style={{ color: currentTheme.accentColor }}
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

      {/* Features Section */}
      <section className="py-16" style={{ backgroundColor: `${currentTheme.accentColor}10` }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 
              className="text-4xl font-bold mb-4"
              style={{ color: currentTheme.primaryColor }}
            >
              Why Choose {currentSite.name}
            </h2>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: currentTheme.textColor }}>
              We provide exceptional travel experiences with professional service and attention to detail.
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
                  <CardHeader className="pb-4">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: `${currentTheme.accentColor}20` }}
                    >
                      <IconComponent 
                        className="w-8 h-8"
                        style={{ color: currentTheme.accentColor }}
                      />
                    </div>
                    <CardTitle style={{ color: currentTheme.primaryColor }}>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card 
            className="overflow-hidden"
            style={{ 
              background: `linear-gradient(135deg, ${currentTheme.primaryColor}, ${currentTheme.gradientTo})`,
              borderColor: 'transparent'
            }}
          >
            <CardContent className="p-12 text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of satisfied travelers who have discovered amazing experiences with {currentSite.name}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={`/${currentSite.slug}/packages`}>
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    View Packages
                  </Button>
                </Link>
                <Link to={`/${currentSite.slug}/about`}>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                    Learn More
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16" style={{ backgroundColor: currentTheme.backgroundColor }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 
              className="text-4xl font-bold mb-4"
              style={{ color: currentTheme.primaryColor }}
            >
              What Our Travelers Say
            </h2>
            <p className="text-xl" style={{ color: currentTheme.textColor }}>
              Real experiences from real travelers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="hover:shadow-lg transition-shadow"
                style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}
              >
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5 fill-current"
                        style={{ color: currentTheme.accentColor }}
                      />
                    ))}
                  </div>
                  <p className="mb-4 italic" style={{ color: currentTheme.textColor }}>
                    "{testimonial.text}"
                  </p>
                  <div>
                    <div 
                      className="font-semibold"
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
                </CardContent>
              </Card>
            ))}
          </div>
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
              Subscribe to our newsletter and never miss exclusive offers and travel tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                style={{ borderColor: currentTheme.borderColor }}
              />
              <Button 
                style={{ backgroundColor: currentTheme.accentColor }}
                className="text-white px-8 py-3 rounded-lg"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 
            className="text-5xl font-bold mb-8"
            style={{ color: currentTheme.primaryColor }}
          >
            Ready to Start Your Journey?
          </h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto" style={{ color: currentTheme.textColor }}>
            Contact us today to plan your perfect travel experience with {currentSite.name}.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
            {currentSite.contactEmail && (
              <div className="flex items-center justify-center gap-3">
                <Mail className="w-6 h-6" style={{ color: currentTheme.accentColor }} />
                <span className="text-lg font-medium" style={{ color: currentTheme.textColor }}>
                  {currentSite.contactEmail}
                </span>
              </div>
            )}
            {currentSite.contactPhone && (
              <div className="flex items-center justify-center gap-3">
                <Phone className="w-6 h-6" style={{ color: currentTheme.accentColor }} />
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
              className="text-white px-12 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <MessageSquare className="w-6 h-6 mr-3" />
              Get In Touch
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SiteIndex;
