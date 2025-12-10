import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Api } from '@/lib/api'
import type { components } from '@/api/schema'

type VersionForm = {
  templateId: string
  version: string
  notes: string
  zipFile: File | null
}

const TemplateVersionCreate = () => {
  const [templates, setTemplates] = useState<components["schemas"]["TemplateListItemDto"][]>([])
  const [loadingTemplates, setLoadingTemplates] = useState(true)
  const [form, setForm] = useState<VersionForm>({
    templateId: '',
    version: '',
    notes: '',
    zipFile: null,
  })
  const [status, setStatus] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<components["schemas"]["TemplateListItemDto"] | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const data = await Api.getTemplates()
        setTemplates(data.templates || [])
      } catch (err) {
        // Failed to load templates
      } finally {
        setLoadingTemplates(false)
      }
    })()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'templateId') {
      const template = templates.find(t => t.id === value) || null
      setSelectedTemplate(template)
    }
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, zipFile: e.target.files?.[0] || null })
  }

  const canSubmit = Boolean(form.templateId && form.version && form.zipFile)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit || !selectedTemplate) return

    setStatus('Preparing upload…')
    setError(null)
    setIsSubmitting(true)

    try {
      // 1) Get signed upload URL
      const uploadUrlRes = await Api.getUploadUrl({
        templateSlug: selectedTemplate.slug,
        version: form.version,
      })
      const { uploadUrl } = uploadUrlRes
      if (!uploadUrl?.url) throw new Error('No upload URL received')

      // 2) Upload the ZIP
      if (!form.zipFile) throw new Error('No zip file selected')
      setStatus('Uploading file…')
      await Api.uploadTemplateArtifact(
        uploadUrl.url,
        form.zipFile,
        uploadUrl.headers,
        pct => setStatus(`Uploading… ${pct}%`)
      )

      setStatus('Creating version…')

      // 3) Create the version
      const versionRes = await Api.createTemplateVersion(form.templateId, {
        templateId: form.templateId,
        version: form.version,
        slug: selectedTemplate.slug,
        description: form.notes,
      })

      if (!versionRes.id) throw new Error('Version creation failed')
      setStatus(`✓ Version ${form.version} created successfully!`)
      
      // Reset form
      setForm({
        templateId: '',
        version: '',
        notes: '',
        zipFile: null,
      })
      setSelectedTemplate(null)
    } catch (err: any) {
      const apiErrors = err?.response?.data?.errors
      const firstError = apiErrors ? Object.values(apiErrors)[0] : null
      const msg = firstError || err?.response?.data?.title || err?.message || 'Unknown error'
      setError(msg)
      setStatus('')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 py-16">
      <div className="container-max max-w-3xl">
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
            <div className="text-4xl">🔄</div>
            <div>
              <h1 className="text-3xl font-bold text-cyan-300 font-mono">Create Template Version</h1>
              <p className="text-cyan-400/70 text-sm mt-1">Add a new version to an existing template</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Template Selection */}
            <div className="form-group">
              <label htmlFor="templateId" className="block text-sm font-semibold text-cyan-300 mb-2">
                Select Template *
              </label>
              {loadingTemplates ? (
                <div className="text-cyan-400/70 text-sm py-2">Loading templates...</div>
              ) : (
                <select
                  id="templateId"
                  name="templateId"
                  value={form.templateId}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-400/30 rounded-lg text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition disabled:opacity-50"
                >
                  <option value="">-- Choose a template --</option>
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.name} (v{t.slug})
                    </option>
                  ))}
                </select>
              )}
              {selectedTemplate && (
                <div className="mt-2 p-3 bg-cyan-900/20 border border-cyan-400/20 rounded-lg">
                  <p className="text-xs text-cyan-300 font-mono">
                    <span className="font-semibold">Slug:</span> {selectedTemplate.slug}
                  </p>
                  {selectedTemplate.shortDescription && (
                    <p className="text-xs text-cyan-400/70 mt-1">{selectedTemplate.shortDescription}</p>
                  )}
                </div>
              )}
            </div>

            {/* Version */}
            <div className="form-group">
              <label htmlFor="version" className="block text-sm font-semibold text-cyan-300 mb-2">
                Version Number *
              </label>
              <input
                type="text"
                id="version"
                name="version"
                value={form.version}
                onChange={handleChange}
                disabled={isSubmitting}
                required
                placeholder="e.g., 2.0.0"
                className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-400/30 rounded-lg text-cyan-100 placeholder-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition disabled:opacity-50"
              />
              <p className="text-xs text-cyan-400/50 mt-1">Use semantic versioning (e.g., 1.0.0, 2.1.3)</p>
            </div>

            {/* Release Notes */}
            <div className="form-group">
              <label htmlFor="notes" className="block text-sm font-semibold text-cyan-300 mb-2">
                Release Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                disabled={isSubmitting}
                rows={4}
                placeholder="What's new in this version..."
                className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-400/30 rounded-lg text-cyan-100 placeholder-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition resize-none disabled:opacity-50"
              />
            </div>

            {/* File Upload */}
            <div className="form-group">
              <label htmlFor="zipFile" className="block text-sm font-semibold text-cyan-300 mb-2">
                Template ZIP File *
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="zipFile"
                  accept=".zip"
                  onChange={handleFileChange}
                  disabled={isSubmitting}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-400/30 rounded-lg text-cyan-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500 file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition disabled:opacity-50"
                />
              </div>
              {form.zipFile && (
                <p className="text-xs text-cyan-400 mt-2 font-mono">
                  📦 {form.zipFile.name} ({(form.zipFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {/* Status Messages */}
            {status && (
              <div className={`p-4 rounded-lg border ${
                status.startsWith('✓') 
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
                className="flex-1 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none shadow-lg hover:shadow-cyan-400/20"
              >
                {isSubmitting ? 'Creating Version...' : 'Create Version'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TemplateVersionCreate
