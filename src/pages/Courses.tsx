
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Users, BookOpen, Star, Play, Download, CheckCircle } from 'lucide-react';
import sdk from '@/lib/sdk';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  lessons: any[];
  price: number;
  featured: boolean;
  level: string;
  category: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await sdk.get<Course>('courses');
      setCourses(data);
    } catch (error) {
      console.error('Error loading courses:', error);
      // Load sample data if SDK fails
      setCourses(sampleCourses);
    } finally {
      setLoading(false);
    }
  };

  const sampleCourses: Course[] = [
    {
      id: '1',
      title: 'Complete Hajj Preparation Course',
      description: 'Comprehensive preparation for the sacred journey of Hajj, covering all rituals, spiritual preparation, and practical guidance.',
      instructor: 'Sheikh Ahmad Rahman',
      duration: '8 weeks',
      lessons: [
        { title: 'Introduction to Hajj', duration: '45 min', completed: false },
        { title: 'Spiritual Preparation', duration: '60 min', completed: false },
        { title: 'Hajj Rituals Step by Step', duration: '90 min', completed: false },
        { title: 'Common Mistakes to Avoid', duration: '30 min', completed: false },
        { title: 'Du\'as and Supplications', duration: '45 min', completed: false }
      ],
      price: 199,
      featured: true,
      level: 'Beginner',
      category: 'Hajj'
    },
    {
      id: '2',
      title: 'Umrah Made Simple',
      description: 'Essential guide for first-time Umrah pilgrims, covering all necessary rituals and spiritual aspects of the minor pilgrimage.',
      instructor: 'Dr. Fatima Al-Zahra',
      duration: '4 weeks',
      lessons: [
        { title: 'Understanding Umrah', duration: '30 min', completed: false },
        { title: 'Ihram and Intentions', duration: '40 min', completed: false },
        { title: 'Tawaf and Sa\'i', duration: '50 min', completed: false },
        { title: 'Completion and Du\'as', duration: '25 min', completed: false }
      ],
      price: 99,
      featured: true,
      level: 'Beginner',
      category: 'Umrah'
    },
    {
      id: '3',
      title: 'Islamic History of Makkah and Madinah',
      description: 'Deep dive into the rich Islamic history of the two holy cities, enhancing your spiritual connection during pilgrimage.',
      instructor: 'Prof. Muhammad Al-Farisi',
      duration: '6 weeks',
      lessons: [
        { title: 'Pre-Islamic Makkah', duration: '35 min', completed: false },
        { title: 'The Prophet\'s Life in Makkah', duration: '55 min', completed: false },
        { title: 'Migration to Madinah', duration: '45 min', completed: false },
        { title: 'Development of Madinah', duration: '40 min', completed: false },
        { title: 'Sacred Sites and Their Stories', duration: '60 min', completed: false }
      ],
      price: 149,
      featured: false,
      level: 'Intermediate',
      category: 'History'
    },
    {
      id: '4',
      title: 'Spiritual Purification for Pilgrimage',
      description: 'Focus on the inner aspects of pilgrimage, spiritual cleansing, and maintaining the spiritual benefits after return.',
      instructor: 'Sheikh Omar Ibrahim',
      duration: '5 weeks',
      lessons: [
        { title: 'The Concept of Spiritual Purification', duration: '40 min', completed: false },
        { title: 'Preparing the Heart', duration: '50 min', completed: false },
        { title: 'Dhikr and Reflection', duration: '35 min', completed: false },
        { title: 'Maintaining Spirituality', duration: '45 min', completed: false }
      ],
      price: 129,
      featured: true,
      level: 'All Levels',
      category: 'Spirituality'
    },
    {
      id: '5',
      title: 'Arabic Phrases for Pilgrims',
      description: 'Essential Arabic phrases and supplications every pilgrim should know for a more meaningful journey.',
      instructor: 'Ustadh Hassan Al-Mahmoud',
      duration: '3 weeks',
      lessons: [
        { title: 'Basic Greetings and Phrases', duration: '25 min', completed: false },
        { title: 'Pilgrimage-Specific Vocabulary', duration: '30 min', completed: false },
        { title: 'Du\'as and Their Meanings', duration: '40 min', completed: false }
      ],
      price: 79,
      featured: false,
      level: 'Beginner',
      category: 'Language'
    },
    {
      id: '6',
      title: 'Health and Wellness During Hajj',
      description: 'Comprehensive guide to maintaining physical and mental health during the demanding journey of Hajj.',
      instructor: 'Dr. Aisha Mohamed',
      duration: '2 weeks',
      lessons: [
        { title: 'Pre-Travel Health Preparation', duration: '35 min', completed: false },
        { title: 'Managing Physical Challenges', duration: '40 min', completed: false },
        { title: 'Mental and Emotional Wellness', duration: '30 min', completed: false }
      ],
      price: 89,
      featured: false,
      level: 'All Levels',
      category: 'Health'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-600">Loading courses...</p>
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
            <h1 className="text-5xl font-bold mb-6">Islamic Learning Center</h1>
            <p className="text-xl text-green-100">
              Prepare for your spiritual journey with our comprehensive courses designed by Islamic scholars and experienced guides
            </p>
          </div>
        </div>
      </section>

      {/* Course Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-900 mb-2">{courses.length}+</div>
              <div className="text-gray-600">Expert Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-900 mb-2">2000+</div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-900 mb-2">50+</div>
              <div className="text-gray-600">Hours of Content</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-900 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-900 mb-4">Featured Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most comprehensive and popular courses, carefully crafted by renowned Islamic scholars
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
            {courses.filter(course => course.featured).map((course) => (
              <Card key={course.id} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-green-50 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-green-600 to-green-800 relative">
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/20 text-white backdrop-blur-sm">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-500 text-white">
                      {course.level}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8" />
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white mb-2">
                        {course.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-green-900 mb-2 group-hover:text-green-700 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-green-600" />
                      {course.instructor}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-green-600" />
                      {course.duration}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Course Progress</span>
                      <span className="text-green-600">0/{course.lessons.length} lessons</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-green-900">${course.price}</span>
                        <span className="text-gray-600 ml-2 line-through">${course.price + 50}</span>
                      </div>
                      <Badge className="bg-red-100 text-red-800">
                        Limited Time
                      </Badge>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700">
                        Enroll Now
                      </Button>
                      <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                        Preview
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Courses */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-900 mb-4">All Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our complete library of Islamic education courses to enhance your knowledge and spiritual preparation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-green-600 text-green-600 text-xs">
                      {course.category}
                    </Badge>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      {course.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-green-900 group-hover:text-green-700 transition-colors line-clamp-2">
                    {course.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {course.instructor}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {course.duration}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{course.lessons.length} Lessons</span>
                      <span className="text-green-600">Beginner Friendly</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-xl font-bold text-green-900">${course.price}</span>
                      </div>
                      {course.featured && (
                        <Badge className="bg-green-600 text-white text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        Enroll
                      </Button>
                      <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-green-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Your Learning Journey</h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Follow our structured learning path to ensure comprehensive preparation for your sacred journey
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Foundation</h3>
              <p className="text-green-100 text-sm">Learn the basics of Islamic pilgrimage and its significance</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Preparation</h3>
              <p className="text-green-100 text-sm">Spiritual, physical, and practical preparation for your journey</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Execution</h3>
              <p className="text-green-100 text-sm">Step-by-step guidance for performing rituals correctly</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Integration</h3>
              <p className="text-green-100 text-sm">Maintaining spiritual benefits and sharing knowledge</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-white text-green-900 hover:bg-green-50 px-12">
              Start Your Learning Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Instructor Spotlight */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-900 mb-4">Meet Our Instructors</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn from renowned Islamic scholars and experienced guides who have dedicated their lives to Islamic education
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-green-100">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  SA
                </div>
                <h3 className="text-lg font-bold text-green-900 mb-2">Sheikh Ahmad Rahman</h3>
                <p className="text-green-600 text-sm mb-3">Lead Islamic Scholar</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  20+ years of experience in Islamic education and guiding pilgrims. PhD in Islamic Studies from Al-Azhar University.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-100">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  FA
                </div>
                <h3 className="text-lg font-bold text-green-900 mb-2">Dr. Fatima Al-Zahra</h3>
                <p className="text-green-600 text-sm mb-3">Women's Islamic Education</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Specialist in women's issues in Islam and pilgrimage preparation. Author of several books on Islamic practices.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-100">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  MF
                </div>
                <h3 className="text-lg font-bold text-green-900 mb-2">Prof. Muhammad Al-Farisi</h3>
                <p className="text-green-600 text-sm mb-3">Islamic History Expert</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Professor of Islamic History with extensive research on the holy cities of Makkah and Madinah.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
