import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, MessageSquare, Users, Star, ChevronRight, BookOpen } from 'lucide-react';
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
  imageUrl: string;
  status: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      const data = await sdk.get<BlogPost>('blogs');
      setPosts(data.filter(post => post.status === 'published'));
    } catch (error) {
      console.error('Error loading blog posts:', error);
      // Load sample data if SDK fails
      setPosts(sampleBlogPosts);
    } finally {
      setLoading(false);
    }
  };

  const sampleBlogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Spiritual Significance of Hajj',
      content: 'Hajj is one of the five pillars of Islam and holds immense spiritual significance for Muslims worldwide...',
      excerpt: 'Explore the profound spiritual meaning and transformative power of the Hajj pilgrimage.',
      author: 'Sheikh Abdullah Rahman',
      category: 'Hajj',
      tags: ['hajj', 'spiritual', 'islam', 'pilgrimage'],
      featured: true,
      published: true,
      imageUrl: 'https://via.placeholder.com/400x300',
      status: 'published'
    },
    {
      id: '2',
      title: 'Preparing for Umrah: A Comprehensive Guide',
      content: 'Umrah is a voluntary pilgrimage to Mecca that can be performed at any time of the year. This guide provides essential tips...',
      excerpt: 'A detailed guide to help you prepare for your Umrah journey, covering rituals, packing, and logistics.',
      author: 'Fatima Al-Zahra',
      category: 'Umrah',
      tags: ['umrah', 'guide', 'preparation', 'islam'],
      featured: true,
      published: true,
      imageUrl: 'https://via.placeholder.com/400x300',
      status: 'published'
    },
    {
      id: '3',
      title: 'The Etiquettes of Visiting Masjid al-Haram',
      content: 'Masjid al-Haram is the holiest mosque in Islam and requires visitors to adhere to certain etiquettes and guidelines...',
      excerpt: 'Learn about the proper manners and respectful conduct when visiting the sacred Masjid al-Haram in Mecca.',
      author: 'Omar Hassan',
      category: 'Islamic Etiquettes',
      tags: ['masjid al-haram', 'etiquettes', 'islam', 'mecca'],
      featured: false,
      published: true,
      imageUrl: 'https://via.placeholder.com/400x300',
      status: 'published'
    },
    {
      id: '4',
      title: 'The Virtues of Ramadan Umrah',
      content: 'Performing Umrah during the month of Ramadan holds special significance and rewards in Islam...',
      excerpt: 'Discover the unique blessings and spiritual benefits of performing Umrah during the holy month of Ramadan.',
      author: 'Aisha Khan',
      category: 'Ramadan',
      tags: ['ramadan', 'umrah', 'virtues', 'islam'],
      featured: false,
      published: true,
      imageUrl: 'https://via.placeholder.com/400x300',
      status: 'published'
    },
    {
      id: '5',
      title: 'Essential Duas for Hajj and Umrah',
      content: 'During Hajj and Umrah, pilgrims recite specific duas (prayers) at various stages of the pilgrimage...',
      excerpt: 'A collection of essential duas (prayers) to recite during Hajj and Umrah, with transliteration and meaning.',
      author: 'Yusuf Ali',
      category: 'Duas',
      tags: ['duas', 'hajj', 'umrah', 'prayers'],
      featured: false,
      published: true,
      imageUrl: 'https://via.placeholder.com/400x300',
      status: 'published'
    },
    {
      id: '6',
      title: 'The History of the Kaaba',
      content: 'The Kaaba is the most sacred site in Islam and has a rich history dating back to the time of Prophet Ibrahim (Abraham)...',
      excerpt: 'Explore the fascinating history and significance of the Kaaba, the central structure in Masjid al-Haram.',
      author: 'Zainab Rashid',
      category: 'Islamic History',
      tags: ['kaaba', 'history', 'islam', 'mecca'],
      featured: false,
      published: true,
      imageUrl: 'https://via.placeholder.com/400x300',
      status: 'published'
    }
  ];

  const categories = [...new Set(posts.map(post => post.category))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-600">Loading blog posts...</p>
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
            <h1 className="text-5xl font-bold mb-6">Blog & Articles</h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Stay informed with the latest insights, travel tips, and spiritual reflections 
              to enhance your pilgrimage experience and deepen your understanding of Islam.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-green-900">Latest Articles</h2>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {filteredPosts.length} Posts
              </Badge>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="md:w-64"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-green-900 mb-12 text-center">Featured Articles</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-green-50">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="border-green-600 text-green-600">
                        {post.category}
                      </Badge>
                      <Badge className="bg-green-600 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-green-900 group-hover:text-green-700 transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600 text-xs">
                        <BookOpen className="w-4 h-4 mr-2 text-green-600" />
                        {post.author}
                      </div>
                      <div className="text-green-600 text-sm">
                        <Calendar className="w-4 h-4 mr-1 inline-block" />
                        {new Date(post.published ? post.id : Date.now()).toLocaleDateString()}
                      </div>
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

      {/* All Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-900 mb-12 text-center">All Articles</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-green-600 text-green-600">
                      {post.category}
                    </Badge>
                    {post.featured && (
                      <Badge className="bg-green-600 text-white text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg text-green-900 group-hover:text-green-700 transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center text-gray-600">
                      <BookOpen className="w-3 h-3 mr-2 text-green-600" />
                      {post.author}
                    </div>
                    <div className="text-green-600">
                      <Calendar className="w-3 h-3 mr-1 inline-block" />
                      {new Date(post.published ? post.id : Date.now()).toLocaleDateString()}
                    </div>
                  </div>

                  <Button variant="ghost" className="w-full justify-start text-green-600 hover:text-green-700">
                    Read More
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
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
              Stay Updated on Spiritual Insights
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Subscribe to our newsletter to receive the latest articles, reflections, and 
              guidance directly in your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-900 hover:bg-green-50 px-12">
                Subscribe to Newsletter
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-12">
                Explore All Articles
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
