import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  email: string;
  name?: string;
  roles?: string[];
  profile?: any;
}

class SDK {
  private baseURL: string;
  private sessions: Map<string, User> = new Map();
  private mockData: any = {};

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize with sample data for minhaajulhudaa
    this.mockData.sites = [
      {
        id: '1',
        name: 'Minhaaj Ul Hudaa',
        slug: 'minhaajulhudaa',
        ownerEmail: 'info@minhaajulhudaa.com',
        ownerName: 'Minhaaj Ul Hudaa',
        description: 'Premium Hajj and Umrah services with spiritual guidance',
        primaryColor: '#004225',
        secondaryColor: '#ffffff',
        contactEmail: 'info@minhaajulhudaa.com',
        contactPhone: '+1234567890',
        theme: 'default',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // Initialize other collections as empty arrays
    this.mockData.packages = [];
    this.mockData.blogs = [];
    this.mockData.events = [];
    this.mockData.courses = [];
    this.mockData.bookings = [];
    this.mockData.contacts = [];

    console.log('Mock data initialized:', this.mockData);
  }

  // Generic GET request
  public async get<T>(endpoint: string): Promise<T[]> {
    try {
      console.log(`Fetching ${endpoint} from mock data`);
      
      // Return mock data for development
      if (this.mockData[endpoint]) {
        console.log(`Found ${this.mockData[endpoint].length} items for ${endpoint}`);
        return this.mockData[endpoint] as T[];
      }
      
      console.log(`No mock data found for ${endpoint}, returning empty array`);
      return [];
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      return [];
    }
  }

  // Generic POST request
  public async insert<T>(endpoint: string, data: Partial<T>): Promise<T> {
    try {
      const id = uuidv4();
      const createdAt = new Date().toISOString();
      const updatedAt = new Date().toISOString();
      
      const insertData = {
        ...this.schemas[endpoint as keyof typeof this.schemas],
        ...data,
        id,
        createdAt,
        updatedAt
      } as T;

      // Add to mock data
      if (!this.mockData[endpoint]) {
        this.mockData[endpoint] = [];
      }
      this.mockData[endpoint].push(insertData);

      console.log(`Inserted into ${endpoint}:`, insertData);
      return insertData;
    } catch (error) {
      console.error(`Error inserting into ${endpoint}:`, error);
      throw error;
    }
  }

  // Generic UPDATE request
  public async update<T>(endpoint: string, id: string, data: Partial<T>): Promise<T> {
    try {
      const updatedAt = new Date().toISOString();
      const updateData = {
        ...data,
        updatedAt
      };

      // Update in mock data
      if (this.mockData[endpoint]) {
        const index = this.mockData[endpoint].findIndex((item: any) => item.id === id);
        if (index !== -1) {
          this.mockData[endpoint][index] = {
            ...this.mockData[endpoint][index],
            ...updateData
          };
          console.log(`Updated ${endpoint} with id ${id}:`, this.mockData[endpoint][index]);
          return this.mockData[endpoint][index];
        }
      }

      // Return mock updated data for development
      const result = {
        ...data,
        id,
        updatedAt: new Date().toISOString()
      } as T;
      
      console.log(`Mock update for ${endpoint} with id ${id}:`, result);
      return result;
    } catch (error) {
      console.error(`Error updating ${endpoint} with id ${id}:`, error);
      throw error;
    }
  }

  // Generic DELETE request
  public async delete(endpoint: string, id: string): Promise<void> {
    try {
      // Remove from mock data
      if (this.mockData[endpoint]) {
        this.mockData[endpoint] = this.mockData[endpoint].filter((item: any) => item.id !== id);
        console.log(`Deleted from ${endpoint} with id ${id}`);
      }
    } catch (error) {
      console.error(`Error deleting from ${endpoint} with id ${id}:`, error);
    }
  }

  // Authentication methods
  public async login(email: string, password: string): Promise<string | { otpRequired: boolean }> {
    try {
      console.log('Mock login attempt for:', email);
      const user: User = {
        id: uuidv4(),
        email,
        name: email.split('@')[0],
        roles: ['user']
      };
      const token = uuidv4();
      this.sessions.set(token, user);
      console.log('Mock login successful, token:', token);
      return token;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  public async register(email: string, password: string, profile: any = {}): Promise<void> {
    try {
      console.log('Mock registration for:', email);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  public async verifyLoginOTP(email: string, otp: string): Promise<string> {
    try {
      console.log('Mock OTP verification for:', email);
      const user: User = {
        id: uuidv4(),
        email,
        name: email.split('@')[0],
        roles: ['user']
      };
      const token = uuidv4();
      this.sessions.set(token, user);
      return token;
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  }

  public getCurrentUser(token: string): User | null {
    const user = this.sessions.get(token) || null;
    console.log('Getting current user for token:', token, 'User:', user);
    return user;
  }

  public destroySession(token: string): void {
    this.sessions.delete(token);
    console.log('Session destroyed for token:', token);
  }

  // Schema and media methods
  public getSchema(collection: string) {
    const schema = this.schemas[collection as keyof typeof this.schemas];
    if (!schema) return null;
    
    return {
      defaults: schema,
      required: this.getRequiredFields(collection),
      types: this.getFieldTypes(collection)
    };
  }

  private getRequiredFields(collection: string): string[] {
    switch (collection) {
      case 'sites':
        return ['name', 'slug', 'ownerEmail'];
      case 'packages':
        return ['title', 'price', 'siteId'];
      case 'blogs':
        return ['title', 'content', 'siteId'];
      case 'events':
        return ['title', 'date', 'siteId'];
      case 'courses':
        return ['title', 'duration', 'siteId'];
      case 'bookings':
        return ['customerName', 'customerEmail', 'siteId'];
      case 'contacts':
        return ['name', 'email', 'message', 'siteId'];
      default:
        return [];
    }
  }

  private getFieldTypes(collection: string): Record<string, string> {
    const commonFields = {
      id: 'string',
      createdAt: 'date',
      updatedAt: 'date',
      status: 'string'
    };

    switch (collection) {
      case 'sites':
        return {
          ...commonFields,
          name: 'string',
          slug: 'string',
          ownerEmail: 'string',
          ownerName: 'string',
          description: 'string',
          logo: 'string',
          primaryColor: 'string',
          secondaryColor: 'string',
          contactEmail: 'string',
          contactPhone: 'string',
          theme: 'string'
        };
      case 'packages':
        return {
          ...commonFields,
          siteId: 'string',
          title: 'string',
          description: 'string',
          price: 'number',
          duration: 'string',
          capacity: 'number',
          image: 'string',
          features: 'array'
        };
      case 'blogs':
        return {
          ...commonFields,
          siteId: 'string',
          title: 'string',
          content: 'string',
          excerpt: 'string',
          image: 'string',
          author: 'string'
        };
      case 'events':
        return {
          ...commonFields,
          siteId: 'string',
          title: 'string',
          description: 'string',
          date: 'date',
          location: 'string',
          capacity: 'number',
          price: 'number'
        };
      case 'courses':
        return {
          ...commonFields,
          siteId: 'string',
          title: 'string',
          description: 'string',
          duration: 'string',
          price: 'number',
          instructor: 'string'
        };
      case 'bookings':
        return {
          ...commonFields,
          siteId: 'string',
          packageId: 'string',
          customerName: 'string',
          customerEmail: 'string',
          customerPhone: 'string',
          travelers: 'number',
          departureDate: 'date',
          specialRequests: 'string',
          totalAmount: 'number'
        };
      case 'contacts':
        return {
          ...commonFields,
          siteId: 'string',
          name: 'string',
          email: 'string',
          subject: 'string',
          message: 'string'
        };
      default:
        return commonFields;
    }
  }

  public async uploadMediaFile(file: File): Promise<{ secure_url: string; public_id: string }> {
    try {
      console.log('Mock file upload for:', file.name);
      const fileId = uuidv4();
      const url = URL.createObjectURL(file);
      return {
        secure_url: url,
        public_id: fileId
      };
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  // Schemas
  private schemas = {
    sites: {
      id: '',
      name: '',
      slug: '',
      ownerEmail: '',
      ownerName: '',
      description: '',
      logo: '',
      primaryColor: '#004225',
      secondaryColor: '#ffffff',
      contactEmail: '',
      contactPhone: '',
      theme: 'default',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    packages: {
      id: '',
      siteId: '',
      title: '',
      description: '',
      price: 0,
      duration: '',
      capacity: 0,
      image: '',
      features: [],
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    blogs: {
      id: '',
      siteId: '',
      title: '',
      content: '',
      excerpt: '',
      image: '',
      author: '',
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    events: {
      id: '',
      siteId: '',
      title: '',
      description: '',
      date: '',
      location: '',
      capacity: 0,
      price: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    courses: {
      id: '',
      siteId: '',
      title: '',
      description: '',
      duration: '',
      price: 0,
      instructor: '',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    bookings: {
      id: '',
      siteId: '',
      packageId: '',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      travelers: 1,
      departureDate: '',
      specialRequests: '',
      totalAmount: 0,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    contacts: {
      id: '',
      siteId: '',
      name: '',
      email: '',
      subject: '',
      message: '',
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  };
}

// Detect base URL dynamically
const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    const url = `${window.location.protocol}//${window.location.host}`;
    console.log('SDK Base URL:', url);
    return url;
  }
  return process.env.API_URL || 'http://localhost:3001';
};

export default new SDK(getBaseURL());
