
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { 
  Users, Package, BookOpen, Calendar, MessageSquare, Settings, 
  Plus, Edit, Trash2, Eye, BarChart3, Mail, FileText,
  Shield, Save, X, Search, Filter, Download, Upload
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
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
  const [stats, setStats] = useState({
    packages: 0,
    blogs: 0,
    courses: 0,
    events: 0,
    bookings: 0,
    users: 0
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

  // Form states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (isAuthenticated && user) {
      loadDashboardData();
    }
  }, [isAuthenticated, user]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [packagesData, blogsData, coursesData, eventsData, kbData, testimonialsData, bookingsData, usersData] = await Promise.all([
        sdk.get('packages'),
        sdk.get('blogs'),
        sdk.get('courses'),
        sdk.get('events'),
        sdk.get('knowledgebase'),
        sdk.get('testimonials'),
        sdk.get('bookings'),
        sdk.get('users')
      ]);

      setPackages(packagesData);
      setBlogs(blogsData);
      setCourses(coursesData);
      setEvents(eventsData);
      setKnowledgeBase(kbData);
      setTestimonials(testimonialsData);
      setBookings(bookingsData);
      setUsers(usersData);

      setStats({
        packages: packagesData.length,
        blogs: blogsData.length,
        courses: coursesData.length,
        events: eventsData.length,
        bookings: bookingsData.length,
        users: usersData.length
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

  const handleCreate = async (collection: string, data: any) => {
    try {
      await sdk.insert(collection, { ...data, author: user?.email, created: new Date().toISOString() });
      await loadDashboardData();
      setIsDialogOpen(false);
      setFormData({});
      toast({
        title: "Success",
        description: `${collection} created successfully`
      });
    } catch (error) {
      console.error(`Error creating ${collection}:`, error);
      toast({
        title: "Error",
        description: `Failed to create ${collection}`,
        variant: "destructive"
      });
    }
  };

  const handleUpdate = async (collection: string, id: string, data: any) => {
    try {
      await sdk.update(collection, id, { ...data, updated: new Date().toISOString() });
      await loadDashboardData();
      setIsDialogOpen(false);
      setEditingItem(null);
      setFormData({});
      toast({
        title: "Success",
        description: `${collection} updated successfully`
      });
    } catch (error) {
      console.error(`Error updating ${collection}:`, error);
      toast({
        title: "Error",
        description: `Failed to update ${collection}`,
        variant: "destructive"
      });
    }
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

  const renderContentManager = (collection: string, items: ContentItem[], fields: any[]) => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold capitalize">{collection} Management</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingItem(null); setFormData({}); }}>
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? `Edit ${collection}` : `Create New ${collection}`}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  {field.type === 'textarea' ? (
                    <Textarea
                      id={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                      rows={4}
                    />
                  ) : field.type === 'select' ? (
                    <Select value={formData[field.name] || ''} onValueChange={(value) => setFormData(prev => ({ ...prev, [field.name]: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option: any) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type || 'text'}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    />
                  )}
                </div>
              ))}
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={() => editingItem 
                    ? handleUpdate(collection, editingItem.id, formData)
                    : handleCreate(collection, formData)
                  }
                  className="flex-1"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingItem ? 'Update' : 'Create'}
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{item.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    {item.description || item.excerpt || 'No description'}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                      {item.status}
                    </Badge>
                    {item.type && <Badge variant="outline">{item.type}</Badge>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setEditingItem(item);
                      setFormData(item);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete {collection}</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{item.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(collection, item.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

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

  const packageFields = [
    { name: 'title', label: 'Package Title', type: 'text', placeholder: 'Enter package title' },
    { name: 'type', label: 'Package Type', type: 'select', options: [
      { value: 'hajj', label: 'Hajj' },
      { value: 'umrah', label: 'Umrah' },
      { value: 'visa', label: 'Visa Services' }
    ]},
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Package description' },
    { name: 'price', label: 'Price', type: 'number', placeholder: 'Package price' },
    { name: 'duration', label: 'Duration', type: 'text', placeholder: 'e.g., 15 Days' },
    { name: 'status', label: 'Status', type: 'select', options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' }
    ]}
  ];

  const blogFields = [
    { name: 'title', label: 'Blog Title', type: 'text', placeholder: 'Enter blog title' },
    { name: 'excerpt', label: 'Excerpt', type: 'textarea', placeholder: 'Brief description' },
    { name: 'content', label: 'Content', type: 'textarea', placeholder: 'Blog content' },
    { name: 'category', label: 'Category', type: 'text', placeholder: 'Blog category' },
    { name: 'status', label: 'Status', type: 'select', options: [
      { value: 'published', label: 'Published' },
      { value: 'draft', label: 'Draft' }
    ]}
  ];

  const courseFields = [
    { name: 'title', label: 'Course Title', type: 'text', placeholder: 'Enter course title' },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Course description' },
    { name: 'instructor', label: 'Instructor', type: 'text', placeholder: 'Instructor name' },
    { name: 'duration', label: 'Duration', type: 'text', placeholder: 'e.g., 4 weeks' },
    { name: 'price', label: 'Price', type: 'number', placeholder: 'Course price (0 for free)' },
    { name: 'status', label: 'Status', type: 'select', options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' }
    ]}
  ];

  const eventFields = [
    { name: 'title', label: 'Event Title', type: 'text', placeholder: 'Enter event title' },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Event description' },
    { name: 'date', label: 'Date', type: 'datetime-local', placeholder: 'Event date and time' },
    { name: 'location', label: 'Location', type: 'text', placeholder: 'Event location' },
    { name: 'capacity', label: 'Capacity', type: 'number', placeholder: 'Maximum attendees' },
    { name: 'status', label: 'Status', type: 'select', options: [
      { value: 'upcoming', label: 'Upcoming' },
      { value: 'ongoing', label: 'Ongoing' },
      { value: 'completed', label: 'Completed' }
    ]}
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-green-900">Admin Dashboard</h1>
            <Badge className="bg-green-100 text-green-800">
              <Shield className="w-4 h-4 mr-1" />
              Admin Access
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.packages}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.blogs}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.courses}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.events}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.bookings}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.users}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="packages">
            {renderContentManager('packages', packages, packageFields)}
          </TabsContent>

          <TabsContent value="blogs">
            {renderContentManager('blogs', blogs, blogFields)}
          </TabsContent>

          <TabsContent value="courses">
            {renderContentManager('courses', courses, courseFields)}
          </TabsContent>

          <TabsContent value="events">
            {renderContentManager('events', events, eventFields)}
          </TabsContent>

          <TabsContent value="knowledge">
            {renderContentManager('knowledgebase', knowledgeBase, [
              { name: 'title', label: 'Title', type: 'text', placeholder: 'Knowledge base title' },
              { name: 'content', label: 'Content', type: 'textarea', placeholder: 'Knowledge content' },
              { name: 'category', label: 'Category', type: 'text', placeholder: 'Category' },
              { name: 'status', label: 'Status', type: 'select', options: [
                { value: 'published', label: 'Published' },
                { value: 'draft', label: 'Draft' }
              ]}
            ])}
          </TabsContent>

          <TabsContent value="bookings">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Booking Management</h3>
              <div className="grid gap-4">
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{booking.customerName}</h4>
                          <p className="text-sm text-gray-600">{booking.customerEmail}</p>
                          <Badge className="mt-2">{booking.status}</Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${booking.totalAmount}</p>
                          <p className="text-sm text-gray-600">{booking.travelers} travelers</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">User Management</h3>
              <div className="grid gap-4">
                {users.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{user.email}</h4>
                          <p className="text-sm text-gray-600">{user.name || 'No name provided'}</p>
                          <div className="flex gap-2 mt-2">
                            {user.roles?.map((role: string) => (
                              <Badge key={role} variant="outline">{role}</Badge>
                            ))}
                          </div>
                        </div>
                        <Badge variant={user.verified ? 'default' : 'secondary'}>
                          {user.verified ? 'Verified' : 'Unverified'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
