import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Api } from "../../lib/api";

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
      await Api.createTag({
        name: form.name,
        slug: form.slug,
        category: form.category || null,
      });
      
      setStatus("Tag created successfully!");
      setForm({ name: "", slug: "", category: "" });
      setSlugEdited(false);
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Unknown error";
      setError(message);
      setStatus("Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 py-16">
      <div className="container-max max-w-2xl">
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
            <div className="text-4xl">🏷️</div>
            <div>
              <h1 className="text-3xl font-bold text-cyan-300 font-mono">Create Tag</h1>
              <p className="text-cyan-400/70 text-sm mt-1">Add a new tag for categorizing templates</p>
            </div>
          </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-semibold text-cyan-300 mb-2.5">
              Tag Name *
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-cyan-400/30 bg-gray-900/50 text-cyan-100 placeholder-cyan-600/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all"
              placeholder="React"
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
              placeholder="react"
            />
            <p className="mt-2 text-xs text-cyan-400/60">Used in URLs and searches.</p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-cyan-300 mb-2.5" htmlFor="category">
              Category
            </label>
            <input
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-cyan-400/30 bg-gray-900/50 text-cyan-100 placeholder-cyan-600/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all"
              placeholder="Framework"
            />
            <p className="mt-2 text-xs text-cyan-400/60">Optional: Group tags by category (e.g., Framework, Language, Tool).</p>
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
              {isSubmitting ? "Creating…" : "Create Tag"}
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

export default TagCreatePage;
