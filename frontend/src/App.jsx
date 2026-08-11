import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Hero from './components/Hero'
import QuoteSection from './components/QuoteSection'
import Stats from './components/Stats'
import Footer from './components/Footer'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
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
      <Header 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      <main>
        <Hero />
        <QuoteSection />
        <Stats />
      </main>
      <Footer />
    </div>
  )
}

export default App
