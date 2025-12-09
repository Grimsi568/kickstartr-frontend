import type { components } from '@/api/schema';

// Mock Templates
export const mockTemplates: components["schemas"]["TemplateListItemDto"][] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'React TypeScript Starter',
    slug: 'react-typescript-starter',
    shortDescription: 'A modern React app with TypeScript, Vite, and Tailwind CSS',
    isFree: true,
    price: 0,
    techStackSummary: 'React 18, TypeScript, Vite, Tailwind',
    createdAt: '2024-01-15T10:00:00Z',
    thumbnailUrl: 'https://via.placeholder.com/400x300/0891b2/ffffff?text=React+TS',
    tags: [
      { id: 'tag-1', name: 'React', slug: 'react', category: 'Framework' },
      { id: 'tag-2', name: 'TypeScript', slug: 'typescript', category: 'Language' },
      { id: 'tag-3', name: 'Vite', slug: 'vite', category: 'Build Tool' }
    ]
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    name: 'Next.js E-commerce',
    slug: 'nextjs-ecommerce',
    shortDescription: 'Full-featured e-commerce solution with Next.js 14 and Stripe',
    isFree: false,
    price: 4999,
    techStackSummary: 'Next.js 14, Prisma, PostgreSQL, Stripe',
    createdAt: '2024-02-20T14:30:00Z',
    thumbnailUrl: 'https://via.placeholder.com/400x300/06b6d4/ffffff?text=Next.js+Shop',
    tags: [
      { id: 'tag-4', name: 'Next.js', slug: 'nextjs', category: 'Framework' },
      { id: 'tag-5', name: 'E-commerce', slug: 'ecommerce', category: 'Category' },
      { id: 'tag-6', name: 'Stripe', slug: 'stripe', category: 'Payment' }
    ]
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    name: 'Vue 3 Dashboard',
    slug: 'vue3-dashboard',
    shortDescription: 'Admin dashboard with Vue 3, Composition API, and Chart.js',
    isFree: false,
    price: 2999,
    techStackSummary: 'Vue 3, Composition API, Pinia, Chart.js',
    createdAt: '2024-03-10T09:15:00Z',
    thumbnailUrl: 'https://via.placeholder.com/400x300/0e7490/ffffff?text=Vue+Dashboard',
    tags: [
      { id: 'tag-7', name: 'Vue', slug: 'vue', category: 'Framework' },
      { id: 'tag-8', name: 'Dashboard', slug: 'dashboard', category: 'Category' },
      { id: 'tag-9', name: 'Charts', slug: 'charts', category: 'Feature' }
    ]
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174003',
    name: 'Node.js REST API',
    slug: 'nodejs-rest-api',
    shortDescription: 'Production-ready REST API with Express, MongoDB, and JWT auth',
    isFree: true,
    price: 0,
    techStackSummary: 'Node.js, Express, MongoDB, JWT',
    createdAt: '2024-04-05T16:45:00Z',
    thumbnailUrl: 'https://via.placeholder.com/400x300/155e75/ffffff?text=Node+API',
    tags: [
      { id: 'tag-10', name: 'Node.js', slug: 'nodejs', category: 'Runtime' },
      { id: 'tag-11', name: 'API', slug: 'api', category: 'Category' },
      { id: 'tag-12', name: 'MongoDB', slug: 'mongodb', category: 'Database' }
    ]
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174004',
    name: 'Python FastAPI Backend',
    slug: 'python-fastapi-backend',
    shortDescription: 'High-performance async API with FastAPI and PostgreSQL',
    isFree: false,
    price: 3499,
    techStackSummary: 'Python, FastAPI, SQLAlchemy, PostgreSQL',
    createdAt: '2024-05-12T11:20:00Z',
    thumbnailUrl: 'https://via.placeholder.com/400x300/164e63/ffffff?text=FastAPI',
    tags: [
      { id: 'tag-13', name: 'Python', slug: 'python', category: 'Language' },
      { id: 'tag-14', name: 'FastAPI', slug: 'fastapi', category: 'Framework' },
      { id: 'tag-15', name: 'PostgreSQL', slug: 'postgresql', category: 'Database' }
    ]
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174005',
    name: 'Flutter Mobile App',
    slug: 'flutter-mobile-app',
    shortDescription: 'Cross-platform mobile app starter with Flutter and Firebase',
    isFree: false,
    price: 5999,
    techStackSummary: 'Flutter, Dart, Firebase, Riverpod',
    createdAt: '2024-06-08T13:00:00Z',
    thumbnailUrl: 'https://via.placeholder.com/400x300/0c4a6e/ffffff?text=Flutter+App',
    tags: [
      { id: 'tag-16', name: 'Flutter', slug: 'flutter', category: 'Framework' },
      { id: 'tag-17', name: 'Mobile', slug: 'mobile', category: 'Platform' },
      { id: 'tag-18', name: 'Firebase', slug: 'firebase', category: 'Backend' }
    ]
  }
];

// Mock Template Details
export const mockTemplateDetails: Record<string, components["schemas"]["TemplateDetailDto"]> = {
  '123e4567-e89b-12d3-a456-426614174000': {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'React TypeScript Starter',
    slug: 'react-typescript-starter',
    shortDescription: 'A modern React app with TypeScript, Vite, and Tailwind CSS',
    longDescription: 'This comprehensive starter template provides everything you need to build modern React applications. It includes TypeScript for type safety, Vite for lightning-fast development, and Tailwind CSS for beautiful styling. Perfect for both beginners and experienced developers looking for a solid foundation.',
    isFree: true,
    price: 0,
    authorName: 'Kickstartr Team',
    techStackSummary: 'React 18, TypeScript, Vite, Tailwind',
    createdAt: '2024-01-15T10:00:00Z',
    thumbnailUrl: 'https://via.placeholder.com/400x300/0891b2/ffffff?text=React+TS',
    mainDownloadUrl: 'https://example.com/downloads/react-typescript-starter-v1.0.0.zip',
    tags: [
      { id: 'tag-1', name: 'React', slug: 'react', category: 'Framework' },
      { id: 'tag-2', name: 'TypeScript', slug: 'typescript', category: 'Language' },
      { id: 'tag-3', name: 'Vite', slug: 'vite', category: 'Build Tool' }
    ],
    packages: [
      { id: 'pkg-1', name: 'react', version: '18.2.0', packageManager: 0, url: 'https://www.npmjs.com/package/react' },
      { id: 'pkg-2', name: 'typescript', version: '5.3.3', packageManager: 0, url: 'https://www.npmjs.com/package/typescript' },
      { id: 'pkg-3', name: 'vite', version: '5.0.0', packageManager: 0, url: 'https://www.npmjs.com/package/vite' },
      { id: 'pkg-4', name: 'tailwindcss', version: '3.4.0', packageManager: 0, url: 'https://www.npmjs.com/package/tailwindcss' }
    ],
    comments: [
      {
        id: 'comment-1',
        content: 'Great starter template! Got up and running in minutes.',
        createdAt: '2024-01-20T15:30:00Z',
        userDisplayName: 'John Developer',
        visibility: 0
      },
      {
        id: 'comment-2',
        content: 'Love the Tailwind integration. Very clean setup!',
        createdAt: '2024-01-25T09:45:00Z',
        userDisplayName: 'Sarah Code',
        visibility: 0
      }
    ],
    templateVersions: [
      {
        id: 'ver-1',
        version: '1.0.0',
        notes: 'Initial release with React 18, TypeScript 5, and Vite 5',
        createdAt: '2024-01-15T10:00:00Z',
        isDeprecated: false,
        isLatest: true
      }
    ]
  },
  '123e4567-e89b-12d3-a456-426614174001': {
    id: '123e4567-e89b-12d3-a456-426614174001',
    name: 'Next.js E-commerce',
    slug: 'nextjs-ecommerce',
    shortDescription: 'Full-featured e-commerce solution with Next.js 14 and Stripe',
    longDescription: 'Build your online store with this production-ready e-commerce template. Features include: product catalog, shopping cart, checkout with Stripe, order management, admin dashboard, and more. Built with Next.js 14 App Router, Prisma ORM, and PostgreSQL for maximum performance and scalability.',
    isFree: false,
    price: 4999,
    authorName: 'Kickstartr Team',
    techStackSummary: 'Next.js 14, Prisma, PostgreSQL, Stripe',
    createdAt: '2024-02-20T14:30:00Z',
    thumbnailUrl: 'https://via.placeholder.com/400x300/06b6d4/ffffff?text=Next.js+Shop',
    mainDownloadUrl: 'https://example.com/downloads/nextjs-ecommerce-v2.1.0.zip',
    tags: [
      { id: 'tag-4', name: 'Next.js', slug: 'nextjs', category: 'Framework' },
      { id: 'tag-5', name: 'E-commerce', slug: 'ecommerce', category: 'Category' },
      { id: 'tag-6', name: 'Stripe', slug: 'stripe', category: 'Payment' }
    ],
    packages: [
      { id: 'pkg-5', name: 'next', version: '14.1.0', packageManager: 0, url: 'https://www.npmjs.com/package/next' },
      { id: 'pkg-6', name: '@prisma/client', version: '5.9.0', packageManager: 0, url: 'https://www.npmjs.com/package/@prisma/client' },
      { id: 'pkg-7', name: 'stripe', version: '14.12.0', packageManager: 0, url: 'https://www.npmjs.com/package/stripe' },
      { id: 'pkg-8', name: 'zustand', version: '4.5.0', packageManager: 0, url: 'https://www.npmjs.com/package/zustand' }
    ],
    comments: [
      {
        id: 'comment-3',
        content: 'This saved me weeks of development time. Highly recommended!',
        createdAt: '2024-03-01T11:20:00Z',
        userDisplayName: 'Mike Store',
        visibility: 0
      }
    ],
    templateVersions: [
      {
        id: 'ver-2',
        version: '2.1.0',
        notes: 'Added inventory management and improved checkout flow',
        createdAt: '2024-05-10T10:00:00Z',
        isDeprecated: false,
        isLatest: true
      },
      {
        id: 'ver-3',
        version: '2.0.0',
        notes: 'Major update: Upgraded to Next.js 14 with App Router',
        createdAt: '2024-03-15T14:30:00Z',
        isDeprecated: false,
        isLatest: false
      },
      {
        id: 'ver-4',
        version: '1.0.0',
        notes: 'Initial release',
        createdAt: '2024-02-20T14:30:00Z',
        isDeprecated: true,
        isLatest: false
      }
    ]
  }
};

// Mock Bundles
export const mockBundles: components["schemas"]["BundleDto"][] = [
  {
    id: 'bundle-1',
    name: 'Full Stack Starter Pack',
    slug: 'full-stack-starter-pack',
    description: 'Everything you need to build modern full-stack applications. Includes React frontend, Node.js backend, and deployment configurations.',
    price: 7999,
    isActive: true,
    createdAt: '2024-03-01T10:00:00Z',
    templates: [
      mockTemplates[0], // React TypeScript Starter
      mockTemplates[3]  // Node.js REST API
    ]
  },
  {
    id: 'bundle-2',
    name: 'E-commerce Pro Bundle',
    slug: 'ecommerce-pro-bundle',
    description: 'Complete e-commerce solution with Next.js storefront, admin dashboard, and mobile app. Perfect for launching your online business.',
    price: 14999,
    isActive: true,
    createdAt: '2024-04-15T14:00:00Z',
    templates: [
      mockTemplates[1], // Next.js E-commerce
      mockTemplates[2], // Vue 3 Dashboard
      mockTemplates[5]  // Flutter Mobile App
    ]
  },
  {
    id: 'bundle-3',
    name: 'Backend Developer Kit',
    slug: 'backend-developer-kit',
    description: 'Professional backend templates for building scalable APIs. Includes both Node.js and Python FastAPI solutions.',
    price: 5999,
    isActive: true,
    createdAt: '2024-05-20T09:30:00Z',
    templates: [
      mockTemplates[3], // Node.js REST API
      mockTemplates[4]  // Python FastAPI Backend
    ]
  }
];

// Mock Bundle Details
export const mockBundleDetails: Record<string, components["schemas"]["BundleDto"]> = {
  'bundle-1': mockBundles[0],
  'bundle-2': mockBundles[1],
  'bundle-3': mockBundles[2]
};

// Mock User
export const mockUser: components["schemas"]["UserDto"] = {
  id: 'user-123',
  email: 'demo@kickstartr.dev',
  displayName: 'Demo User',
  avatarUrl: 'https://via.placeholder.com/100/0891b2/ffffff?text=DU',
  createdAt: '2024-01-01T00:00:00Z'
};

// Helper to get mock template detail by ID
export function getMockTemplateById(id: string): components["schemas"]["TemplateDetailDto"] | null {
  return mockTemplateDetails[id] || null;
}

// Helper to get mock bundle detail by ID
export function getMockBundleById(id: string): components["schemas"]["BundleDto"] | null {
  return mockBundleDetails[id] || null;
}
