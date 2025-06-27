
import UniversalSDK from './UniversalSDK';

// Initialize the SDK with configuration
const sdk = new UniversalSDK({
  owner: 'your-github-username', // Replace with actual GitHub username
  repo: 'minhaajulhudaa-data', // Replace with actual repo name
  token: 'your-github-token', // Replace with actual GitHub token
  branch: 'main',
  basePath: 'db',
  mediaPath: 'media',
  cloudinary: {
    uploadPreset: 'minhaajulhudaa',
    cloudName: 'your-cloudinary-name',
  },
  smtp: {
    endpoint: 'https://api.emailjs.com/api/v1.0/email/send',
    from: 'info@minhaajulhudaa.com',
  },
  templates: {
    otp: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #004225;">Minhaajulhudaa Travel & Tour</h2>
        <p>Your OTP verification code is:</p>
        <h3 style="background: #004225; color: white; padding: 20px; text-align: center; border-radius: 8px;">{{otp}}</h3>
        <p>This code will expire in 10 minutes.</p>
      </div>
    `,
    welcome: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #004225;">Welcome to Minhaajulhudaa</h2>
        <p>Thank you for joining our community. We're here to guide you on your spiritual journey.</p>
      </div>
    `,
  },
  schemas: {
    users: {
      required: ['email'],
      types: {
        email: 'string',
        name: 'string',
        phone: 'string',
        verified: 'boolean',
        roles: 'array',
      },
      defaults: {
        verified: false,
        roles: ['user'],
      },
    },
    packages: {
      required: ['title', 'type', 'price'],
      types: {
        title: 'string',
        description: 'string',
        type: 'string',
        price: 'number',
        duration: 'string',
        inclusions: 'array',
        gallery: 'array',
        featured: 'boolean',
        status: 'string',
      },
      defaults: {
        status: 'active',
        featured: false,
        inclusions: [],
        gallery: [],
      },
    },
    blogs: {
      required: ['title', 'content'],
      types: {
        title: 'string',
        content: 'string',
        excerpt: 'string',
        author: 'string',
        category: 'string',
        tags: 'array',
        featured: 'boolean',
        published: 'boolean',
      },
      defaults: {
        published: false,
        featured: false,
        tags: [],
      },
    },
    courses: {
      required: ['title', 'description'],
      types: {
        title: 'string',
        description: 'string',
        instructor: 'string',
        duration: 'string',
        lessons: 'array',
        price: 'number',
        featured: 'boolean',
      },
      defaults: {
        featured: false,
        lessons: [],
      },
    },
    events: {
      required: ['title', 'date'],
      types: {
        title: 'string',
        description: 'string',
        date: 'date',
        location: 'string',
        capacity: 'number',
        registered: 'number',
      },
      defaults: {
        registered: 0,
      },
    },
    bookings: {
      required: ['packageId', 'customerEmail', 'status'],
      types: {
        packageId: 'string',
        customerEmail: 'string',
        customerName: 'string',
        customerPhone: 'string',
        travelers: 'number',
        departureDate: 'date',
        status: 'string',
        totalAmount: 'number',
      },
      defaults: {
        status: 'pending',
        travelers: 1,
      },
    },
  },
  auth: {
    requireEmailVerification: true,
    otpTriggers: ['register', 'login'],
  },
});

export default sdk;
