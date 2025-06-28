
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  Save, 
  Eye, 
  Trash2, 
  Plus, 
  Edit, 
  Upload, 
  Image, 
  Video, 
  FileText, 
  Settings, 
  Calendar,
  Tag,
  Star,
  Globe,
  Users,
  BarChart3,
  Search,
  Filter,
  Download,
  X,
  Check,
  AlertCircle,
  Info
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import sdk from '@/lib/sdk';

interface CMSEditorProps {
  collection: string;
  item?: any;
  onSave?: (data: any) => void;
  onCancel?: () => void;
}

const CMSEditor: React.FC<CMSEditorProps> = ({ collection, item, onSave, onCancel }) => {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [activeTab, setActiveTab] = useState('content');
  const [mediaFiles, setMediaFiles] = useState<any[]>([]);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      // Initialize with defaults from schema
      const schema = sdk.getSchema(collection);
      setFormData(schema?.defaults || {});
    }
  }, [item, collection]);

  const handleSave = async () => {
    setLoading(true);
    setErrors({});

    try {
      // Validate required fields
      const schema = sdk.getSchema(collection);
      const requiredFields = schema?.required || [];
      const newErrors: any = {};

      requiredFields.forEach(field => {
        if (!formData[field]) {
          newErrors[field] = `${field} is required`;
        }
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }

      let result;
      if (item?.id) {
        result = await sdk.update(collection, item.id, formData);
      } else {
        result = await sdk.insert(collection, formData);
      }

      toast({
        title: "Success",
        description: `${collection} ${item?.id ? 'updated' : 'created'} successfully`
      });

      if (onSave) {
        onSave(result);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save item",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: null }));
    }
  };

  const uploadMedia = async (file: File) => {
    try {
      const result = await sdk.uploadMediaFile(file);
      setMediaFiles(prev => [result, ...prev]);
      return result.secure_url;
    } catch (error: any) {
      toast({
        title: "Upload Error",
        description: error.message || "Failed to upload file",
        variant: "destructive"
      });
      return null;
    }
  };

  const renderField = (fieldName: string, fieldType: string, required: boolean = false) => {
    const value = formData[fieldName] || '';
    const error = errors[fieldName];

    const commonProps = {
      id: fieldName,
      value,
      onChange: (e: any) => handleFieldChange(fieldName, e.target.value),
      className: error ? 'border-red-500' : ''
    };

    switch (fieldType) {
      case 'string':
        if (fieldName.includes('content') || fieldName.includes('description')) {
          return (
            <div className="space-y-2">
              <Label htmlFor={fieldName} className="flex items-center">
                {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                {required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              <Textarea
                {...commonProps}
                rows={8}
                placeholder={`Enter ${fieldName}...`}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          );
        }
        return (
          <div className="space-y-2">
            <Label htmlFor={fieldName} className="flex items-center">
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              {...commonProps}
              placeholder={`Enter ${fieldName}...`}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );

      case 'number':
        return (
          <div className="space-y-2">
            <Label htmlFor={fieldName} className="flex items-center">
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              {...commonProps}
              type="number"
              placeholder={`Enter ${fieldName}...`}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );

      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              id={fieldName}
              checked={value}
              onCheckedChange={(checked) => handleFieldChange(fieldName, checked)}
            />
            <Label htmlFor={fieldName}>
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
            </Label>
          </div>
        );

      case 'date':
        return (
          <div className="space-y-2">
            <Label htmlFor={fieldName} className="flex items-center">
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              {...commonProps}
              type="datetime-local"
              value={value ? new Date(value).toISOString().slice(0, 16) : ''}
              onChange={(e) => handleFieldChange(fieldName, e.target.value ? new Date(e.target.value).toISOString() : '')}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );

      case 'array':
        return (
          <div className="space-y-2">
            <Label htmlFor={fieldName} className="flex items-center">
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="space-y-2">
              <Input
                placeholder={`Add ${fieldName}... (comma separated)`}
                value={Array.isArray(value) ? value.join(', ') : ''}
                onChange={(e) => handleFieldChange(fieldName, e.target.value.split(',').map(v => v.trim()).filter(Boolean))}
              />
              <div className="flex flex-wrap gap-2">
                {Array.isArray(value) && value.map((item, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {item}
                    <button
                      onClick={() => {
                        const newValue = [...value];
                        newValue.splice(index, 1);
                        handleFieldChange(fieldName, newValue);
                      }}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            <Label htmlFor={fieldName} className="flex items-center">
              {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              {...commonProps}
              placeholder={`Enter ${fieldName}...`}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );
    }
  };

  const schema = sdk.getSchema(collection);
  const requiredFields = schema?.required || [];
  const fieldTypes = schema?.types || {};

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="border-0 shadow-xl">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">
                {item?.id ? 'Edit' : 'Create'} {collection}
              </CardTitle>
              <p className="text-gray-600 mt-1">
                {item?.id ? `Editing ${collection} ID: ${item.id}` : `Create a new ${collection} item`}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start border-b rounded-none h-12">
              <TabsTrigger value="content" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                Media
              </TabsTrigger>
              <TabsTrigger value="seo" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                SEO
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="content" className="space-y-6 mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {Object.entries(fieldTypes).map(([fieldName, fieldType]) => {
                    if (['seoTitle', 'seoDescription', 'gallery', 'thumbnail', 'featuredImage'].includes(fieldName)) {
                      return null; // Handle these in other tabs
                    }
                    
                    const isRequired = requiredFields.includes(fieldName);
                    return (
                      <div key={fieldName} className="col-span-1">
                        {renderField(fieldName, fieldType, isRequired)}
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-6 mt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Media Library</h3>
                    <Dialog open={showMediaLibrary} onOpenChange={setShowMediaLibrary}>
                      <DialogTrigger asChild>
                        <Button>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Media
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Upload Media Files</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-600">Drag and drop files here or click to browse</p>
                            <input
                              type="file"
                              multiple
                              accept="image/*,video/*"
                              onChange={async (e) => {
                                const files = Array.from(e.target.files || []);
                                for (const file of files) {
                                  await uploadMedia(file);
                                }
                              }}
                              className="hidden"
                              id="media-upload"
                            />
                            <label htmlFor="media-upload">
                              <Button variant="outline" className="mt-4" asChild>
                                <span>Choose Files</span>
                              </Button>
                            </label>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Media Gallery */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {mediaFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={file.secure_url}
                            alt={file.public_id}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => {
                              // Add to gallery
                              const currentGallery = formData.gallery || [];
                              handleFieldChange('gallery', [...currentGallery, file.secure_url]);
                            }}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seo" className="space-y-6 mt-0">
                <div className="space-y-4">
                  {formData.seoTitle !== undefined && renderField('seoTitle', 'string')}
                  {formData.seoDescription !== undefined && renderField('seoDescription', 'string')}
                  {formData.searchKeywords !== undefined && renderField('searchKeywords', 'array')}
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6 mt-0">
                <div className="space-y-4">
                  {formData.status !== undefined && (
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select
                        value={formData.status || 'draft'}
                        onValueChange={(value) => handleFieldChange('status', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {formData.featured !== undefined && (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="featured"
                        checked={formData.featured || false}
                        onCheckedChange={(checked) => handleFieldChange('featured', checked)}
                      />
                      <Label htmlFor="featured">Featured</Label>
                    </div>
                  )}

                  {formData.category !== undefined && renderField('category', 'string')}
                  {formData.tags !== undefined && renderField('tags', 'array')}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CMSEditor;
