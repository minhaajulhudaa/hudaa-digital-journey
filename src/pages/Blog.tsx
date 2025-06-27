
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, User, Clock, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import sdk from '@/lib/sdk';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  createdAt?: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    let filtered = posts.filter(post => post.published);
    
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(post => post.category === categoryFilter);
    }
    
    setFilteredPosts(filtered);
  }, [posts, searchTerm, categoryFilter]);

  const loadPosts = async () => {
    try {
      const data = await sdk.get<BlogPost>('blogs');
      setPosts(data);
    } catch (error) {
      console.error('Error loading blog posts:', error);
      // Load sample data if SDK fails
      setPosts(samplePosts);
    } finally {
      setLoading(false);
    }
  };

  const samplePosts: BlogPost[] = [
    {
      id: '1',
      title: 'Preparing Your Heart for Hajj: A Spiritual Guide',
      content: '',
      excerpt: 'Learn how to spiritually prepare yourself for the sacred journey of Hajj, including prayers, intentions, and mental preparation.',
      author: 'Sheikh Ahmad Rahman',
      category: 'spiritual-guidance',
      tags: ['hajj', 'preparation', 'spirituality'],
      featured: true,
      published: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'The Complete Guide to Umrah Rituals',
      content: '',
      excerpt: 'A comprehensive step-by-step guide to performing Umrah, including detailed explanations of each ritual and its significance.',
      author: 'Dr. Fatima Al-Zahra',
      category: 'education',
      tags: ['umrah', 'rituals', 'guide'],
      featured: true,
      published: true,
      createdAt: '2024-01-12'
    },
    {
      id: '3',
      title: 'Essential Items to Pack for Your Pilgrimage',
      content: '',
      excerpt: 'A practical checklist of essential items to pack for your Hajj or Umrah journey, including clothing, medicines, and spiritual items.',
      author: 'Hassan Al-Mahmoud',
      category: 'travel-tips',
      tags: ['packing', 'travel', 'preparation'],
      featured: false,
      published: true,
      createdAt: '2024-01-10'
    },
    {
      id: '4',
      title: 'Understanding the Significance of Tawaf',
      content: '',
      excerpt: 'Explore the deep spiritual meaning behind the ritual of Tawaf and how to perform it with complete devotion and understanding.',
      author: 'Sheikh Omar Ibrahim',
      category: 'spiritual-guidance',
      tags: ['tawaf', 'spirituality', 'kaaba'],
      featured: true,
      published: true,
      createdAt: '2024-01-08'
    },
    {
      id: '5',
      title: 'Health and Safety Tips for Pilgrims',
      content: '',
      excerpt: 'Important health and safety guidelines to ensure your pilgrimage is safe, comfortable, and spiritually fulfilling.',
      author: 'Dr. Aisha Mohamed',
      category: 'health-safety',
      tags: ['health', 'safety', 'tips'],
      featured: false,
      published: true,
      createdAt: '2024-01-05'
    },
    {
      id: '6',
      title: 'The History and Architecture of Masjid al-Haram',
      content: '',
      excerpt: 'Discover the rich history and magnificent architecture of the Grand Mosque, the holiest site in Islam.',
      author: 'Prof. Muhammad Al-Farisi',
      category: 'history',
      tags: ['history', 'architecture', 'makkah'],
      featured: false,
      published: true,
      createdAt: '2024-01-03'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'spiritual-guidance', label: 'Spiritual Guidance' },
    { value: 'education', label: 'Education' },
    { value: 'travel-tips', label: 'Travel Tips' },
    { value: 'health-safety', label: 'Health & Safety' },
    { value: 'history', label: 'History' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-600">Loading articles...</p>
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
            <h1 className="text-5xl font-bold mb-6">Islamic Travel Blog</h1>
            <p className="text-xl text-green-100">
              Spiritual guidance, travel insights, and educational resources to enhance your sacred journey
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Badge variant="secondary" className="bg-green-100 text-green-800 flex items-center">
                {filteredPosts.length} Articles
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {filteredPosts.filter(post => post.featured).length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-900 mb-4">Featured Articles</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Essential reads for every pilgrim - carefully selected articles to guide your spiritual journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.filter(post => post.featured).map((post) => (
                <Card key={post.id} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-green-50 overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-green-600 to-green-800 relative">
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/20 text-white backdrop-blur-sm">
                        Featured
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="text-center text-white p-6">
                        <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                        <p className="text-green-100 text-sm">
                          By {post.author}
                        </p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.createdAt}
                      </div>
                      <Badge variant="outline" className="border-green-600 text-green-600 text-xs">
                        {post.category.replace('-', ' ')}
                      </Badge>
                    </div>

                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-700 text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700 group-hover:shadow-lg transition-all">
                      Read Article
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-900 mb-4">Latest Articles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest insights, tips, and guidance for your spiritual journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-green-600 text-green-600 text-xs">
                      {post.category.replace('-', ' ')}
                    </Badge>
                    {post.featured && (
                      <Badge className="bg-green-600 text-white text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg text-green-900 group-hover:text-green-700 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {post.createdAt}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-green-50 text-green-700 text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-green-600 text-green-600 hover:bg-green-50 group-hover:shadow-md transition-all"
                  >
                    Read More
                    <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-green-900 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Stay Inspired with Our Newsletter
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Receive the latest spiritual insights, travel guides, and exclusive content directly in your inbox
            </p>
            
            <div className="max-w-md mx-auto flex gap-4">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder-green-200"
              />
              <Button className="bg-white text-green-900 hover:bg-green-50 px-8">
                Subscribe
              </Button>
            </div>

            <p className="text-green-200 text-sm mt-4">
              Join 5,000+ pilgrims receiving our weekly newsletter
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
