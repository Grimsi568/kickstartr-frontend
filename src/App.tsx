import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Templates from '@/pages/Templates'
import TemplateDetails from '@/pages/TemplateDetails'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import { AuthProvider } from '@/context/AuthContext'
import Payment from '@/pages/Payment'
import Bundles from './pages/Bundles'
import MyPage from './pages/MyPage'
import TemplateCreate from './pages/admin/template-create'


function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense fallback={<div>Loading app…</div>}>
      {children}
    </React.Suspense>
  )
}

export default function App(){
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/templates/:id" element={<TemplateDetails />} />
              <Route path="/templates/:id/payment" element={<Payment />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/bundles" element={<Bundles />} />
              <Route path="/my-page" element={<MyPage />} />
              <Route path="/admin/template-create" element={<TemplateCreate />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
