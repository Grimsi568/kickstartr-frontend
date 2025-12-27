import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '@/context/AuthContext'

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth()
  const [open, setOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 border-b border-gray-700 shadow-lg">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-extrabold text-gray-100 text-xl sm:text-2xl tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)] z-50">
          <img src="/logo.svg" alt="Kickstartr Logo" className="h-6 w-auto sm:h-8" />
          <span className='text-gray-100'>Kickstartr</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link to="/templates" className="hover:text-cyan-400 text-gray-100 transition">Templates</Link>
          <Link to="/bundles" className="hover:text-cyan-400 text-gray-100 transition">Bundles</Link>
          <Link to="/about" className="hover:text-cyan-400 text-gray-100 transition">About Us</Link>
          <Link to="/contact" className="hover:text-cyan-400 text-gray-100 transition">Contact</Link>
        </div>
        
        {/* User Menu & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded hover:bg-cyan-900/30 transition text-gray-100"
                onClick={() => setOpen(v => !v)}
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-base sm:text-lg font-bold text-white ${isAdmin() ? 'bg-cyan-500' : 'bg-cyan-600'}`}>
                  {isAdmin() ? '👑' : (user.displayName || user.email || "U")[0].toUpperCase()}
                </span>
                <span className="hidden sm:inline text-sm">{user.displayName || user.email}</span>
                {isAdmin() && <span className="hidden lg:inline text-xs px-2 py-0.5 rounded bg-cyan-600 text-white">Admin</span>}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-gray-900 border border-cyan-700 rounded shadow-lg py-2 z-50">
                  <Link
                    to="/my-page"
                    className="block px-4 py-2 text-gray-100 hover:bg-cyan-900/40 transition"
                    onClick={() => setOpen(false)}
                  >
                    {isAdmin() ? '👑 Dashboard' : 'My Profile'}
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-red-300 hover:bg-cyan-900/40 transition"
                    onClick={() => {
                      setOpen(false);
                      logout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline text-sm sm:text-base px-3 sm:px-4 py-2">Login</Link>
          )}
          
          {/* Hamburger Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1 p-2 hover:bg-cyan-900/30 rounded transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-gray-100 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-100 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-100 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700 px-4 py-4 space-y-3">
          <Link 
            to="/templates" 
            className="block py-2 text-gray-100 hover:text-cyan-400 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Templates
          </Link>
          <Link 
            to="/bundles" 
            className="block py-2 text-gray-100 hover:text-cyan-400 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Bundles
          </Link>
          <Link 
            to="/about" 
            className="block py-2 text-gray-100 hover:text-cyan-400 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className="block py-2 text-gray-100 hover:text-cyan-400 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
