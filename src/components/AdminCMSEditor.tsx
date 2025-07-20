
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSite } from '@/hooks/useSite';
import githubSDK from '@/lib/githubSDK';

interface AdminCMSEditorProps {
  collection: string;
  item?: any;
  onSave: () => void;
  onCancel: () => void;
}

const AdminCMSEditor: React.FC<AdminCMSEditorProps> = ({ collection, item, onSave, onCancel }) => {
  const { currentSite } = useSite();
  const { toast } = useToast();
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      // Initialize with defaults
      setFormData({
        title: '',
        description: '',
        status: 'draft',
        siteId: currentSite?.id,
        ...getDefaultsForCollection(collection)
      });
    }
  }, [item, collection, currentSite]);

  const getDefaultsForCollection = (collection: string) => {
    const defaults: Record<string, any> = {
      packages: {
        price: 0,
        duration: '',
        location: '',
        featured: false,
        gallery: [],
        includes: [],
        excludes: []
      },
      courses: {
        price: 0,
        duration: '',
        level: 'beginner',
        instructor: '',
        lessons: []
      },
      events: {
        date: '',
        time: '',
        location: '',
        capacity: 0,
        ticketPrice: 0
      },
      blogs: {
        excerpt: '',
        content: '',
        author: '',
        tags: [],
        featured: false
      },
      knowledgebase: {
        category: '',
        content: '',
        tags: []
      },
      faqs: {
        question: '',
        answer: ''
      }
    };

    return defaults[collection] || {};
  };

  const handleSave = async () => {
    if (!formData.title && !formData.question) {
      toast({
        title: "Error",
        description: "Please provide a title or question",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const dataToSave = {
        ...formData,
        siteId: currentSite?.id,
        updatedAt: new Date().toISOString()
      };

      if (item?.id) {
        await githubSDK.update(collection, item.id, dataToSave);
      } else {
        await githubSDK.insert(collection, {
          ...dataToSave,
          createdAt: new Date().toISOString()
        });
      }

      toast({
        title: "Success",
        description: `${collection} ${item?.id ? 'updated' : 'created'} successfully`
      });

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

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const renderField = (field: string, label: string, type: string = 'text') => {
    switch (type) {
      case 'textarea':
        return (
          <div className="space-y-2">
            <Label htmlFor={field}>{label}</Label>
            <Textarea
              id={field}
              value={formData[field] || ''}
              onChange={(e) => handleChange(field, e.target.value)}
              rows={4}
            />
          </div>
        );
      case 'number':
        return (
          <div className="space-y-2">
            <Label htmlFor={field}>{label}</Label>
            <Input
              id={field}
              type="number"
              value={formData[field] || 0}
              onChange={(e) => handleChange(field, parseFloat(e.target.value) || 0)}
            />
          </div>
        );
      case 'select':
        return (
          <div className="space-y-2">
            <Label htmlFor={field}>{label}</Label>
            <Select value={formData[field] || ''} onValueChange={(value) => handleChange(field, value)}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case 'switch':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              id={field}
              checked={formData[field] || false}
              onCheckedChange={(checked) => handleChange(field, checked)}
            />
            <Label htmlFor={field}>{label}</Label>
          </div>
        );
      default:
        return (
          <div className="space-y-2">
            <Label htmlFor={field}>{label}</Label>
            <Input
              id={field}
              value={formData[field] || ''}
              onChange={(e) => handleChange(field, e.target.value)}
              placeholder={`Enter ${label.toLowerCase()}`}
            />
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              {item ? 'Edit' : 'Create'} {collection.charAt(0).toUpperCase() + collection.slice(1)}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Common fields */}
          {collection !== 'faqs' && renderField('title', 'Title')}
          {collection === 'faqs' && renderField('question', 'Question')}
          {collection === 'faqs' && renderField('answer', 'Answer', 'textarea')}
          {collection !== 'faqs' && renderField('description', 'Description', 'textarea')}
          
          {/* Collection-specific fields */}
          {collection === 'packages' && (
            <>
              {renderField('price', 'Price', 'number')}
              {renderField('duration', 'Duration')}
              {renderField('location', 'Location')}
              {renderField('featured', 'Featured', 'switch')}
            </>
          )}
          
          {collection === 'courses' && (
            <>
              {renderField('price', 'Price', 'number')}
              {renderField('duration', 'Duration')}
              {renderField('instructor', 'Instructor')}
              <div className="space-y-2">
                <Label>Level</Label>
                <Select value={formData.level || 'beginner'} onValueChange={(value) => handleChange('level', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
          
          {collection === 'events' && (
            <>
              {renderField('date', 'Date')}
              {renderField('time', 'Time')}
              {renderField('location', 'Location')}
              {renderField('capacity', 'Capacity', 'number')}
              {renderField('ticketPrice', 'Ticket Price', 'number')}
            </>
          )}
          
          {collection === 'blogs' && (
            <>
              {renderField('excerpt', 'Excerpt', 'textarea')}
              {renderField('content', 'Content', 'textarea')}
              {renderField('author', 'Author')}
              {renderField('featured', 'Featured', 'switch')}
            </>
          )}
          
          {collection === 'knowledgebase' && (
            <>
              {renderField('category', 'Category')}
              {renderField('content', 'Content', 'textarea')}
            </>
          )}
          
          {/* Status field for all collections except FAQs */}
          {collection !== 'faqs' && renderField('status', 'Status', 'select')}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCMSEditor;
