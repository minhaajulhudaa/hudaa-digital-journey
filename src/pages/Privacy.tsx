
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-800 text-white">
              <CardTitle className="text-3xl">Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="p-8 prose prose-green max-w-none">
              <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-green-900 mb-4">1. Information We Collect</h2>
                <p>We collect information you provide directly to us, such as when you:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Create an account or make a booking</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Contact us for support</li>
                  <li>Participate in surveys or feedback</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-green-900 mb-4">2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Process and manage your bookings</li>
                  <li>Provide customer support</li>
                  <li>Send important travel updates</li>
                  <li>Improve our services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-green-900 mb-4">3. Information Sharing</h2>
                <p>We do not sell, trade, or rent your personal information to third parties. We may share information in these situations:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>With service providers who assist in our operations</li>
                  <li>When required by law or to protect our rights</li>
                  <li>With your explicit consent</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-green-900 mb-4">4. Data Security</h2>
                <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-green-900 mb-4">5. Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-green-900 mb-4">6. Cookies</h2>
                <p>We use cookies to enhance your browsing experience and analyze website traffic. You can control cookie preferences through your browser settings.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-green-900 mb-4">7. Contact Us</h2>
                <p>If you have questions about this privacy policy, please contact us at:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Email: privacy@minhaajulhudaa.com</li>
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

export default Privacy;
