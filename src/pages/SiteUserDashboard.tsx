
import React, { useState, useEffect } from 'react';
import { useSite } from '@/hooks/useSite';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Package, BookOpen, Calendar, FileText, HelpCircle, User, Award, Clock, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import githubSDK from '@/lib/githubSDK';

const SiteUserDashboard = () => {
  const { currentSite } = useSite();
  const { currentTheme } = useTheme();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [myPackages, setMyPackages] = useState<any[]>([]);
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [myEvents, setMyEvents] = useState<any[]>([]);
  const [availablePackages, setAvailablePackages] = useState<any[]>([]);
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);
  const [availableEvents, setAvailableEvents] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentSite && user) {
      loadData();
    }
  }, [currentSite, user]);

  const loadData = async () => {
    if (!currentSite || !user) return;
    
    setLoading(true);
    try {
      const [
        packagesData, 
        coursesData, 
        eventsData, 
        blogData, 
        kbData, 
        faqData,
        bookingsData,
        enrollmentsData
      ] = await Promise.all([
        githubSDK.get('packages'),
        githubSDK.get('courses'),
        githubSDK.get('events'),
        githubSDK.get('blogs'),
        githubSDK.get('knowledgebase'),
        githubSDK.get('faqs'),
        githubSDK.get('bookings'),
        githubSDK.get('enrollments')
      ]);

      // Filter by site
      const sitePackages = packagesData.filter((p: any) => p.siteId === currentSite.id && p.status === 'active');
      const siteCourses = coursesData.filter((c: any) => c.siteId === currentSite.id && c.status === 'published');
      const siteEvents = eventsData.filter((e: any) => e.siteId === currentSite.id && e.status === 'active');
      
      setAvailablePackages(sitePackages);
      setAvailableCourses(siteCourses);
      setAvailableEvents(siteEvents);
      setBlogPosts(blogData.filter((b: any) => b.siteId === currentSite.id && b.status === 'published'));
      setKnowledgeBase(kbData.filter((k: any) => k.siteId === currentSite.id && k.status === 'published'));
      setFaqs(faqData.filter((f: any) => f.siteId === currentSite.id && f.status === 'active'));

      // Filter user's bookings and enrollments
      const userBookings = bookingsData.filter((b: any) => b.userEmail === user.email);
      const userEnrollments = enrollmentsData.filter((e: any) => e.userEmail === user.email);

      // Match with packages, courses, events
      setMyPackages(sitePackages.filter((p: any) => 
        userBookings.some((b: any) => b.packageId === p.id)
      ));
      setMyCourses(siteCourses.filter((c: any) => 
        userEnrollments.some((e: any) => e.courseId === c.id)
      ));
      setMyEvents(siteEvents.filter((e: any) => 
        userBookings.some((b: any) => b.eventId === e.id)
      ));

    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId: string) => {
    if (!user) return;
    
    try {
      await githubSDK.insert('enrollments', {
        courseId,
        userEmail: user.email,
        userName: user.name,
        enrolledAt: new Date().toISOString(),
        progress: 0,
        status: 'active'
      });
      
      await loadData();
      toast({
        title: "Success",
        description: "Successfully enrolled in course"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to enroll in course",
        variant: "destructive"
      });
    }
  };

  const handleBookPackage = async (packageId: string) => {
    if (!user) return;
    
    try {
      await githubSDK.insert('bookings', {
        packageId,
        userEmail: user.email,
        userName: user.name,
        bookedAt: new Date().toISOString(),
        status: 'pending'
      });
      
      await loadData();
      toast({
        title: "Success",
        description: "Package booking request submitted"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book package",
        variant: "destructive"
      });
    }
  };

  const handleRegisterEvent = async (eventId: string) => {
    if (!user) return;
    
    try {
      await githubSDK.insert('bookings', {
        eventId,
        userEmail: user.email,
        userName: user.name,
        bookedAt: new Date().toISOString(),
        status: 'confirmed'
      });
      
      await loadData();
      toast({
        title: "Success",
        description: "Successfully registered for event"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register for event",
        variant: "destructive"
      });
    }
  };

  if (!currentSite || !user) return null;

  const renderPackageCard = (pkg: any, isBooked = false) => (
    <Card key={pkg.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{pkg.title}</CardTitle>
            <CardDescription>{pkg.description}</CardDescription>
          </div>
          <Badge variant={isBooked ? 'default' : 'secondary'}>
            {isBooked ? 'Booked' : `$${pkg.price}`}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Duration: {pkg.duration}
            {pkg.category && <span className="ml-4">Category: {pkg.category}</span>}
          </div>
          {!isBooked && (
            <Button onClick={() => handleBookPackage(pkg.id)}>
              Book Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderCourseCard = (course: any, isEnrolled = false) => (
    <Card key={course.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{course.title}</CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant={isEnrolled ? 'default' : 'secondary'}>
              {isEnrolled ? 'Enrolled' : `$${course.price}`}
            </Badge>
            <Badge variant="outline">{course.level}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEnrolled && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>45%</span>
            </div>
            <Progress value={45} className="w-full" />
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Instructor: {course.instructor}
            <span className="ml-4">Duration: {course.duration}</span>
          </div>
          {!isEnrolled && (
            <Button onClick={() => handleEnroll(course.id)}>
              Enroll Now
            </Button>
          )}
          {isEnrolled && (
            <Button>
              Continue Learning
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderEventCard = (event: any, isRegistered = false) => (
    <Card key={event.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>{event.description}</CardDescription>
          </div>
          <Badge variant={isRegistered ? 'default' : 'secondary'}>
            {isRegistered ? 'Registered' : `$${event.price}`}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Date: {new Date(event.date).toLocaleDateString()}
            <span className="ml-4">Time: {event.time}</span>
            <div>Location: {event.location}</div>
          </div>
          {!isRegistered && (
            <Button onClick={() => handleRegisterEvent(event.id)}>
              Register
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div 
      className="min-h-screen py-8"
      style={{ backgroundColor: currentTheme?.backgroundColor || '#ffffff' }}
    >
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: currentTheme?.primaryColor || '#004225' }}
          >
            My Dashboard
          </h1>
          <p style={{ color: currentTheme?.textColor || '#1f2937' }}>
            Welcome back, {user.name}!
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="my-packages">My Packages</TabsTrigger>
            <TabsTrigger value="my-courses">My Courses</TabsTrigger>
            <TabsTrigger value="my-events">My Events</TabsTrigger>
            <TabsTrigger value="browse">Browse</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">My Packages</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{myPackages.length}</div>
                  <p className="text-xs text-muted-foreground">Booked packages</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{myCourses.length}</div>
                  <p className="text-xs text-muted-foreground">Active enrollments</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Registered Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{myEvents.length}</div>
                  <p className="text-xs text-muted-foreground">Upcoming events</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45%</div>
                  <p className="text-xs text-muted-foreground">Average completion</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <BookOpen className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-medium">Continued learning "Advanced Travel Photography"</p>
                        <p className="text-sm text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Package className="h-8 w-8 text-green-500" />
                      <div>
                        <p className="font-medium">Booked "Maldives Paradise Package"</p>
                        <p className="text-sm text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="my-packages">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">My Travel Packages</h2>
              <div className="grid gap-6">
                {myPackages.map(pkg => renderPackageCard(pkg, true))}
              </div>
              {myPackages.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No packages booked yet</p>
                    <Button className="mt-4">Browse Packages</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="my-courses">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">My Courses</h2>
              <div className="grid gap-6">
                {myCourses.map(course => renderCourseCard(course, true))}
              </div>
              {myCourses.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No courses enrolled yet</p>
                    <Button className="mt-4">Browse Courses</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="my-events">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">My Events</h2>
              <div className="grid gap-6">
                {myEvents.map(event => renderEventCard(event, true))}
              </div>
              {myEvents.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No events registered yet</p>
                    <Button className="mt-4">Browse Events</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="browse">
            <Tabs defaultValue="packages" className="space-y-6">
              <TabsList>
                <TabsTrigger value="packages">Packages</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
              </TabsList>
              
              <TabsContent value="packages">
                <div className="grid gap-6">
                  {availablePackages.map(pkg => renderPackageCard(pkg, false))}
                </div>
              </TabsContent>
              
              <TabsContent value="courses">
                <div className="grid gap-6">
                  {availableCourses.map(course => renderCourseCard(course, false))}
                </div>
              </TabsContent>
              
              <TabsContent value="events">
                <div className="grid gap-6">
                  {availableEvents.map(event => renderEventCard(event, false))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="resources">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Resources</h2>
              
              <Tabs defaultValue="blog">
                <TabsList>
                  <TabsTrigger value="blog">Blog</TabsTrigger>
                  <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
                </TabsList>
                
                <TabsContent value="blog">
                  <div className="grid gap-6">
                    {blogPosts.map(post => (
                      <Card key={post.id}>
                        <CardHeader>
                          <CardTitle>{post.title}</CardTitle>
                          <CardDescription>{post.excerpt}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-gray-500">
                            By {post.author} • {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="knowledge">
                  <div className="grid gap-6">
                    {knowledgeBase.map(article => (
                      <Card key={article.id}>
                        <CardHeader>
                          <CardTitle>{article.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-gray-500">
                            Category: {article.category}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          <TabsContent value="support">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map(faq => (
                  <Card key={faq.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{faq.answer}</p>
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

export default SiteUserDashboard;
