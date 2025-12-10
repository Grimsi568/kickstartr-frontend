import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Api } from '@/lib/api'
import UserInfoCard from '@/components/UserInfoCard'
import LicenseList from '@/components/LicenseList'
import { Link } from 'react-router-dom'

type License = {
  id?: string
  key?: string
  issuedUtc?: string
  revokedUtc?: string | null
  template?: {
    id?: string
    name?: string
    description?: string | null
    slug?: string
    // ...other fields as needed
  }
}

type UserProfile = {
  id?: string
  displayName?: string
  email?: string
  createdAt?: string
  licenses?: License[]
}

const MyPage = () => {
  const { user, isAdmin } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        let res = await Api.getUserProfile?.()
        setProfile(res?.userInfo || null)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (!user) return <div className="container-max py-16 text-center">Please log in to view your page.</div>
  if (loading) return <div className="container-max py-16 text-center">Loading...</div>
  if (!profile) return <div className="container-max py-16 text-center">No profile found.</div>

  return (
    <div className="container-max py-16 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-cyan-400">
          {isAdmin() ? '👑 Admin Dashboard' : '👤 My Profile'}
        </h1>
        {isAdmin() && (
          <span className="px-4 py-2 rounded-full text-sm font-semibold bg-cyan-600/80 text-white border border-cyan-400">
            Admin Access
          </span>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* User Info Section */}
        <div className="lg:col-span-2">
          <UserInfoCard
            displayName={profile.displayName}
            email={profile.email}
            id={profile.id}
            createdAt={profile.createdAt}
          />
        </div>

        {/* User Content - Always visible */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-cyan-300 mb-4 font-mono flex items-center gap-2">
            <span>🎫</span> My Licenses
          </h2>
          <LicenseList licenses={profile.licenses} />
        </div>

        {/* Admin Only Content */}
        {isAdmin() && (
          <>
            <div className="lg:col-span-2">
              <div className="border-t border-cyan-400/30 my-8"></div>
              <h2 className="text-2xl font-bold text-cyan-300 mb-6 font-mono flex items-center gap-2">
                <span>⚙️</span> Admin Tools
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Link
                  to="/admin/template-create"
                  className="group relative overflow-hidden rounded-xl bg-white/5 border border-cyan-400/40 p-6 hover:bg-white/10 hover:border-cyan-400 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">🧬</div>
                    <div>
                      <h3 className="text-lg font-bold text-cyan-200 mb-1">Create Template</h3>
                      <p className="text-sm text-cyan-400/70">Add new template to marketplace</p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/admin/template-version-create"
                  className="group relative overflow-hidden rounded-xl bg-white/5 border border-cyan-400/40 p-6 hover:bg-white/10 hover:border-cyan-400 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">🔄</div>
                    <div>
                      <h3 className="text-lg font-bold text-cyan-200 mb-1">Add Version</h3>
                      <p className="text-sm text-cyan-400/70">Create new template version</p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/admin/bundle-create"
                  className="group relative overflow-hidden rounded-xl bg-white/5 border border-cyan-400/40 p-6 hover:bg-white/10 hover:border-cyan-400 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">📦</div>
                    <div>
                      <h3 className="text-lg font-bold text-cyan-200 mb-1">Create Bundle</h3>
                      <p className="text-sm text-cyan-400/70">Bundle templates together</p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/admin/tag-create"
                  className="group relative overflow-hidden rounded-xl bg-white/5 border border-cyan-400/40 p-6 hover:bg-white/10 hover:border-cyan-400 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">🏷️</div>
                    <div>
                      <h3 className="text-lg font-bold text-cyan-200 mb-1">Create Tag</h3>
                      <p className="text-sm text-cyan-400/70">Manage template categories</p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/admin/package-create"
                  className="group relative overflow-hidden rounded-xl bg-white/5 border border-cyan-400/40 p-6 hover:bg-white/10 hover:border-cyan-400 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">📚</div>
                    <div>
                      <h3 className="text-lg font-bold text-cyan-200 mb-1">Create Package</h3>
                      <p className="text-sm text-cyan-400/70">Add dependency information</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MyPage
