import type { components } from '@/api/schema'

type BundleCardProps = {
  bundle: components["schemas"]["BundleDto"]
}

const BundleCard = ({ bundle }: BundleCardProps) => (
  <div
    className="relative group overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-cyan-400 shadow-lg flex flex-col transition-all duration-300 hover:shadow-cyan-400/50 hover:border-cyan-300"
    style={{
      boxShadow: '0 4px 24px 0 rgba(0,255,255,0.12), 0 1.5px 8px 0 rgba(0,255,255,0.08)'
    }}
  >
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="w-full h-full bg-gradient-to-br from-cyan-400/10 via-blue-900/10 to-cyan-600/10 animate-gradient-move" />
    </div>
    <div className="relative z-10 px-7 pt-7 pb-3 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-cyan-300 font-mono tracking-tight flex items-center gap-2">
        <span className="inline-block animate-pulse">📦</span>
        {bundle.name}
      </h2>
      <span className={`ml-2 px-4 py-1 rounded-full text-xs font-semibold border border-cyan-400 shadow-cyan-400/30 shadow-sm bg-cyan-900/60 text-cyan-200`}>
        {bundle.price != null ? `$${bundle.price}` : "Free"}
      </span>
    </div>
    <div className="relative z-10 flex-1 flex flex-col px-7 pb-4">
      <p className="text-neutral-200 mb-4 font-light">{bundle.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {bundle.templates?.length
          ? bundle.templates.map(template => (
              <span key={template.id} className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-400/40 via-blue-400/30 to-cyan-600/40 text-cyan-100 border border-cyan-300 shadow-cyan-400/10 shadow-sm">
                {template.name}
              </span>
            ))
          : <span className="text-neutral-400 text-xs">No templates</span>
        }
      </div>
      <div className="mt-auto flex justify-end">
        <a
          href={`/bundles/${bundle.id}`}
          className="btn btn-sm btn-primary font-mono tracking-wide bg-cyan-400/80 border-cyan-400 text-white hover:bg-cyan-500/90 hover:border-cyan-300 transition-all"
        >
          View Details
        </a>
      </div>
    </div>
    <div className="relative z-10 px-7 pb-4 text-xs text-cyan-300 font-mono">
      Created: {bundle.createdAt ? new Date(bundle.createdAt).toLocaleDateString() : "Unknown"}
    </div>
    <div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-cyan-400 opacity-0 group-hover:opacity-80 transition-opacity duration-300 blur-sm"></div>
  </div>
)

export default BundleCard
