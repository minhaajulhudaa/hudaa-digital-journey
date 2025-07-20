
import UniversalSDK from './UniversalSDK';
import { Theme, defaultSections, enhancedThemes } from '@/types/theme';
import { additionalThemes } from './additionalThemes';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface GitHubSDKConfig {
  baseURL: string;
  headers: {
    Authorization: string;
    Accept: string;
    'Content-Type': string;
  };
}

// Browser-compatible base64 encoding/decoding
const base64Encode = (str: string): string => {
  return btoa(unescape(encodeURIComponent(str)));
};

const base64Decode = (str: string): string => {
  return decodeURIComponent(escape(atob(str)));
};

class GitHubSDK extends UniversalSDK {
  private api: any;
  private cache: Record<string, { data: any[], sha?: string, etag?: string }> = {};
  private subscribers: Record<string, Function[]> = {};

  constructor(config: GitHubSDKConfig) {
    // Initialize parent with dummy values since we override the methods
    super({ owner: '', repo: '', token: '' });
    this.api = axios.create({
      baseURL: config.baseURL,
      headers: config.headers
    });
  }

  async get<T>(endpoint: string): Promise<T[]> {
    try {
      // Use environment variables for repository configuration
      const owner = import.meta.env.VITE_GITHUB_OWNER;
      const repo = import.meta.env.VITE_GITHUB_REPO;
      
      if (!owner || !repo) {
        throw new Error('GitHub repository configuration missing. Please set VITE_GITHUB_OWNER and VITE_GITHUB_REPO environment variables.');
      }
      
      const repoPath = `${owner}/${repo}`;
      console.log(`Fetching ${endpoint} from repository: ${repoPath}`);
      
      try {
        const response = await this.api.get(`/repos/${repoPath}/contents/data/${endpoint}.json`);
        const data = JSON.parse(base64Decode(response.data.content));
        
        // Update cache
        this.cache[endpoint] = { 
          data, 
          sha: response.data.sha,
          etag: response.headers.etag
        };
        
        // Notify subscribers
        this.notifySubscribers(endpoint, data);
        
        console.log(`Successfully fetched ${endpoint} from ${repoPath}`);
        return data as T[];
      } catch (fetchError: any) {
        if (fetchError.response?.status === 404) {
          console.log(`Collection ${endpoint} doesn't exist, creating it...`);
          await this.createCollection(endpoint);
          return [];
        }
        throw fetchError;
      }
    } catch (error: any) {
      console.error(`Error fetching ${endpoint}:`, error.message);
      console.error(`Response details:`, error.response);
      throw error;
    }
  }

  private notifySubscribers(collection: string, data: any[]) {
    (this.subscribers[collection] || []).forEach(cb => cb(data));
  }

  subscribe<T = any>(collection: string, callback: (data: T[]) => void): () => void {
    if (!this.subscribers[collection]) {
      this.subscribers[collection] = [];
    }
    this.subscribers[collection].push(callback);

    // Immediately provide current data if available
    if (this.cache[collection]) {
      callback(this.cache[collection].data);
    } else {
      this.get(collection).then(data => callback(data));
    }

    // Set up polling for real-time updates
    const pollInterval = setInterval(async () => {
      try {
        const data = await this.get(collection);
        // Data will be automatically notified via get method
      } catch (error) {
        console.error(`Polling failed for ${collection}:`, error);
      }
    }, 5000); // Poll every 5 seconds

    return () => {
      this.subscribers[collection] = (this.subscribers[collection] || []).filter(cb => cb !== callback);
      if (this.subscribers[collection].length === 0) {
        clearInterval(pollInterval);
      }
    };
  }

  async getItem<T>(endpoint: string, itemId: string): Promise<T | null> {
    try {
      const items = await this.get<T>(endpoint);
      const item = (items as any[]).find(item => item.id === itemId);
      return item || null;
    } catch (error) {
      console.error(`Error fetching ${endpoint} item with ID ${itemId}:`, error);
      return null;
    }
  }

  async insert<T = any>(collection: string, item: Partial<T>): Promise<T & { id: string; uid: string; }> {
    try {
      const items = await this.get<T>(collection);
      const newItem = {
        ...item,
        id: (item as any).id || uuidv4(),
        uid: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as T & { id: string; uid: string; };
      
      const updatedItems = [...(items as any[]), newItem];
      await this.updateContent(collection, updatedItems);
      
      // Update cache and notify subscribers
      this.cache[collection] = { ...this.cache[collection], data: updatedItems };
      this.notifySubscribers(collection, updatedItems);
      
      return newItem;
    } catch (error) {
      console.error(`Error inserting item into ${collection}:`, error);
      throw error;
    }
  }

  async update<T = any>(collection: string, key: string, updates: Partial<T>): Promise<T> {
    try {
      const items = await this.get<T>(collection);
      const updatedItems = (items as any[]).map(item =>
        item.id === key ? { 
          ...item, 
          ...updates, 
          updatedAt: new Date().toISOString() 
        } : item
      );
      
      await this.updateContent(collection, updatedItems);
      
      // Update cache and notify subscribers
      this.cache[collection] = { ...this.cache[collection], data: updatedItems };
      this.notifySubscribers(collection, updatedItems);
      
      const updatedItem = updatedItems.find(item => item.id === key);
      if (!updatedItem) throw new Error(`Item with key ${key} not found`);
      return updatedItem;
    } catch (error) {
      console.error(`Error updating item in ${collection}:`, error);
      throw error;
    }
  }

  async delete<T = any>(collection: string, key: string): Promise<void> {
    try {
      const items = await this.get(collection);
      const updatedItems = (items as any[]).filter(item => item.id !== key);
      await this.updateContent(collection, updatedItems);
      
      // Update cache and notify subscribers
      this.cache[collection] = { ...this.cache[collection], data: updatedItems };
      this.notifySubscribers(collection, updatedItems);
    } catch (error) {
      console.error(`Error deleting item from ${collection}:`, error);
      throw error;
    }
  }

  private async createCollection(endpoint: string): Promise<void> {
    const filePath = `data/${endpoint}.json`;
    const fileContent = JSON.stringify([], null, 2);
    const encodedContent = base64Encode(fileContent);

    // Use environment variables for repository configuration
    const owner = import.meta.env.VITE_GITHUB_OWNER;
    const repo = import.meta.env.VITE_GITHUB_REPO;
    
    if (!owner || !repo) {
      throw new Error('GitHub repository configuration missing. Please set VITE_GITHUB_OWNER and VITE_GITHUB_REPO environment variables.');
    }
    
    const repoPath = `${owner}/${repo}`;
    console.log(`Creating collection ${endpoint} in repository: ${repoPath}`);

    try {
      await this.api.put(
        `/repos/${repoPath}/contents/${filePath}`,
        {
          message: `Create ${endpoint} collection`,
          content: encodedContent,
          branch: 'main'
        }
      );
      
      console.log(`Successfully created collection ${endpoint} in ${repoPath}`);
    } catch (error: any) {
      console.error(`Error creating collection ${endpoint}:`, error);
      throw error;
    }
  }

  private async updateContent(endpoint: string, content: any[]): Promise<void> {
    const filePath = `data/${endpoint}.json`;
    const fileContent = JSON.stringify(content, null, 2);
    const encodedContent = base64Encode(fileContent);

    // Use environment variables for repository configuration
    const owner = import.meta.env.VITE_GITHUB_OWNER;
    const repo = import.meta.env.VITE_GITHUB_REPO;
    
    if (!owner || !repo) {
      throw new Error('GitHub repository configuration missing. Please set VITE_GITHUB_OWNER and VITE_GITHUB_REPO environment variables.');
    }
    
    const repoPath = `${owner}/${repo}`;
    console.log(`Updating ${endpoint} in repository: ${repoPath}`);

    try {
      // Get current SHA to prevent conflicts
      let sha: string | undefined;
      if (this.cache[endpoint]?.sha) {
        sha = this.cache[endpoint].sha;
      } else {
        try {
          const getResponse = await this.api.get(`/repos/${repoPath}/contents/${filePath}`);
          sha = getResponse.data.sha;
        } catch (error: any) {
          if (error.response?.status !== 404) {
            throw error;
          }
        }
      }

      const updateData: any = {
        message: `Update ${endpoint} - ${new Date().toISOString()}`,
        content: encodedContent,
        branch: 'main'
      };

      if (sha) {
        updateData.sha = sha;
      }

      const response = await this.api.put(`/repos/${repoPath}/contents/${filePath}`, updateData);
      
      // Update cached SHA
      if (this.cache[endpoint]) {
        this.cache[endpoint].sha = response.data.content.sha;
      }
      
      console.log(`Successfully updated ${endpoint} in ${repoPath}`);
    } catch (error: any) {
      if (error.response?.status === 404) {
        // File doesn't exist, create it
        await this.createCollection(endpoint);
        return;
      }
      console.error(`Error updating content for ${endpoint}:`, error);
      throw error;
    }
  }
}

// Initialize themes with both original and additional themes
export const initializeThemes = async () => {
  try {
    const allThemeData = [
      ...enhancedThemes,
      ...additionalThemes
    ];

    const existingThemes = await githubSDK.get<Theme>('themes');
    
    if (existingThemes.length === 0) {
      console.log('Initializing all themes in GitHub DB...');
      
      const themesToCreate = allThemeData.map((themeData, index) => ({
        id: `theme-${index + 1}`,
        name: themeData.name || 'Unnamed Theme',
        description: themeData.description || '',
        category: themeData.category || 'general',
        primaryColor: themeData.primaryColor || '#000000',
        secondaryColor: themeData.secondaryColor || '#ffffff',
        accentColor: themeData.accentColor || '#0066cc',
        backgroundColor: themeData.backgroundColor || '#ffffff',
        textColor: themeData.textColor || '#000000',
        cardColor: themeData.cardColor || '#ffffff',
        borderColor: themeData.borderColor || '#e5e7eb',
        gradientFrom: themeData.gradientFrom || themeData.primaryColor || '#000000',
        gradientTo: themeData.gradientTo || themeData.accentColor || '#0066cc',
        fontFamily: themeData.fontFamily || 'Inter',
        headerStyle: themeData.headerStyle || 'modern',
        footerStyle: themeData.footerStyle || 'clean',
        buttonStyle: themeData.buttonStyle || 'rounded',
        cardStyle: themeData.cardStyle || 'shadow',
        layout: themeData.layout || 'modern',
        sections: defaultSections,
        status: 'active' as const,
        isDefault: index === 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));

      for (const themeData of themesToCreate) {
        await githubSDK.insert<Theme>('themes', themeData);
      }
      
      return themesToCreate;
    }
    
    return existingThemes;
  } catch (error) {
    console.error('Error initializing themes:', error);
    throw error;
  }
};

const githubSDK = new GitHubSDK({
  baseURL: 'https://api.github.com',
  headers: {
    'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  }
});

export default githubSDK;
