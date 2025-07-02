
import React, { useState } from 'react';
import { useSite } from '@/hooks/useSite';
import { useTheme } from '@/hooks/useTheme';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import sdk from '@/lib/sdk';

const SiteContact = () => {
  const { currentSite } = useSite();
  const { currentTheme } = useTheme();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  if (!currentSite || !currentTheme) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sdk.insert('contact_messages', {
        ...formData,
        siteId: currentSite.id,
        siteName: currentSite.name,
        submittedAt: new Date().toISOString(),
        status: 'new'
      });

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon."
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Failed to Send",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            We're here to help you plan your perfect journey. Get in touch with our travel experts today.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}>
              <CardHeader>
                <CardTitle style={{ color: currentTheme.primaryColor }}>Get In Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentSite.contactEmail && (
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 mt-1" style={{ color: currentTheme.accentColor }} />
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: currentTheme.primaryColor }}>Email</h3>
                      <p style={{ color: currentTheme.textColor }}>{currentSite.contactEmail}</p>
                    </div>
                  </div>
                )}

                {currentSite.contactPhone && (
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 mt-1" style={{ color: currentTheme.accentColor }} />
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: currentTheme.primaryColor }}>Phone</h3>
                      <p style={{ color: currentTheme.textColor }}>{currentSite.contactPhone}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 mt-1" style={{ color: currentTheme.accentColor }} />
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: currentTheme.primaryColor }}>Office</h3>
                    <p style={{ color: currentTheme.textColor }}>
                      Contact us for office locations and visiting hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 mt-1" style={{ color: currentTheme.accentColor }} />
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: currentTheme.primaryColor }}>Business Hours</h3>
                    <div style={{ color: currentTheme.textColor }}>
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4" style={{ color: currentTheme.primaryColor }}>
                  Need Immediate Help?
                </h3>
                <p className="mb-4" style={{ color: currentTheme.textColor }}>
                  For urgent travel assistance or emergency support, please call us directly.
                </p>
                <Button 
                  className="w-full text-white"
                  style={{ backgroundColor: currentTheme.accentColor }}
                >
                  Emergency Contact
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card style={{ backgroundColor: currentTheme.cardColor, borderColor: currentTheme.borderColor }}>
              <CardHeader>
                <CardTitle className="text-2xl" style={{ color: currentTheme.primaryColor }}>
                  Send Us a Message
                </CardTitle>
                <p style={{ color: currentTheme.textColor }}>
                  Fill out the form below and we'll get back to you as soon as possible.
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
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={(value) => setFormData({...formData, inquiryType: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="booking">Booking Question</SelectItem>
                          <SelectItem value="support">Customer Support</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={6}
                      placeholder="Please provide details about your inquiry..."
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={loading}
                    className="w-full text-white"
                    style={{ backgroundColor: currentTheme.accentColor }}
                  >
                    {loading ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteContact;
