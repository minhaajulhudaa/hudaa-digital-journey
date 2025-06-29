import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

class SDK {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // Generic GET request
  public async get<T>(endpoint: string): Promise<T[]> {
    try {
      const response = await axios.get<T[]>(`${this.baseURL}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
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
      };

      const response = await axios.post<T>(`${this.baseURL}/${endpoint}`, insertData);
      return response.data;
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
      const response = await axios.put<T>(`${this.baseURL}/${endpoint}/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error updating ${endpoint} with id ${id}:`, error);
      throw error;
    }
  }

  // Generic DELETE request
  public async delete(endpoint: string, id: string): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/${endpoint}/${id}`);
    } catch (error) {
      console.error(`Error deleting from ${endpoint} with id ${id}:`, error);
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

export default new SDK(process.env.API_URL || 'http://localhost:3001');
