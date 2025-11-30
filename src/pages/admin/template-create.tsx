import React, { useState } from "react";
import { components } from "../../api/schema";
import { Api } from "../../lib/api";

type TemplateForm = {
  name: string;
  description: string;
  slug: string;
  visibility: components["schemas"]["Visibility"];
  price: string;
  currency: components["schemas"]["Currency"];
  version: string;
  tags: string[];
  zipFile: File | null;
};

const slugify = (v: string) =>
  v
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const TemplateCreatePage: React.FC = () => {
  const [form, setForm] = useState<TemplateForm>({
    name: "",
    description: "",
    slug: "",
    visibility: 0,
    price: "",
    currency: 0,
    version: "",
    tags: [],
    zipFile: null,
  });
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugEdited, setSlugEdited] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setForm(prev => {
        const next: TemplateForm = { ...prev, name: value };
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, zipFile: e.target.files?.[0] || null });
  };

  const addTag = (raw: string) => {
    const v = raw.trim();
    if (!v) return;
    if (form.tags.includes(v)) return;
    setForm(f => ({ ...f, tags: [...f.tags, v] }));
  };

  const handleTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
      e.preventDefault();
      addTag((e.target as HTMLInputElement).value);
      (e.target as HTMLInputElement).value = "";
    }
  };

  const removeTag = (tag: string) => {
    setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }));
  };

  const canSubmit = Boolean(form.name && form.slug && form.version && form.zipFile);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("Preparing upload…");
    setError(null);
    setIsSubmitting(true);
    try {
      // 1) Get signed upload URL using slug + version (no template yet)
      const uploadUrlRes = await Api.getUploadUrl({
        templateSlug: form.slug,
        version: form.version,
      });
      const { uploadUrl } = uploadUrlRes;
      if (!uploadUrl?.url) throw new Error("No upload URL received");
      console.log("CONSOLE",uploadUrl,result);
      // 2) Upload the ZIP
      if (!form.zipFile) throw new Error("No zip file selected");
      var result = await Api.uploadTemplateArtifact(
        uploadUrl.url,
        form.zipFile,
        uploadUrl.headers,
        pct => setStatus(`Uploading… ${pct}%`)
      );
console.log("WORKS",uploadUrl,result);

      setStatus("Upload complete. Creating template…");

      // 3) Create the template AFTER successful upload
      // NOTE: Do not send tags on create. The backend requires Template on each TemplateTag and rejects it.
      const createRes = await Api.createTemplate({
        name: form.name,
        description: form.description,
        slug: form.slug,
        visibility: form.visibility,
        price: form.price,
        currency: String(form.currency),
        version: form.version,
        // tags: intentionally omitted due to backend validation
      });

      if (!createRes.id) throw new Error("Template creation failed");
      setStatus("Template created successfully!");
    } catch (err: any) {
      // Extract validation error (ProblemDetails) if present
      const apiErrors = err?.response?.data?.errors;
      let message = err?.message || "Unknown error";
      if (apiErrors && typeof apiErrors === "object") {
        const firstKey = Object.keys(apiErrors)[0];
        const first = apiErrors[firstKey];
        if (Array.isArray(first) && first.length > 0) message = first[0];
        else if (typeof first === "string") message = first;
      } else if (err?.response?.data?.title) {
        message = err.response.data.title;
      }
      setError(message);
      setStatus("Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 text-neutral-900 dark:text-neutral-100">
      <div className="max-w-3xl mx-auto bg-white dark:bg-neutral-900 shadow-sm rounded-lg border border-neutral-200 dark:border-neutral-700 p-8">
        <h1 className="text-2xl font-semibold mb-6">Create Template</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200" htmlFor="name">Name *</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-800/70 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Awesome Starter"
              />
            </div>
            {/* Slug */}
            <div>
              <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200" htmlFor="slug">Slug *</label>
              <input
                id="slug"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-800/70 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="awesome-starter"
              />
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">Used in URLs.</p>
            </div>
            {/* Version */}
            <div>
              <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200" htmlFor="version">Version *</label>
              <input
                id="version"
                name="version"
                value={form.version}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-800/70 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="1.0.0"
              />
            </div>
            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200" htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                value={form.price}
                onChange={handleChange}
                inputMode="decimal"
                placeholder="0.00"
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-800/70 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* Currency */}
            <div>
              <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200" htmlFor="currency">Currency</label>
              <select
                id="currency"
                name="currency"
                value={form.currency}
                onChange={e => setForm(prev => ({ ...prev, currency: Number(e.target.value) }))}
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-800/70 text-neutral-900 dark:text-neutral-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={0}>USD</option>
                <option value={1}>EUR</option>
              </select>
            </div>
            {/* Visibility */}
            <div>
              <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200" htmlFor="visibility">Visibility</label>
              <select
                id="visibility"
                name="visibility"
                value={form.visibility}
                onChange={e => setForm({ ...form, visibility: Number(e.target.value) })}
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-800/70 text-neutral-900 dark:text-neutral-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={0}>Public</option>
                <option value={1}>Private</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-800/70 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
              placeholder="Short description of the template..."
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.tags.map(t => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 border border-blue-200/60 dark:border-blue-800/60 bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200 px-2 py-1 rounded-md text-xs"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => removeTag(t)}
                    className="ml-1 text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
                    aria-label={`Remove ${t}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              {form.tags.length === 0 && (
                <span className="text-xs text-neutral-600 dark:text-neutral-400">No tags added yet.</span>
              )}
            </div>
            <input
              onKeyDown={handleTagKey}
              placeholder="Type tag and press Enter"
              className="w-full rounded-md border border-dashed border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-800/70 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Zip */}
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200" htmlFor="zipFile">ZIP File *</label>
            <input
              id="zipFile"
              type="file"
              accept=".zip"
              onChange={handleFileChange}
              required
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-neutral-300 dark:file:border-neutral-600 file:bg-neutral-100 dark:file:bg-neutral-800 file:text-neutral-800 dark:file:text-neutral-100 hover:file:bg-neutral-200 dark:hover:file:bg-neutral-700 cursor-pointer"
            />
            {form.zipFile && (
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                Selected: {form.zipFile.name} ({(form.zipFile.size / 1024).toFixed(1)} KB)
              </p>
            )}
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">Upload the distributable archive.</p>
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
              {isSubmitting ? "Processing…" : "Create & Upload"}
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

export default TemplateCreatePage;
