import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useSite } from '@/hooks/useSite';
import { useTheme } from '@/hooks/useTheme';
import ThemeSelector from '@/components/ThemeSelector';
import { Plane, Globe, Users, Zap, Check, ArrowRight } from 'lucide-react';

const SiteRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    ownerEmail: '',
    ownerName: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
    primaryColor: '#004225',
    currency: 'USD',
    timezone: 'UTC',
    theme: 'islamic-luxury'
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { createSite } = useSite();
  const { availableThemes } = useTheme();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate slug from name
    if (field === 'name') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({
        ...prev,
        slug
      }));
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.slug || !formData.ownerEmail) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleThemeSelect = (themeId: string) => {
    console.log('Theme selected:', themeId);
    setFormData(prev => ({ ...prev, theme: themeId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.theme) {
      toast({
        title: "Validation Error",
        description: "Please select a theme",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);

    try {
      console.log('Creating site with data:', formData);
      const site = await createSite(formData);
      
      toast({
        title: "Success!",
        description: `Your travel platform "${formData.name}" has been created successfully!`
      });

      // Redirect to the new site
      navigate(`/${site.slug}`);
    } catch (error) {
      console.error('Error creating site:', error);
      toast({
        title: "Error",
        description: "Failed to create your travel platform. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    "Professional travel website with your branding",
    "Complete booking and reservation system",
    "Package and tour management",
    "Customer management dashboard",
    "Content management system",
    "Multi-language support",
    "Payment integration ready",
    "SEO optimized pages",
    "Mobile responsive design",
    "Live content editing tools"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-green-600 p-4 rounded-full">
              <Plane className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Launch Your Travel Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create your own branded travel and tour website with powerful management tools in minutes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Features Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Everything You Need to Succeed
              </h2>
              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center p-6">
                <Globe className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">Global Reach</h3>
                <p className="text-sm text-gray-600 mt-2">Serve customers worldwide with multi-currency support</p>
              </Card>
              <Card className="text-center p-6">
                <Users className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">Customer Management</h3>
                <p className="text-sm text-gray-600 mt-2">Advanced CRM tools for better customer relationships</p>
              </Card>
              <Card className="text-center p-6">
                <Zap className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">Quick Setup</h3>
                <p className="text-sm text-gray-600 mt-2">Get online in minutes with our easy setup process</p>
              </Card>
            </div>
          </div>

          {/* Registration Form */}
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-gray-900">
                Create Your Platform
              </CardTitle>
              <p className="text-center text-gray-600">
                Step {step} of 3: {step === 1 ? 'Basic Information' : step === 2 ? 'Choose Your Theme' : 'Review & Create'}
              </p>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="space-y-6">
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Company Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your Travel Company"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="slug">URL Slug *</Label>
                      <Input
                        id="slug"
                        type="text"
                        value={formData.slug}
                        onChange={(e) => handleInputChange('slug', e.target.value)}
                        placeholder="your-company"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Your site will be: yourdomain.com/{formData.slug || 'your-company'}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ownerEmail">Owner Email *</Label>
                      <Input
                        id="ownerEmail"
                        type="email"
                        value={formData.ownerEmail}
                        onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                        placeholder="owner@company.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="ownerName">Owner Name</Label>
                      <Input
                        id="ownerName"
                        type="text"
                        value={formData.ownerName}
                        onChange={(e) => handleInputChange('ownerName', e.target.value)}
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Company Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Brief description of your travel services..."
                      rows={3}
                    />
                  </div>

                  <Button onClick={handleNextStep} className="w-full">
                    Next: Choose Theme
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Choose Your Theme</h3>
                    <p className="text-gray-600 mb-6">
                      Select a theme that best represents your brand and travel style
                    </p>
                  </div>
                  
                  <ThemeSelector 
                    showPreview={true}
                    onThemeSelect={handleThemeSelect}
                    selectedThemeId={formData.theme}
                  />

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={handlePrevStep} className="flex-1">
                      Back
                    </Button>
                    <Button onClick={handleNextStep} className="flex-1" disabled={!formData.theme}>
                      Next: Review
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Review Your Settings</h3>
                    <div className="space-y-3 text-sm">
                      <div><strong>Company:</strong> {formData.name}</div>
                      <div><strong>URL:</strong> /{formData.slug}</div>
                      <div><strong>Owner:</strong> {formData.ownerEmail}</div>
                      <div><strong>Selected Theme:</strong> {availableThemes.find(t => t.id === formData.theme)?.name || 'Default'}</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={handlePrevStep} className="flex-1">
                      Back
                    </Button>
                    <Button 
                      onClick={handleSubmit}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      disabled={loading}
                    >
                      {loading ? 'Creating...' : 'Create My Platform'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SiteRegistration;
