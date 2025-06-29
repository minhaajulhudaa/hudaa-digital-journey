
import UniversalSDK from './UniversalSDK';

// Initialize the SDK with production-ready configuration for multi-tenant SaaS
const sdk = new UniversalSDK({
  owner: 'travelwith', // Main SaaS platform GitHub username
  repo: 'travelwith-data', // Main SaaS platform repo name
  token: process.env.GITHUB_TOKEN || 'your-github-token',
  branch: 'main',
  basePath: 'db',
  mediaPath: 'media',
  cloudinary: {
    uploadPreset: 'travelwith',
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'your-cloudinary-name',
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  smtp: {
    endpoint: process.env.SMTP_ENDPOINT || 'https://api.emailjs.com/api/v1.0/email/send',
    from: 'info@travelwith.com',
  },
  templates: {
    otp: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
        <div style="background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #004225; margin: 0; font-size: 28px;">{{siteName}} - Travel & Tour</h1>
            <p style="color: #666; margin: 10px 0 0 0;">Your trusted partner for sacred journeys</p>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <p style="font-size: 18px; color: #333; margin-bottom: 20px;">Your OTP verification code is:</p>
            <div style="background: linear-gradient(135deg, #004225, #059669); color: white; padding: 20px; text-align: center; border-radius: 12px; font-size: 32px; font-weight: bold; letter-spacing: 4px; margin: 20px 0;">{{otp}}</div>
            <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes.</p>
          </div>
          <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
            <p style="color: #666; font-size: 12px; margin: 0;">© 2024 {{siteName}} Travel & Tour. All rights reserved.</p>
          </div>
        </div>
      </div>
    `,
    welcome: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
        <div style="background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #004225; margin: 0; font-size: 28px;">Welcome to {{siteName}}</h1>
          </div>
          <div style="margin: 30px 0;">
            <p style="font-size: 18px; color: #333; line-height: 1.6;">Thank you for joining our community of faithful travelers. We're honored to guide you on your sacred journey.</p>
            <p style="color: #666; line-height: 1.6;">Your account has been successfully created. You now have access to:</p>
            <ul style="color: #666; line-height: 1.8; padding-left: 20px;">
              <li>Exclusive pilgrimage packages and offers</li>
              <li>Pre-travel Islamic courses and guidance</li>
              <li>24/7 support throughout your journey</li>
              <li>Community of fellow pilgrims</li>
            </ul>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{baseUrl}}" style="background: linear-gradient(135deg, #004225, #059669); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Explore Our Services</a>
          </div>
          <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
            <p style="color: #666; font-size: 12px; margin: 0;">May Allah bless your journey with us.</p>
          </div>
        </div>
      </div>
    `,
    booking_confirmation: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
        <div style="background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #004225; margin: 0; font-size: 28px;">Booking Confirmed!</h1>
            <p style="color: #059669; font-size: 18px; margin: 10px 0;">Your sacred journey awaits</p>
          </div>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <h3 style="color: #004225; margin: 0 0 15px 0;">Booking Details:</h3>
            <p><strong>Package:</strong> {{packageTitle}}</p>
            <p><strong>Booking ID:</strong> {{bookingId}}</p>
            <p><strong>Departure Date:</strong> {{departureDate}}</p>
            <p><strong>Travelers:</strong> {{travelers}}</p>
            <p><strong>Total Amount:</strong> ${{totalAmount}}</p>
          </div>
          <div style="margin: 30px 0;">
            <p style="color: #333; line-height: 1.6;">We have received your booking and our team will contact you within 24 hours to discuss the next steps and answer any questions.</p>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{baseUrl}}/booking-details/{{bookingId}}" style="background: linear-gradient(135deg, #004225, #059669); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">View Booking Details</a>
          </div>
        </div>
      </div>
    `,
    site_welcome: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
        <div style="background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #004225; margin: 0; font-size: 28px;">Welcome to TravelWith Platform!</h1>
          </div>
          <div style="margin: 30px 0;">
            <p style="font-size: 18px; color: #333; line-height: 1.6;">Congratulations! Your travel and tour platform "{{siteName}}" has been successfully created.</p>
            <p style="color: #666; line-height: 1.6;">Your platform is now ready with:</p>
            <ul style="color: #666; line-height: 1.8; padding-left: 20px;">
              <li>Your own branded travel website</li>
              <li>Complete booking and package management system</li>
              <li>Customer management dashboard</li>
              <li>Content management tools</li>
              <li>Multi-language support</li>
            </ul>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{siteUrl}}" style="background: linear-gradient(135deg, #004225, #059669); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Visit Your Platform</a>
          </div>
        </div>
      </div>
    `,
    newsletter: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
        <div style="background: white; padding: 40px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #004225;">{{subject}}</h1>
          </div>
          <div style="margin: 30px 0;">
            {{content}}
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="{{unsubscribeUrl}}" style="color: #666; font-size: 12px; text-decoration: none;">Unsubscribe from this newsletter</a>
          </div>
        </div>
      </div>
    `
  },
  schemas: {
    // NEW: Sites schema for multi-tenant platform
    sites: {
      required: ['name', 'slug', 'ownerEmail'],
      types: {
        name: 'string',
        slug: 'string', // URL slug like 'minhaajulhudaa'
        ownerEmail: 'string',
        ownerName: 'string',
        description: 'string',
        logo: 'string',
        favicon: 'string',
        primaryColor: 'string',
        secondaryColor: 'string',
        contactEmail: 'string',
        contactPhone: 'string',
        address: 'object',
        socialMedia: 'object',
        languages: 'array',
        currency: 'string',
        timezone: 'string',
        status: 'string',
        subscription: 'object',
        features: 'array',
        customDomain: 'string',
        seoSettings: 'object',
        integrations: 'object',
        created: 'date',
        updated: 'date',
        lastActivity: 'date'
      },
      defaults: {
        status: 'active',
        languages: ['en'],
        currency: 'USD',
        timezone: 'UTC',
        features: ['basic'],
        created: new Date().toISOString(),
        address: {},
        socialMedia: {},
        subscription: { plan: 'free', status: 'active' },
        seoSettings: {},
        integrations: {}
      },
    },
    users: {
      required: ['email', 'siteId'],
      types: {
        email: 'string',
        name: 'string',
        phone: 'string',
        verified: 'boolean',
        roles: 'array',
        preferences: 'object',
        avatar: 'string',
        location: 'string',
        dateJoined: 'date',
        lastLogin: 'date',
        newsletter: 'boolean',
        notifications: 'object',
        siteId: 'string', // Links user to specific site
        siteRoles: 'array' // Roles within the site
      },
      defaults: {
        verified: false,
        roles: ['user'],
        newsletter: true,
        dateJoined: new Date().toISOString(),
        preferences: {},
        notifications: {
          email: true,
          sms: false,
          push: true
        },
        siteRoles: ['customer']
      },
    },
    packages: {
      required: ['title', 'type', 'price', 'siteId'],
      types: {
        title: 'string',
        description: 'string',
        type: 'string',
        price: 'number',
        duration: 'string',
        inclusions: 'array',
        exclusions: 'array',
        itinerary: 'array',
        gallery: 'array',
        featured: 'boolean',
        status: 'string',
        capacity: 'number',
        availableDates: 'array',
        tags: 'array',
        seoTitle: 'string',
        seoDescription: 'string',
        category: 'string',
        difficulty: 'string',
        minAge: 'number',
        maxAge: 'number',
        requirements: 'array',
        highlights: 'array',
        accommodation: 'object',
        transportation: 'object',
        meals: 'object',
        guides: 'array',
        created: 'date',
        updated: 'date',
        author: 'string',
        siteId: 'string' // Links package to specific site
      },
      defaults: {
        status: 'active',
        featured: false,
        inclusions: [],
        exclusions: [],
        gallery: [],
        tags: [],
        created: new Date().toISOString(),
        capacity: 50,
        difficulty: 'moderate',
        requirements: [],
        highlights: [],
        accommodation: {},
        transportation: {},
        meals: {},
        guides: []
      },
    },
    blogs: {
      required: ['title', 'content', 'siteId'],
      types: {
        title: 'string',
        content: 'string',
        excerpt: 'string',
        author: 'string',
        category: 'string',
        tags: 'array',
        featured: 'boolean',
        published: 'boolean',
        publishDate: 'date',
        lastModified: 'date',
        views: 'number',
        likes: 'number',
        comments: 'array',
        seoTitle: 'string',
        seoDescription: 'string',
        featuredImage: 'string',
        gallery: 'array',
        relatedPosts: 'array',
        readTime: 'number',
        status: 'string',
        siteId: 'string' // Links blog to specific site
      },
      defaults: {
        published: false,
        featured: false,
        tags: [],
        views: 0,
        likes: 0,
        comments: [],
        gallery: [],
        relatedPosts: [],
        readTime: 5,
        status: 'draft',
        publishDate: new Date().toISOString(),
        lastModified: new Date().toISOString()
      },
    },
    courses: {
      required: ['title', 'description', 'siteId'],
      types: {
        title: 'string',
        description: 'string',
        instructor: 'string',
        duration: 'string',
        lessons: 'array',
        price: 'number',
        featured: 'boolean',
        category: 'string',
        level: 'string',
        prerequisites: 'array',
        outcomes: 'array',
        syllabus: 'array',
        resources: 'array',
        assessments: 'array',
        certificate: 'boolean',
        capacity: 'number',
        enrolled: 'number',
        rating: 'number',
        reviews: 'array',
        startDate: 'date',
        endDate: 'date',
        schedule: 'array',
        status: 'string',
        tags: 'array',
        thumbnail: 'string',
        gallery: 'array',
        siteId: 'string' // Links course to specific site
      },
      defaults: {
        featured: false,
        lessons: [],
        price: 0,
        level: 'beginner',
        prerequisites: [],
        outcomes: [],
        syllabus: [],
        resources: [],
        assessments: [],
        certificate: false,
        capacity: 30,
        enrolled: 0,
        rating: 0,
        reviews: [],
        status: 'draft',
        tags: [],
        gallery: [],
        schedule: []
      },
    },
    events: {
      required: ['title', 'date', 'siteId'],
      types: {
        title: 'string',
        description: 'string',
        date: 'date',
        endDate: 'date',
        location: 'string',
        venue: 'object',
        capacity: 'number',
        registered: 'number',
        price: 'number',
        category: 'string',
        type: 'string',
        organizer: 'string',
        speakers: 'array',
        agenda: 'array',
        requirements: 'array',
        includes: 'array',
        gallery: 'array',
        tags: 'array',
        status: 'string',
        featured: 'boolean',
        registrationDeadline: 'date',
        thumbnail: 'string',
        created: 'date',
        updated: 'date',
        siteId: 'string' // Links event to specific site
      },
      defaults: {
        registered: 0,
        price: 0,
        speakers: [],
        agenda: [],
        requirements: [],
        includes: [],
        gallery: [],
        tags: [],
        status: 'upcoming',
        featured: false,
        created: new Date().toISOString(),
        venue: {}
      },
    },
    bookings: {
      required: ['packageId', 'customerEmail', 'status', 'siteId'],
      types: {
        packageId: 'string',
        packageTitle: 'string',
        customerEmail: 'string',
        customerName: 'string',
        customerPhone: 'string',
        travelers: 'number',
        travelerDetails: 'array',
        departureDate: 'date',
        returnDate: 'date',
        status: 'string',
        totalAmount: 'number',
        paidAmount: 'number',
        paymentStatus: 'string',
        paymentMethod: 'string',
        specialRequests: 'string',
        emergencyContact: 'object',
        travelInsurance: 'boolean',
        roomPreference: 'string',
        mealPreference: 'string',
        medicalConditions: 'string',
        visaRequired: 'boolean',
        passportDetails: 'array',
        created: 'date',
        updated: 'date',
        notes: 'string',
        source: 'string',
        referral: 'string',
        siteId: 'string' // Links booking to specific site
      },
      defaults: {
        status: 'pending',
        travelers: 1,
        travelerDetails: [],
        totalAmount: 0,
        paidAmount: 0,
        paymentStatus: 'pending',
        travelInsurance: false,
        visaRequired: true,
        passportDetails: [],
        created: new Date().toISOString(),
        emergencyContact: {},
        source: 'website'
      },
    },
    knowledgebase: {
      required: ['title', 'content', 'siteId'],
      types: {
        title: 'string',
        content: 'string',
        category: 'string',
        subcategory: 'string',
        tags: 'array',
        type: 'string',
        difficulty: 'string',
        views: 'number',
        helpful: 'number',
        featured: 'boolean',
        status: 'string',
        author: 'string',
        lastUpdated: 'date',
        relatedArticles: 'array',
        attachments: 'array',
        faqs: 'array',
        searchKeywords: 'array',
        siteId: 'string' // Links knowledge base to specific site
      },
      defaults: {
        tags: [],
        type: 'article',
        difficulty: 'beginner',
        views: 0,
        helpful: 0,
        featured: false,
        status: 'published',
        lastUpdated: new Date().toISOString(),
        relatedArticles: [],
        attachments: [],
        faqs: [],
        searchKeywords: []
      }
    },
    testimonials: {
      required: ['name', 'content', 'siteId'],
      types: {
        name: 'string',
        content: 'string',
        rating: 'number',
        location: 'string',
        packageType: 'string',
        date: 'date',
        verified: 'boolean',
        featured: 'boolean',
        avatar: 'string',
        title: 'string',
        video: 'string',
        status: 'string',
        tags: 'array',
        siteId: 'string' // Links testimonial to specific site
      },
      defaults: {
        rating: 5,
        verified: false,
        featured: false,
        date: new Date().toISOString(),
        status: 'pending',
        tags: []
      }
    },
    newsletter: {
      required: ['email', 'siteId'],
      types: {
        email: 'string',
        name: 'string',
        subscribed: 'boolean',
        subscribedDate: 'date',
        interests: 'array',
        source: 'string',
        status: 'string',
        unsubscribeToken: 'string',
        siteId: 'string' // Links newsletter subscription to specific site
      },
      defaults: {
        subscribed: true,
        subscribedDate: new Date().toISOString(),
        interests: [],
        source: 'website',
        status: 'active',
        unsubscribeToken: crypto.randomUUID()
      }
    }
  },
  auth: {
    requireEmailVerification: true,
    otpTriggers: ['register', 'login', 'password-reset'],
  },
});

export default sdk;
