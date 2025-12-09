import React, { useState } from "react";

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
      // TODO: Implement API call when endpoint is available
      // await Api.createPackage({
      //   name: form.name,
      //   version: form.version || null,
      //   packageManager: form.packageManager,
      //   url: form.url || null,
      // });
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setStatus("Package created successfully!");
      setForm({ name: "", version: "", packageManager: 0, url: "" });
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
        <h1 className="text-2xl font-semibold mb-6">Create Package</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200" htmlFor="name">
              Package Name *
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-800/70 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="react"
            />
          </div>

          {/* Version */}
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200" htmlFor="version">
              Version
            </label>
            <input
              id="version"
              name="version"
              value={form.version}
              onChange={handleChange}
              className="w-full rounded-md border border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-800/70 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="18.2.0"
            />
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">Optional: Specific version number.</p>
          </div>

          {/* Package Manager */}
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200" htmlFor="packageManager">
              Package Manager
            </label>
            <select
              id="packageManager"
              name="packageManager"
              value={form.packageManager}
              onChange={e => setForm(prev => ({ ...prev, packageManager: Number(e.target.value) }))}
              className="w-full rounded-md border border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-800/70 text-neutral-900 dark:text-neutral-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={0}>npm</option>
              <option value={1}>yarn</option>
              <option value={2}>pnpm</option>
            </select>
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-200" htmlFor="url">
              Package URL
            </label>
            <input
              id="url"
              name="url"
              type="url"
              value={form.url}
              onChange={handleChange}
              className="w-full rounded-md border border-neutral-300 dark:border-neutral-500 bg-white dark:bg-neutral-800/70 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://www.npmjs.com/package/react"
            />
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">Optional: Link to package registry or documentation.</p>
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
              {isSubmitting ? "Creating…" : "Create Package"}
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

export default PackageCreatePage;
