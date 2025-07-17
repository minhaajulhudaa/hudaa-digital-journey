import React, { useState, useEffect } from 'react';
import { useSite } from '@/hooks/useSite';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Package, BookOpen, Calendar, FileText, HelpCircle, Play, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import githubSDK from '@/lib/githubSDK';

interface UserPackage {
  id: string;
  packageId: string;
  userId: string;
  status: 'active' | 'completed' | 'cancelled';
  purchaseDate: string;
  package: any;
}

interface UserCourse {
  id: string;
  courseId: string;
  userId: string;
  progress: number;
  status: 'enrolled' | 'in_progress' | 'completed';
  enrollmentDate: string;
  course: any;
}

interface UserEvent {
  id: string;
  eventId: string;
  userId: string;
  status: 'registered' | 'attended' | 'cancelled';
  registrationDate: string;
  event: any;
}

const SiteUserDashboard = () => {
  const { currentSite } = useSite();
  const { toast } = useToast();
  
  const [userPackages, setUserPackages] = useState<UserPackage[]>([]);
  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
  const [userEvents, setUserEvents] = useState<UserEvent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentSite) {
      loadUserData();
    }
  }, [currentSite]);

  const loadUserData = async () => {
    if (!currentSite) return;
    
    setLoading(true);
    try {
      // In a real app, you'd filter by current user ID
      const [packagesData, coursesData, eventsData] = await Promise.all([
        githubSDK.get<UserPackage>('user_packages'),
        githubSDK.get<UserCourse>('user_courses'),
        githubSDK.get<UserEvent>('user_events')
      ]);

      setUserPackages(packagesData);
      setUserCourses(coursesData);
      setUserEvents(eventsData);
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

  if (!currentSite) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and manage your bookings</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="packages">My Packages</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Packages</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userPackages.filter(p => p.status === 'active').length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userCourses.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userEvents.filter(e => e.status === 'registered').length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {userCourses.length > 0 ? Math.round(userCourses.reduce((acc, c) => acc + c.progress, 0) / userCourses.length) : 0}%
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="packages">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">My Travel Packages</h2>
              
              {userPackages.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No packages purchased yet</p>
                    <Button className="mt-4">Browse Packages</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {userPackages.map((userPkg) => (
                    <Card key={userPkg.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>Package Title</CardTitle>
                            <CardDescription>Purchased on {new Date(userPkg.purchaseDate).toLocaleDateString()}</CardDescription>
                          </div>
                          <Badge variant={userPkg.status === 'active' ? 'default' : 'secondary'}>
                            {userPkg.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="outline" size="sm">Download Voucher</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="courses">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">My Learning Journey</h2>
              
              {userCourses.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No courses enrolled yet</p>
                    <Button className="mt-4">Browse Courses</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {userCourses.map((userCourse) => (
                    <Card key={userCourse.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>Course Title</CardTitle>
                            <CardDescription>Enrolled on {new Date(userCourse.enrollmentDate).toLocaleDateString()}</CardDescription>
                          </div>
                          <Badge variant={userCourse.status === 'completed' ? 'default' : 'secondary'}>
                            {userCourse.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Progress</span>
                              <span>{userCourse.progress}%</span>
                            </div>
                            <Progress value={userCourse.progress} className="w-full" />
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm">
                              <Play className="h-4 w-4 mr-2" />
                              Continue Learning
                            </Button>
                            <Button variant="outline" size="sm">View Certificate</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">My Events</h2>
              
              {userEvents.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No events registered yet</p>
                    <Button className="mt-4">Browse Events</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {userEvents.map((userEvent) => (
                    <Card key={userEvent.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>Event Title</CardTitle>
                            <CardDescription>Registered on {new Date(userEvent.registrationDate).toLocaleDateString()}</CardDescription>
                          </div>
                          <Badge variant={userEvent.status === 'registered' ? 'default' : 'secondary'}>
                            {userEvent.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Event</Button>
                          <Button variant="outline" size="sm">Download Ticket</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Resources & Support</h2>
              
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Knowledge Base
                    </CardTitle>
                    <CardDescription>Find answers to common questions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button>Browse Articles</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5" />
                      FAQ
                    </CardTitle>
                    <CardDescription>Frequently asked questions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button>View FAQ</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SiteUserDashboard;