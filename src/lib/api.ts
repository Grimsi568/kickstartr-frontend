import axios from 'axios'
import type { components } from '@/api/schema'
import {
  mockTemplates,
  mockBundles,
  getMockTemplateById,
  getMockBundleById,
  mockUser,
  mockAdminUser
} from './mockData'

const API_URL = import.meta.env.VITE_API_URL || ''

// Toggle this to switch between real API and mock data
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true'

// Toggle mock user role: set to true for admin, false for regular user
const MOCK_AS_ADMIN = import.meta.env.VITE_MOCK_AS_ADMIN === 'true'

// Helper to simulate API delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms))

export const Api = {
  async login(email: string, password: string) {
    if (USE_MOCK_DATA) {
      await delay();
      // Mock login always succeeds
      return;
    }
    await axios.post(`${API_URL}/api/Auth/login`, { email, password }, { withCredentials: true })
  },
  async register(name: string, email: string, password: string) {
    if (USE_MOCK_DATA) {
      await delay();
      // Mock register always succeeds
      return;
    }
    await axios.post(`${API_URL}/api/Auth/register`, { name, email, password }, { withCredentials: true })
  },
  async me() {
    if (USE_MOCK_DATA) {
      await delay();
      return MOCK_AS_ADMIN ? mockAdminUser : mockUser;
    }
    const res = await axios.get(`${API_URL}/api/User/me`, { withCredentials: true })
    return res.data
  },
  async logout() {
    if (USE_MOCK_DATA) {
      await delay();
      return;
    }
    await axios.post(`${API_URL}/api/Auth/logout`, {}, { withCredentials: true })
  },
  async getBundles(): Promise<components["schemas"]["GetAllPublicBundlesResponse"]> {
    if (USE_MOCK_DATA) {
      await delay();
      return { bundles: mockBundles };
    }
    const res = await axios.get(`${API_URL}/api/Bundle`, { withCredentials: true })
    return res.data
  },
  async getBundleById(id: string): Promise<components["schemas"]["GetSingleBundleResponse"]> {
    if (USE_MOCK_DATA) {
      await delay();
      const bundle = getMockBundleById(id);
      if (!bundle) throw new Error('Bundle not found');
      return { bundle };
    }
    const res = await axios.get(`${API_URL}/api/Bundle/${id}`, { withCredentials: true });
    return res.data;
  },
  async getTemplates(): Promise<components["schemas"]["GetAllPublicTemplatesResponse"]> {
    if (USE_MOCK_DATA) {
      await delay();
      return { templates: mockTemplates };
    }
    const res = await axios.get(`${API_URL}/api/Template`, { withCredentials: true })
    return res.data
  },
  
  async getTemplateById(id: string): Promise<components["schemas"]["GetSingleTemplateResponse"]> {
    if (USE_MOCK_DATA) {
      await delay();
      const template = getMockTemplateById(id);
      if (!template) throw new Error('Template not found');
      return { template };
    }
    const res = await axios.get(`${API_URL}/api/Template/${id}`, { withCredentials: true });
    return res.data;
  },

  async postComment(data: {
    comment: string
    itemId: string
    visibility: components["schemas"]["Visibility"]
  }): Promise<void> {
    if (USE_MOCK_DATA) {
      await delay();
      // Mock comment post always succeeds
      return;
    }
    await axios.post(
      `${API_URL}/comment`,
      data as components["schemas"]["PostCommentRequest"],
      { withCredentials: true }
    )
  },

  async getUserProfile() {
    if (USE_MOCK_DATA) {
      await delay();
      return MOCK_AS_ADMIN ? mockAdminUser : mockUser;
    }
    const res = await axios.get(`${API_URL}/api/User/userProfile`, { withCredentials: true })
    return res.data
  },

  // Template creation
  async createTemplate(payload: components["schemas"]["PostTemplateRequest"]): Promise<components["schemas"]["PostTemplateResponse"]> {
    if (USE_MOCK_DATA) {
      await delay(1000);
      return { id: 'mock-template-' + Date.now() };
    }
    const res = await axios.post(`${API_URL}/api/Template`, payload, { withCredentials: true })
    return res.data
  },

  // Create template version for existing template
  async createTemplateVersion(templateId: string, payload: components["schemas"]["PostTemplateRequest"]): Promise<components["schemas"]["PostTemplateResponse"]> {
    if (USE_MOCK_DATA) {
      await delay(1000);
      return { id: 'mock-version-' + Date.now() };
    }
    const res = await axios.post(`${API_URL}/api/Template/version/${templateId}`, payload, { withCredentials: true })
    return res.data
  },

  // Get signed upload URL for template artifact
  async getUploadUrl(payload: components["schemas"]["GetUploadUrlRequest"]): Promise<components["schemas"]["GetUploadUrlResponse"]> {
    if (USE_MOCK_DATA) {
      await delay();
      return {
        uploadUrl: {
          url: 'https://mock-storage.example.com/upload',
          container: 'templates',
          name: payload.templateSlug || 'template.zip',
          headers: {}
        }
      };
    }
    const res = await axios.post(`${API_URL}/api/Template/upload-url`, payload, { withCredentials: true })
    return res.data
  },

  // Upload the zip file to storage using the signed URL
  async uploadTemplateArtifact(
    url: string,
    file: File,
    headers?: Record<string, string>,
    onProgress?: (pct: number) => void
  ): Promise<void> {
    if (USE_MOCK_DATA) {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await delay(100);
        if (onProgress) onProgress(i);
      }
      return;
    }
    await axios.put(url, file, {
      headers: {
        'Content-Type': file.type || 'application/zip',
        ...(headers || {})
      },
      onUploadProgress: evt => {
        if (onProgress && evt.total) {
          onProgress(Math.round((evt.loaded / evt.total) * 100))
        }
      }
    })
  },

  // Get all tags
  async getTags(): Promise<components["schemas"]["TagDto"][]> {
    if (USE_MOCK_DATA) {
      await delay(300);
      // Return unique tags from mock templates
      const allTags = mockTemplates.flatMap(t => t.tags || []);
      const uniqueTags = allTags.filter((tag, index, self) => 
        index === self.findIndex(t => t.id === tag.id)
      );
      return uniqueTags;
    }
    const res = await axios.get(`${API_URL}/api/Tag`, { withCredentials: true })
    return res.data.tags || []
  },

  // Tag creation
  async createTag(payload: components["schemas"]["Tag2"]): Promise<components["schemas"]["TagDto"]> {
    if (USE_MOCK_DATA) {
      await delay(1000);
      return {
        id: 'mock-tag-' + Date.now(),
        name: payload.name,
        slug: payload.slug,
        category: payload.category || null
      };
    }
    const res = await axios.post(`${API_URL}/api/Tag`, payload, { withCredentials: true })
    return res.data
  },

  // Tag deletion
  async deleteTag(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      await delay(500);
      return;
    }
    await axios.delete(`${API_URL}/api/Tag/${id}`, { withCredentials: true })
  },

  // Package creation
  async createPackage(payload: components["schemas"]["Package"]): Promise<components["schemas"]["PackageDto"]> {
    if (USE_MOCK_DATA) {
      await delay(1000);
      return {
        id: 'mock-package-' + Date.now(),
        name: payload.name,
        version: payload.version || null,
        packageManager: payload.packageManager,
        url: payload.url || null
      };
    }
    const res = await axios.post(`${API_URL}/api/Package`, payload, { withCredentials: true })
    return res.data
  },

  // Package deletion
  async deletePackage(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      await delay(500);
      return;
    }
    await axios.delete(`${API_URL}/api/Package/${id}`, { withCredentials: true })
  }
}
