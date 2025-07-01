
export interface ThemeSection {
  id: string;
  name: string;
  type: 'hero' | 'features' | 'packages' | 'testimonials' | 'about' | 'contact' | 'gallery' | 'services' | 'team' | 'faq' | 'blog' | 'stats';
  enabled: boolean;
  order: number;
  content: Record<string, any>;
  styles: Record<string, any>;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  category: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  cardColor: string;
  borderColor: string;
  gradientFrom: string;
  gradientTo: string;
  fontFamily: string;
  headerStyle: string;
  footerStyle: string;
  buttonStyle: 'rounded' | 'square' | 'pill';
  cardStyle: 'flat' | 'shadow' | 'border' | 'glass' | 'elevated';
  layout: 'traditional' | 'modern' | 'minimal' | 'luxury' | 'creative';
  sections: ThemeSection[];
  customCSS?: string;
  isDefault?: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const defaultSections: ThemeSection[] = [
  {
    id: 'hero',
    name: 'Hero Section',
    type: 'hero',
    enabled: true,
    order: 1,
    content: {
      title: 'Discover Amazing Travel Experiences',
      subtitle: 'Journey to breathtaking destinations with our expertly crafted travel packages',
      buttonText: 'Explore Packages',
      backgroundImage: '/placeholder.svg'
    },
    styles: {
      height: 'screen',
      alignment: 'center',
      overlay: 'dark'
    }
  },
  {
    id: 'features',
    name: 'Features Section',
    type: 'features',
    enabled: true,
    order: 2,
    content: {
      title: 'Why Choose Us',
      features: [
        { icon: 'shield', title: 'Safe & Secure', description: 'Your safety is our top priority' },
        { icon: 'star', title: 'Expert Guides', description: 'Professional and knowledgeable guides' },
        { icon: 'heart', title: '24/7 Support', description: 'Round-the-clock customer support' }
      ]
    },
    styles: {
      layout: 'grid',
      columns: 3
    }
  },
  {
    id: 'packages',
    name: 'Packages Section',
    type: 'packages',
    enabled: true,
    order: 3,
    content: {
      title: 'Featured Packages',
      subtitle: 'Discover our most popular travel experiences'
    },
    styles: {
      layout: 'grid',
      columns: 3
    }
  },
  {
    id: 'about',
    name: 'About Section',
    type: 'about',
    enabled: true,
    order: 4,
    content: {
      title: 'About Us',
      description: 'We are passionate about creating unforgettable travel experiences that connect you with the world\'s most beautiful destinations.',
      image: '/placeholder.svg'
    },
    styles: {
      layout: 'split',
      imagePosition: 'left'
    }
  },
  {
    id: 'testimonials',
    name: 'Testimonials Section',
    type: 'testimonials',
    enabled: true,
    order: 5,
    content: {
      title: 'What Our Travelers Say',
      testimonials: [
        { name: 'Sarah Johnson', text: 'Amazing experience! Highly recommended.', rating: 5 },
        { name: 'Ahmed Ali', text: 'Professional service and great value.', rating: 5 },
        { name: 'Maria Garcia', text: 'The trip of a lifetime!', rating: 5 }
      ]
    },
    styles: {
      layout: 'carousel',
      autoplay: true
    }
  },
  {
    id: 'contact',
    name: 'Contact Section',
    type: 'contact',
    enabled: true,
    order: 6,
    content: {
      title: 'Get In Touch',
      subtitle: 'Ready to start your journey? Contact us today!'
    },
    styles: {
      layout: 'form',
      showMap: true
    }
  }
];

export const enhancedThemes: Partial<Theme>[] = [
  {
    id: 'islamic-luxury',
    name: 'Islamic Luxury',
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
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
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
    id: 'adventure-bold',
    name: 'Adventure Bold',
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
  }
];
