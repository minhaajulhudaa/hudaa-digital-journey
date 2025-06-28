
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Phone, Mail, User, CreditCard, Shield, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import sdk from '@/lib/sdk';

interface BookingFormProps {
  packageId?: string;
  packageTitle?: string;
  packagePrice?: number;
  onSuccess?: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ 
  packageId, 
  packageTitle, 
  packagePrice = 0,
  onSuccess 
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    emergencyContact: '',
    
    // Travel Details
    travelers: 1,
    departureDate: '',
    roomPreference: 'shared',
    specialRequests: '',
    
    // Additional Services
    visaAssistance: false,
    airportTransfer: false,
    travelInsurance: false,
    
    // Agreement
    termsAccepted: false,
    marketingConsent: false
  });
  
  const [errors, setErrors] = useState<any>({});
  
  const validateStep = (stepNumber: number) => {
    const newErrors: any = {};
    
    if (stepNumber === 1) {
      if (!formData.customerName) newErrors.customerName = 'Full name is required';
      if (!formData.customerEmail) newErrors.customerEmail = 'Email is required';
      if (!formData.customerPhone) newErrors.customerPhone = 'Phone number is required';
      if (!formData.emergencyContact) newErrors.emergencyContact = 'Emergency contact is required';
    }
    
    if (stepNumber === 2) {
      if (!formData.departureDate) newErrors.departureDate = 'Departure date is required';
      if (formData.travelers < 1) newErrors.travelers = 'At least one traveler required';
    }
    
    if (stepNumber === 3) {
      if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const calculateTotal = () => {
    let total = packagePrice * formData.travelers;
    if (formData.visaAssistance) total += 150 * formData.travelers;
    if (formData.airportTransfer) total += 50 * formData.travelers;
    if (formData.travelInsurance) total += 75 * formData.travelers;
    return total;
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    setLoading(true);
    try {
      const bookingData = {
        packageId,
        packageTitle,
        ...formData,
        totalAmount: calculateTotal(),
        status: 'pending',
        bookingDate: new Date().toISOString(),
        paymentStatus: 'pending'
      };
      
      await sdk.insert('bookings', bookingData);
      
      toast({
        title: "Booking Submitted Successfully!",
        description: "We'll contact you within 24 hours to confirm your booking details."
      });
      
      if (onSuccess) onSuccess();
      
      // Reset form
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        emergencyContact: '',
        travelers: 1,
        departureDate: '',
        roomPreference: 'shared',
        specialRequests: '',
        visaAssistance: false,
        airportTransfer: false,
        travelInsurance: false,
        termsAccepted: false,
        marketingConsent: false
      });
      setStep(1);
      
    } catch (error) {
      console.error('Booking submission error:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error submitting your booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-0 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-800 text-white">
          <CardTitle className="text-2xl flex items-center">
            <Calendar className="w-6 h-6 mr-3" />
            Book Your Sacred Journey
          </CardTitle>
          {packageTitle && (
            <p className="text-green-100 text-lg">{packageTitle}</p>
          )}
        </CardHeader>

        <CardContent className="p-8">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  step >= stepNumber ? 'bg-green-600' : 'bg-gray-300'
                }`}>
                  {step > stepNumber ? <CheckCircle className="w-5 h-5" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-20 h-1 mx-2 ${
                    step > stepNumber ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-green-900">Personal Information</h3>
                <p className="text-gray-600">Please provide your contact details</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="customerName"
                      value={formData.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      placeholder="Enter your full name"
                      className="pl-10"
                    />
                  </div>
                  {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="customerEmail"
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10"
                    />
                  </div>
                  {errors.customerEmail && <p className="text-red-500 text-sm">{errors.customerEmail}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerPhone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="customerPhone"
                      value={formData.customerPhone}
                      onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                      placeholder="Enter your phone number"
                      className="pl-10"
                    />
                  </div>
                  {errors.customerPhone && <p className="text-red-500 text-sm">{errors.customerPhone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      placeholder="Emergency contact number"
                      className="pl-10"
                    />
                  </div>
                  {errors.emergencyContact && <p className="text-red-500 text-sm">{errors.emergencyContact}</p>}
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Travel Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-green-900">Travel Details</h3>
                <p className="text-gray-600">Configure your journey preferences</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="travelers">Number of Travelers *</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="travelers"
                      type="number"
                      min="1"
                      value={formData.travelers}
                      onChange={(e) => handleInputChange('travelers', parseInt(e.target.value))}
                      className="pl-10"
                    />
                  </div>
                  {errors.travelers && <p className="text-red-500 text-sm">{errors.travelers}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="departureDate">Preferred Departure Date *</Label>
                  <Input
                    id="departureDate"
                    type="date"
                    value={formData.departureDate}
                    onChange={(e) => handleInputChange('departureDate', e.target.value)}
                  />
                  {errors.departureDate && <p className="text-red-500 text-sm">{errors.departureDate}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roomPreference">Room Preference</Label>
                  <Select value={formData.roomPreference} onValueChange={(value) => handleInputChange('roomPreference', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shared">Shared Room</SelectItem>
                      <SelectItem value="single">Single Room</SelectItem>
                      <SelectItem value="double">Double Room</SelectItem>
                      <SelectItem value="family">Family Room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Textarea
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  placeholder="Any special dietary requirements, mobility needs, or other requests..."
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-green-900">Additional Services</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="visaAssistance"
                      checked={formData.visaAssistance}
                      onCheckedChange={(checked) => handleInputChange('visaAssistance', checked)}
                    />
                    <Label htmlFor="visaAssistance" className="flex-1">
                      Visa Assistance (+$150 per person)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="airportTransfer"
                      checked={formData.airportTransfer}
                      onCheckedChange={(checked) => handleInputChange('airportTransfer', checked)}
                    />
                    <Label htmlFor="airportTransfer" className="flex-1">
                      Airport Transfer (+$50 per person)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="travelInsurance"
                      checked={formData.travelInsurance}
                      onCheckedChange={(checked) => handleInputChange('travelInsurance', checked)}
                    />
                    <Label htmlFor="travelInsurance" className="flex-1">
                      Travel Insurance (+$75 per person)
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Previous
                </Button>
                <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
                  Review Booking
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirmation */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-green-900">Review & Confirm</h3>
                <p className="text-gray-600">Please review your booking details</p>
              </div>

              {/* Booking Summary */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-green-900 mb-4">Booking Summary</h4>
                  <div className="space-y-2">
                    {packageTitle && <p><strong>Package:</strong> {packageTitle}</p>}
                    <p><strong>Name:</strong> {formData.customerName}</p>
                    <p><strong>Email:</strong> {formData.customerEmail}</p>
                    <p><strong>Phone:</strong> {formData.customerPhone}</p>
                    <p><strong>Travelers:</strong> {formData.travelers}</p>
                    <p><strong>Departure:</strong> {formData.departureDate}</p>
                    <p><strong>Room:</strong> {formData.roomPreference}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Cost Breakdown */}
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-green-900 mb-4">Cost Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Package Cost ({formData.travelers} travelers)</span>
                      <span>${(packagePrice * formData.travelers).toLocaleString()}</span>
                    </div>
                    {formData.visaAssistance && (
                      <div className="flex justify-between">
                        <span>Visa Assistance</span>
                        <span>+${(150 * formData.travelers).toLocaleString()}</span>
                      </div>
                    )}
                    {formData.airportTransfer && (
                      <div className="flex justify-between">
                        <span>Airport Transfer</span>
                        <span>+${(50 * formData.travelers).toLocaleString()}</span>
                      </div>
                    )}
                    {formData.travelInsurance && (
                      <div className="flex justify-between">
                        <span>Travel Insurance</span>
                        <span>+${(75 * formData.travelers).toLocaleString()}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-bold text-green-900">
                      <span>Total Amount</span>
                      <span>${calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="termsAccepted"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => handleInputChange('termsAccepted', checked)}
                  />
                  <Label htmlFor="termsAccepted" className="text-sm">
                    I accept the <a href="/terms" className="text-green-600 hover:underline">Terms and Conditions</a> and <a href="/privacy" className="text-green-600 hover:underline">Privacy Policy</a> *
                  </Label>
                </div>
                {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}

                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="marketingConsent"
                    checked={formData.marketingConsent}
                    onCheckedChange={(checked) => handleInputChange('marketingConsent', checked)}
                  />
                  <Label htmlFor="marketingConsent" className="text-sm">
                    I would like to receive travel updates and special offers via email
                  </Label>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold">Secure Booking Process</p>
                    <p>Your booking will be confirmed within 24 hours. Payment will be processed securely after confirmation.</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Previous
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {loading ? 'Submitting...' : 'Confirm Booking'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;
