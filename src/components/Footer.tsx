
import React from 'react';
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-green-950 text-white">
      {/* Newsletter Section */}
      <div className="bg-green-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Connected on Your Spiritual Journey</h3>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Receive spiritual insights, travel updates, exclusive offers, and preparation guidance directly in your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
            />
            <Button className="bg-white text-green-900 hover:bg-green-50 px-8">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-green-200 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">MINHAAJUL-HUDAA</h4>
                  <p className="text-sm text-green-300">Travel & Tour</p>
                </div>
              </div>
              <p className="text-green-300 mb-6 leading-relaxed">
                Guiding pilgrims on their sacred journey with care, expertise, and devotion. 
                For over 15 years, we've been the trusted partner for thousands of pilgrims 
                seeking meaningful spiritual experiences.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-green-300">
                  <Phone className="w-5 h-5 mr-3 text-green-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-green-300">
                  <Mail className="w-5 h-5 mr-3 text-green-400" />
                  <span>info@minhaajulhudaa.com</span>
                </div>
                <div className="flex items-center text-green-300">
                  <MapPin className="w-5 h-5 mr-3 text-green-400" />
                  <span>123 Islamic Center Drive, City, State 12345</span>
                </div>
              </div>
            </div>
            
            {/* Services */}
            <div>
              <h5 className="font-semibold text-lg mb-6">Our Services</h5>
              <ul className="space-y-3 text-green-300">
                <li><Link to="/packages" className="hover:text-white transition-colors">Hajj Packages</Link></li>
                <li><Link to="/packages" className="hover:text-white transition-colors">Umrah Packages</Link></li>
                <li><Link to="/packages" className="hover:text-white transition-colors">Visa Services</Link></li>
                <li><Link to="/courses" className="hover:text-white transition-colors">Training Courses</Link></li>
                <li><Link to="/events" className="hover:text-white transition-colors">Religious Events</Link></li>
                <li><Link to="/knowledge-base" className="hover:text-white transition-colors">Travel Guidance</Link></li>
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h5 className="font-semibold text-lg mb-6">Resources</h5>
              <ul className="space-y-3 text-green-300">
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog & Articles</Link></li>
                <li><Link to="/knowledge-base" className="hover:text-white transition-colors">Travel Tips</Link></li>
                <li><Link to="/knowledge-base" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/events" className="hover:text-white transition-colors">Upcoming Events</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Social Media & Bottom */}
          <div className="border-t border-green-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex space-x-6 mb-4 md:mb-0">
                <a href="#" className="text-green-300 hover:text-white transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-green-300 hover:text-white transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-green-300 hover:text-white transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-green-300 hover:text-white transition-colors">
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
              
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-green-300">
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <span>&copy; 2024 Minhaajul-Hudaa Travel & Tour. All rights reserved.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
