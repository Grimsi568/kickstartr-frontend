import React, { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

const Login = () => {
  const { refreshUser } = useAuth();

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-cyan-900">
      <div className="card p-10 w-full max-w-md flex flex-col items-center gap-8 shadow-2xl border border-cyan-700 bg-gray-900/80 rounded-2xl">
        <div className="flex flex-col items-center gap-2">
          <img src="/logo.svg" alt="Kickstartr Logo" className="h-12 w-12 mb-2" />
          <h1 className="text-3xl font-extrabold text-cyan-400 mb-1 text-center">Sign in to Kickstartr</h1>
          <p className="text-neutral-400 text-center mb-2">Access your account and manage your licenses.</p>
        </div>
        <div className="w-full flex flex-col gap-4">
          <a
            href={`${import.meta.env.VITE_API_URL}/api/Auth/login/github`}
            className="btn btn-primary flex items-center justify-center gap-2 py-3 text-lg font-semibold rounded-lg shadow hover:bg-cyan-700 transition"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/>
            </svg>
            Login with GitHub
          </a>
        </div>
        <div className="text-xs text-neutral-500 text-center mt-4">
          By signing in, you agree to our <a href="/terms" className="underline hover:text-cyan-400">Terms of Service</a> and <a href="/privacy" className="underline hover:text-cyan-400">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default Login;
