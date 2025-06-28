
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-800 text-white">
              <CardTitle className="text-3xl">Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="p-8 prose prose-green max-w-none">
              <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-green-900 mb-4">1. Acceptance of Terms</h2>
                <p>By accessing and using Minhaajul-Hudaa Travel & Tour services, you accept and agree to be bound by the terms and provision of this agreement.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-green-900 mb-4">2. Booking and Payment</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>All bookings are subject to availability and confirmation</li>
                  <li>A deposit is required to secure your booking</li>
                  <li>Full payment is due 60 days before departure</li>
                  <li>Prices are subject to change until booking is confirmed</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-green-900 mb-4">3. Cancellation Policy</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Cancellations 90+ days before departure: 10% fee</li>
                  <li>Cancellations 60-89 days before departure: 25% fee</li>
                  <li>Cancellations 30-59 days before departure: 50% fee</li>
                  <li>Cancellations less than 30 days: No refund</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-green-900 mb-4">4. Travel Documents</h2>
                <p>Travelers are responsible for ensuring they have valid passports and required visas. We provide assistance but cannot guarantee visa approval.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-green-900 mb-4">5. Health and Safety</h2>
                <p>Travelers must inform us of any medical conditions or dietary requirements. We recommend travel insurance for all participants.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-green-900 mb-4">6. Limitation of Liability</h2>
                <p>Our liability is limited to the cost of the services provided. We are not responsible for circumstances beyond our control.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-green-900 mb-4">7. Contact Information</h2>
                <p>For questions about these terms, please contact us at:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Email: info@minhaajulhudaa.com</li>
                  <li>Phone: +1 (555) 123-4567</li>
                </ul>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;
