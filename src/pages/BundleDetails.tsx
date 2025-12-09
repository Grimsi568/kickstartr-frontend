import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Api } from '@/lib/api'
import type { components } from '@/api/schema'

const BundleDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [bundle, setBundle] = useState<components["schemas"]["BundleDto"] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const data = await Api.getBundleById(id as string);
        setBundle(data.bundle || null);
      } finally {
        setLoading(false);
      }
    })()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!bundle) return <div className="text-center text-red-500 mt-16">Bundle not found.</div>

  return (
    <div className="container-max py-16 flex flex-col items-center">
      <div className="relative group overflow-visible rounded-3xl bg-white/10 backdrop-blur-lg border border-cyan-400 shadow-2xl flex flex-col lg:flex-row w-full max-w-6xl transition-all duration-300">
        {/* Left: Main Content */}
        <div className="relative z-10 flex-1 flex flex-col px-10 pt-10 pb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-4xl font-extrabold text-cyan-300 font-mono tracking-tight flex items-center gap-3">
              <span className="inline-block animate-pulse">📦</span>
              {bundle.name}
            </h1>
            <span className="ml-2 px-6 py-2 rounded-full text-base font-semibold border border-cyan-400 shadow-cyan-400/30 shadow-sm bg-cyan-900/60 text-cyan-200">
              {bundle.price != null ? `$${bundle.price}` : "Free"}
            </span>
          </div>
          {bundle.description && (
            <div className="mb-6">
              <p className="text-neutral-200 font-light text-lg leading-relaxed whitespace-pre-wrap">{bundle.description}</p>
            </div>
          )}
          
          {/* Templates in Bundle */}
          {bundle.templates && bundle.templates.length > 0 && (
            <div className="mb-8">
              <div className="font-mono text-cyan-300 text-base mb-3">📋 Included Templates</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bundle.templates.map(template => (
                  <a
                    key={template.id}
                    href={`/templates/${template.id}`}
                    className="bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-5 py-4 flex flex-col hover:bg-cyan-900/30 hover:border-cyan-400/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono font-semibold text-cyan-200 text-sm">
                        {template.name}
                      </span>
                      {template.isFree ? (
                        <span className="text-xs px-2 py-0.5 rounded bg-green-700/40 text-green-200 border border-green-500/30">
                          Free
                        </span>
                      ) : template.price != null ? (
                        <span className="text-xs text-cyan-400 font-mono">
                          ${template.price}
                        </span>
                      ) : null}
                    </div>
                    {template.shortDescription && (
                      <p className="text-cyan-100 text-xs leading-relaxed mb-2">
                        {template.shortDescription}
                      </p>
                    )}
                    {template.tags && template.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.tags.slice(0, 3).map(tag => (
                          <span key={tag.id} className="text-xs px-2 py-0.5 rounded bg-cyan-700/30 text-cyan-300 border border-cyan-500/20">
                            #{tag.name}
                          </span>
                        ))}
                        {template.tags.length > 3 && (
                          <span className="text-xs text-cyan-400">+{template.tags.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto flex justify-end">
            <a
              href={`/bundles/${bundle.id}/payment`}
              className="btn btn-primary font-mono tracking-wide bg-cyan-400/80 border-cyan-400 text-white hover:bg-cyan-500/90 hover:border-cyan-300 transition-all px-8 py-3 text-lg rounded-xl"
            >
              Purchase Bundle
            </a>
          </div>
        </div>

        {/* Right: Sidebar */}
        <aside className="relative z-10 w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-cyan-400/30 bg-cyan-950/30 rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl flex flex-col px-8 py-10 gap-8">
          <div>
            <div className="font-mono text-cyan-400 text-sm mb-1">Created</div>
            <div className="text-cyan-100">{bundle.createdAt ? new Date(bundle.createdAt).toLocaleDateString() : "Unknown"}</div>
          </div>
          <div>
            <div className="font-mono text-cyan-400 text-sm mb-1">Status</div>
            <div className="flex items-center gap-2">
              {bundle.isActive ? (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-700/40 text-green-200 border border-green-500/30">
                  Active
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-700/40 text-gray-200 border border-gray-500/30">
                  Inactive
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="font-mono text-cyan-400 text-sm mb-1">Stats</div>
            <div className="flex flex-col gap-1 text-cyan-100">
              <span>
                <span className="font-bold">{bundle.templates?.length ?? 0}</span> Template{bundle.templates?.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </aside>

        {/* Neon glow border effect */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-cyan-400 opacity-0 group-hover:opacity-80 transition-opacity duration-300 blur-sm"></div>
      </div>
    </div>
  )
}

export default BundleDetails
