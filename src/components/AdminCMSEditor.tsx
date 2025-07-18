
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { X, Plus, Save, ArrowLeft } from 'lucide-react';
import githubSDK from '@/lib/githubSDK';

interface AdminCMSEditorProps {
  collection: string;
  item?: any;
  onSave: () => void;
  onCancel: () => void;
}

const AdminCMSEditor: React.FC<AdminCMSEditorProps> = ({
  collection,
  item,
  onSave,
  onCancel
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(item || getDefaultFormData(collection));

  function getDefaultFormData(collection: string) {
    const baseData = {
      title: '',
      description: '',
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    switch (collection) {
      case 'packages':
        return {
          ...baseData,
          price: 0,
          duration: '',
          inclusions: [],
          category: '',
          images: [],
          itinerary: [],
          features: []
        };
      case 'courses':
        return {
          ...baseData,
          instructor: '',
          duration: '',
          level: 'beginner',
          price: 0,
          modules: [],
          enrollmentLimit: 50,
          category: ''
        };
      case 'events':
        return {
          ...baseData,
          date: '',
          time: '',
          location: '',
          price: 0,
          capacity: 100,
          category: '',
          speakers: []
        };
      case 'blogs':
        return {
          ...baseData,
          content: '',
          excerpt: '',
          author: '',
          category: '',
          tags: [],
          featuredImage: '',
          publishedAt: ''
        };
      case 'knowledgebase':
        return {
          ...baseData,
          content: '',
          category: '',
          tags: [],
          order: 0
        };
      case 'faqs':
        return {
          ...baseData,
          question: '',
          answer: '',
          category: '',
          order: 0
        };
      default:
        return baseData;
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleArrayAdd = (field: string, value: string) => {
    if (!value.trim()) return;
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), value.trim()],
      updatedAt: new Date().toISOString()
    }));
  };

  const handleArrayRemove = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== index),
      updatedAt: new Date().toISOString()
    }));
  };

  const handleSave = async () => {
    if (!formData.title?.trim()) {
      toast({
        title: "Validation Error",
        description: "Title is required",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      if (item?.id) {
        await githubSDK.update(collection, item.id, formData);
        toast({
          title: "Success",
          description: `${collection} updated successfully`
        });
      } else {
        await githubSDK.insert(collection, formData);
        toast({
          title: "Success",
          description: `${collection} created successfully`
        });
      }
      onSave();
    } catch (error) {
      console.error(`Error saving ${collection}:`, error);
      toast({
        title: "Error",
        description: `Failed to save ${collection}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderBasicFields = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Enter title..."
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Enter description..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderPackageFields = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
          />
        </div>
        <div>
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => handleInputChange('duration', e.target.value)}
            placeholder="e.g., 7 days 6 nights"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
          placeholder="e.g., Adventure, Cultural"
        />
      </div>

      <ArrayField
        label="Inclusions"
        items={formData.inclusions || []}
        onAdd={(value) => handleArrayAdd('inclusions', value)}
        onRemove={(index) => handleArrayRemove('inclusions', index)}
        placeholder="Add inclusion..."
      />
    </div>
  );

  const renderCourseFields = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="instructor">Instructor</Label>
          <Input
            id="instructor"
            value={formData.instructor}
            onChange={(e) => handleInputChange('instructor', e.target.value)}
            placeholder="Instructor name"
          />
        </div>
        <div>
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => handleInputChange('duration', e.target.value)}
            placeholder="e.g., 8 weeks"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="level">Level</Label>
          <Select value={formData.level} onValueChange={(value) => handleInputChange('level', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
          />
        </div>
        <div>
          <Label htmlFor="enrollmentLimit">Enrollment Limit</Label>
          <Input
            id="enrollmentLimit"
            type="number"
            value={formData.enrollmentLimit}
            onChange={(e) => handleInputChange('enrollmentLimit', parseInt(e.target.value) || 50)}
          />
        </div>
      </div>
    </div>
  );

  const renderEventFields = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => handleInputChange('time', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Event location"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
          />
        </div>
        <div>
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => handleInputChange('capacity', parseInt(e.target.value) || 100)}
          />
        </div>
      </div>
    </div>
  );

  const renderBlogFields = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => handleInputChange('content', e.target.value)}
          placeholder="Blog content..."
          rows={8}
        />
      </div>

      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => handleInputChange('excerpt', e.target.value)}
          placeholder="Brief excerpt..."
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => handleInputChange('author', e.target.value)}
            placeholder="Author name"
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            placeholder="Blog category"
          />
        </div>
      </div>

      <ArrayField
        label="Tags"
        items={formData.tags || []}
        onAdd={(value) => handleArrayAdd('tags', value)}
        onRemove={(index) => handleArrayRemove('tags', index)}
        placeholder="Add tag..."
      />
    </div>
  );

  const renderFAQFields = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="question">Question *</Label>
        <Input
          id="question"
          value={formData.question}
          onChange={(e) => handleInputChange('question', e.target.value)}
          placeholder="Enter question..."
        />
      </div>
      
      <div>
        <Label htmlFor="answer">Answer</Label>
        <Textarea
          id="answer"
          value={formData.answer}
          onChange={(e) => handleInputChange('answer', e.target.value)}
          placeholder="Enter answer..."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            placeholder="FAQ category"
          />
        </div>
        <div>
          <Label htmlFor="order">Display Order</Label>
          <Input
            id="order"
            type="number"
            value={formData.order}
            onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onCancel}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">
              {item ? 'Edit' : 'Create'} {collection.charAt(0).toUpperCase() + collection.slice(1)}
            </h1>
          </div>
          <Button onClick={handleSave} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {item ? `Edit ${formData.title || 'Item'}` : `New ${collection.charAt(0).toUpperCase() + collection.slice(1)}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList>
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                {collection !== 'faqs' && <TabsTrigger value="details">Details</TabsTrigger>}
              </TabsList>
              
              <TabsContent value="basic" className="space-y-6">
                {renderBasicFields()}
              </TabsContent>
              
              {collection !== 'faqs' && (
                <TabsContent value="details" className="space-y-6">
                  {collection === 'packages' && renderPackageFields()}
                  {collection === 'courses' && renderCourseFields()}
                  {collection === 'events' && renderEventFields()}
                  {collection === 'blogs' && renderBlogFields()}
                  {collection === 'knowledgebase' && renderBlogFields()}
                </TabsContent>
              )}

              {collection === 'faqs' && (
                <TabsContent value="basic" className="space-y-6">
                  {renderFAQFields()}
                </TabsContent>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ArrayField: React.FC<{
  label: string;
  items: string[];
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
}> = ({ label, items, onAdd, onRemove, placeholder }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    onAdd(inputValue);
    setInputValue('');
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="flex gap-2 mb-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button type="button" onClick={handleAdd} size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1">
            {item}
            <X
              className="w-3 h-3 cursor-pointer hover:text-red-500"
              onClick={() => onRemove(index)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default AdminCMSEditor;
