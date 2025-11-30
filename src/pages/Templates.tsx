import React, { useEffect, useState } from 'react'
import { Api } from '@/lib/api'
import type { components } from '@/api/schema'
import TemplateCard from '@/components/TemplateCard'

const Templates = () => {
  const [templates, setTemplates] = useState<components["schemas"]["TemplateDto"][]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const data = await Api.getTemplates()
        setTemplates(data.templates || [])
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <div>Loading templates...</div>

  if (templates.length === 0) {
    return (
      <div className="container-max py-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="card flex flex-col items-center p-10 max-w-md">
        <h2 className="text-2xl font-bold text-cyan-300 font-mono tracking-tight flex items-center gap-2">
        <span className="inline-block animate-pulse">🧬</span>
      </h2>
          <h2 className="text-2xl font-semibold mb-2">No Templates Yet</h2>
          <p className="text-gray-400 mb-2 text-center">
            Templates are coming soon!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-max py-16">
      <h1 className="text-4xl font-extrabold text-cyan-400 mb-10 text-center tracking-wide font-mono flex items-center justify-center gap-2">
        <span className="inline-block animate-pulse">🧬</span> Templates
      </h1>
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {templates.map(template => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  )
}

export default Templates
