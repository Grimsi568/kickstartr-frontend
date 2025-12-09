import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const API_URL = import.meta.env.VITE_API_URL || ''

type User = {
  id?: string
  name?: string
  email?: string
  displayName?: string
}

type AuthContextType = {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  refreshUser: async () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const fetchUserProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/api/User/me`, { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setUser(data.userInfo)
      } else {
        setUser(null)
      }
    } catch (e) {
      setUser(null)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/Auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch (e) {
      // Optionally handle error
    }
    setUser(null)
  }

  const refreshUser = fetchUserProfile

  return (
    <AuthContext.Provider value={{ user, setUser, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
