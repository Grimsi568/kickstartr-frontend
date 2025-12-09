import React, { useState } from "react";

type TagForm = {
  name: string;
  slug: string;
  category: string;
};

const slugify = (v: string) =>
  v
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const TagCreatePage: React.FC = () => {
  const [form, setForm] = useState<TagForm>({
    name: "",
    slug: "",
    category: "",
  });
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugEdited, setSlugEdited] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setForm(prev => {
        const next: TagForm = { ...prev, name: value };
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

  const canSubmit = Boolean(form.name && form.slug);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("Creating tag…");
    setError(null);
    setIsSubmitting(true);
    try {
      // TODO: Implement API call when endpoint is available
      // await Api.createTag({
      //   name: form.name,
      //   slug: form.slug,
      //   category: form.category || null,
      // });
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setStatus("Tag created successfully!");
      setForm({ name: "", slug: "", category: "" });
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
      <div className="max-w-2xl mx-auto bg-white dark:bg-neutral-900 shadow-sm rounded-lg border border-neutral-200 dark:border-neutral-700 p-8">
        <h1 className="text-2xl font-semibold mb-6">Create Tag</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200" htmlFor="name">
              Tag Name *
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-800/70 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="React"
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
              placeholder="react"
            />
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">Used in URLs and searches.</p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200" htmlFor="category">
              Category
            </label>
            <input
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-md border border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-800/70 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Framework"
            />
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">Optional: Group tags by category (e.g., Framework, Language, Tool).</p>
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
              {isSubmitting ? "Creating…" : "Create Tag"}
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

export default TagCreatePage;
