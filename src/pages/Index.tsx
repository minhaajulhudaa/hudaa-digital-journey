import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Users, Globe, Shield, Clock, Heart, CheckCircle, Phone, Calendar, Award, Zap, PlayCircle, TrendingUp, MapPin, BookOpen, Plane, MessageSquare, Camera, Video, Download, ChevronRight, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [counters, setCounters] = useState({ pilgrims: 0, years: 0, satisfaction: 0 });
  const [activeService, setActiveService] = useState(0);
  const [emailSubscription, setEmailSubscription] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Animate counters on page load
  useEffect(() => {
    const animateCounters = () => {
      const targets = { pilgrims: 5000, years: 15, satisfaction: 98 };
      const duration = 2000;
      const steps = 50;
      const increment = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setCounters({
          pilgrims: Math.floor(targets.pilgrims * progress),
          years: Math.floor(targets.years * progress),
          satisfaction: Math.floor(targets.satisfaction * progress),
        });
        
        if (step >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, increment);
    };
    
    animateCounters();
  }, []);

  const handleBookNow = (packageType: string = '') => {
    const params = new URLSearchParams();
    if (packageType) params.set('type', packageType);
    navigate(`/booking?${params.toString()}`);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSubscription) return;
    
    toast({
      title: "Subscription Successful!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmailSubscription('');
  };

  const enhancedServices = [
    {
      id: 'hajj-umrah',
      icon: Heart,
      title: 'Hajj & Umrah Packages',
      subtitle: 'Sacred Journey Experiences',
      description: 'Embark on the journey of a lifetime with our meticulously crafted pilgrimage packages',
      features: [
        { icon: MapPin, text: 'Premium accommodations near Haramain', highlight: 'Closest to Masjid al-Haram' },
        { icon: Users, text: 'Experienced Sheikh guidance', highlight: '24/7 spiritual support' },
        { icon: Shield, text: 'Complete visa arrangements', highlight: 'Hassle-free processing' },
        { icon: BookOpen, text: 'Pre-travel training courses', highlight: 'Comprehensive preparation' },
        { icon: Plane, text: 'Visitation itineraries', highlight: 'Historical & spiritual sites' },
        { icon: Phone, text: '24/7 assistance', highlight: 'Round-the-clock support' }
      ],
      stats: [
        { number: '5000+', label: 'Pilgrims Served' },
        { number: '98%', label: 'Satisfaction Rate' },
        { number: '15+', label: 'Years Experience' }
      ],
      cta: 'Start Your Sacred Journey',
      ctaSecondary: 'View Packages',
      link: '/packages',
      bookingType: 'hajj-umrah',
      gradient: 'from-green-600 via-green-700 to-green-800',
      bgPattern: 'bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]',
      testimonial: '"The most transformative experience of my life. Every detail was perfect."',
      testimonialAuthor: 'Ahmed Rahman, New York'
    },
    {
      id: 'visa-services',
      icon: Globe,
      title: 'Visa Services',
      subtitle: 'Global Travel Solutions',
      description: 'Navigate international travel with confidence through our comprehensive visa services',
      features: [
        { icon: Globe, text: 'Saudi Arabia work & visit visas', highlight: 'Multiple visa types' },
        { icon: MapPin, text: 'Arab countries documentation', highlight: 'Regional expertise' },
        { icon: Plane, text: 'European visa assistance', highlight: 'Schengen & UK visas' },
        { icon: BookOpen, text: 'Pre-departure orientation', highlight: 'Travel preparation' },
        { icon: Heart, text: 'Religious guidance', highlight: 'Islamic travel advice' },
        { icon: Zap, text: 'Fast-track processing', highlight: 'Expedited services' }
      ],
      stats: [
        { number: '95%', label: 'Approval Rate' },
        { number: '3-7', label: 'Days Processing' },
        { number: '50+', label: 'Countries Covered' }
      ],
      cta: 'Apply for Visa',
      ctaSecondary: 'Learn More',
      link: '/contact',
      bookingType: 'visa',
      gradient: 'from-blue-600 via-blue-700 to-blue-800',
      bgPattern: 'bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1),transparent_50%)]',
      testimonial: '"Incredibly efficient visa processing. Saved me weeks of hassle."',
      testimonialAuthor: 'Fatima Hassan, London'
    },
    {
      id: 'religious-training',
      icon: BookOpen,
      title: 'Religious Training',
      subtitle: 'Spiritual Education & Growth',
      description: 'Deepen your Islamic knowledge and prepare spiritually for your sacred journey',
      features: [
        { icon: BookOpen, text: 'Pre-travel Islamic courses', highlight: 'Hajj & Umrah preparation' },
        { icon: Heart, text: 'Hajj & Umrah rituals training', highlight: 'Step-by-step guidance' },
        { icon: MessageSquare, text: 'Islamic lectures & seminars', highlight: 'Renowned scholars' },
        { icon: Users, text: 'Spiritual guidance sessions', highlight: 'Personal mentorship' },
        { icon: MessageSquare, text: 'Group discussions', highlight: 'Community learning' },
        { icon: Award, text: 'Certificate programs', highlight: 'Recognized credentials' }
      ],
      stats: [
        { number: '100+', label: 'Courses Available' },
        { number: '20+', label: 'Expert Instructors' },
        { number: '1000+', label: 'Students Trained' }
      ],
      cta: 'Begin Learning',
      ctaSecondary: 'View Courses',
      link: '/courses',
      bookingType: 'course',
      gradient: 'from-amber-600 via-orange-600 to-red-600',
      bgPattern: 'bg-[radial-gradient(circle_at_50%_80%,rgba(245,158,11,0.1),transparent_50%)]',
      testimonial: '"The knowledge I gained prepared me perfectly for my pilgrimage."',
      testimonialAuthor: 'Omar Malik, Toronto'
    }
  ];

  const services = [
    {
      icon: Heart,
      title: 'Hajj & Umrah Packages',
      features: [
        'Premium accommodations near Haramain',
        'Experienced Sheikh guidance',
        'Complete visa arrangements',
        'Pre-travel training courses',
        'Visitation itineraries',
        '24/7 assistance'
      ],
      cta: 'Explore Packages',
      link: '/packages',
      gradient: 'from-green-600 to-green-800'
    },
    {
      icon: Globe,
      title: 'Visa Services',
      features: [
        'Saudi Arabia work & visit visas',
        'Arab countries documentation',
        'European visa assistance',
        'Pre-departure orientation',
        'Religious guidance',
        'Fast-track processing'
      ],
      cta: 'Learn More',
      link: '/contact',
      gradient: 'from-blue-600 to-blue-800'
    },
    {
      icon: Users,
      title: 'Religious Training',
      features: [
        'Pre-travel Islamic courses',
        'Hajj & Umrah rituals training',
        'Islamic lectures & seminars',
        'Spiritual guidance sessions',
        'Group discussions',
        'Certificate programs'
      ],
      cta: 'View Courses',
      link: '/courses',
      gradient: 'from-amber-600 to-orange-700'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Trusted Experience',
      description: '15+ years of guiding pilgrims with 5000+ successful journeys',
      stat: '5000+',
      label: 'Happy Pilgrims'
    },
    {
      icon: Award,
      title: 'Expert Guidance',
      description: 'Qualified Sheikhs and experienced tour guides at your service',
      stat: '98%',
      label: 'Satisfaction Rate'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance throughout your spiritual journey',
      stat: '24/7',
      label: 'Available Support'
    },
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'High-quality accommodations and exceptional service standards',
      stat: '15+',
      label: 'Years Experience'
    }
  ];

  const testimonials = [
    {
      name: 'Ahmed Al-Rahman',
      location: 'New York, USA',
      text: 'The best decision we made for our Hajj. Every detail was perfectly arranged, and the spiritual guidance was invaluable.',
      rating: 5,
      package: 'Premium Hajj Package'
    },
    {
      name: 'Fatima Hassan',
      location: 'London, UK',
      text: 'Exceptional service from start to finish. The pre-travel training prepared us beautifully for this sacred journey.',
      rating: 5,
      package: 'Umrah Express Package'
    },
    {
      name: 'Omar Malik',
      location: 'Toronto, Canada',
      text: 'Professional, caring, and deeply knowledgeable. They made our family pilgrimage unforgettable.',
      rating: 5,
      package: 'Family Hajj Package'
    }
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Consultation',
      description: 'Free consultation to understand your needs and preferences',
      icon: Phone
    },
    {
      step: '2',
      title: 'Package Selection',
      description: 'Choose the perfect package tailored to your requirements',
      icon: CheckCircle
    },
    {
      step: '3',
      title: 'Documentation',
      description: 'We handle all visa and travel documentation for you',
      icon: Shield
    },
    {
      step: '4',
      title: 'Preparation',
      description: 'Comprehensive pre-travel training and spiritual preparation',
      icon: Users
    },
    {
      step: '5',
      title: 'Journey Begins',
      description: 'Embark on your transformative spiritual experience',
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Enhanced Hero Section */}
      <section className="relative pt-20 pb-16 px-4 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-green-600/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.08),transparent_50%)]"></div>
        
        <div className="container mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-8">
                <Badge variant="secondary" className="bg-green-100 text-green-800 px-8 py-4 text-lg font-medium animate-float border-green-200">
                  <Heart className="w-5 h-5 mr-3" />
                  Guiding you on the path of Hudaa
                </Badge>
                
                <div className="space-y-6">
                  <h1 className="text-7xl lg:text-9xl font-bold text-green-900 leading-tight">
                    Your Sacred
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-700 to-green-800 animate-pulse">
                      Journey Begins
                    </span>
                  </h1>
                  
                  <p className="text-2xl text-gray-600 leading-relaxed max-w-2xl font-light">
                    Experience the <strong className="text-green-800">spiritual transformation</strong> of Hajj and Umrah with expert guidance, 
                    premium accommodations, and complete peace of mind. Join over <strong className="text-green-800">5,000 pilgrims</strong> who 
                    have trusted us with their sacred journey.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  size="lg" 
                  onClick={() => handleBookNow()}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-16 py-6 text-xl font-semibold group shadow-2xl hover:shadow-green-200 transition-all duration-300"
                >
                  Start Your Journey
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-16 py-6 text-xl font-semibold group shadow-lg hover:shadow-green-100 transition-all duration-300"
                >
                  <PlayCircle className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform" />
                  Watch Our Story
                </Button>
              </div>

              {/* Live Stats with enhanced design */}
              <div className="grid grid-cols-3 gap-8 pt-12 border-t-2 border-green-100">
                <div className="text-center group">
                  <div className="text-5xl font-bold text-green-800 group-hover:scale-110 transition-transform">
                    {counters.pilgrims.toLocaleString()}+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Pilgrims Guided</div>
                </div>
                <div className="text-center group">
                  <div className="text-5xl font-bold text-green-800 group-hover:scale-110 transition-transform">
                    {counters.years}+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Years Experience</div>
                </div>
                <div className="text-center group">
                  <div className="text-5xl font-bold text-green-800 group-hover:scale-110 transition-transform">
                    {counters.satisfaction}%
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Satisfaction Rate</div>
                </div>
              </div>
            </div>

            {/* Enhanced Hero Visual */}
            <div className="relative animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-300 rounded-[3rem] transform rotate-6 opacity-20 animate-float"></div>
                <div className="relative bg-white rounded-[3rem] shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-500">
                  <div className="aspect-[4/5] bg-gradient-to-br from-green-600 via-green-700 to-green-800 flex flex-col items-center justify-center text-white p-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_70%)]"></div>
                    <div className="text-center space-y-8 relative z-10">
                      <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 backdrop-blur-sm">
                        <Heart className="w-16 h-16" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-4xl font-bold">Sacred Journey</h3>
                        <p className="text-green-100 px-6 text-xl leading-relaxed">Experience the transformative power of pilgrimage</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6 mt-12">
                        <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                          <div className="text-3xl font-bold">15+</div>
                          <div className="text-sm text-green-200">Years</div>
                        </div>
                        <div className="text-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                          <div className="text-3xl font-bold">24/7</div>
                          <div className="text-sm text-green-200">Support</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                <Star className="w-10 h-10 text-green-600" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <div className="absolute top-1/3 -left-4 w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center animate-ping shadow-lg">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionary Services Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-50/50 to-white"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-24">
            <Badge className="bg-green-100 text-green-800 mb-8 px-8 py-3 text-lg">Our Sacred Services</Badge>
            <h2 className="text-6xl font-bold text-green-900 mb-8 leading-tight">
              Comprehensive Pilgrimage Solutions
            </h2>
            <p className="text-2xl text-gray-600 max-w-5xl mx-auto leading-relaxed font-light">
              From initial consultation to your safe return, we provide end-to-end support for your spiritual journey
            </p>
          </div>

          {/* Service Selector */}
          <div className="flex justify-center mb-16">
            <div className="flex bg-gray-100 rounded-2xl p-2">
              {enhancedServices.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(index)}
                  className={`px-8 py-4 rounded-xl transition-all duration-300 flex items-center space-x-3 ${
                    activeService === index 
                      ? `bg-gradient-to-r ${service.gradient} text-white shadow-xl` 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <service.icon className="w-5 h-5" />
                  <span className="font-medium">{service.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Service Display */}
          <div className="max-w-7xl mx-auto">
            {enhancedServices.map((service, index) => (
              <div
                key={service.id}
                className={`transition-all duration-500 ${
                  activeService === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'
                }`}
              >
                <Card className={`border-0 shadow-2xl overflow-hidden ${service.bgPattern} relative`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5`}></div>
                  
                  <CardContent className="p-0 relative">
                    <div className="grid lg:grid-cols-2 gap-0 min-h-[600px]">
                      {/* Content Side */}
                      <div className="p-16 flex flex-col justify-center space-y-8">
                        <div className="space-y-6">
                          <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-3xl flex items-center justify-center shadow-xl`}>
                            <service.icon className="w-10 h-10 text-white" />
                          </div>
                          
                          <div className="space-y-4">
                            <h3 className="text-4xl font-bold text-gray-900">{service.title}</h3>
                            <p className="text-xl text-gray-600 font-medium">{service.subtitle}</p>
                            <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
                          </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 gap-4">
                          {service.features.map((feature, i) => (
                            <div key={i} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/50 transition-colors group">
                              <div className={`w-10 h-10 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">{feature.text}</p>
                                <p className="text-sm text-gray-600">{feature.highlight}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                          <Button
                            size="lg"
                            onClick={() => handleBookNow(service.bookingType)}
                            className={`bg-gradient-to-r ${service.gradient} hover:scale-105 transition-all duration-300 shadow-xl text-lg px-8 py-4 group`}
                          >
                            {service.cta}
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                          <Link to={service.link}>
                            <Button
                              variant="outline"
                              size="lg"
                              className="border-2 hover:scale-105 transition-all duration-300 text-lg px-8 py-4 group"
                            >
                              {service.ctaSecondary}
                              <ExternalLink className="ml-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {/* Visual Side */}
                      <div className="relative flex flex-col justify-center p-16 bg-gradient-to-br from-gray-50 to-white">
                        {/* Stats */}
                        <div className="grid grid-cols-1 gap-8 mb-12">
                          {service.stats.map((stat, i) => (
                            <div key={i} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow group">
                              <div className={`text-4xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block`}>
                                {stat.number}
                              </div>
                              <div className="text-gray-600 font-medium mt-2">{stat.label}</div>
                            </div>
                          ))}
                        </div>

                        {/* Testimonial */}
                        <div className="bg-white p-8 rounded-2xl shadow-xl">
                          <div className="flex mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <blockquote className="text-gray-700 italic text-lg mb-4 leading-relaxed">
                            {service.testimonial}
                          </blockquote>
                          <div className="text-gray-600 font-medium">— {service.testimonialAuthor}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - New */}
      <section className="py-24 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-green-900 mb-6">Your Journey in 5 Simple Steps</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've streamlined the entire process to make your pilgrimage planning effortless and worry-free
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300 ${index < processSteps.length - 1 ? 'after:content-[""] after:absolute after:top-10 after:left-16 after:w-16 after:h-0.5 after:bg-green-300 after:hidden md:after:block' : ''}`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 font-bold text-sm shadow-lg">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-green-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Why Choose Us */}
      <section className="py-24 bg-gradient-to-r from-green-900 to-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">Why Choose Minhaajul-Hudaa?</h2>
            <p className="text-xl text-green-100 max-w-4xl mx-auto leading-relaxed">
              Your spiritual journey deserves the highest level of care, expertise, and dedication. 
              Here's what makes us the trusted choice for thousands of pilgrims worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <benefit.icon className="w-12 h-12" />
                  </div>
                  <div className="absolute -top-2 -right-8 bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold">
                    {benefit.stat}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-green-100 text-sm leading-relaxed mb-2">{benefit.description}</p>
                <div className="text-xs text-green-300 font-medium">{benefit.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel - New */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-green-900 mb-6">Stories from Our Pilgrims</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from pilgrims who chose us for their sacred journey
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-green-50">
              <CardContent className="p-12">
                <div className="text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-2xl text-gray-700 mb-8 leading-relaxed">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>
                  
                  <div className="space-y-2">
                    <div className="font-bold text-green-900 text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-gray-600">
                      {testimonials[currentTestimonial].location}
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {testimonials[currentTestimonial].package}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-green-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Urgency/Scarcity Section - New */}
      <section className="py-24 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-red-600 mr-3" />
              <Badge className="bg-red-100 text-red-800 px-6 py-2">Limited Time Offer</Badge>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Early Bird Special: Save Up to $800 on 2024 Packages
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              Book your 2024 Hajj or Umrah package before December 31st and secure the best rates. 
              Only <strong>47 spots remaining</strong> for our premium packages.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-12 group">
                <Zap className="mr-2 w-5 h-5" />
                Claim Your Discount
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="border-red-600 text-red-600 hover:bg-red-50 px-12">
                View Package Details
              </Button>
            </div>
            
            {/* Countdown Timer Placeholder */}
            <div className="bg-white rounded-2xl p-6 shadow-lg inline-block">
              <div className="text-sm text-gray-600 mb-2">Offer expires in:</div>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-600">23</div>
                  <div className="text-xs text-gray-500">Days</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">14</div>
                  <div className="text-xs text-gray-500">Hours</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">35</div>
                  <div className="text-xs text-gray-500">Minutes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">22</div>
                  <div className="text-xs text-gray-500">Seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main CTA Section - Enhanced */}
      <section className="py-24 bg-gradient-to-r from-green-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-bold text-green-900 mb-8">
              Ready to Begin Your Sacred Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Take the first step towards your spiritual transformation. Our expert team is here to guide you 
              every step of the way with personalized service and unwavering support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-lg group">
                Book Your Package
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50 px-12 py-4 text-lg">
                <Calendar className="mr-2 w-5 h-5" />
                Schedule Free Consultation
              </Button>
            </div>

            {/* Process Preview */}
            <div className="bg-white rounded-3xl shadow-2xl p-12 border border-green-100">
              <h3 className="text-3xl font-bold text-green-900 mb-8">Get Started Today</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="group">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-green-600 font-bold text-xl">1</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-3">Choose Your Package</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Browse our comprehensive Hajj and Umrah packages designed for every budget and preference
                  </p>
                </div>
                <div className="group">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-green-600 font-bold text-xl">2</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-3">Complete Preparation</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Join our comprehensive training courses and complete all documentation with our expert assistance
                  </p>
                </div>
                <div className="group">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-green-600 font-bold text-xl">3</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-3">Begin Your Journey</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Embark on your transformative spiritual experience with complete peace of mind and expert guidance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="py-24 bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-5xl font-bold mb-8">Join Our Spiritual Community</h3>
            <p className="text-2xl text-green-100 mb-12 leading-relaxed font-light">
              Receive exclusive insights, travel updates, spiritual guidance, and special offers. 
              Join over <strong className="text-white">10,000 subscribers</strong> on their journey of faith.
            </p>
            
            <form onSubmit={handleSubscribe} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 mb-12">
              <input 
                type="email" 
                placeholder="Enter your email address"
                value={emailSubscription}
                onChange={(e) => setEmailSubscription(e.target.value)}
                required
                className="flex-1 px-8 py-6 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-green-400 focus:outline-none text-lg"
              />
              <Button 
                type="submit"
                className="bg-white text-green-900 hover:bg-green-50 px-12 py-6 rounded-2xl text-lg font-semibold shadow-xl group"
              >
                Subscribe
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
            
            <div className="flex flex-wrap items-center justify-center gap-8 text-lg text-green-300">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 mr-3" />
                Weekly spiritual insights
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 mr-3" />
                Exclusive offers
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 mr-3" />
                Travel tips & updates
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
