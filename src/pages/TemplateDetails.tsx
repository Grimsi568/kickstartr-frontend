import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Api } from '@/lib/api'
import type { components } from '@/api/schema'
import PostCommentForm from '@/components/PostCommentForm'

const TemplateDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [template, setTemplate] = useState<components["schemas"]["TemplateDto"] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const data = await Api.getTemplateById(id as string);
        setTemplate(data.template);
      } finally {
        setLoading(false);
      }
    })()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!template) return <div className="text-center text-red-500 mt-16">Template not found.</div>

  return (
    <div className="container-max py-16 flex flex-col items-center">
      <div className="relative group overflow-visible rounded-3xl bg-white/10 backdrop-blur-lg border border-cyan-400 shadow-2xl flex flex-col lg:flex-row w-full max-w-6xl transition-all duration-300">
        {/* Left: Main Content */}
        <div className="relative z-10 flex-1 flex flex-col px-10 pt-10 pb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-4xl font-extrabold text-cyan-300 font-mono tracking-tight flex items-center gap-3">
              <span className="inline-block animate-pulse">🧬</span>
              {template.name}
            </h1>
            <span className="ml-2 px-6 py-2 rounded-full text-base font-semibold border border-cyan-400 shadow-cyan-400/30 shadow-sm bg-cyan-900/60 text-cyan-200">
              {template.price != null ? `${template.price} ${template.currency}` : "Free"}
            </span>
          </div>
          <p className="text-neutral-200 mb-6 font-light text-lg">{template.description}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {template.tags?.length
              ? template.tags.map(tag => (
                  <span key={tag.id} className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-400/40 via-blue-400/30 to-cyan-600/40 text-cyan-100 border border-cyan-300 shadow-cyan-400/10 shadow-sm">
                    #{tag.name}
                  </span>
                ))
              : <span className="text-neutral-400 text-xs">No tags</span>
            }
          </div>
          <div className="mb-8">
            <div className="font-mono text-cyan-300 text-base mb-2">Versions</div>
            <ul className="space-y-3">
              {template.versions?.length
                ? template.versions.map(ver => (
                    <li key={ver.id} className="bg-cyan-900/30 border border-cyan-400 rounded-lg px-5 py-3 text-cyan-100 font-mono text-sm flex flex-col">
                      <span className="font-bold">v{ver.semVer}</span>
                      {ver.changelog && <span className="mt-1 text-cyan-200">{ver.changelog}</span>}
                      <span className="mt-1 text-cyan-400">Published: {ver.publishedUtc ? new Date(ver.publishedUtc).toLocaleDateString() : "Unknown"}</span>
                      {ver.artifactUrl && (
                        <a href={ver.artifactUrl} target="_blank" rel="noopener noreferrer" className="mt-2 text-cyan-300 underline hover:text-cyan-400">
                          Download Artifact
                        </a>
                      )}
                    </li>
                  ))
                : <li className="text-neutral-400 text-xs">No versions</li>
              }
            </ul>
          </div>
          <div className="mt-auto flex justify-end">
            <a
              href={`/templates/${template.id}/payment`}
              className="btn btn-primary font-mono tracking-wide bg-cyan-400/80 border-cyan-400 text-white hover:bg-cyan-500/90 hover:border-cyan-300 transition-all px-8 py-3 text-lg rounded-xl"
            >
              Purchase / Download
            </a>
          </div>
        </div>
        {/* Right: Sidebar */}
        <aside className="relative z-10 w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-cyan-400/30 bg-cyan-950/30 rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl flex flex-col px-8 py-10 gap-8">
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
            <div className="text-cyan-100">{template.createdUtc ? new Date(template.createdUtc).toLocaleDateString() : "Unknown"}</div>
          </div>
          <div>
            <div className="font-mono text-cyan-400 text-sm mb-1">Stats</div>
            <div className="flex flex-col gap-1 text-cyan-100">
              <span>
                <span className="font-bold">{template.versions?.length ?? 0}</span> Versions
              </span>
              <span>
                <span className="font-bold">{template.comments?.length ?? 0}</span> Comments
              </span>
              {/* Add more stats here if available */}
            </div>
          </div>
          {/* Optionally, add more info: license, last updated, etc. */}
        </aside>
        {/* Neon glow border effect */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-cyan-400 opacity-0 group-hover:opacity-80 transition-opacity duration-300 blur-sm"></div>
      </div>
      {/* Comments Section */}
      <div className="mt-14 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-5 text-cyan-300 font-mono flex items-center gap-2">
          <span className="inline-block animate-pulse">💬</span>
          Comments
        </h2>
        <div className="space-y-4">
          {template.comments && template.comments.length > 0 ? (
            template.comments.map((comment, idx) => (
              <div
                key={comment.id || idx}
                className="relative group rounded-2xl bg-white/5 backdrop-blur-md border border-cyan-400/40 shadow-lg px-6 py-4 transition-all duration-300 hover:border-cyan-400/80"
              >
                {/* Neon glow border effect */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-cyan-400 opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-sm"></div>
                <div className="flex items-center mb-2">
                  <div className="font-mono text-cyan-200 text-sm font-semibold">
                    {comment.user?.displayName || (
                      <span className="italic text-cyan-400/70">Anonymous</span>
                    )}
                  </div>
                  {comment.isForDevelopers && (
                    <span className="ml-2 px-2 py-0.5 rounded bg-cyan-700/60 text-cyan-100 text-xs font-mono border border-cyan-400/40">
                      Developer-only
                    </span>
                  )}
                </div>
                <div className="text-cyan-100 font-light text-base leading-relaxed">
                  {comment.text}
                </div>
              </div>
            ))
          ) : (
            <div className="text-cyan-400/70 italic text-center py-8 bg-white/5 rounded-xl border border-cyan-400/20 font-mono">
              No comments yet. Be the first to share your thoughts!
            </div>
          )}
        </div>
      </div>
      {/* Post a Comment Section */}
      <div className="mt-10 w-full max-w-4xl mx-auto">
        <h3 className="text-xl font-bold mb-4 text-cyan-200 font-mono flex items-center gap-2">
          <span className="inline-block">✍️</span>
          Post a Comment
        </h3>
        <PostCommentForm templateId={template.id ?? ""} />
      </div>
    </div>
  )
}

export default TemplateDetails
