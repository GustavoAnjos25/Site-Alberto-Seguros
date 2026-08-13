import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Empresa from './pages/Empresa'
import Seguros from './pages/Seguros'
import Parceiros from './pages/Parceiros'
import Contato from './pages/Contato'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white font-sans text-slate-800 antialiased">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 5000,
            style: {
              fontFamily: 'Montserrat, sans-serif',
              borderRadius: '16px',
            },
            success: {
              style: {
                background: '#10b981',
                color: '#fff',
              },
            },
            error: {
              style: {
                background: '#ef4444',
                color: '#fff',
              },
            },
          }}
        />
        <ScrollToTop />
        <Header
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/empresa" element={<Empresa />} />
            <Route path="/seguros" element={<Seguros />} />
            <Route path="/parceiros" element={<Parceiros />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  )
}

export default App
