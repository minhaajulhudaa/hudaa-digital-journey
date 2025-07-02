
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heart, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSite } from '@/hooks/useSite';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';

const SiteAuth = () => {
  const { slug } = useParams();
  const { currentSite } = useSite();
  const { currentTheme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<any>({});

  const { login, register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!currentSite || !currentTheme) return null;

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          toast({
            title: "Welcome back!",
            description: `You have successfully logged into ${currentSite.name}`
          });
          navigate(`/${slug}`);
        } else {
          toast({
            title: "Login failed",
            description: "Please check your credentials and try again",
            variant: "destructive"
          });
        }
      } else {
        await register(formData.email, formData.password, { name: formData.name });
        toast({
          title: "Account created!",
          description: "Your account has been created successfully. Please log in."
        });
        setIsLogin(true);
        setFormData({ ...formData, password: '', confirmPassword: '' });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || (isLogin ? "Login failed" : "Registration failed"),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        background: `linear-gradient(135deg, ${currentTheme.primaryColor}15, ${currentTheme.accentColor}15)` 
      }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to={`/${slug}`} className="inline-flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: currentTheme.primaryColor }}
            >
              <Heart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 
                className="text-2xl font-bold"
                style={{ color: currentTheme.primaryColor }}
              >
                {currentSite.name}
              </h1>
              <p 
                className="text-sm"
                style={{ color: currentTheme.secondaryColor }}
              >
                Travel & Tours
              </p>
            </div>
          </Link>
        </div>

        <Card 
          className="border-0 shadow-2xl backdrop-blur"
          style={{ 
            backgroundColor: `${currentTheme.backgroundColor}95`,
            borderColor: currentTheme.borderColor 
          }}
        >
          <CardHeader className="space-y-2 text-center">
            <CardTitle 
              className="text-2xl font-bold"
              style={{ color: currentTheme.primaryColor }}
            >
              {isLogin ? 'Welcome Back' : 'Join Us'}
            </CardTitle>
            <p style={{ color: currentTheme.textColor }}>
              {isLogin 
                ? `Sign in to access your ${currentSite.name} account` 
                : `Create your account with ${currentSite.name}`
              }
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.name && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-sm">{errors.name}</AlertDescription>
                    </Alert>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                  />
                </div>
                {errors.email && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">{errors.email}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">{errors.password}</AlertDescription>
                  </Alert>
                )}
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-sm">{errors.confirmPassword}</AlertDescription>
                    </Alert>
                  )}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full py-3 text-white"
                style={{ backgroundColor: currentTheme.accentColor }}
                disabled={loading}
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>
            </form>

            <Separator />

            <div className="text-center">
              <p className="text-sm" style={{ color: currentTheme.textColor }}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
                    setErrors({});
                  }}
                  className="ml-2 font-medium hover:underline"
                  style={{ color: currentTheme.accentColor }}
                >
                  {isLogin ? 'Create one here' : 'Sign in here'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SiteAuth;
