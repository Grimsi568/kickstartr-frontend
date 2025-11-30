import React, { useEffect, useState } from 'react'
import { Api } from '@/lib/api'
import type { components } from '@/api/schema'
import BundleCard from '@/components/BundleCard'
import { useAuth } from '@/context/AuthContext'

const Bundles = () => {
  const [bundles, setBundles] = useState<components["schemas"]["BundleDto"][]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth();
  console.log("user", !!user )
  useEffect(() => {
    (async () => {
      try {
        const data = await Api.getBundles()
        setBundles(data.bundles || [])
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) return <div>Loading bundles...</div>

  if (bundles.length === 0) {
    return (
      <div className="container-max py-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="card flex flex-col items-center p-10 max-w-md">
        <h2 className="text-2xl font-bold text-cyan-300 font-mono tracking-tight flex items-center gap-2">
        <span className="inline-block animate-pulse">📦</span>
      </h2>
          <h2 className="text-2xl font-semibold mb-2">No Bundles Yet</h2>
          <p className="text-gray-400 mb-2 text-center">
            Bundles are coming soon!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-max py-16">
      <h1 className="text-4xl font-extrabold text-cyan-400 mb-10 text-center tracking-wide font-mono flex items-center justify-center gap-2">
        <span className="inline-block animate-pulse">📦</span> Bundles
      </h1>
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {bundles.map(bundle => (
          <BundleCard key={bundle.id} bundle={bundle} />
        ))}
      </div>
    </div>
  )
}

export default Bundles
