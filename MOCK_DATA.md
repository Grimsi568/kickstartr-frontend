# Mock Data Reference

This file documents the mock data available in the application for development and testing.

## Enabling Mock Data

Set in your `.env` file:
```env
VITE_USE_MOCK_DATA=true
# Set to true to mock as admin, false for regular user
VITE_MOCK_AS_ADMIN=false
```

Then restart your dev server.

## User Roles

The app now supports two user roles:

- **User (role: 0)** - Regular user with access to:
  - View templates and bundles
  - View their profile
  - View their licenses
  
- **Admin (role: 1)** - Admin user with access to:
  - All user features
  - Admin dashboard with management tools
  - Create templates, bundles, tags, and packages

### Testing Different Roles

**Mock as Regular User:**
```env
VITE_USE_MOCK_DATA=true
VITE_MOCK_AS_ADMIN=false
```

**Mock as Admin:**
```env
VITE_USE_MOCK_DATA=true
VITE_MOCK_AS_ADMIN=true
```

## Mock Data Contents

### Templates (6 total)

1. **React TypeScript Starter** (Free)
   - ID: `123e4567-e89b-12d3-a456-426614174000`
   - Tech: React 18, TypeScript, Vite, Tailwind
   - Includes: 4 packages, 2 comments, 1 version

2. **Next.js E-commerce** ($49.99)
   - ID: `123e4567-e89b-12d3-a456-426614174001`
   - Tech: Next.js 14, Prisma, PostgreSQL, Stripe
   - Includes: 4 packages, 1 comment, 3 versions (one deprecated)

3. **Vue 3 Dashboard** ($29.99)
   - ID: `123e4567-e89b-12d3-a456-426614174002`
   - Tech: Vue 3, Composition API, Pinia, Chart.js

4. **Node.js REST API** (Free)
   - ID: `123e4567-e89b-12d3-a456-426614174003`
   - Tech: Node.js, Express, MongoDB, JWT

5. **Python FastAPI Backend** ($34.99)
   - ID: `123e4567-e89b-12d3-a456-426614174004`
   - Tech: Python, FastAPI, SQLAlchemy, PostgreSQL

6. **Flutter Mobile App** ($59.99)
   - ID: `123e4567-e89b-12d3-a456-426614174005`
   - Tech: Flutter, Dart, Firebase, Riverpod

### Bundles (3 total)

1. **Full Stack Starter Pack** ($79.99)
   - Includes: React TypeScript Starter + Node.js REST API

2. **E-commerce Pro Bundle** ($149.99)
   - Includes: Next.js E-commerce + Vue 3 Dashboard + Flutter Mobile App

3. **Backend Developer Kit** ($59.99)
   - Includes: Node.js REST API + Python FastAPI Backend

### User

- **Demo User** (Regular User - role: 0)
  - ID: `user-123`
  - Email: demo@kickstartr.dev
  - Display Name: Demo User
  
- **Admin User** (Admin - role: 1)
  - ID: `admin-123`
  - Email: admin@kickstartr.dev
  - Display Name: Admin User

## Mock API Behavior

- **Simulated Delays**: 500ms default (1000ms for template creation)
- **Login/Register**: Always succeeds
- **Comments**: Posts always succeed
- **Template Upload**: Simulates progress from 0-100%
- **Not Found**: Returns null for non-existent IDs

## Testing Different Scenarios

### View a template with versions:
Navigate to `/templates/123e4567-e89b-12d3-a456-426614174001` (Next.js E-commerce)

### View a free template:
Navigate to `/templates/123e4567-e89b-12d3-a456-426614174000` (React TypeScript Starter)

### View a bundle:
Navigate to `/bundles/bundle-1` (Full Stack Starter Pack)

### Test template listing:
Navigate to `/templates` - shows all 6 templates

### Test bundle listing:
Navigate to `/bundles` - shows all 3 bundles

## Extending Mock Data

To add more mock data, edit `src/lib/mockData.ts`:

1. Add items to `mockTemplates` or `mockBundles` arrays
2. For detailed views, add to `mockTemplateDetails` or `mockBundleDetails` objects
3. Ensure all data follows the schema types from `src/api/schema.ts`

## Notes

- All prices in mock data are in cents (e.g., 4999 = $49.99)
- Thumbnail URLs use placeholder images
- Download URLs are mock URLs (won't actually download)
- All data is fully typed using OpenAPI generated types
