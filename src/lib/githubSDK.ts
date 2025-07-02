
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

class GitHubSDK extends UniversalSDK {
  private api: any;

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
      const response = await this.api.get(`/repos/vercel-labs/travel-site-kit/contents/data/${endpoint}.json`);
      const data = JSON.parse(Buffer.from(response.data.content, 'base64').toString('utf-8'));
      return data as T[];
    } catch (error: any) {
      console.error(`Error fetching ${endpoint}:`, error.message);
      console.error(`Response details:`, error.response);
      throw error;
    }
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
        id: item.id || uuidv4(),
        uid: uuidv4()
      } as T & { id: string; uid: string; };
      
      const updatedItems = [...(items as any[]), newItem];
      await this.updateContent(collection, updatedItems);
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
        item.id === key ? { ...item, ...updates } : item
      );
      await this.updateContent(collection, updatedItems);
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
    } catch (error) {
      console.error(`Error deleting item from ${collection}:`, error);
      throw error;
    }
  }

  private async updateContent(endpoint: string, content: any[]): Promise<void> {
    const filePath = `data/${endpoint}.json`;
    const fileContent = JSON.stringify(content, null, 2);
    const encodedContent = Buffer.from(fileContent).toString('base64');

    try {
      const getResponse = await this.api.get(`/repos/vercel-labs/travel-site-kit/contents/${filePath}`);
      const sha = getResponse.data.sha;

      await this.api.put(
        `/repos/vercel-labs/travel-site-kit/contents/${filePath}`,
        {
          message: `Update ${endpoint}`,
          content: encodedContent,
          sha: sha,
          branch: 'main'
        }
      );
    } catch (error: any) {
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
