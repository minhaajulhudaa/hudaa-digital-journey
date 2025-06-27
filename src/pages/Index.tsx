
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Users, Globe, Shield, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-green-100 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-800">MINHAAJUL-HUDAA</h1>
              <p className="text-xs text-green-600">Travel & Tour</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/packages" className="text-green-700 hover:text-green-900 transition-colors">Packages</Link>
            <Link to="/courses" className="text-green-700 hover:text-green-900 transition-colors">Courses</Link>
            <Link to="/blog" className="text-green-700 hover:text-green-900 transition-colors">Blog</Link>
            <Link to="/about" className="text-green-700 hover:text-green-900 transition-colors">About</Link>
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
              Contact Us
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800 px-4 py-2 text-sm">
                  Guiding you on the path of Hudaa
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold text-green-900 leading-tight">
                  Your Sacred
                  <span className="block text-green-600">Journey Begins</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  Experience the spiritual transformation of Hajj and Umrah with expert guidance, 
                  premium accommodations, and complete peace of mind.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg">
                  Request Information
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-800">1000+</div>
                  <div className="text-sm text-gray-600">Pilgrims Guided</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-800">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-800">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-300 rounded-3xl transform rotate-6 opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="aspect-[4/5] bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center text-white">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                      <Heart className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold">Sacred Journey</h3>
                    <p className="text-green-100 px-6">Experience the transformative power of pilgrimage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-900 mb-4">Our Sacred Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive spiritual journey packages designed to make your pilgrimage memorable and meaningful
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-900 mb-4">Hajj & Umrah Packages</h3>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• Premium accommodations near Haramain</li>
                  <li>• Experienced Sheikh guidance</li>
                  <li>• Complete visa arrangements</li>
                  <li>• Pre-travel training courses</li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Explore Packages
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-900 mb-4">Visa Services</h3>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• Saudi Arabia work & visit visas</li>
                  <li>• Arab countries documentation</li>
                  <li>• European visa assistance</li>
                  <li>• Pre-departure orientation</li>
                </ul>
                <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-amber-50 to-white">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-900 mb-4">Religious Training</h3>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li>• Pre-travel Islamic courses</li>
                  <li>• Hajj & Umrah rituals training</li>
                  <li>• Islamic lectures & seminars</li>
                  <li>• Spiritual guidance sessions</li>
                </ul>
                <Button variant="outline" className="w-full border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                  View Courses
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-green-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Minhaajul-Hudaa?</h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Your spiritual journey deserves the highest level of care, expertise, and dedication
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trusted Experience</h3>
              <p className="text-green-100">15+ years of guiding pilgrims on their sacred journeys</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Guidance</h3>
              <p className="text-green-100">Qualified Sheikhs and experienced tour guides</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
              <p className="text-green-100">Round-the-clock assistance throughout your journey</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Star className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-green-100">High-quality accommodations and services</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-green-900 mb-6">
              Ready to Begin Your Sacred Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Take the first step towards your spiritual transformation. Our expert team is here to guide you every step of the way.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-lg">
                Book Your Package
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 px-12 py-4 text-lg">
                Talk to an Advisor
              </Button>
            </div>

            <div className="mt-12 p-8 bg-white rounded-2xl shadow-lg border border-green-100">
              <h3 className="text-2xl font-bold text-green-900 mb-4">Get Started Today</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Choose Package</h4>
                  <p className="text-sm text-gray-600">Select your ideal Hajj or Umrah package</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Book & Prepare</h4>
                  <p className="text-sm text-gray-600">Complete booking and join our training courses</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Begin Journey</h4>
                  <p className="text-sm text-gray-600">Embark on your transformative spiritual experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Connected</h3>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Receive spiritual insights, travel updates, and exclusive offers directly in your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button className="bg-white text-green-900 hover:bg-green-50 px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold">MINHAAJUL-HUDAA</h4>
                  <p className="text-xs text-green-300">Travel & Tour</p>
                </div>
              </div>
              <p className="text-green-300 text-sm">
                Guiding pilgrims on their sacred journey with care, expertise, and devotion.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-sm text-green-300">
                <li><Link to="/packages" className="hover:text-white transition-colors">Hajj Packages</Link></li>
                <li><Link to="/packages" className="hover:text-white transition-colors">Umrah Packages</Link></li>
                <li><Link to="/visa" className="hover:text-white transition-colors">Visa Services</Link></li>
                <li><Link to="/courses" className="hover:text-white transition-colors">Training Courses</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <ul className="space-y-2 text-sm text-green-300">
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/events" className="hover:text-white transition-colors">Events</Link></li>
                <li><Link to="/tips" className="hover:text-white transition-colors">Travel Tips</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <div className="space-y-2 text-sm text-green-300">
                <p>📧 info@minhaajulhudaa.com</p>
                <p>📞 +1 (555) 123-4567</p>
                <p>📍 123 Islamic Center, City</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-green-800 mt-8 pt-8 text-center text-sm text-green-300">
            <p>&copy; 2024 Minhaajul-Hudaa Travel & Tour. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
