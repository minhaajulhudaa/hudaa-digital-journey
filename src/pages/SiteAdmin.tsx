
import React, { useState, useEffect } from 'react';
import { useSite } from '@/hooks/useSite';
import { useTheme } from '@/hooks/useTheme';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Package, FileText, Calendar, Users, BarChart3, Edit3, PlusCircle, Edit, Trash2, Eye, BookOpen, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminCMSEditor from '@/components/AdminCMSEditor';
import LiveEditor from '@/components/LiveEditor';
import githubSDK from '@/lib/githubSDK';

const SiteAdmin = () => {
  const { currentSite } = useSite();
  const { currentTheme } = useTheme();
  const { toast } = useToast();
  
  const [packages, setPackages] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  
  const [isLiveEditorOpen, setIsLiveEditorOpen] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editingCollection, setEditingCollection] = useState('');
  const [editingItem, setEditingItem] = useState<any>(null);
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
        githubSDK.get('packages'),
        githubSDK.get('courses'),
        githubSDK.get('events'),
        githubSDK.get('blogs'),
        githubSDK.get('knowledgebase'),
        githubSDK.get('faqs')
      ]);

      setPackages(packagesData.filter((p: any) => p.siteId === currentSite.id));
      setCourses(coursesData.filter((c: any) => c.siteId === currentSite.id));
      setEvents(eventsData.filter((e: any) => e.siteId === currentSite.id));
      setBlogPosts(blogData.filter((b: any) => b.siteId === currentSite.id));
      setKnowledgeBase(kbData.filter((k: any) => k.siteId === currentSite.id));
      setFaqs(faqData.filter((f: any) => f.siteId === currentSite.id));
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

  const handleCreate = (collection: string) => {
    setEditingCollection(collection);
    setEditingItem(null);
    setShowEditor(true);
  };

  const handleEdit = (collection: string, item: any) => {
    setEditingCollection(collection);
    setEditingItem(item);
    setShowEditor(true);
  };

  const handleSave = async () => {
    await loadData();
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
      await githubSDK.delete(collection, id);
      await loadData();
      toast({
        title: "Success",
        description: `Item deleted successfully`
      });
    } catch (error) {
      console.error(`Error deleting item:`, error);
      toast({
        title: "Error",
        description: `Failed to delete item`,
        variant: "destructive"
      });
    }
  };

  if (!currentSite) return null;

  if (showEditor) {
    return (
      <AdminCMSEditor
        collection={editingCollection}
        item={editingItem}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  const renderContentList = (items: any[], collection: string, displayName: string) => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{displayName}</h2>
        <Button onClick={() => handleCreate(collection)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add {displayName.replace(/s$/, '')}
        </Button>
      </div>

      <div className="grid gap-6">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{item.title || item.question}</CardTitle>
                  <CardDescription>{item.description || item.answer}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant={item.status === 'published' || item.status === 'active' ? 'default' : 'secondary'}>
                    {item.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Created: {new Date(item.createdAt).toLocaleDateString()}
                  {item.price && <span className="ml-4 font-semibold">${item.price}</span>}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(collection, item)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete {displayName.replace(/s$/, '')}</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{item.title || item.question}"? This action cannot be undone.
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
        ))}
      </div>

      {items.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Package className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-muted-foreground">No {displayName.toLowerCase()} created yet</p>
            <Button className="mt-4" onClick={() => handleCreate(collection)}>
              Create your first {displayName.replace(/s$/, '').toLowerCase()}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );

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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <Button onClick={() => handleCreate('packages')} className="h-20 flex-col">
                <Package className="w-6 h-6 mb-2" />
                New Package
              </Button>
              <Button onClick={() => handleCreate('courses')} className="h-20 flex-col" variant="outline">
                <BookOpen className="w-6 h-6 mb-2" />
                New Course
              </Button>
              <Button onClick={() => handleCreate('events')} className="h-20 flex-col" variant="outline">
                <Calendar className="w-6 h-6 mb-2" />
                New Event
              </Button>
              <Button onClick={() => handleCreate('blogs')} className="h-20 flex-col" variant="outline">
                <FileText className="w-6 h-6 mb-2" />
                New Blog Post
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="packages">
            {renderContentList(packages, 'packages', 'Packages')}
          </TabsContent>

          <TabsContent value="courses">
            {renderContentList(courses, 'courses', 'Courses')}
          </TabsContent>

          <TabsContent value="events">
            {renderContentList(events, 'events', 'Events')}
          </TabsContent>

          <TabsContent value="blog">
            {renderContentList(blogPosts, 'blogs', 'Blog Posts')}
          </TabsContent>

          <TabsContent value="knowledge">
            {renderContentList(knowledgeBase, 'knowledgebase', 'Knowledge Base')}
          </TabsContent>

          <TabsContent value="faq">
            {renderContentList(faqs, 'faqs', 'FAQs')}
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
