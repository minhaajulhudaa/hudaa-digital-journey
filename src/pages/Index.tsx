import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plane, Globe, Users, Zap, Star, ArrowRight, Building, Palette } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Globe,
      title: 'Multi-Site Platform',
      description: 'Create and manage multiple travel sites from one dashboard'
    },
    {
      icon: Palette,
      title: '15 Beautiful Themes',
      description: 'Choose from 15 professionally designed themes for your travel site'
    },
    {
      icon: Users,
      title: 'Customer Management',
      description: 'Advanced CRM tools for managing bookings and customer relationships'
    },
    {
      icon: Zap,
      title: 'Quick Setup',
      description: 'Get your travel site online in minutes with our easy setup process'
    }
  ];

  const existingSites = [
    {
      name: 'Minhaaj Ul Hudaa',
      slug: 'minhaajulhudaa',
      description: 'Premium Hajj and Umrah services'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Launch Your Travel Platform Today
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Create professional travel websites with our comprehensive SaaS platform. 
              Manage bookings, content, and customers all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4">
                <Link to="/register-site">
                  Create Your Site
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-4">
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools you need to run a successful travel business online.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Existing Sites Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Existing Travel Sites
            </h2>
            <p className="text-xl text-gray-600">
              Check out some of the travel sites already using our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {existingSites.map((site, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Building className="w-8 h-8 text-green-600 mb-2" />
                  <CardTitle className="text-xl">{site.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{site.description}</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/${site.slug}`}>
                      Visit Site
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Travel Business?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of travel professionals who trust our platform to power their business.
          </p>
          <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4">
            <Link to="/register-site">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
