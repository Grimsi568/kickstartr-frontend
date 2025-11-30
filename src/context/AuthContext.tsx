import React, { createContext, useContext, useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || '';

type User = {
  id?: string;
  name?: string;
  email?: string;
  displayName?: string;
  // ...other fields as needed
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  // ...other auth methods...
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  refreshUser: async () => {},
  // ...other defaults...
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/api/User/me`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        console.log("User profile from backend:", data); // <-- Add this
        setUser(data.userInfo);
      } else {
        setUser(null);
      }
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/Auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (e) {
      // Optionally handle error
    }
    setUser(null);
  };

  // Optionally, expose a refreshUser method
  const refreshUser = fetchUserProfile;

  return (
    <AuthContext.Provider value={{ user, setUser, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
