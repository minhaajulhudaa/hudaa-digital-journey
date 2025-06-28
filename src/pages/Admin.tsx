
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  Users, Package, BookOpen, Calendar, MessageSquare, Settings, 
  Plus, Edit, Trash2, Eye, BarChart3, Mail, FileText,
  Shield, Search, Filter, Download, Upload, Globe, Star, TrendingUp
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import CMSEditor from '@/components/CMSEditor';
import sdk from '@/lib/sdk';

interface ContentItem {
  id: string;
  uid: string;
  title: string;
  type?: string;
  status: string;
  created?: string;
  updated?: string;
  author?: string;
  [key: string]: any;
}

const Admin = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showEditor, setShowEditor] = useState(false);
  const [editingCollection, setEditingCollection] = useState('');
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  
  const [stats, setStats] = useState({
    packages: 0,
    blogs: 0,
    courses: 0,
    events: 0,
    bookings: 0,
    users: 0,
    knowledgebase: 0,
    testimonials: 0,
    newsletter: 0
  });

  // Content management states
  const [packages, setPackages] = useState<ContentItem[]>([]);
  const [blogs, setBlogs] = useState<ContentItem[]>([]);
  const [courses, setCourses] = useState<ContentItem[]>([]);
  const [events, setEvents] = useState<ContentItem[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<ContentItem[]>([]);
  const [testimonials, setTestimonials] = useState<ContentItem[]>([]);
  const [bookings, setBookings] = useState<ContentItem[]>([]);
  const [users, setUsers] = useState<ContentItem[]>([]);
  const [newsletter, setNewsletter] = useState<ContentItem[]>([]);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadDashboardData();
    }
  }, [isAuthenticated, user]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [
        packagesData, 
        blogsData, 
        coursesData, 
        eventsData, 
        kbData, 
        testimonialsData, 
        bookingsData, 
        usersData,
        newsletterData
      ] = await Promise.all([
        sdk.get('packages'),
        sdk.get('blogs'),
        sdk.get('courses'),
        sdk.get('events'),
        sdk.get('knowledgebase'),
        sdk.get('testimonials'),
        sdk.get('bookings'),
        sdk.get('users'),
        sdk.get('newsletter')
      ]);

      setPackages(packagesData);
      setBlogs(blogsData);
      setCourses(coursesData);
      setEvents(eventsData);
      setKnowledgeBase(kbData);
      setTestimonials(testimonialsData);
      setBookings(bookingsData);
      setUsers(usersData);
      setNewsletter(newsletterData);

      setStats({
        packages: packagesData.length,
        blogs: blogsData.length,
        courses: coursesData.length,
        events: eventsData.length,
        bookings: bookingsData.length,
        users: usersData.length,
        knowledgebase: kbData.length,
        testimonials: testimonialsData.length,
        newsletter: newsletterData.length
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = (collection: string) => {
    setEditingCollection(collection);
    setEditingItem(null);
    setShowEditor(true);
  };

  const handleEdit = (collection: string, item: ContentItem) => {
    setEditingCollection(collection);
    setEditingItem(item);
    setShowEditor(true);
  };

  const handleSave = async () => {
    await loadDashboardData();
    setShowEditor(false);
    setEditingItem(null);
    setEditingCollection('');
  };

  const handleCancel = () => {
    setShowEditor(false);
    setEditingItem(null);
    setEditingCollection('');
  };

  const handleDelete = async (collection: string, id: string) => {
    try {
      await sdk.delete(collection, id);
      await loadDashboardData();
      toast({
        title: "Success",
        description: `${collection} deleted successfully`
      });
    } catch (error) {
      console.error(`Error deleting ${collection}:`, error);
      toast({
        title: "Error",
        description: `Failed to delete ${collection}`,
        variant: "destructive"
      });
    }
  };

  const getCollectionData = (collection: string): ContentItem[] => {
    switch (collection) {
      case 'packages': return packages;
      case 'blogs': return blogs;
      case 'courses': return courses;
      case 'events': return events;
      case 'knowledgebase': return knowledgeBase;
      case 'testimonials': return testimonials;
      case 'bookings': return bookings;
      case 'users': return users;
      case 'newsletter': return newsletter;
      default: return [];
    }
  };

  const filterItems = (items: ContentItem[]) => {
    return items.filter(item => {
      const matchesSearch = !searchTerm || 
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customerName?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  };

  const renderContentManager = (collection: string, displayName: string) => {
    const items = getCollectionData(collection);
    const filteredItems = filterItems(items);

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-3xl font-bold">{displayName} Management</h3>
          <div className="flex gap-2">
            <Button onClick={() => handleCreate(collection)} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder={`Search ${displayName.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Items Grid */}
        <div className="grid gap-6">
          {filteredItems.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <FileText className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No {displayName} Found</h3>
                <p className="text-gray-500 mb-6">Get started by creating your first {displayName.toLowerCase()}.</p>
                <Button onClick={() => handleCreate(collection)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create {displayName}
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h4 className="font-semibold text-lg">{item.title || item.email || item.customerName || 'Untitled'}</h4>
                        {item.featured && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.description || item.excerpt || item.content || 'No description available'}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant={getStatusVariant(item.status)}>
                          {item.status || 'Unknown'}
                        </Badge>
                        {item.type && <Badge variant="outline">{item.type}</Badge>}
                        {item.category && <Badge variant="secondary">{item.category}</Badge>}
                        {item.price && <Badge className="bg-green-100 text-green-800">${item.price}</Badge>}
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        {item.created && (
                          <span>Created: {new Date(item.created).toLocaleDateString()}</span>
                        )}
                        {item.author && <span className="ml-4">By: {item.author}</span>}
                        {item.views && <span className="ml-4">Views: {item.views}</span>}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(collection, item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete {displayName}</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{item.title || item.email || 'this item'}"? 
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(collection, item.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'published':
      case 'active':
        return 'default';
      case 'draft':
        return 'secondary';
      case 'pending':
        return 'outline';
      case 'archived':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You need to be logged in to access the admin panel.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showEditor) {
    return (
      <CMSEditor
        collection={editingCollection}
        item={editingItem}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-green-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your content and monitor your platform</p>
            </div>
            <Badge className="bg-green-100 text-green-800 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Admin Access
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-9 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{stats.packages}</div>
                  <p className="text-xs text-muted-foreground">Travel packages available</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{stats.blogs}</div>
                  <p className="text-xs text-muted-foreground">Published articles</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">{stats.courses}</div>
                  <p className="text-xs text-muted-foreground">Educational programs</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">{stats.events}</div>
                  <p className="text-xs text-muted-foreground">Scheduled events</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">{stats.bookings}</div>
                  <p className="text-xs text-muted-foreground">Customer bookings</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-indigo-600">{stats.users}</div>
                  <p className="text-xs text-muted-foreground">Registered users</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Knowledge Base</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-teal-600">{stats.knowledgebase}</div>
                  <p className="text-xs text-muted-foreground">Help articles</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Newsletter</CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-pink-600">{stats.newsletter}</div>
                  <p className="text-xs text-muted-foreground">Subscribers</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button onClick={() => handleCreate('packages')} className="h-20 flex-col">
                    <Package className="w-6 h-6 mb-2" />
                    New Package
                  </Button>
                  <Button onClick={() => handleCreate('blogs')} className="h-20 flex-col" variant="outline">
                    <FileText className="w-6 h-6 mb-2" />
                    New Blog Post
                  </Button>
                  <Button onClick={() => handleCreate('courses')} className="h-20 flex-col" variant="outline">
                    <BookOpen className="w-6 h-6 mb-2" />
                    New Course
                  </Button>
                  <Button onClick={() => handleCreate('events')} className="h-20 flex-col" variant="outline">
                    <Calendar className="w-6 h-6 mb-2" />
                    New Event
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="packages">
            {renderContentManager('packages', 'Packages')}
          </TabsContent>

          <TabsContent value="blogs">
            {renderContentManager('blogs', 'Blog Posts')}
          </TabsContent>

          <TabsContent value="courses">
            {renderContentManager('courses', 'Courses')}
          </TabsContent>

          <TabsContent value="events">
            {renderContentManager('events', 'Events')}
          </TabsContent>

          <TabsContent value="knowledge">
            {renderContentManager('knowledgebase', 'Knowledge Base')}
          </TabsContent>

          <TabsContent value="testimonials">
            {renderContentManager('testimonials', 'Testimonials')}
          </TabsContent>

          <TabsContent value="bookings">
            {renderContentManager('bookings', 'Bookings')}
          </TabsContent>

          <TabsContent value="users">
            {renderContentManager('users', 'Users')}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
