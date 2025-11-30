import axios from 'axios'
import type { components } from '@/api/schema'

const API_URL = import.meta.env.VITE_API_URL || ''
console.log("API",API_URL)
export const Api = {
  async login(email: string, password: string) {
    // Adjust endpoint as needed for your backend
    await axios.post(`${API_URL}/api/Auth/login`, { email, password }, { withCredentials: true })
  },
  async register(name: string, email: string, password: string) {
    // Adjust endpoint as needed for your backend
    await axios.post(`${API_URL}/api/Auth/register`, { name, email, password }, { withCredentials: true })
  },
  async me() {
    const res = await axios.get(`${API_URL}/api/User/me`, { withCredentials: true })
    return res.data
  },
  async logout() {
    await axios.post(`${API_URL}/api/Auth/logout`, {}, { withCredentials: true })
  },
  async getBundles(): Promise<components["schemas"]["GetAllPublicBundlesResponse"]> {
    const res = await axios.get(`${API_URL}/api/Bundle`, { withCredentials: true })
    return res.data
  },
  async getTemplates(): Promise<components["schemas"]["GetAllPublicTemplatesResponse"]> {
    const res = await axios.get(`${API_URL}/api/Template`, { withCredentials: true })
    console.log("Response from template endpoint:", res.data)
    return res.data
  },
  
  async getTemplateById(id: string): Promise<{ template: components["schemas"]["TemplateDto"] }> {
    const res = await axios.get(`${API_URL}/api/Template/${id}`, { withCredentials: true });
    return res.data;
  },

  async postTemplateComment(
    templateId: string,
    data: {
      comment: string
      isForDeveloper: boolean
      userId?: string // optional, backend may infer from auth
    }
  ): Promise<void> {
    await axios.post(
      `${API_URL}/api/Template/${templateId}/comment`,
      {
        comment: data.comment,
        isForDeveloper: data.isForDeveloper,
        templateId,
      } as components["schemas"]["PostCommentRequest"],
      { withCredentials: true }
    )
  },

  async getUserProfile() {
    const res = await axios.get(`${API_URL}/api/User/userProfile`, { withCredentials: true })
    return res.data
  },

  // Template creation
  async createTemplate(payload: components["schemas"]["PostTemplateRequest"]): Promise<components["schemas"]["PostTemplateResponse"]> {
    const res = await axios.post(`${API_URL}/api/Template`, payload, { withCredentials: true })
    return res.data
  },

  // Get signed upload URL for template artifact
  async getUploadUrl(payload: components["schemas"]["GetUploadUrlRequest"]): Promise<components["schemas"]["GetUploadUrlResponse"]> {
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
  }
}
