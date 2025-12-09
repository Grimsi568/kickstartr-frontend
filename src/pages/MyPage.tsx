import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Api } from '@/lib/api'
import UserInfoCard from '@/components/UserInfoCard'
import LicenseList from '@/components/LicenseList'

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
  const { user } = useAuth()
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
    <div className="container-max py-16 max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold text-cyan-400 mb-8 text-center">My Profile</h1>
      <UserInfoCard
        displayName={profile.displayName}
        email={profile.email}
        id={profile.id}
        createdAt={profile.createdAt}
      />
      <LicenseList licenses={profile.licenses} />
    </div>
  )
}

export default MyPage
