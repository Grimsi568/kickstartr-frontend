import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Api } from '@/lib/api'
import type { components } from '@/api/schema'
import PostCommentForm from '@/components/PostCommentForm'

const TemplateDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [template, setTemplate] = useState<components["schemas"]["TemplateDetailDto"] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const data = await Api.getTemplateById(id as string);
        setTemplate(data.template || null);
      } finally {
        setLoading(false);
      }
    })()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!template) return <div className="text-center text-red-500 mt-16">Template not found.</div>

  return (
    <div className="container-max py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="relative group overflow-visible rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-lg border border-cyan-400 shadow-2xl flex flex-col lg:flex-row w-full max-w-6xl transition-all duration-300">
        {/* Left: Main Content */}
        <div className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 lg:pt-10 pb-4 sm:pb-5 lg:pb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-cyan-300 font-mono tracking-tight flex items-center gap-2 sm:gap-3">
              <span className="inline-block animate-pulse text-xl sm:text-2xl lg:text-3xl">🧬</span>
              <span className="break-words">{template.name}</span>
            </h1>
            <span className="self-start md:self-auto px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-semibold border border-cyan-400 shadow-cyan-400/30 shadow-sm bg-cyan-900/60 text-cyan-200 flex-shrink-0">
              {template.isFree ? "Free" : template.price != null ? `$${template.price}` : "Free"}
            </span>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-neutral-200 mb-4 sm:mb-6 font-light">{template.shortDescription || template.longDescription}</p>
          <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
            {template.tags?.length
              ? template.tags.map(tag => (
                  <span key={tag.id} className="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-400/40 via-blue-400/30 to-cyan-600/40 text-cyan-100 border border-cyan-300 shadow-cyan-400/10 shadow-sm">
                    #{tag.name}
                  </span>
                ))
              : <span className="text-neutral-400 text-xs">No tags</span>
            }
          </div>
          {template.packages && template.packages.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <div className="font-mono text-cyan-300 text-sm sm:text-base mb-2 sm:mb-3">📦 Dependencies</div>
              <ul className="space-y-2">
                {template.packages.map(pkg => (
                  <li 
                    key={pkg.id} 
                    className="bg-cyan-900/20 border border-cyan-400/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                  >
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-mono font-semibold text-cyan-200 text-sm truncate" title={pkg.name}>
                        {pkg.name}
                      </span>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        {pkg.version && (
                          <span className="text-xs text-cyan-400 font-mono">
                            v{pkg.version}
                          </span>
                        )}
                        {pkg.packageManager !== undefined && (
                          <span className="text-xs px-2 py-0.5 rounded bg-cyan-700/40 text-cyan-200 border border-cyan-500/30">
                            {pkg.packageManager === 0 ? 'npm' : pkg.packageManager === 1 ? 'yarn' : pkg.packageManager === 2 ? 'pnpm' : 'other'}
                          </span>
                        )}
                      </div>
                    </div>
                    {pkg.url && (
                      <a 
                        href={pkg.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-cyan-300 hover:text-cyan-200 underline whitespace-nowrap flex-shrink-0"
                      >
                        View Package
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mb-8">
            <div className="font-mono text-cyan-300 text-base mb-2">Versions</div>
            {template.templateVersions && template.templateVersions.length > 0 ? (
              <ul className="space-y-3">
                {template.templateVersions
                  .sort((a, b) => {
                    // Sort by isLatest first, then by createdAt descending
                    if (a.isLatest && !b.isLatest) return -1;
                    if (!a.isLatest && b.isLatest) return 1;
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                  })
                  .map(ver => (
                    <li 
                      key={ver.id} 
                      className={`bg-cyan-900/30 border rounded-lg px-5 py-3 text-cyan-100 font-mono text-sm flex flex-col ${
                        ver.isDeprecated ? 'border-red-400/40 opacity-60' : 'border-cyan-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-cyan-200">v{ver.version}</span>
                        <div className="flex items-center gap-2">
                          {ver.isLatest && (
                            <span className="px-2 py-0.5 rounded bg-cyan-600/60 text-cyan-100 text-xs border border-cyan-400/40">
                              Latest
                            </span>
                          )}
                          {ver.isDeprecated && (
                            <span className="px-2 py-0.5 rounded bg-red-600/60 text-red-100 text-xs border border-red-400/40">
                              Deprecated
                            </span>
                          )}
                        </div>
                      </div>
                      {ver.notes && (
                        <span className="mt-1 text-cyan-200 text-xs leading-relaxed">{ver.notes}</span>
                      )}
                      <span className="mt-1 text-cyan-400 text-xs">
                        Released: {ver.createdAt ? new Date(ver.createdAt).toLocaleDateString() : "Unknown"}
                      </span>
                    </li>
                  ))}
              </ul>
            ) : template.mainDownloadUrl ? (
              <div className="bg-cyan-900/30 border border-cyan-400 rounded-lg px-5 py-3 text-cyan-100 font-mono text-sm flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-cyan-200">Latest Release</span>
                  <span className="text-xs text-cyan-400">
                    {template.createdAt ? new Date(template.createdAt).toLocaleDateString() : "Unknown"}
                  </span>
                </div>
                {template.longDescription && (
                  <p className="text-cyan-200 text-xs mb-3 leading-relaxed">{template.longDescription}</p>
                )}
                <a 
                  href={template.mainDownloadUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 bg-cyan-600/80 hover:bg-cyan-600 text-white px-4 py-2 rounded-md transition-all text-sm font-semibold self-start"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Template
                </a>
              </div>
            ) : (
              <div className="text-neutral-400 text-xs bg-cyan-900/20 border border-cyan-400/20 rounded-lg px-5 py-3">
                No versions available yet
              </div>
            )}
          </div>
          <div className="mt-auto flex justify-end">
            <a
              href={`/templates/${template.id}/payment`}
              className="btn btn-primary font-mono tracking-wide bg-cyan-400/80 border-cyan-400 text-white hover:bg-cyan-500/90 hover:border-cyan-300 transition-all px-5 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 text-base sm:text-lg rounded-xl w-full sm:w-auto text-center"
            >
              Purchase / Download
            </a>
          </div>
        </div>
        {/* Right: Sidebar */}
        <aside className="relative z-10 w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-cyan-400/30 bg-cyan-950/30 rounded-b-2xl sm:rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl flex flex-col px-5 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 gap-5 sm:gap-6 lg:gap-8">
          <div>
            <div className="font-mono text-cyan-400 text-sm mb-1">Published by</div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-800 flex items-center justify-center text-cyan-200 font-bold text-xl">
                K
              </div>
              <div>
                <div className="text-cyan-100 font-semibold">Kickstartr</div>
                <div className="text-cyan-400 text-xs">kickstartr.dev</div>
              </div>
            </div>
          </div>
          <div>
            <div className="font-mono text-cyan-400 text-sm mb-1">Created</div>
            <div className="text-cyan-100">{template.createdAt ? new Date(template.createdAt).toLocaleDateString() : "Unknown"}</div>
          </div>
          <div>
            <div className="font-mono text-cyan-400 text-sm mb-1">Stats</div>
            <div className="flex flex-col gap-1 text-cyan-100">
              <span>
                <span className="font-bold">{template.templateVersions?.length ?? 0}</span> Version{template.templateVersions?.length !== 1 ? 's' : ''}
              </span>
              <span>
                <span className="font-bold">{template.comments?.length ?? 0}</span> Comment{template.comments?.length !== 1 ? 's' : ''}
              </span>
              {template.templateVersions?.some(v => v.isLatest) && (
                <span className="text-xs text-cyan-300 mt-1">
                  Latest: v{template.templateVersions.find(v => v.isLatest)?.version}
                </span>
              )}
            </div>
          </div>
          {/* Optionally, add more info: license, last updated, etc. */}
        </aside>
        {/* Neon glow border effect */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-cyan-400 opacity-0 group-hover:opacity-80 transition-opacity duration-300 blur-sm"></div>
      </div>
      {/* Comments Section */}
      <div className="mt-10 sm:mt-12 lg:mt-14 w-full max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 text-cyan-300 font-mono flex items-center gap-2">
          <span className="inline-block animate-pulse text-lg sm:text-xl">💬</span>
          Comments
        </h2>
        <div className="space-y-3 sm:space-y-4">
          {template.comments && template.comments.length > 0 ? (
            template.comments.map((comment, idx) => (
              <div
                key={comment.id || idx}
                className="relative group rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-md border border-cyan-400/40 shadow-lg px-4 sm:px-5 lg:px-6 py-3 sm:py-4 transition-all duration-300 hover:border-cyan-400/80"
              >
                {/* Neon glow border effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none border-2 border-cyan-400 opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-sm"></div>
                <div className="flex items-center mb-2">
                  <div className="font-mono text-cyan-200 text-xs sm:text-sm font-semibold">
                    {comment.userDisplayName || (
                      <span className="italic text-cyan-400/70">Anonymous</span>
                    )}
                  </div>
                  {comment.visibility === 1 && (
                    <span className="ml-2 px-2 py-0.5 rounded bg-cyan-700/60 text-cyan-100 text-xs font-mono border border-cyan-400/40">
                      Developer-only
                    </span>
                  )}
                </div>
                <div className="text-cyan-100 font-light text-sm sm:text-base leading-relaxed">
                  {comment.content}
                </div>
              </div>
            ))
          ) : (
            <div className="text-cyan-400/70 italic text-center py-6 sm:py-8 bg-white/5 rounded-xl border border-cyan-400/20 font-mono text-xs sm:text-sm">
              No comments yet. Be the first to share your thoughts!
            </div>
          )}
        </div>
      </div>
      {/* Post a Comment Section */}
      <div className="mt-8 sm:mt-10 w-full max-w-4xl mx-auto">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-cyan-200 font-mono flex items-center gap-2">
          <span className="inline-block text-base sm:text-lg">✍️</span>
          Post a Comment
        </h3>
        <PostCommentForm templateId={template.id ?? ""} />
      </div>
    </div>
  )
}

export default TemplateDetails
