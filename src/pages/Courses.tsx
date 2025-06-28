import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Calendar, Clock, Users, Star, ChevronRight, Lightbulb, GraduationCap, FileText } from 'lucide-react';
import sdk from '@/lib/sdk';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  lessons: string[];
  price: number;
  featured: boolean;
  category: string;
  level: string;
  status: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(courses.filter(course => course.category.toLowerCase() === filter));
    }
  }, [courses, filter]);

  const loadCourses = async () => {
    try {
      const data = await sdk.get<Course>('courses');
      setCourses(data.filter(course => course.status === 'active'));
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
      title: 'Hajj & Umrah: A Comprehensive Guide',
      description: 'Master the rituals, history, and spiritual significance of Hajj and Umrah with our comprehensive course.',
      instructor: 'Sheikh Abdullah Rahman',
      duration: '8 Weeks',
      lessons: ['Introduction to Hajj & Umrah', 'Rituals of Hajj', 'Rituals of Umrah', 'Spiritual Preparation', 'Travel Tips', 'Health & Safety'],
      price: 99,
      featured: true,
      category: 'Hajj & Umrah',
      level: 'Beginner',
      status: 'active'
    },
    {
      id: '2',
      title: 'Pre-Travel Islamic Etiquette',
      description: 'Learn essential Islamic etiquette and customs to enhance your travel experience and respect local traditions.',
      instructor: 'Imam Fatima Al-Zahra',
      duration: '4 Weeks',
      lessons: ['Introduction to Islamic Etiquette', 'Etiquette of Travel', 'Etiquette with Locals', 'Etiquette in Holy Sites', 'Cultural Sensitivity'],
      price: 49,
      featured: true,
      category: 'Islamic Studies',
      level: 'Beginner',
      status: 'active'
    },
    {
      id: '3',
      title: 'Arabic for Pilgrims: Essential Phrases',
      description: 'Learn essential Arabic phrases to communicate effectively during your pilgrimage and connect with local communities.',
      instructor: 'Ustad Omar Hassan',
      duration: '6 Weeks',
      lessons: ['Introduction to Arabic', 'Greetings & Basic Phrases', 'Asking for Directions', 'Shopping & Bargaining', 'Emergency Phrases', 'Cultural Insights'],
      price: 79,
      featured: false,
      category: 'Language',
      level: 'Beginner',
      status: 'active'
    },
    {
      id: '4',
      title: 'The Spiritual Dimensions of Hajj',
      description: 'Explore the profound spiritual meanings and inner dimensions of Hajj rituals to deepen your connection with Allah.',
      instructor: 'Dr. Aisha Khan',
      duration: '10 Weeks',
      lessons: ['Introduction to Spirituality', 'The Heart of Hajj', 'Inner Dimensions of Rituals', 'Purification of the Soul', 'Connecting with Allah', 'Post-Hajj Transformation'],
      price: 129,
      featured: true,
      category: 'Spirituality',
      level: 'Intermediate',
      status: 'active'
    },
    {
      id: '5',
      title: 'Advanced Hajj & Umrah Guidance',
      description: 'In-depth guidance on advanced topics, complex rituals, and unique situations during Hajj and Umrah.',
      instructor: 'Sheikh Yusuf Ali',
      duration: '12 Weeks',
      lessons: ['Advanced Rituals', 'Complex Scenarios', 'Unique Situations', 'Fiqh of Hajj & Umrah', 'Contemporary Issues', 'Spiritual Refinement'],
      price: 149,
      featured: false,
      category: 'Hajj & Umrah',
      level: 'Advanced',
      status: 'active'
    },
    {
      id: '6',
      title: 'The History of Makkah & Madinah',
      description: 'Discover the rich history, cultural heritage, and significant landmarks of the holy cities of Makkah and Madinah.',
      instructor: 'Professor Amina Siddiqui',
      duration: '8 Weeks',
      lessons: ['Pre-Islamic History', 'The Birth of Islam', 'The Prophet\'s Life', 'The Caliphate Era', 'Islamic Architecture', 'Modern Developments'],
      price: 99,
      featured: false,
      category: 'History',
      level: 'Intermediate',
      status: 'active'
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
            <h1 className="text-5xl font-bold mb-6">Online Courses</h1>
            <p className="text-xl text-green-100 leading-relaxed">
              Enhance your spiritual journey with our comprehensive online courses. Learn from expert instructors and deepen your understanding of Hajj, Umrah, and Islamic traditions.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-green-900">Our Courses</h2>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {filteredCourses.length} Available
              </Badge>
            </div>
            
            <div className="flex gap-4">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="hajj & umrah">Hajj & Umrah</SelectItem>
                  <SelectItem value="islamic studies">Islamic Studies</SelectItem>
                  <SelectItem value="language">Language</SelectItem>
                  <SelectItem value="spirituality">Spirituality</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      {filteredCourses.filter(course => course.featured).length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-900 mb-4">Featured Courses</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our most popular and comprehensive courses, carefully selected for exceptional value and learning experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.filter(course => course.featured).map((course) => (
                <Card key={course.id} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-green-50 relative overflow-hidden">
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-green-600 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="border-green-600 text-green-600">
                        {course.category.toUpperCase()}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl text-green-900 group-hover:text-green-700 transition-colors">
                      {course.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-gray-600 leading-relaxed">{course.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <GraduationCap className="w-4 h-4 mr-2 text-green-600" />
                        {course.level}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-green-600" />
                        {course.duration}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-green-900">Course Includes:</h4>
                      <ul className="space-y-1">
                        {course.lessons.slice(0, 4).map((lesson, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <FileText className="w-3 h-3 mr-2 text-green-600 flex-shrink-0" />
                            {lesson}
                          </li>
                        ))}
                        {course.lessons.length > 4 && (
                          <li className="text-sm text-green-600 font-medium">
                            +{course.lessons.length - 4} more lessons
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-3xl font-bold text-green-900">${course.price}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button className="flex-1 bg-green-600 hover:bg-green-700">
                          Enroll Now
                        </Button>
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
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
      )}

      {/* All Courses */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-900 mb-4">All Available Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our complete range of courses to find the perfect fit for your spiritual and educational needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-green-600 text-green-600">
                      {course.category.toUpperCase()}
                    </Badge>
                    {course.featured && (
                      <Badge className="bg-green-600 text-white text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl text-green-900 group-hover:text-green-700 transition-colors">
                    {course.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{course.description}</p>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <GraduationCap className="w-4 h-4 mr-2 text-green-600" />
                      {course.level}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-green-600" />
                      {course.duration}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-green-900">${course.price}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-sm">
                        Enroll Now
                      </Button>
                      <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-900 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Enhance Your Knowledge?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Our expert instructors are here to guide you in selecting the course that best suits your needs and spiritual goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-900 hover:bg-green-50 px-8">
                Speak with an Advisor
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8">
                Request Course Info
              </Button>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Expert Instructors</h3>
                <p className="text-green-100 text-sm">Learn from renowned scholars and experienced teachers</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Comprehensive Content</h3>
                <p className="text-green-100 text-sm">In-depth lessons covering all aspects of Islamic knowledge</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Community Support</h3>
                <p className="text-green-100 text-sm">Connect with fellow students and build lasting relationships</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
