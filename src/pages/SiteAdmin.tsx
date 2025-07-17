import React, { useState, useEffect } from 'react';
import { useSite } from '@/hooks/useSite';
import { useTheme } from '@/hooks/useTheme';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Package, FileText, Calendar, Users, Settings, BarChart3, Palette, Edit3, PlusCircle, Edit, Trash2, Eye, BookOpen, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ThemeSelector from '@/components/ThemeSelector';
import LiveEditor from '@/components/LiveEditor';
import githubSDK from '@/lib/githubSDK';

interface Package {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  inclusions: string[];
  category: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  siteId: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  modules: CourseModule[];
  status: 'draft' | 'published';
  enrollmentLimit: number;
  createdAt: string;
  updatedAt: string;
  siteId: string;
}

interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  duration: number;
  order: number;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  capacity: number;
  category: string;
  status: 'active' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  siteId: string;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  featuredImage?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  siteId: string;
}

interface KnowledgeBase {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  order: number;
  createdAt: string;
  updatedAt: string;
  siteId: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  siteId: string;
}

const SiteAdmin = () => {
  const { currentSite } = useSite();
  const { currentTheme } = useTheme();
  const { toast } = useToast();
  
  const [packages, setPackages] = useState<Package[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  
  const [isLiveEditorOpen, setIsLiveEditorOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentSite) {
      loadData();
    }
  }, [currentSite]);

  const loadData = async () => {
    if (!currentSite) return;
    
    setLoading(true);
    try {
      const [packagesData, coursesData, eventsData, blogData, kbData, faqData] = await Promise.all([
        githubSDK.get<Package>('packages'),
        githubSDK.get<Course>('courses'),
        githubSDK.get<Event>('events'),
        githubSDK.get<BlogPost>('blog_posts'),
        githubSDK.get<KnowledgeBase>('knowledge_base'),
        githubSDK.get<FAQ>('faqs')
      ]);

      setPackages(packagesData.filter(p => p.siteId === currentSite.id));
      setCourses(coursesData.filter(c => c.siteId === currentSite.id));
      setEvents(eventsData.filter(e => e.siteId === currentSite.id));
      setBlogPosts(blogData.filter(b => b.siteId === currentSite.id));
      setKnowledgeBase(kbData.filter(k => k.siteId === currentSite.id));
      setFaqs(faqData.filter(f => f.siteId === currentSite.id));
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load admin data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createPackage = async (data: Partial<Package>) => {
    try {
      const newPackage = await githubSDK.insert('packages', {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      setPackages([...packages, newPackage]);
      toast({
        title: "Success",
        description: "Package created successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create package",
        variant: "destructive"
      });
    }
  };

  const deletePackage = async (id: string) => {
    try {
      await githubSDK.delete('packages', id);
      setPackages(packages.filter(p => p.id !== id));
      toast({
        title: "Success",
        description: "Package deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete package",
        variant: "destructive"
      });
    }
  };

  if (!currentSite) return null;

  const adminSections = [
    {
      icon: Package,
      title: 'Packages',
      description: 'Manage travel packages and offerings',
      color: currentTheme?.accentColor || '#22c55e'
    },
    {
      icon: FileText,
      title: 'Blog Posts',
      description: 'Create and manage blog content',
      color: currentTheme?.primaryColor || '#004225'
    },
    {
      icon: Calendar,
      title: 'Events',
      description: 'Schedule and manage events',
      color: currentTheme?.gradientFrom || '#16a34a'
    },
    {
      icon: Users,
      title: 'Customers',
      description: 'Manage customer relationships',
      color: currentTheme?.gradientTo || '#0ea5e9'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'View performance metrics',
      color: currentTheme?.accentColor || '#22c55e'
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'Site configuration and preferences',
      color: currentTheme?.primaryColor || '#004225'
    }
  ];

  return (
    <div 
      className="min-h-screen py-8"
      style={{ backgroundColor: currentTheme?.backgroundColor || '#ffffff' }}
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ color: currentTheme?.primaryColor || '#004225' }}
            >
              Admin Dashboard
            </h1>
            <p style={{ color: currentTheme?.textColor || '#1f2937' }}>
              Manage your {currentSite.name} platform
            </p>
          </div>
          
          <Button
            onClick={() => setIsLiveEditorOpen(true)}
            className="flex items-center gap-2"
            style={{ 
              backgroundColor: currentTheme?.accentColor || '#22c55e'
            }}
          >
            <Edit3 className="w-4 h-4" />
            Live Editor
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="packages" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Packages
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Knowledge
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{packages.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {packages.filter(p => p.status === 'active').length} active
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{courses.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {courses.filter(c => c.status === 'published').length} published
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{events.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {events.filter(e => e.status === 'active').length} active
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{blogPosts.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {blogPosts.filter(b => b.status === 'published').length} published
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="packages">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Travel Packages</h2>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Package
                </Button>
              </div>

              <div className="grid gap-6">
                {packages.map((pkg) => (
                  <Card key={pkg.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{pkg.title}</CardTitle>
                          <CardDescription>{pkg.description}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={pkg.status === 'active' ? 'default' : 'secondary'}>
                            {pkg.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium">Price</p>
                          <p className="text-lg font-bold">${pkg.price}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Duration</p>
                          <p>{pkg.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Category</p>
                          <p>{pkg.category}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Inclusions</p>
                          <p>{pkg.inclusions.length} items</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => deletePackage(pkg.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {packages.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No packages created yet</p>
                    <Button className="mt-4">Create your first package</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="courses">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Learning Management System</h2>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Course
                </Button>
              </div>

              <div className="grid gap-6">
                {courses.map((course) => (
                  <Card key={course.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{course.title}</CardTitle>
                          <CardDescription>{course.description}</CardDescription>
                        </div>
                        <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                          {course.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium">Instructor</p>
                          <p>{course.instructor}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Duration</p>
                          <p>{course.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Level</p>
                          <Badge variant="outline">{course.level}</Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Price</p>
                          <p className="font-bold">${course.price}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Course
                        </Button>
                        <Button variant="outline" size="sm">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Manage Content
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {courses.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No courses created yet</p>
                    <Button className="mt-4">Create your first course</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Events Management</h2>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </div>

              <div className="grid gap-6">
                {events.map((event) => (
                  <Card key={event.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{event.title}</CardTitle>
                          <CardDescription>{event.description}</CardDescription>
                        </div>
                        <Badge variant={event.status === 'active' ? 'default' : 'destructive'}>
                          {event.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium">Date & Time</p>
                          <p>{new Date(event.date).toLocaleDateString()}</p>
                          <p>{event.time}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          <p>{event.location}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Price</p>
                          <p className="font-bold">${event.price}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Capacity</p>
                          <p>{event.capacity} attendees</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Registrations
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {events.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No events scheduled yet</p>
                    <Button className="mt-4">Create your first event</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="blog">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Blog Management</h2>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Write Post
                </Button>
              </div>

              <div className="grid gap-6">
                {blogPosts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{post.title}</CardTitle>
                          <CardDescription>{post.excerpt}</CardDescription>
                        </div>
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium">Author</p>
                          <p>{post.author}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Category</p>
                          <p>{post.category}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Tags</p>
                          <div className="flex gap-1">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {blogPosts.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No blog posts yet</p>
                    <Button className="mt-4">Write your first post</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="knowledge">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Knowledge Base</h2>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Article
                </Button>
              </div>

              <div className="grid gap-6">
                {knowledgeBase.map((article) => (
                  <Card key={article.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{article.title}</CardTitle>
                        </div>
                        <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                          {article.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium">Category</p>
                          <p>{article.category}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Tags</p>
                          <div className="flex gap-1">
                            {article.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {knowledgeBase.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No knowledge base articles yet</p>
                    <Button className="mt-4">Create your first article</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="faq">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">FAQ Management</h2>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add FAQ
                </Button>
              </div>

              <div className="grid gap-4">
                {faqs.map((faq) => (
                  <Card key={faq.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                        <Badge variant={faq.status === 'active' ? 'default' : 'secondary'}>
                          {faq.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{faq.answer}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {faqs.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No FAQs yet</p>
                    <Button className="mt-4">Add your first FAQ</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="theme">
            <ThemeSelector />
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card style={{ 
                backgroundColor: currentTheme?.cardColor || '#ffffff',
                borderColor: currentTheme?.borderColor || '#e5e7eb'
              }}>
                <CardHeader>
                  <CardTitle style={{ color: currentTheme?.textColor || '#1f2937' }}>
                    Site Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p style={{ color: `${currentTheme?.textColor || '#1f2937'}80` }}>
                    Configure your site settings, contact information, and other preferences.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <LiveEditor 
        isOpen={isLiveEditorOpen}
        onClose={() => setIsLiveEditorOpen(false)}
      />
    </div>
  );
};

export default SiteAdmin;
