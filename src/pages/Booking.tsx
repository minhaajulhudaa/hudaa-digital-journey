
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import BookingForm from '@/components/BookingForm';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get('package');
  const packageTitle = searchParams.get('title');
  const packagePrice = parseInt(searchParams.get('price') || '0');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12">
      <div className="container mx-auto px-4">
        <BookingForm 
          packageId={packageId || undefined}
          packageTitle={packageTitle || undefined}
          packagePrice={packagePrice}
          onSuccess={() => {
            // Handle successful booking
            console.log('Booking successful');
          }}
        />
      </div>
    </div>
  );
};

export default Booking;
