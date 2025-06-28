
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, Star, ChevronRight } from 'lucide-react';
import sdk from '@/lib/sdk';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  type: string;
  featured: boolean;
  price: number;
  status: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await sdk.get<Event>('events');
      setEvents(data.filter(event => event.status === 'active'));
    } catch (error) {
      console.error('Error loading events:', error);
      // Load sample data if SDK fails
      setEvents(sampleEvents);
    } finally {
      setLoading(false);
    }
  };

  const sampleEvents: Event[] = [
    {
      id: '1',
      title: 'Pre-Hajj Spiritual Preparation Workshop',
      description: 'Comprehensive preparation for the sacred journey of Hajj, covering rituals, duas, and spiritual readiness.',
      date: '2024-07-15',
      time: '10:00 AM',
      location: 'Main Conference Hall',
      capacity: 150,
      registered: 127,
      type: 'workshop',
      featured: true,
      price: 0,
      status: 'active'
    },
    {
      id: '2',
      title: 'Umrah Preparation Course',
      description: '3-day intensive course covering all aspects of Umrah pilgrimage with practical demonstrations.',
      date: '2024-07-20',
      time: '9:00 AM',
      location: 'Islamic Center',
      capacity: 100,
      registered: 85,
      type: 'course',
      featured: true,
      price: 50,
      status: 'active'
    },
    {
      id: '3',
      title: 'Monthly Islamic Lecture Series',
      description: 'Weekly lectures on Islamic teachings and spiritual development by renowned scholars.',
      date: '2024-07-25',
      time: '7:00 PM',
      location: 'Virtual & In-Person',
      capacity: 200,
      registered: 145,
      type: 'lecture',
      featured: false,
      price: 0,
      status: 'active'
    },
    {
      id: '4',
      title: 'Family Pilgrimage Planning Session',
      description: 'Special session focused on planning family pilgrimages with children and elderly members.',
      date: '2024-08-01',
      time: '2:00 PM',
      location: 'Community Center',
      capacity: 80,
      registered: 45,
      type: 'planning',
      featured: true,
      price: 25,
      status: 'active'
    },
    {
      id: '5',
      title: 'Zakat and Charity Workshop',
      description: 'Understanding the principles of Zakat and effective charitable giving during pilgrimage.',
      date: '2024-08-10',
      time: '11:00 AM',
      location: 'Online Webinar',
      capacity: 300,
      registered: 210,
      type: 'webinar',
      featured: false,
      price: 0,
      status: 'active'
    },
    {
      id: '6',
      title: 'Pre-Departure Orientation',
      description: 'Final preparation session before departure including travel tips, documentation, and group coordination.',
      date: '2024-08-15',
      time: '6:00 PM',
      location: 'Airport Conference Room',
      capacity: 120,
      registered: 98,
      type: 'orientation',
      featured: true,
      price: 0,
      status: 'active'
    }
  ];

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.type === filter);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAvailableSpots = (event: Event) => {
    return event.capacity - event.registered;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-900 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Events & Workshops</h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Join our comprehensive preparation programs, spiritual workshops, and educational events 
              designed to enhance your pilgrimage experience and deepen your spiritual understanding.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-green-900">Upcoming Events</h2>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {filteredEvents.length} Events
              </Badge>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {['all', 'workshop', 'course', 'lecture', 'webinar', 'planning'].map((type) => (
                <Button
                  key={type}
                  variant={filter === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(type)}
                  className={filter === type ? 'bg-green-600' : 'border-green-600 text-green-600'}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {filteredEvents.filter(event => event.featured).length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-green-900 mb-12 text-center">Featured Events</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.filter(event => event.featured).map((event) => (
                <Card key={event.id} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-green-50 overflow-hidden">
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-green-600 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="border-green-600 text-green-600 capitalize">
                        {event.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-green-900 group-hover:text-green-700 transition-colors">
                      {event.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-green-600" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-green-600" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-green-600" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2 text-green-600" />
                        {getAvailableSpots(event)} spots available
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          {event.price > 0 ? (
                            <span className="text-2xl font-bold text-green-900">${event.price}</span>
                          ) : (
                            <span className="text-2xl font-bold text-green-900">Free</span>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            {event.registered}/{event.capacity} registered
                          </div>
                          <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700"
                        disabled={getAvailableSpots(event) === 0}
                      >
                        {getAvailableSpots(event) === 0 ? 'Event Full' : 'Register Now'}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Events */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-900 mb-12 text-center">All Events</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-green-600 text-green-600 capitalize">
                      {event.type}
                    </Badge>
                    {event.featured && (
                      <Badge className="bg-green-600 text-white text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg text-green-900 group-hover:text-green-700 transition-colors">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{event.description}</p>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-3 h-3 mr-2 text-green-600" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-3 h-3 mr-2 text-green-600" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-3 h-3 mr-2 text-green-600" />
                      {event.location}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        {event.price > 0 ? (
                          <span className="text-lg font-bold text-green-900">${event.price}</span>
                        ) : (
                          <span className="text-lg font-bold text-green-900">Free</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-600">
                        {getAvailableSpots(event)} spots left
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="w-full bg-green-600 hover:bg-green-700 text-sm"
                      disabled={getAvailableSpots(event) === 0}
                    >
                      {getAvailableSpots(event) === 0 ? 'Event Full' : 'Register'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-900 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Stay Updated on Upcoming Events
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Never miss our preparation workshops, spiritual lectures, and community events. 
              Subscribe to receive notifications about new events and early registration access.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-900 hover:bg-green-50 px-12">
                Subscribe to Updates
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-12">
                View Calendar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
