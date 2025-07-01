
import UniversalSDK from './UniversalSDK';
import type { UniversalSDKConfig } from './UniversalSDK';

// Configuration for the GitHub SDK
const sdkConfig: UniversalSDKConfig = {
  owner: 'lovable-dev', // Replace with your GitHub username/org
  repo: 'travel-platform-db', // Replace with your repository name
  token: process.env.GITHUB_TOKEN || 'ghp_demo_token', // Replace with your GitHub token
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
        primaryColor: 'string',
        secondaryColor: 'string',
        accentColor: 'string',
        backgroundColor: 'string',
        textColor: 'string',
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

// Initialize with sample data if needed
const initializeSampleData = async () => {
  try {
    // Check if sites collection exists and has data
    const existingSites = await githubSDK.get('sites');
    
    if (existingSites.length === 0) {
      console.log('Initializing sample data...');
      
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
        theme: 'islamic-green'
      });

      // Create sample themes
      const themes = [
        {
          name: 'Islamic Green',
          slug: 'islamic-green',
          description: 'Traditional Islamic theme with green accents',
          primaryColor: '#004225',
          secondaryColor: '#ffffff',
          accentColor: '#00b894',
          backgroundColor: '#f8f9fa',
          textColor: '#2d3436',
          fontFamily: 'Inter',
          headerStyle: 'classic',
          footerStyle: 'modern',
          buttonStyle: 'rounded',
          cardStyle: 'shadow',
          layout: 'traditional',
          sections: ['hero', 'packages', 'about', 'testimonials', 'contact'],
          isDefault: true
        },
        {
          name: 'Modern Blue',
          slug: 'modern-blue',
          description: 'Clean and modern blue theme',
          primaryColor: '#0984e3',
          secondaryColor: '#ffffff',
          accentColor: '#74b9ff',
          backgroundColor: '#ffeaa7',
          textColor: '#2d3436',
          fontFamily: 'Poppins',
          headerStyle: 'modern',
          footerStyle: 'minimal',
          buttonStyle: 'pill',
          cardStyle: 'glass',
          layout: 'modern',
          sections: ['hero', 'packages', 'services', 'gallery', 'contact']
        },
        {
          name: 'Luxury Gold',
          slug: 'luxury-gold',
          description: 'Premium luxury theme with gold accents',
          primaryColor: '#d4af37',
          secondaryColor: '#1a1a1a',
          accentColor: '#ffd700',
          backgroundColor: '#f8f9fa',
          textColor: '#2d3436',
          fontFamily: 'Playfair Display',
          headerStyle: 'elegant',
          footerStyle: 'luxury',
          buttonStyle: 'square',
          cardStyle: 'elevated',
          layout: 'luxury',
          sections: ['hero', 'packages', 'about', 'gallery', 'testimonials', 'contact']
        }
      ];

      for (const theme of themes) {
        await githubSDK.insert('themes', theme);
      }

      console.log('Sample data initialized successfully');
    }
  } catch (error) {
    console.warn('Could not initialize sample data (GitHub not connected):', error);
  }
};

// Initialize sample data on first load
initializeSampleData();

export default githubSDK;
