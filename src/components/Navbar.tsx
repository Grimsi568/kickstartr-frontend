import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
      console.log("user", user); // <-- Add this
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Add this for debugging:
  useEffect(() => {
    console.log("Navbar user:", user);
  }, [user]);

  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 border-b border-gray-700 px-8 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-gray-100 text-2xl tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
          <img src="/logo.svg" alt="Kickstartr Logo" className="h-7 w-auto sm:h-8" />
          <span className='text-gray-100'>Kickstartr</span>
        </Link>
        <Link to="/templates" className="hover:text-cyan-400 text-gray-100 transition">Templates</Link>
        <Link to="/bundles" className="hover:text-cyan-400 text-gray-100 transition">Bundles</Link>
        <Link to="/about" className="hover:text-cyan-400 text-gray-100 transition">About Us</Link>
        <Link to="/contact" className="hover:text-cyan-400 text-gray-100 transition">Contact</Link>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <div className="relative" ref={menuRef}>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-cyan-900/30 transition text-gray-100"
              onClick={() => setOpen(v => !v)}
            >
              <span className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-lg font-bold text-white">
                {(user.displayName || user.name || user.email || "U")[0].toUpperCase()}
              </span>
              <span className="hidden sm:inline">{user.displayName || user.name || user.email}</span>
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
                  {user.displayName}
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
          <>
            <Link to="/login" className="btn btn-outline">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
