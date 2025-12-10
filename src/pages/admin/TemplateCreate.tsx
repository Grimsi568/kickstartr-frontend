import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { components } from '@/api/schema'
import { Api } from '@/lib/api'

type TemplateForm = {
  name: string
  description: string
  slug: string
  visibility: components['schemas']['Visibility']
  price: string
  currency: string
  version: string
  tags: string[]
  zipFile: File | null
}

const slugify = (v: string) =>
  v
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const TemplateCreate = () => {
  const [form, setForm] = useState<TemplateForm>({
    name: '',
    description: '',
    slug: '',
    visibility: 0,
    price: '',
    currency: 'USD',
    version: '',
    tags: [],
    zipFile: null,
  })
  const [status, setStatus] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [slugEdited, setSlugEdited] = useState(false)
  const [availableTags, setAvailableTags] = useState<components['schemas']['TagDto'][]>([])
  const [tagSearch, setTagSearch] = useState('')
  const [showTagDropdown, setShowTagDropdown] = useState(false)

  useEffect(() => {
    const loadTags = async () => {
      try {
        const tags = await Api.getTags();
        setAvailableTags(tags);
      } catch (err) {
        console.error('Failed to load tags:', err);
      }
    };
    loadTags();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'name') {
      setForm(prev => {
        const next: TemplateForm = { ...prev, name: value }
        if (!slugEdited && value) next.slug = slugify(value)
        return next
      })
      return
    }
    if (name === 'slug') {
      setSlugEdited(true)
      setForm(prev => ({ ...prev, slug: slugify(value) }))
      return
    }
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, zipFile: e.target.files?.[0] || null })
  }

  const addTag = (tagId: string) => {
    if (!tagId) return
    if (form.tags.includes(tagId)) return
    setForm(f => ({ ...f, tags: [...f.tags, tagId] }))
    setTagSearch('')
    setShowTagDropdown(false)
  }

  const removeTag = (tagId: string) => {
    setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tagId) }))
  }

  const filteredTags = availableTags.filter(tag => 
    !form.tags.includes(tag.id!) &&
    (tag.name.toLowerCase().includes(tagSearch.toLowerCase()) ||
     tag.slug.toLowerCase().includes(tagSearch.toLowerCase()) ||
     (tag.category && tag.category.toLowerCase().includes(tagSearch.toLowerCase())))
  )

  const canSubmit = Boolean(form.name && form.slug && form.version && form.zipFile)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    setStatus('Preparing upload…')
    setError(null)
    setIsSubmitting(true)
    try {
      // 1) Get signed upload URL using slug + version (no template yet)
      const uploadUrlRes = await Api.getUploadUrl({
        templateSlug: form.slug,
        version: form.version,
      })
      const { uploadUrl } = uploadUrlRes
      if (!uploadUrl?.url) throw new Error('No upload URL received')
      
      // 2) Upload the ZIP
      if (!form.zipFile) throw new Error('No zip file selected')
      await Api.uploadTemplateArtifact(
        uploadUrl.url,
        form.zipFile,
        uploadUrl.headers,
        pct => setStatus(`Uploading… ${pct}%`)
      )

      setStatus('Upload complete. Creating template…')

      // 3) Create the template AFTER successful upload
      const createRes = await Api.createTemplate({
        name: form.name,
        description: form.description,
        slug: form.slug,
        visibility: form.visibility,
        price: form.price,
        currency: form.currency,
        version: form.version,
        tags: form.tags.map(tagId => {
          const tag = availableTags.find(t => t.id === tagId);
          if (!tag) return null;
          return {
            id: tag.id,
            name: tag.name,
            slug: tag.slug,
            category: tag.category
          };
        }).filter(Boolean) as components['schemas']['TagDto'][],
      })

      if (!createRes.id) throw new Error('Template creation failed')
      setStatus('Template created successfully!')
    } catch (err: any) {
      // Extract validation error (ProblemDetails) if present
      const apiErrors = err?.response?.data?.errors
      let message = err?.message || 'Unknown error'
      if (apiErrors && typeof apiErrors === 'object') {
        const firstKey = Object.keys(apiErrors)[0]
        const first = apiErrors[firstKey]
        if (Array.isArray(first) && first.length > 0) message = first[0]
        else if (typeof first === 'string') message = first
      } else if (err?.response?.data?.title) {
        message = err.response.data.title
      }
      setError(message)
      setStatus('Failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 py-16">
      <div className="container-max max-w-4xl">
        <div className="mb-6">
          <Link
            to="/my-page"
            className="inline-flex items-center gap-2 px-4 py-2 text-cyan-300 hover:text-cyan-200 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
        <div className="bg-white/5 backdrop-blur-lg border border-cyan-400/30 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="text-4xl">🧬</div>
            <div>
              <h1 className="text-3xl font-bold text-cyan-300 font-mono">Create New Template</h1>
              <p className="text-cyan-400/70 text-sm mt-1">Upload a new template to the marketplace</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Slug */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="form-group">
                <label htmlFor="name" className="block text-sm font-semibold text-cyan-300 mb-2">
                  Template Name *
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                  placeholder="e.g., React TypeScript Starter"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-400/30 rounded-lg text-cyan-100 placeholder-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition disabled:opacity-50"
                />
              </div>

              <div className="form-group">
                <label htmlFor="slug" className="block text-sm font-semibold text-cyan-300 mb-2">
                  URL Slug *
                </label>
                <input
                  id="slug"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                  placeholder="react-typescript-starter"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-400/30 rounded-lg text-cyan-100 placeholder-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition disabled:opacity-50"
                />
                <p className="text-xs text-cyan-400/50 mt-1">Auto-generated from name, used in URLs</p>
              </div>
            </div>

            {/* Version & Price */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="form-group">
                <label htmlFor="version" className="block text-sm font-semibold text-cyan-300 mb-2">
                  Initial Version *
                </label>
                <input
                  id="version"
                  name="version"
                  value={form.version}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                  placeholder="1.0.0"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-400/30 rounded-lg text-cyan-100 placeholder-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition disabled:opacity-50"
                />
                <p className="text-xs text-cyan-400/50 mt-1">Semantic versioning recommended</p>
              </div>

              <div className="form-group">
                <label htmlFor="price" className="block text-sm font-semibold text-cyan-300 mb-2">
                  Price
                </label>
                <div className="flex gap-2">
                  <input
                    id="price"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    inputMode="decimal"
                    placeholder="0.00"
                    className="flex-1 px-4 py-3 bg-gray-900/50 border border-cyan-400/30 rounded-lg text-cyan-100 placeholder-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition disabled:opacity-50"
                  />
                  <select
                    id="currency"
                    name="currency"
                    value={form.currency}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="px-4 py-3 bg-gray-900/50 border border-cyan-400/30 rounded-lg text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition disabled:opacity-50"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="ISK">ISK</option>
                  </select>
                </div>
                <p className="text-xs text-cyan-400/50 mt-1">Leave empty for free templates</p>
              </div>
            </div>

            {/* Visibility */}
            <div className="form-group">
              <label htmlFor="visibility" className="block text-sm font-semibold text-cyan-300 mb-2">
                Visibility
              </label>
              <select
                id="visibility"
                name="visibility"
                value={form.visibility}
                onChange={e => setForm({ ...form, visibility: Number(e.target.value) })}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-400/30 rounded-lg text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition disabled:opacity-50"
              >
                <option value={0}>🌍 Public - Visible to everyone</option>
                <option value={1}>🔒 Private - Hidden from marketplace</option>
              </select>
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description" className="block text-sm font-semibold text-cyan-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                disabled={isSubmitting}
                rows={4}
                placeholder="Describe your template, its features, and use cases..."
                className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-400/30 rounded-lg text-cyan-100 placeholder-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition resize-none disabled:opacity-50"
              />
            </div>

            {/* Tags */}
            <div className="form-group relative">
              <label className="block text-sm font-semibold text-cyan-300 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3 min-h-[2.5rem] p-3 bg-gray-900/30 border border-cyan-400/20 rounded-lg">
                {form.tags.length > 0 ? (
                  form.tags.map(tagId => {
                    const tag = availableTags.find(t => t.id === tagId);
                    return (
                      <span
                        key={tagId}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-600/40 text-cyan-100 border border-cyan-400/30"
                      >
                        {tag?.name || tagId}
                        <button
                          type="button"
                          onClick={() => removeTag(tagId)}
                          disabled={isSubmitting}
                          className="hover:text-red-300 transition disabled:opacity-50"
                          aria-label={`Remove ${tag?.name || tagId}`}
                        >
                          ×
                        </button>
                      </span>
                    );
                  })
                ) : (
                  <span className="text-xs text-cyan-400/50">No tags added</span>
                )}
              </div>
              <div className="relative">
                <input
                  value={tagSearch}
                  onChange={e => {
                    setTagSearch(e.target.value);
                    setShowTagDropdown(true);
                  }}
                  onFocus={() => setShowTagDropdown(true)}
                  onBlur={() => setTimeout(() => setShowTagDropdown(false), 200)}
                  disabled={isSubmitting}
                  placeholder="Search for tags..."
                  className="w-full px-4 py-3 bg-gray-900/50 border border-dashed border-cyan-400/30 rounded-lg text-cyan-100 placeholder-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition disabled:opacity-50"
                />
                {showTagDropdown && filteredTags.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-gray-900 border border-cyan-400/30 rounded-lg shadow-2xl max-h-60 overflow-y-auto">
                    {filteredTags.map(tag => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => addTag(tag.id!)}
                        className="w-full px-4 py-3 text-left hover:bg-cyan-500/10 border-b border-cyan-400/10 last:border-b-0 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium text-cyan-100">{tag.name}</div>
                            {tag.category && (
                              <div className="text-xs text-cyan-400/60">{tag.category}</div>
                            )}
                          </div>
                          <div className="text-xs text-cyan-400/40 font-mono">{tag.slug}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* File Upload */}
            <div className="form-group">
              <label htmlFor="zipFile" className="block text-sm font-semibold text-cyan-300 mb-2">
                Template ZIP File *
              </label>
              <input
                id="zipFile"
                type="file"
                accept=".zip"
                onChange={handleFileChange}
                disabled={isSubmitting}
                required
                className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-400/30 rounded-lg text-cyan-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500 file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition disabled:opacity-50"
              />
              {form.zipFile && (
                <p className="text-xs text-cyan-400 mt-2 font-mono">
                  📦 {form.zipFile.name} ({(form.zipFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {/* Status Messages */}
            {status && (
              <div className={`p-4 rounded-lg border ${
                status.startsWith('✓') || status.includes('success')
                  ? 'bg-green-900/20 border-green-400/30 text-green-300' 
                  : 'bg-cyan-900/20 border-cyan-400/30 text-cyan-300'
              }`}>
                <p className="text-sm font-mono">{status}</p>
              </div>
            )}

            {error && (
              <div className="p-4 rounded-lg border bg-red-900/20 border-red-400/30 text-red-300">
                <p className="text-sm font-semibold mb-1">Error:</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="flex-1 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none shadow-lg hover:shadow-cyan-400/20 flex items-center justify-center gap-2"
              >
                {isSubmitting && (
                  <span className="inline-block h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                )}
                {isSubmitting ? "Creating Template..." : "Create & Upload"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TemplateCreate
