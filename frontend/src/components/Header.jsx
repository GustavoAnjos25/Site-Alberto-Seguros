import { useState, useEffect } from 'react'

export default function Header({ mobileMenuOpen, setMobileMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#', active: true },
    { label: 'A Empresa', href: '#empresa' },
    { label: 'Planos e Seguros', href: '#planos' },
    { label: 'Parceiros', href: '#parceiros' },
    { label: 'Fale Conosco', href: '#contato' },
  ]

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-200' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-extrabold text-2xl">
              A
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg tracking-wide leading-tight transition-colors ${scrolled ? 'text-primary' : 'text-white'}`}>
                ALBERTO
              </span>
              <span className={`text-xs font-medium tracking-[2px] uppercase transition-colors ${scrolled ? 'text-slate-500' : 'text-white/70'}`}>
                SEGUROS
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-4 py-2.5 text-[13px] font-medium uppercase tracking-wide rounded-xl transition-all ${
                  link.active
                    ? (scrolled ? 'text-primary' : 'text-white')
                    : (scrolled ? 'text-slate-600 hover:text-primary hover:bg-slate-50' : 'text-white/80 hover:text-white hover:bg-white/10')
                }`}
              >
                {link.label}
              </a>
            ))}
            <a href="#cotacao" className="btn-primary ml-2 text-xs">
              Faça sua Cotação!
            </a>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-primary"
          >
            {mobileMenuOpen ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-white transition-transform duration-300 lg:hidden ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`} style={{ top: '80px' }}>
        <nav className="flex flex-col p-6 gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-4 text-base font-semibold text-slate-700 rounded-xl hover:bg-slate-50 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#cotacao" onClick={() => setMobileMenuOpen(false)} className="btn-primary mt-4 justify-center">
            Faça sua Cotação!
          </a>
        </nav>
      </div>
    </>
  )
}
