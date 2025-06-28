
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, BookOpen, MessageSquare, Star, ChevronRight, Filter } from 'lucide-react';
import sdk from '@/lib/sdk';

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  featured: boolean;
  type: 'faq' | 'tip' | 'guide';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: string;
}

const KnowledgeBase = () => {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    loadKnowledgeBase();
  }, []);

  const loadKnowledgeBase = async () => {
    try {
      const data = await sdk.get<KnowledgeItem>('knowledge');
      setItems(data.filter(item => item.status === 'published'));
    } catch (error) {
      console.error('Error loading knowledge base:', error);
      // Load sample data if SDK fails
      setItems(sampleKnowledgeItems);
    } finally {
      setLoading(false);
    }
  };

  const sampleKnowledgeItems: KnowledgeItem[] = [
    {
      id: '1',
      title: 'What documents do I need for Hajj?',
      content: 'For Hajj pilgrimage, you will need: 1) Valid passport with at least 6 months validity, 2) Hajj visa obtained through authorized agents, 3) Vaccination certificates (Meningitis, Yellow Fever if applicable), 4) Medical fitness certificate, 5) Passport-sized photographs, 6) Confirmed booking vouchers.',
      excerpt: 'Essential documents required for Hajj pilgrimage including passport, visa, and health certificates.',
      category: 'Documentation',
      tags: ['hajj', 'documents', 'visa', 'requirements'],
      featured: true,
      type: 'faq',
      difficulty: 'beginner',
      status: 'published'
    },
    {
      id: '2',
      title: 'How to perform Umrah step by step',
      content: 'Umrah consists of four main rituals: 1) Ihram - Enter the sacred state, 2) Tawaf - Circumambulate the Kaaba 7 times, 3) Sa\'i - Walk between Safa and Marwah 7 times, 4) Halq/Taqsir - Cut or shave hair. Each step has specific duas and etiquettes.',
      excerpt: 'Complete step-by-step guide to performing Umrah with proper etiquettes and duas.',
      category: 'Rituals',
      tags: ['umrah', 'rituals', 'guide', 'steps'],
      featured: true,
      type: 'guide',
      difficulty: 'beginner',
      status: 'published'
    },
    {
      id: '3',
      title: 'Best time to book Umrah packages',
      content: 'The best time to book Umrah packages is 3-6 months in advance. Avoid booking during Hajj season (Dhul Hijjah) as prices are highest. Ramadan packages should be booked 6-8 months early. Off-peak times (after Hajj and before Ramadan) offer better prices.',
      excerpt: 'Tips on when to book Umrah packages for the best prices and availability.',
      category: 'Planning',
      tags: ['umrah', 'booking', 'timing', 'packages'],
      featured: false,
      type: 'tip',
      difficulty: 'beginner',
      status: 'published'
    },
    {
      id: '4',
      title: 'What to pack for Hajj/Umrah?',
      content: 'Essential items: Ihram clothing (men), Modest clothing (women), Comfortable walking shoes, Prayer mat, Quran/Dua book, Medications, Sunscreen, Unscented toiletries, Money belt, Copies of documents. Avoid: Scented items during Ihram, Tight clothing, Electronic devices in Haram.',
      excerpt: 'Complete packing checklist for Hajj and Umrah pilgrimage.',
      category: 'Preparation',
      tags: ['packing', 'hajj', 'umrah', 'checklist'],
      featured: true,
      type: 'guide',
      difficulty: 'beginner',
      status: 'published'
    },
    {
      id: '5',
      title: 'How much does Hajj cost?',
      content: 'Hajj costs vary by package type: Budget packages: $4,000-6,000, Standard packages: $6,000-8,000, Premium packages: $8,000-12,000, VIP packages: $12,000+. Costs include accommodation, meals, transportation, guides, and visa fees.',
      excerpt: 'Breakdown of Hajj costs across different package categories.',
      category: 'Pricing',
      tags: ['hajj', 'cost', 'pricing', 'budget'],
      featured: false,
      type: 'faq',
      difficulty: 'beginner',
      status: 'published'
    },
    {
      id: '6',
      title: 'Common mistakes during Tawaf',
      content: 'Avoid these common Tawaf mistakes: 1) Starting from wrong point, 2) Going in wrong direction, 3) Not maintaining Wudu, 4) Pushing others, 5) Taking photos during Tawaf, 6) Rushing through the ritual, 7) Not reciting appropriate duas.',
      excerpt: 'Common mistakes pilgrims make during Tawaf and how to avoid them.',
      category: 'Rituals',
      tags: ['tawaf', 'mistakes', 'rituals', 'guidance'],
      featured: true,
      type: 'tip',
      difficulty: 'intermediate',
      status: 'published'
    },
    {
      id: '7',
      title: 'Saudi Arabia visa requirements',
      content: 'Saudi visa requirements: Valid passport, Completed application form, Recent photographs, Proof of accommodation, Return flight tickets, Vaccination certificates, Financial proof, Medical insurance. Processing time: 3-7 working days.',
      excerpt: 'Complete guide to Saudi Arabia visa requirements for pilgrims.',
      category: 'Visa',
      tags: ['visa', 'saudi', 'requirements', 'documentation'],
      featured: false,
      type: 'guide',
      difficulty: 'beginner',
      status: 'published'
    },
    {
      id: '8',
      title: 'Health precautions for pilgrimage',
      content: 'Health precautions: Get required vaccinations 2 weeks before travel, Carry prescription medications, Stay hydrated, Wear comfortable shoes, Use sunscreen, Maintain personal hygiene, Avoid crowded areas if feeling unwell, Carry first aid kit.',
      excerpt: 'Important health and safety precautions for Hajj and Umrah.',
      category: 'Health',
      tags: ['health', 'safety', 'precautions', 'medical'],
      featured: true,
      type: 'guide',
      difficulty: 'beginner',
      status: 'published'
    }
  ];

  const categories = [...new Set(items.map(item => item.category))];
  
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const featuredItems = filteredItems.filter(item => item.featured);
  const faqItems = filteredItems.filter(item => item.type === 'faq');
  const tipItems = filteredItems.filter(item => item.type === 'tip');
  const guideItems = filteredItems.filter(item => item.type === 'guide');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-600">Loading knowledge base...</p>
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
            <h1 className="text-5xl font-bold mb-6">Knowledge Base</h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Your comprehensive guide to Hajj and Umrah. Find answers to common questions, 
              helpful tips, and detailed guides to prepare for your spiritual journey.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for guides, tips, or FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="md:w-auto border-green-600 text-green-600">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Search
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className={selectedCategory === 'all' ? 'bg-green-600' : 'border-green-600 text-green-600'}
              >
                All Categories
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'bg-green-600' : 'border-green-600 text-green-600'}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      {featuredItems.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-green-900 mb-12 text-center">Featured Guides</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-green-50">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="border-green-600 text-green-600 capitalize">
                        {item.type}
                      </Badge>
                      <Badge className="bg-green-600 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-green-900 group-hover:text-green-700 transition-colors">
                      {item.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{item.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                        {item.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {item.difficulty}
                      </Badge>
                    </div>

                    <Button variant="outline" className="w-full text-green-600 border-green-600 hover:bg-green-600 hover:text-white">
                      Read More
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqItems.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-green-900 mb-12 text-center">
                Frequently Asked Questions
              </h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item) => (
                  <AccordionItem key={item.id} value={item.id} className="border border-green-100 rounded-lg px-6">
                    <AccordionTrigger className="text-left hover:text-green-600">
                      <div className="flex items-start space-x-3">
                        <MessageSquare className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed pt-4">
                      {item.content}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* Tips & Guides Grid */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Tips */}
            {tipItems.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-green-900 mb-8">Travel Tips</h2>
                <div className="space-y-6">
                  {tipItems.map((item) => (
                    <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-6 h-6 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-green-900 mb-2 group-hover:text-green-700">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">{item.excerpt}</p>
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                {item.category}
                              </Badge>
                              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 p-0">
                                Read More <ChevronRight className="w-4 h-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Guides */}
            {guideItems.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-green-900 mb-8">Detailed Guides</h2>
                <div className="space-y-6">
                  {guideItems.map((item) => (
                    <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-green-900 mb-2 group-hover:text-green-700">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">{item.excerpt}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                                  {item.category}
                                </Badge>
                                <Badge variant="outline" className="text-xs capitalize">
                                  {item.difficulty}
                                </Badge>
                              </div>
                              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 p-0">
                                Read Guide <ChevronRight className="w-4 h-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-900 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Need More Personalized Guidance?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Our experienced guides are here to provide personalized advice and answer 
              any specific questions about your pilgrimage journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-900 hover:bg-green-50 px-12">
                Contact Our Experts
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-12">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KnowledgeBase;
