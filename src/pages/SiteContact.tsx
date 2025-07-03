
import React, { useState } from 'react';
import { useSite } from '@/hooks/useSite';
import { useTheme } from '@/hooks/useTheme';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Globe, Users, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SiteContact = () => {
  const { currentSite } = useSite();
  const { currentTheme } = useTheme();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  if (!currentSite || !currentTheme) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours."
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our travel experts",
      value: currentSite.contactPhone || "+1 (555) 123-4567",
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us your travel inquiries",
      value: currentSite.contactEmail || "info@example.com",
      action: "Send Email"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant support online",
      value: "Available 9 AM - 6 PM",
      action: "Start Chat"
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ];

  const faqs = [
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking at least 2-3 months in advance for international trips to get the best deals and availability."
    },
    {
      question: "Do you offer travel insurance?",
      answer: "Yes, we offer comprehensive travel insurance options to protect your investment and provide peace of mind."
    },
    {
      question: "Can you help with visa requirements?",
      answer: "Absolutely! Our team assists with visa applications and ensures you have all necessary documentation."
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
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 inline-flex items-center justify-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full">
              <MessageCircle className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Get In Touch</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Contact
              <span className="block text-5xl md:text-6xl bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {currentSite.name}
              </span>
            </h1>
            <p className="text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Ready to start planning your dream trip? Our travel experts are here to help you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-6 text-lg rounded-full shadow-2xl">
                <Phone className="w-6 h-6 mr-3" />
                Call Now
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-12 py-6 text-lg rounded-full backdrop-blur-sm">
                <Mail className="w-6 h-6 mr-3" />
                Send Email
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 -mt-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card 
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}
              >
                <CardContent className="p-8">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: `${currentTheme.accentColor}20` }}
                  >
                    <method.icon 
                      className="w-8 h-8"
                      style={{ color: currentTheme.accentColor }}
                    />
                  </div>
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ color: currentTheme.primaryColor }}
                  >
                    {method.title}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: currentTheme.textColor }}>
                    {method.description}
                  </p>
                  <p className="font-semibold mb-4" style={{ color: currentTheme.primaryColor }}>
                    {method.value}
                  </p>
                  <Button 
                    size="sm"
                    style={{ backgroundColor: currentTheme.accentColor }}
                    className="text-white"
                  >
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div>
              <Card style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}>
                <CardHeader>
                  <CardTitle 
                    className="text-3xl font-bold"
                    style={{ color: currentTheme.primaryColor }}
                  >
                    Send Us a Message
                  </CardTitle>
                  <p style={{ color: currentTheme.textColor }}>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          className="h-12"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          required
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        placeholder="Tell us about your travel plans, preferences, and any questions you have..."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full text-white py-6 text-lg rounded-full"
                      style={{ backgroundColor: currentTheme.accentColor }}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-3" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Hours */}
              <Card style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}>
                <CardHeader>
                  <CardTitle 
                    className="text-2xl font-bold flex items-center"
                    style={{ color: currentTheme.primaryColor }}
                  >
                    <Clock className="w-6 h-6 mr-3" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {officeHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span 
                          className="font-medium"
                          style={{ color: currentTheme.textColor }}
                        >
                          {schedule.day}
                        </span>
                        <span 
                          className="font-semibold"
                          style={{ color: currentTheme.primaryColor }}
                        >
                          {schedule.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}>
                <CardHeader>
                  <CardTitle 
                    className="text-2xl font-bold flex items-center"
                    style={{ color: currentTheme.primaryColor }}
                  >
                    <MapPin className="w-6 h-6 mr-3" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4" style={{ color: currentTheme.textColor }}>
                    Visit our office for personalized travel consultation and planning services.
                  </p>
                  <div className="space-y-2" style={{ color: currentTheme.textColor }}>
                    <p>123 Travel Street</p>
                    <p>Downtown District</p>
                    <p>City, State 12345</p>
                  </div>
                  <Button 
                    className="mt-4"
                    variant="outline"
                    style={{ borderColor: currentTheme.borderColor }}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    View on Map
                  </Button>
                </CardContent>
              </Card>

              {/* Why Contact Us */}
              <Card style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}>
                <CardHeader>
                  <CardTitle 
                    className="text-2xl font-bold flex items-center"
                    style={{ color: currentTheme.primaryColor }}
                  >
                    <Users className="w-6 h-6 mr-3" />
                    Why Contact Us?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3" style={{ color: currentTheme.textColor }}>
                    <li className="flex items-start">
                      <ArrowRight className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" style={{ color: currentTheme.accentColor }} />
                      Personalized travel recommendations
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" style={{ color: currentTheme.accentColor }} />
                      Expert knowledge of destinations
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" style={{ color: currentTheme.accentColor }} />
                      Best prices and exclusive deals
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" style={{ color: currentTheme.accentColor }} />
                      24/7 support during your travels
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20" style={{ backgroundColor: `${currentTheme.accentColor}10` }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 
                className="text-4xl font-bold mb-4"
                style={{ color: currentTheme.primaryColor }}
              >
                Frequently Asked Questions
              </h2>
              <p className="text-xl" style={{ color: currentTheme.textColor }}>
                Quick answers to common questions about our services
              </p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card 
                  key={index}
                  style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}
                >
                  <CardContent className="p-6">
                    <h3 
                      className="text-lg font-semibold mb-3"
                      style={{ color: currentTheme.primaryColor }}
                    >
                      {faq.question}
                    </h3>
                    <p style={{ color: currentTheme.textColor }}>
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
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
            Ready to Plan Your Perfect Trip?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Don't wait any longer. Contact {currentSite.name} today and let us help you create unforgettable memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-6 text-lg rounded-full">
              <Phone className="w-5 h-5 mr-2" />
              Call Us Now
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-12 py-6 text-lg rounded-full">
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Live Chat
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SiteContact;
