import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import { AuthProvider } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Templates from '@/pages/Templates'
import TemplateDetails from '@/pages/TemplateDetails'
import Payment from '@/pages/Payment'
import Bundles from '@/pages/Bundles'
import BundleDetails from '@/pages/BundleDetails'
import Login from '@/pages/Login'
import MyPage from '@/pages/MyPage'
import NotFound from '@/pages/NotFound'
import TemplateCreate from '@/pages/admin/TemplateCreate'
import TemplateVersionCreate from '@/pages/admin/TemplateVersionCreate'
import TagCreate from '@/pages/admin/TagCreate'
import PackageCreate from '@/pages/admin/PackageCreate'
import BundleCreate from '@/pages/admin/BundleCreate'

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading app…</div>}>
      {children}
    </Suspense>
  )
}

const App = () => {
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
              <Route path="/bundles/:id" element={<BundleDetails />} />
              <Route path="/my-page" element={<MyPage />} />
              <Route path="/admin/template-create" element={<TemplateCreate />} />
              <Route path="/admin/template-version-create" element={<TemplateVersionCreate />} />
              <Route path="/admin/tag-create" element={<TagCreate />} />
              <Route path="/admin/package-create" element={<PackageCreate />} />
              <Route path="/admin/bundle-create" element={<BundleCreate />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
