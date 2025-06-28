
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Star, Globe, Heart, Shield, Clock, Award, CheckCircle } from 'lucide-react';

const About = () => {
  const milestones = [
    { year: '2008', title: 'Founded', description: 'Started with a vision to guide pilgrims' },
    { year: '2012', title: '1000+ Pilgrims', description: 'Served our first thousand pilgrims' },
    { year: '2016', title: 'International Expansion', description: 'Extended services to multiple countries' },
    { year: '2020', title: 'Digital Innovation', description: 'Launched online platform and virtual guidance' },
    { year: '2024', title: '15+ Years Strong', description: 'Continuing our mission with excellence' },
  ];

  const team = [
    {
      name: 'Sheikh Abdullah Rahman',
      role: 'Spiritual Director',
      experience: '20+ years',
      description: 'Leading Islamic scholar with extensive Hajj and Umrah expertise',
    },
    {
      name: 'Fatima Al-Zahra',
      role: 'Operations Manager',
      experience: '12+ years',
      description: 'Expert in travel logistics and pilgrim care coordination',
    },
    {
      name: 'Omar Hassan',
      role: 'Travel Coordinator',
      experience: '15+ years',
      description: 'Specialist in visa processing and travel arrangements',
    },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Spiritual Guidance',
      description: 'Providing authentic Islamic guidance throughout your journey',
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Your safety and comfort are our highest priorities',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building lasting bonds among fellow pilgrims',
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'Delivering exceptional service in every aspect',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-900 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About Minhaajul-Hudaa</h1>
            <p className="text-xl text-green-100 leading-relaxed">
              For over 15 years, we've been dedicated to guiding pilgrims on their sacred journeys, 
              combining spiritual wisdom with modern travel expertise to create transformative experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="bg-green-100 text-green-800 mb-6">Our Mission</Badge>
              <h2 className="text-4xl font-bold text-green-900 mb-6">
                Guiding You on the Path of Hudaa
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We believe that every pilgrimage is a deeply personal spiritual journey. Our mission is to 
                provide comprehensive support, authentic guidance, and premium services that allow you to 
                focus entirely on your spiritual growth and connection with Allah.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">5000+</div>
                  <div className="text-sm text-gray-600">Pilgrims Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-green-600 to-green-800 rounded-3xl flex items-center justify-center text-white">
                <div className="text-center">
                  <Globe className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">Serving Pilgrims Worldwide</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to serving thousands of pilgrims worldwide
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center mb-12 last:mb-0">
                <div className="flex-shrink-0 w-24 text-right mr-8">
                  <div className="text-2xl font-bold text-green-600">{milestone.year}</div>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-green-600 rounded-full mr-8"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center group hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <value.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to your spiritual journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center group hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">{member.name}</h3>
                  <Badge className="bg-green-100 text-green-800 mb-4">{member.role}</Badge>
                  <p className="text-sm text-green-600 mb-4">{member.experience} experience</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-900 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Begin Your Sacred Journey?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Join thousands of satisfied pilgrims who have trusted us with their spiritual journey
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-900 hover:bg-green-50 px-12">
                Start Your Journey
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-12">
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
