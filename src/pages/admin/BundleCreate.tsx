import React, { useState, useEffect } from "react";
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
    <div className="container mx-auto px-4 py-10 text-neutral-900 dark:text-neutral-100">
      <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 shadow-sm rounded-lg border border-neutral-200 dark:border-neutral-700 p-8">
        <h1 className="text-2xl font-semibold mb-6">Create Bundle</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200" htmlFor="name">
                Bundle Name *
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-800/70 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Starter Pack"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200" htmlFor="slug">
                Slug *
              </label>
              <input
                id="slug"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-800/70 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="starter-pack"
              />
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">Used in URLs.</p>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200" htmlFor="price">
                Price (USD)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-800/70 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>

            {/* Is Active */}
            <div>
              <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200" htmlFor="isActive">
                Status
              </label>
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={e => setForm(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="rounded border-neutral-300 dark:border-neutral-500"
                />
                <span className="text-sm text-neutral-700 dark:text-neutral-200">Active (publicly visible)</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-800/70 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
              placeholder="Describe what's included in this bundle..."
            />
          </div>

          {/* Templates Selection */}
          <div>
            <label className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-200">
              Templates * (Select at least one)
            </label>
            {loadingTemplates ? (
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Loading templates...</p>
            ) : templates.length === 0 ? (
              <p className="text-sm text-neutral-600 dark:text-neutral-400">No templates available. Create templates first.</p>
            ) : (
              <div className="border border-neutral-300 dark:border-neutral-500 rounded-md p-4 max-h-96 overflow-y-auto space-y-2">
                {templates.map(template => (
                  <label
                    key={template.id}
                    className="flex items-start gap-3 p-3 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      checked={form.templateIds.includes(template.id!)}
                      onChange={() => toggleTemplate(template.id!)}
                      className="mt-1 rounded border-neutral-300 dark:border-neutral-500"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-neutral-900 dark:text-neutral-100">
                        {template.name}
                      </div>
                      {template.shortDescription && (
                        <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                          {template.shortDescription}
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-neutral-500 dark:text-neutral-500">
                          {template.isFree ? "Free" : `$${template.price}`}
                        </span>
                        {template.tags && template.tags.length > 0 && (
                          <span className="text-xs text-neutral-500 dark:text-neutral-500">
                            • {template.tags.map(t => t.name).join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            )}
            <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
              Selected: {form.templateIds.length} template(s)
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting || !canSubmit}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 transition-colors"
            >
              {isSubmitting && (
                <span className="inline-block h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              )}
              {isSubmitting ? "Creating…" : "Create Bundle"}
            </button>
            {status && (
              <span
                className={
                  "text-sm font-medium " +
                  (error
                    ? "text-red-600 dark:text-red-400"
                    : "text-green-600 dark:text-green-400")
                }
              >
                {status}
              </span>
            )}
          </div>
          {error && (
            <div className="rounded-md border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/30 px-4 py-3 text-sm text-red-800 dark:text-red-300">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BundleCreatePage;
