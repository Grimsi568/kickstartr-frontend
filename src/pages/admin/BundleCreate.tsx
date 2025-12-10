import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Api } from "../../lib/api";
import type { components } from "../../api/schema";

type BundleForm = {
  name: string;
  slug: string;
  description: string;
  price: string;
  isActive: boolean;
  templateIds: string[];
};

const slugify = (v: string) =>
  v
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const BundleCreatePage: React.FC = () => {
  const [form, setForm] = useState<BundleForm>({
    name: "",
    slug: "",
    description: "",
    price: "",
    isActive: true,
    templateIds: [],
  });
  const [templates, setTemplates] = useState<components["schemas"]["TemplateListItemDto"][]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugEdited, setSlugEdited] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await Api.getTemplates();
        setTemplates(data.templates || []);
      } catch (err) {
        // Failed to load templates
      } finally {
        setLoadingTemplates(false);
      }
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setForm(prev => {
        const next: BundleForm = { ...prev, name: value };
        if (!slugEdited && value) next.slug = slugify(value);
        return next;
      });
      return;
    }
    if (name === "slug") {
      setSlugEdited(true);
      setForm(prev => ({ ...prev, slug: slugify(value) }));
      return;
    }
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const toggleTemplate = (templateId: string) => {
    setForm(prev => ({
      ...prev,
      templateIds: prev.templateIds.includes(templateId)
        ? prev.templateIds.filter(id => id !== templateId)
        : [...prev.templateIds, templateId],
    }));
  };

  const canSubmit = Boolean(form.name && form.slug && form.templateIds.length > 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("Creating bundle…");
    setError(null);
    setIsSubmitting(true);
    try {
      // TODO: Implement API call when endpoint is available
      // await Api.createBundle({
      //   name: form.name,
      //   slug: form.slug,
      //   description: form.description,
      //   price: form.price ? parseFloat(form.price) : 0,
      //   isActive: form.isActive,
      //   templateIds: form.templateIds,
      // });
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setStatus("Bundle created successfully!");
      setForm({
        name: "",
        slug: "",
        description: "",
        price: "",
        isActive: true,
        templateIds: [],
      });
      setSlugEdited(false);
    } catch (err: any) {
      const message = err?.message || "Unknown error";
      setError(message);
      setStatus("Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 px-4 py-10">
      <div className="container-max max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            to="/my-page"
            className="inline-flex items-center gap-2 px-4 py-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white/5 backdrop-blur-lg shadow-2xl rounded-2xl border border-cyan-400/30 p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">🎁</span>
              <h1 className="text-3xl font-bold text-cyan-300 font-mono">Create Bundle</h1>
            </div>
            <p className="text-cyan-400/70 text-sm">Create a bundle of templates for users to purchase together</p>
          </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-cyan-300 mb-2.5" htmlFor="name">
                Bundle Name *
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-cyan-400/30 bg-gray-900/50 text-cyan-100 placeholder-cyan-600/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all"
                placeholder="Starter Pack"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-semibold text-cyan-300 mb-2.5" htmlFor="slug">
                Slug *
              </label>
              <input
                id="slug"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-cyan-400/30 bg-gray-900/50 text-cyan-100 placeholder-cyan-600/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all"
                placeholder="starter-pack"
              />
              <p className="mt-2 text-xs text-cyan-400/60">Used in URLs.</p>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-cyan-300 mb-2.5" htmlFor="price">
                Price (USD)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                className="w-full rounded-lg border border-cyan-400/30 bg-gray-900/50 text-cyan-100 placeholder-cyan-600/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all"
                placeholder="0.00"
              />
            </div>

            {/* Is Active */}
            <div>
              <label className="block text-sm font-semibold text-cyan-300 mb-2.5" htmlFor="isActive">
                Status
              </label>
              <label className="flex items-center gap-3 mt-4">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={e => setForm(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="w-5 h-5 rounded border-cyan-400/30 bg-gray-900/50 text-cyan-500 focus:ring-2 focus:ring-cyan-400/50"
                />
                <span className="text-sm text-cyan-200">Active (publicly visible)</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-cyan-300 mb-2.5" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg border border-cyan-400/30 bg-gray-900/50 text-cyan-100 placeholder-cyan-600/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all resize-y"
              placeholder="Describe what's included in this bundle..."
            />
          </div>

          {/* Templates Selection */}
          <div>
            <label className="block text-sm font-semibold text-cyan-300 mb-2.5">
              Templates * (Select at least one)
            </label>
            {loadingTemplates ? (
              <p className="text-sm text-cyan-400/60">Loading templates...</p>
            ) : templates.length === 0 ? (
              <p className="text-sm text-cyan-400/60">No templates available. Create templates first.</p>
            ) : (
              <div className="border border-cyan-400/30 rounded-lg p-4 max-h-96 overflow-y-auto space-y-2 bg-gray-900/30">
                {templates.map(template => (
                  <label
                    key={template.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-cyan-500/10 border border-transparent hover:border-cyan-400/20 cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={form.templateIds.includes(template.id!)}
                      onChange={() => toggleTemplate(template.id!)}
                      className="mt-1 w-5 h-5 rounded border-cyan-400/30 bg-gray-900/50 text-cyan-500 focus:ring-2 focus:ring-cyan-400/50"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-cyan-100">
                        {template.name}
                      </div>
                      {template.shortDescription && (
                        <div className="text-xs text-cyan-400/70 mt-0.5">
                          {template.shortDescription}
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-cyan-500/80">
                          {template.isFree ? "Free" : `$${template.price}`}
                        </span>
                        {template.tags && template.tags.length > 0 && (
                          <span className="text-xs text-cyan-500/80">
                            • {template.tags.map(t => t.name).join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}
            <p className="mt-2 text-xs text-cyan-400/60">
              Selected: {form.templateIds.length} template(s)
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !canSubmit}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-6 py-3 shadow-lg shadow-cyan-500/20 transition-all"
            >
              {isSubmitting && (
                <span className="inline-block h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              )}
              {isSubmitting ? "Creating…" : "Create Bundle"}
            </button>
            {status && !error && (
              <span className="text-sm font-medium text-green-400 flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-green-400"></span>
                {status}
              </span>
            )}
          </div>
          {error && (
            <div className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3.5 text-sm text-red-300 backdrop-blur-sm">
              <span className="font-semibold">Error:</span> {error}
            </div>
          )}
        </form>
      </div>
      </div>
    </div>
  );
};

export default BundleCreatePage;
