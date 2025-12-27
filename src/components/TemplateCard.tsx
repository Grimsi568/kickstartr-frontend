import type { components } from '@/api/schema'

type TemplateCardProps = {
  template: components["schemas"]["TemplateListItemDto"]
}

const TemplateCard = ({ template }: TemplateCardProps) => (
  <div
    className="relative group overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-cyan-400 shadow-lg flex flex-col transition-all duration-300 hover:shadow-cyan-400/50 hover:border-cyan-300"
    style={{
      boxShadow: '0 4px 24px 0 rgba(0,255,255,0.12), 0 1.5px 8px 0 rgba(0,255,255,0.08)'
    }}
  >
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="w-full h-full bg-gradient-to-br from-cyan-400/10 via-blue-900/10 to-cyan-600/10 animate-gradient-move" />
    </div>
    <div className="relative z-10 px-4 sm:px-6 lg:px-7 pt-5 sm:pt-6 lg:pt-7 pb-3 flex items-start sm:items-center justify-between gap-2">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-300 font-mono tracking-tight flex items-center gap-2">
        <span className="inline-block animate-pulse text-base sm:text-xl">🧬</span>
        <span className="break-words">{template.name}</span>
      </h2>
      <span className={`flex-shrink-0 px-3 sm:px-4 py-1 rounded-full text-xs font-semibold border border-cyan-400 shadow-cyan-400/30 shadow-sm bg-cyan-900/60 text-cyan-200`}>
        {template.isFree ? "Free" : template.price != null ? `$${template.price}` : "Free"}
      </span>
    </div>
    <div className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 lg:px-7 pb-4">
      <p className="text-sm sm:text-base text-neutral-200 mb-4 font-light">{template.shortDescription}</p>
      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
        {template.tags?.length
          ? template.tags.map(tag => (
              <span key={tag.id} className="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-400/40 via-blue-400/30 to-cyan-600/40 text-cyan-100 border border-cyan-300 shadow-cyan-400/10 shadow-sm">
                #{tag.name}
              </span>
            ))
          : <span className="text-neutral-400 text-xs">No tags</span>
        }
      </div>
      <div className="mt-auto flex justify-end">
        <a
          href={`/templates/${template.id}`}
          className="btn btn-sm btn-primary font-mono tracking-wide bg-cyan-400 border-cyan-400 text-white hover:bg-cyan-500/90 hover:border-cyan-300 transition-all text-xs sm:text-sm px-3 sm:px-4 py-2"
        >
          View Details
        </a>
      </div>
    </div>
    <div className="relative z-10 px-4 sm:px-6 lg:px-7 pb-3 sm:pb-4 text-xs text-cyan-300 font-mono">
      Created: {template.createdAt ? new Date(template.createdAt).toLocaleDateString() : "Unknown"}
    </div>
    <div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-cyan-400 opacity-0 group-hover:opacity-80 transition-opacity duration-300 blur-sm"></div>
  </div>
)

export default TemplateCard
