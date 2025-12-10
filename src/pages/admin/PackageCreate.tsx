import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Api } from "../../lib/api";

type PackageForm = {
  name: string;
  version: string;
  packageManager: number; // 0=npm, 1=yarn, 2=pnpm
  url: string;
};

const PackageCreatePage: React.FC = () => {
  const [form, setForm] = useState<PackageForm>({
    name: "",
    version: "",
    packageManager: 0,
    url: "",
  });
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const canSubmit = Boolean(form.name);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("Creating package…");
    setError(null);
    setIsSubmitting(true);
    try {
      await Api.createPackage({
        name: form.name,
        version: form.version || null,
        packageManager: form.packageManager,
        url: form.url || null,
      });
      
      setStatus("Package created successfully!");
      setForm({ name: "", version: "", packageManager: 0, url: "" });
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Unknown error";
      setError(message);
      setStatus("Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 px-4 py-10">
      <div className="container-max max-w-2xl mx-auto">
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
              <span className="text-4xl">📦</span>
              <h1 className="text-3xl font-bold text-cyan-300 font-mono">Create Package</h1>
            </div>
            <p className="text-cyan-400/70 text-sm">Add a new package dependency to the system</p>
          </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-cyan-300 mb-2.5" htmlFor="name">
              Package Name *
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-cyan-400/30 bg-gray-900/50 text-cyan-100 placeholder-cyan-600/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all"
              placeholder="react"
            />
          </div>

          {/* Version */}
          <div>
            <label className="block text-sm font-semibold text-cyan-300 mb-2.5" htmlFor="version">
              Version
            </label>
            <input
              id="version"
              name="version"
              value={form.version}
              onChange={handleChange}
              className="w-full rounded-lg border border-cyan-400/30 bg-gray-900/50 text-cyan-100 placeholder-cyan-600/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all"
              placeholder="18.2.0"
            />
            <p className="mt-2 text-xs text-cyan-400/60">Optional: Specific version number.</p>
          </div>

          {/* Package Manager */}
          <div>
            <label className="block text-sm font-semibold text-cyan-300 mb-2.5" htmlFor="packageManager">
              Package Manager
            </label>
            <select
              id="packageManager"
              name="packageManager"
              value={form.packageManager}
              onChange={e => setForm(prev => ({ ...prev, packageManager: Number(e.target.value) }))}
              className="w-full rounded-lg border border-cyan-400/30 bg-gray-900/50 text-cyan-100 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all"
            >
              <option value={0}>npm</option>
              <option value={1}>yarn</option>
              <option value={2}>pnpm</option>
            </select>
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-semibold text-cyan-300 mb-2.5" htmlFor="url">
              Package URL
            </label>
            <input
              id="url"
              name="url"
              type="url"
              value={form.url}
              onChange={handleChange}
              className="w-full rounded-lg border border-cyan-400/30 bg-gray-900/50 text-cyan-100 placeholder-cyan-600/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 transition-all"
              placeholder="https://www.npmjs.com/package/react"
            />
            <p className="mt-2 text-xs text-cyan-400/60">Optional: Link to package registry or documentation.</p>
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
              {isSubmitting ? "Creating…" : "Create Package"}
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

export default PackageCreatePage;
