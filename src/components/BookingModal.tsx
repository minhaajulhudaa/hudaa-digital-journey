
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useSite } from '@/hooks/useSite';
import { useTheme } from '@/hooks/useTheme';
import { Calendar, Users, CreditCard, Phone, Mail, User } from 'lucide-react';
import sdk from '@/lib/sdk';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData?: {
    id: string;
    title: string;
    price: number;
    duration?: string;
  };
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, packageData }) => {
  const { currentSite } = useSite();
  const { currentTheme } = useTheme();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    travelers: 1,
    travelDate: '',
    specialRequests: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData = {
        ...formData,
        packageId: packageData?.id,
        packageTitle: packageData?.title,
        packagePrice: packageData?.price,
        siteId: currentSite?.id,
        siteName: currentSite?.name,
        status: 'pending',
        bookingDate: new Date().toISOString(),
        totalAmount: (packageData?.price || 0) * formData.travelers
      };

      await sdk.insert('bookings', bookingData);

      toast({
        title: "Booking Request Sent!",
        description: "We'll contact you soon to confirm your booking details."
      });

      onClose();
      setFormData({
        customerName: '',
        email: '',
        phone: '',
        travelers: 1,
        travelDate: '',
        specialRequests: '',
        emergencyContact: '',
        emergencyPhone: ''
      });
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle 
            className="text-2xl flex items-center gap-2"
            style={{ color: currentTheme?.primaryColor || '#004225' }}
          >
            <Calendar className="w-6 h-6" />
            Book Your Journey
          </DialogTitle>
        </DialogHeader>

        {packageData && (
          <div 
            className="border rounded-lg p-4 mb-6"
            style={{ borderColor: currentTheme?.borderColor || '#e5e7eb' }}
          >
            <h3 className="font-semibold text-lg mb-2">{packageData.title}</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{packageData.duration}</span>
              <span 
                className="text-2xl font-bold"
                style={{ color: currentTheme?.accentColor || '#22c55e' }}
              >
                ${packageData.price.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>
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
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="travelers" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Number of Travelers
              </Label>
              <Select
                value={formData.travelers.toString()}
                onValueChange={(value) => setFormData({...formData, travelers: parseInt(value)})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'Person' : 'People'}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="travelDate">Preferred Travel Date *</Label>
            <Input
              id="travelDate"
              type="date"
              value={formData.travelDate}
              onChange={(e) => setFormData({...formData, travelDate: e.target.value})}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
              <Input
                id="emergencyPhone"
                type="tel"
                value={formData.emergencyPhone}
                onChange={(e) => setFormData({...formData, emergencyPhone: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests or Requirements</Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
              placeholder="Dietary restrictions, accessibility needs, special occasions, etc."
              rows={3}
            />
          </div>

          {packageData && (
            <div 
              className="border-t pt-4"
              style={{ borderColor: currentTheme?.borderColor || '#e5e7eb' }}
            >
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Amount:</span>
                <span style={{ color: currentTheme?.accentColor || '#22c55e' }}>
                  ${((packageData.price || 0) * formData.travelers).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {formData.travelers} × ${packageData.price.toLocaleString()}
              </p>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="flex-1"
              style={{ backgroundColor: currentTheme?.accentColor || '#22c55e' }}
            >
              {loading ? 'Sending...' : 'Send Booking Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
