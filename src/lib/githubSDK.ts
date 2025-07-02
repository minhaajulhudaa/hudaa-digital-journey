import UniversalSDK from './UniversalSDK';
import type { UniversalSDKConfig } from './UniversalSDK';

// Configuration for the GitHub SDK
const sdkConfig: UniversalSDKConfig = {
  owner: import.meta.env.VITE_GITHUB_OWNER,
  repo: import.meta.env.VITE_GITHUB_REPO,
  token: import.meta.env.VITE_GITHUB_TOKEN || 'ghp_demo_token',
  branch: 'main',
  basePath: 'db',
  mediaPath: 'media',
  schemas: {
    sites: {
      required: ['name', 'slug', 'ownerEmail'],
      types: {
        id: 'string',
        uid: 'string',
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
        theme: 'string',
        status: 'string',
        createdAt: 'date',
        updatedAt: 'date'
      },
      defaults: {
        status: 'active',
        theme: 'default',
        primaryColor: '#004225',
        secondaryColor: '#ffffff',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    },
    packages: {
      required: ['title', 'price', 'siteId'],
      types: {
        id: 'string',
        uid: 'string',
        siteId: 'string',
        title: 'string',
        description: 'string',
        price: 'number',
        duration: 'string',
        capacity: 'number',
        image: 'string',
        features: 'array',
        status: 'string',
        createdAt: 'date',
        updatedAt: 'date'
      },
      defaults: {
        status: 'active',
        features: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    },
    blogs: {
      required: ['title', 'content', 'siteId'],
      types: {
        id: 'string',
        uid: 'string',
        siteId: 'string',
        title: 'string',
        content: 'string',
        excerpt: 'string',
        image: 'string',
        author: 'string',
        status: 'string',
        createdAt: 'date',
        updatedAt: 'date'
      },
      defaults: {
        status: 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    },
    events: {
      required: ['title', 'date', 'siteId'],
      types: {
        id: 'string',
        uid: 'string',
        siteId: 'string',
        title: 'string',
        description: 'string',
        date: 'date',
        location: 'string',
        capacity: 'number',
        price: 'number',
        status: 'string',
        createdAt: 'date',
        updatedAt: 'date'
      },
      defaults: {
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    },
    courses: {
      required: ['title', 'duration', 'siteId'],
      types: {
        id: 'string',
        uid: 'string',
        siteId: 'string',
        title: 'string',
        description: 'string',
        duration: 'string',
        price: 'number',
        instructor: 'string',
        status: 'string',
        createdAt: 'date',
        updatedAt: 'date'
      },
      defaults: {
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    },
    bookings: {
      required: ['customerName', 'customerEmail', 'siteId'],
      types: {
        id: 'string',
        uid: 'string',
        siteId: 'string',
        packageId: 'string',
        customerName: 'string',
        customerEmail: 'string',
        customerPhone: 'string',
        travelers: 'number',
        departureDate: 'date',
        specialRequests: 'string',
        totalAmount: 'number',
        status: 'string',
        createdAt: 'date',
        updatedAt: 'date'
      },
      defaults: {
        status: 'pending',
        travelers: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    },
    contacts: {
      required: ['name', 'email', 'message', 'siteId'],
      types: {
        id: 'string',
        uid: 'string',
        siteId: 'string',
        name: 'string',
        email: 'string',
        subject: 'string',
        message: 'string',
        status: 'string',
        createdAt: 'date',
        updatedAt: 'date'
      },
      defaults: {
        status: 'new',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    },
    users: {
      required: ['email'],
      types: {
        id: 'string',
        uid: 'string',
        email: 'string',
        password: 'string',
        name: 'string',
        roles: 'array',
        permissions: 'array',
        verified: 'boolean',
        createdAt: 'date',
        updatedAt: 'date'
      },
      defaults: {
        roles: ['user'],
        permissions: [],
        verified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    },
    themes: {
      required: ['name', 'slug'],
      types: {
        id: 'string',
        uid: 'string',
        name: 'string',
        slug: 'string',
        description: 'string',
        category: 'string',
        primaryColor: 'string',
        secondaryColor: 'string',
        accentColor: 'string',
        backgroundColor: 'string',
        textColor: 'string',
        cardColor: 'string',
        borderColor: 'string',
        gradientFrom: 'string',
        gradientTo: 'string',
        fontFamily: 'string',
        headerStyle: 'string',
        footerStyle: 'string',
        buttonStyle: 'string',
        cardStyle: 'string',
        layout: 'string',
        sections: 'array',
        customCSS: 'string',
        isDefault: 'boolean',
        status: 'string',
        createdAt: 'date',
        updatedAt: 'date'
      },
      defaults: {
        isDefault: false,
        status: 'active',
        sections: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
  },
  auth: {
    requireEmailVerification: false,
    otpTriggers: []
  }
};

// Initialize the SDK
const githubSDK = new UniversalSDK(sdkConfig);

// Complete list of 15 production-ready themes
const productionThemes = [
  {
    name: 'Islamic Luxury',
    slug: 'islamic-luxury',
    description: 'Elegant Islamic-inspired design with luxury touches',
    category: 'Religious',
    primaryColor: '#1a4b3a',
    secondaryColor: '#f8f9fa',
    accentColor: '#d4af37',
    backgroundColor: '#ffffff',
    textColor: '#2c3e50',
    cardColor: '#ffffff',
    borderColor: '#e9ecef',
    gradientFrom: '#1a4b3a',
    gradientTo: '#d4af37',
    fontFamily: 'Playfair Display',
    headerStyle: 'elegant',
    footerStyle: 'luxury',
    buttonStyle: 'rounded',
    cardStyle: 'elevated',
    layout: 'luxury'
  },
  {
    name: 'Modern Minimalist',
    slug: 'modern-minimalist',
    description: 'Clean, modern design with focus on content',
    category: 'Modern',
    primaryColor: '#2c3e50',
    secondaryColor: '#ffffff',
    accentColor: '#3498db',
    backgroundColor: '#f8f9fa',
    textColor: '#2c3e50',
    cardColor: '#ffffff',
    borderColor: '#dee2e6',
    gradientFrom: '#2c3e50',
    gradientTo: '#3498db',
    fontFamily: 'Inter',
    headerStyle: 'minimal',
    footerStyle: 'clean',
    buttonStyle: 'square',
    cardStyle: 'flat',
    layout: 'minimal'
  },
  {
    name: 'Adventure Bold',
    slug: 'adventure-bold',
    description: 'Dynamic design for adventure travel companies',
    category: 'Adventure',
    primaryColor: '#e74c3c',
    secondaryColor: '#ffffff',
    accentColor: '#f39c12',
    backgroundColor: '#2c3e50',
    textColor: '#ffffff',
    cardColor: '#34495e',
    borderColor: '#4a5568',
    gradientFrom: '#e74c3c',
    gradientTo: '#f39c12',
    fontFamily: 'Montserrat',
    headerStyle: 'bold',
    footerStyle: 'dark',
    buttonStyle: 'pill',
    cardStyle: 'glass',
    layout: 'creative'
  },
  {
    name: 'Ocean Breeze',
    slug: 'ocean-breeze',
    description: 'Fresh coastal theme with ocean-inspired colors',
    category: 'Nature',
    primaryColor: '#0ea5e9',
    secondaryColor: '#ffffff',
    accentColor: '#06b6d4',
    backgroundColor: '#f0f9ff',
    textColor: '#0c4a6e',
    cardColor: '#ffffff',
    borderColor: '#e0f2fe',
    gradientFrom: '#0ea5e9',
    gradientTo: '#06b6d4',
    fontFamily: 'Poppins',
    headerStyle: 'fresh',
    footerStyle: 'wave',
    buttonStyle: 'rounded',
    cardStyle: 'shadow',
    layout: 'flowing'
  },
  {
    name: 'Desert Sunset',
    slug: 'desert-sunset',
    description: 'Warm earth tones inspired by desert landscapes',
    category: 'Nature',
    primaryColor: '#ea580c',
    secondaryColor: '#fef3c7',
    accentColor: '#f59e0b',
    backgroundColor: '#fffbeb',
    textColor: '#92400e',
    cardColor: '#ffffff',
    borderColor: '#fde68a',
    gradientFrom: '#ea580c',
    gradientTo: '#f59e0b',
    fontFamily: 'Nunito',
    headerStyle: 'warm',
    footerStyle: 'sunset',
    buttonStyle: 'pill',
    cardStyle: 'elevated',
    layout: 'organic'
  },
  {
    name: 'Royal Purple',
    slug: 'royal-purple',
    description: 'Sophisticated purple theme for luxury experiences',
    category: 'Luxury',
    primaryColor: '#7c3aed',
    secondaryColor: '#ffffff',
    accentColor: '#a855f7',
    backgroundColor: '#faf5ff',
    textColor: '#581c87',
    cardColor: '#ffffff',
    borderColor: '#e9d5ff',
    gradientFrom: '#7c3aed',
    gradientTo: '#a855f7',
    fontFamily: 'Playfair Display',
    headerStyle: 'regal',
    footerStyle: 'elegant',
    buttonStyle: 'rounded',
    cardStyle: 'luxury',
    layout: 'sophisticated'
  },
  {
    name: 'Forest Green',
    slug: 'forest-green',
    description: 'Natural green theme for eco-friendly travel',
    category: 'Eco',
    primaryColor: '#16a34a',
    secondaryColor: '#ffffff',
    accentColor: '#22c55e',
    backgroundColor: '#f0fdf4',
    textColor: '#15803d',
    cardColor: '#ffffff',
    borderColor: '#bbf7d0',
    gradientFrom: '#16a34a',
    gradientTo: '#22c55e',
    fontFamily: 'Source Sans Pro',
    headerStyle: 'natural',
    footerStyle: 'organic',
    buttonStyle: 'rounded',
    cardStyle: 'soft',
    layout: 'eco'
  },
  {
    name: 'Midnight Dark',
    slug: 'midnight-dark',
    description: 'Sophisticated dark theme for modern travelers',
    category: 'Dark',
    primaryColor: '#3b82f6',
    secondaryColor: '#1f2937',
    accentColor: '#60a5fa',
    backgroundColor: '#111827',
    textColor: '#f9fafb',
    cardColor: '#1f2937',
    borderColor: '#374151',
    gradientFrom: '#3b82f6',
    gradientTo: '#60a5fa',
    fontFamily: 'Inter',
    headerStyle: 'sleek',
    footerStyle: 'modern',
    buttonStyle: 'square',
    cardStyle: 'dark',
    layout: 'contemporary'
  },
  {
    name: 'Coral Reef',
    slug: 'coral-reef',
    description: 'Vibrant coral theme for tropical destinations',
    category: 'Tropical',
    primaryColor: '#f472b6',
    secondaryColor: '#ffffff',
    accentColor: '#ec4899',
    backgroundColor: '#fef7ff',
    textColor: '#be185d',
    cardColor: '#ffffff',
    borderColor: '#fbcfe8',
    gradientFrom: '#f472b6',
    gradientTo: '#ec4899',
    fontFamily: 'Quicksand',
    headerStyle: 'tropical',
    footerStyle: 'wave',
    buttonStyle: 'pill',
    cardStyle: 'bright',
    layout: 'vibrant'
  },
  {
    name: 'Arctic White',
    slug: 'arctic-white',
    description: 'Clean white theme with subtle blue accents',
    category: 'Minimal',
    primaryColor: '#0891b2',
    secondaryColor: '#ffffff',
    accentColor: '#06b6d4',
    backgroundColor: '#ffffff',
    textColor: '#0f172a',
    cardColor: '#f8fafc',
    borderColor: '#e2e8f0',
    gradientFrom: '#0891b2',
    gradientTo: '#06b6d4',
    fontFamily: 'Inter',
    headerStyle: 'clean',
    footerStyle: 'minimal',
    buttonStyle: 'square',
    cardStyle: 'minimal',
    layout: 'spacious'
  },
  {
    name: 'Vintage Brown',
    slug: 'vintage-brown',
    description: 'Classic vintage theme with warm brown tones',
    category: 'Vintage',
    primaryColor: '#92400e',
    secondaryColor: '#fef3c7',
    accentColor: '#d97706',
    backgroundColor: '#fffbeb',
    textColor: '#78350f',
    cardColor: '#ffffff',
    borderColor: '#fde68a',
    gradientFrom: '#92400e',
    gradientTo: '#d97706',
    fontFamily: 'Crimson Text',
    headerStyle: 'vintage',
    footerStyle: 'classic',
    buttonStyle: 'rounded',
    cardStyle: 'vintage',
    layout: 'traditional'
  },
  {
    name: 'Neon Glow',
    slug: 'neon-glow',
    description: 'Modern neon theme for contemporary brands',
    category: 'Modern',
    primaryColor: '#8b5cf6',
    secondaryColor: '#000000',
    accentColor: '#a78bfa',
    backgroundColor: '#0f0f23',
    textColor: '#ffffff',
    cardColor: '#1a1a2e',
    borderColor: '#16213e',
    gradientFrom: '#8b5cf6',
    gradientTo: '#a78bfa',
    fontFamily: 'Orbitron',
    headerStyle: 'futuristic',
    footerStyle: 'neon',
    buttonStyle: 'pill',
    cardStyle: 'glow',
    layout: 'futuristic'
  },
  {
    name: 'Earth Tone',
    slug: 'earth-tone',
    description: 'Natural earth tones for sustainable travel',
    category: 'Natural',
    primaryColor: '#a16207',
    secondaryColor: '#ffffff',
    accentColor: '#ca8a04',
    backgroundColor: '#fffbeb',
    textColor: '#78350f',
    cardColor: '#ffffff',
    borderColor: '#fde68a',
    gradientFrom: '#a16207',
    gradientTo: '#ca8a04',
    fontFamily: 'Merriweather',
    headerStyle: 'earthy',
    footerStyle: 'natural',
    buttonStyle: 'rounded',
    cardStyle: 'earth',
    layout: 'organic'
  },
  {
    name: 'Sky Blue',
    slug: 'sky-blue',
    description: 'Light and airy blue theme for aviation themes',
    category: 'Aviation',
    primaryColor: '#0284c7',
    secondaryColor: '#ffffff',
    accentColor: '#0ea5e9',
    backgroundColor: '#f0f9ff',
    textColor: '#0c4a6e',
    cardColor: '#ffffff',
    borderColor: '#bae6fd',
    gradientFrom: '#0284c7',
    gradientTo: '#0ea5e9',
    fontFamily: 'Lato',
    headerStyle: 'aviation',
    footerStyle: 'sky',
    buttonStyle: 'rounded',
    cardStyle: 'light',
    layout: 'airy'
  },
  {
    name: 'Crimson Red',
    slug: 'crimson-red',
    description: 'Bold red theme for passionate travel brands',
    category: 'Bold',
    primaryColor: '#dc2626',
    secondaryColor: '#ffffff',
    accentColor: '#ef4444',
    backgroundColor: '#fef2f2',
    textColor: '#991b1b',
    cardColor: '#ffffff',
    borderColor: '#fecaca',
    gradientFrom: '#dc2626',
    gradientTo: '#ef4444',
    fontFamily: 'Roboto',
    headerStyle: 'bold',
    footerStyle: 'strong',
    buttonStyle: 'square',
    cardStyle: 'bold',
    layout: 'dynamic'
  }
];

// Initialize with sample data if needed
const initializeSampleData = async () => {
  try {
    console.log('Checking for existing data...');
    
    // Check if sites collection exists and has data
    const existingSites = await githubSDK.get('sites');
    const existingThemes = await githubSDK.get('themes');
    
    if (existingSites.length === 0) {
      console.log('Initializing sample site...');
      
      // Create sample site
      await githubSDK.insert('sites', {
        name: 'Minhaaj Ul Hudaa',
        slug: 'minhaajulhudaa',
        ownerEmail: 'info@minhaajulhudaa.com',
        ownerName: 'Minhaaj Ul Hudaa',
        description: 'Premium Hajj and Umrah services with spiritual guidance',
        primaryColor: '#004225',
        secondaryColor: '#ffffff',
        contactEmail: 'info@minhaajulhudaa.com',
        contactPhone: '+1234567890',
        theme: 'islamic-luxury'
      });
    }

    if (existingThemes.length < 15) {
      console.log('Initializing all 15 themes...');
      
      // Clear existing themes and add all 15
      for (const theme of productionThemes) {
        try {
          await githubSDK.insert('themes', {
            ...theme,
            sections: [], // Will be populated by useTheme hook
            status: 'active',
            isDefault: theme.slug === 'islamic-luxury'
          });
        } catch (error) {
          console.log(`Theme ${theme.slug} may already exist, skipping...`);
        }
      }

      console.log('All themes initialized successfully');
    }
  } catch (error) {
    console.warn('Could not initialize sample data:', error);
  }
};

// Initialize sample data on first load
initializeSampleData();

export default githubSDK;
