import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { useSite } from '@/hooks/useSite';
import { useTheme } from '@/hooks/useTheme';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Package, FileText, Calendar, Users, BarChart3, Edit, Trash2, Eye, BookOpen, HelpCircle, Plus, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import AdminCMSEditor from '@/components/AdminCMSEditor';
import githubSDK from '@/lib/githubSDK';

// Dashboard Component
const Dashboard = () => {
  const { currentSite } = useSite();
  const { currentTheme } = useTheme();
  const { siteSlug } = useParams();
  const [stats, setStats] = useState({
    packages: 0,
    courses: 0,
    events: 0,
    blogs: 0,
    knowledgebase: 0,
    faqs: 0,
    users: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentSite) {
      loadStats();
    }
  }, [currentSite]);

  const loadStats = async () => {
    if (!currentSite) return;
    
    setLoading(true);
    try {
      const [packages, courses, events, blogs, kb, faqs, users] = await Promise.all([
        githubSDK.get('packages'),
        githubSDK.get('courses'),
        githubSDK.get('events'),
        githubSDK.get('blogs'),
        githubSDK.get('knowledgebase'),
        githubSDK.get('faqs'),
        githubSDK.get('users')
      ]);

      setStats({
        packages: packages.filter((p: any) => p.siteId === currentSite.id).length,
        courses: courses.filter((c: any) => c.siteId === currentSite.id).length,
        events: events.filter((e: any) => e.siteId === currentSite.id).length,
        blogs: blogs.filter((b: any) => b.siteId === currentSite.id).length,
        knowledgebase: kb.filter((k: any) => k.siteId === currentSite.id).length,
        faqs: faqs.filter((f: any) => f.siteId === currentSite.id).length,
        users: users.filter((u: any) => u.siteId === currentSite.id).length
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" style={{ color }} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold" style={{ color }}>{value}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: currentTheme?.primaryColor }}>
          Dashboard
        </h1>
        <p className="text-gray-600">Welcome to your {currentSite?.name} admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Packages"
          value={stats.packages}
          icon={Package}
          color={currentTheme?.primaryColor}
        />
        <StatCard
          title="Courses"
          value={stats.courses}
          icon={BookOpen}
          color={currentTheme?.accentColor}
        />
        <StatCard
          title="Events"
          value={stats.events}
          icon={Calendar}
          color="#f59e0b"
        />
        <StatCard
          title="Blog Posts"
          value={stats.blogs}
          icon={FileText}
          color="#8b5cf6"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates to your content</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">No recent activity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" />
              Create New Package
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" />
              Add Blog Post
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Plus className="mr-2 h-4 w-4" />
              Schedule Event
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Content Manager Component
const ContentManager = ({ collection, displayName }: { collection: string; displayName: string }) => {
  const { currentSite } = useSite();
  const { currentTheme } = useTheme();
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    if (currentSite) {
      loadData();
      // Subscribe to real-time updates
      const unsubscribe = githubSDK.subscribe(collection, (data: any[]) => {
        const siteItems = data.filter((item: any) => item.siteId === currentSite.id);
        setItems(siteItems);
      });
      return unsubscribe;
    }
  }, [currentSite, collection]);

  const loadData = async () => {
    if (!currentSite) return;
    
    setLoading(true);
    try {
      const data = await githubSDK.get(collection);
      const siteItems = data.filter((item: any) => item.siteId === currentSite.id);
      setItems(siteItems);
    } catch (error) {
      console.error(`Error loading ${collection}:`, error);
      toast({
        title: "Error",
        description: `Failed to load ${displayName.toLowerCase()}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingItem(null);
    setShowEditor(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowEditor(true);
  };

  const handleSave = async () => {
    await loadData();
    setShowEditor(false);
    setEditingItem(null);
    toast({
      title: "Success",
      description: `${displayName} saved successfully`
    });
  };

  const handleCancel = () => {
    setShowEditor(false);
    setEditingItem(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await githubSDK.delete(collection, id);
      toast({
        title: "Success",
        description: `${displayName} deleted successfully`
      });
    } catch (error) {
      console.error(`Error deleting ${collection}:`, error);
      toast({
        title: "Error",
        description: `Failed to delete ${displayName.toLowerCase()}`,
        variant: "destructive"
      });
    }
  };

  const filteredItems = items.filter(item =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.question?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showEditor) {
    return (
      <AdminCMSEditor
        collection={collection}
        item={editingItem}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: currentTheme?.primaryColor }}>
            {displayName}
          </h1>
          <p className="text-gray-600">Manage your {displayName.toLowerCase()}</p>
        </div>
        <Button onClick={handleCreate} style={{ backgroundColor: currentTheme?.primaryColor }}>
          <Plus className="mr-2 h-4 w-4" />
          Add {displayName.replace(/s$/, '')}
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder={`Search ${displayName.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : filteredItems.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Package className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-muted-foreground mb-4">No {displayName.toLowerCase()} found</p>
            <Button onClick={handleCreate}>
              Create your first {displayName.replace(/s$/, '').toLowerCase()}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="mb-2">
                      {item.title || item.name || item.question || 'Untitled'}
                    </CardTitle>
                    <CardDescription className="mb-3">
                      {item.description || item.excerpt || item.answer || 'No description'}
                    </CardDescription>
                    <div className="flex gap-2">
                      <Badge variant={item.status === 'published' || item.status === 'active' ? 'default' : 'secondary'}>
                        {item.status || 'draft'}
                      </Badge>
                      {item.price && (
                        <Badge variant="outline">${item.price}</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete {displayName.replace(/s$/, '')}</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{item.title || item.name || 'this item'}"? 
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

const SiteAdmin = () => {
  const { currentSite } = useSite();
  const { siteSlug } = useParams();

  console.log('SiteAdmin: currentSite =', currentSite);
  console.log('SiteAdmin: siteSlug =', siteSlug);

  if (!currentSite) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Site Selected</h1>
          <p className="text-gray-600">Please select a site to manage</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to={`/${siteSlug}/admin/dashboard`} replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/packages" element={<ContentManager collection="packages" displayName="Packages" />} />
        <Route path="/courses" element={<ContentManager collection="courses" displayName="Courses" />} />
        <Route path="/events" element={<ContentManager collection="events" displayName="Events" />} />
        <Route path="/blog" element={<ContentManager collection="blogs" displayName="Blog Posts" />} />
        <Route path="/knowledge" element={<ContentManager collection="knowledgebase" displayName="Knowledge Base" />} />
        <Route path="/faq" element={<ContentManager collection="faqs" displayName="FAQs" />} />
        <Route path="/users" element={<ContentManager collection="users" displayName="Users" />} />
      </Routes>
    </AdminLayout>
  );
};

export default SiteAdmin;
