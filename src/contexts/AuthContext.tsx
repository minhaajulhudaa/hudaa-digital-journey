
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import sdk from '@/lib/sdk';
import type { User } from '@/lib/UniversalSDK';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; otpRequired?: boolean }>;
  register: (email: string, password: string, profile?: any) => Promise<{ success: boolean }>;
  logout: () => void;
  verifyOTP: (email: string, otp: string) => Promise<{ success: boolean }>;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const token = localStorage.getItem('auth_token');
    if (token) {
      const currentUser = sdk.getCurrentUser(token);
      if (currentUser) {
        setUser(currentUser);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await sdk.login(email, password);
      
      if (typeof result === 'string') {
        // Direct login success
        localStorage.setItem('auth_token', result);
        const currentUser = sdk.getCurrentUser(result);
        setUser(currentUser);
        return { success: true };
      } else if (result.otpRequired) {
        // OTP required
        return { success: true, otpRequired: true };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false };
    }
  };

  const register = async (email: string, password: string, profile: any = {}) => {
    try {
      await sdk.register(email, password, profile);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false };
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    try {
      const token = await sdk.verifyLoginOTP(email, otp);
      localStorage.setItem('auth_token', token);
      const currentUser = sdk.getCurrentUser(token);
      setUser(currentUser);
      return { success: true };
    } catch (error) {
      console.error('OTP verification error:', error);
      return { success: false };
    }
  };

  const logout = () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      sdk.destroySession(token);
      localStorage.removeItem('auth_token');
    }
    setUser(null);
  };

  const hasRole = (role: string) => {
    return user?.roles?.includes(role) || false;
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    verifyOTP,
    isAuthenticated: !!user,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
