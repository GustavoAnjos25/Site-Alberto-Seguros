import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'

const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'A Empresa', to: '/empresa' },
  { label: 'Seguros / Cotações', to: '/seguros' },
  { label: 'Parceiros', to: '/parceiros' },
  { label: 'Contato', to: '/contato' },
]

export default function Header({ mobileMenuOpen, setMobileMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname, setMobileMenuOpen])

  // Na Home o Hero já é escuro, então o header some sobre ele até o scroll.
  const isHome = location.pathname === '/'
  const solid = scrolled || !isHome

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-200' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 py-2">
            <Logo theme={solid ? 'dark' : 'light'} size="sm" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `px-4 py-2.5 text-[13px] font-semibold uppercase tracking-wide rounded-xl transition-all ${
                  isActive
                    ? (solid ? 'text-primary bg-primary/5' : 'text-white bg-white/10')
                    : (solid ? 'text-slate-600 hover:text-primary hover:bg-slate-50' : 'text-white/80 hover:text-white hover:bg-white/10')
                }`}
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/seguros" className="btn-primary ml-3 text-xs py-3 px-6">
              Faça sua Cotação!
            </Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 ${solid ? 'text-primary' : 'text-white'}`}
            aria-label="Abrir menu"
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
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `px-4 py-4 text-base font-semibold rounded-xl transition-colors ${
                isActive ? 'bg-slate-50 text-primary' : 'text-slate-700 hover:bg-slate-50 hover:text-primary'
              }`}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/seguros" onClick={() => setMobileMenuOpen(false)} className="btn-primary mt-4 justify-center">
            Faça sua Cotação!
          </Link>
        </nav>
      </div>
    </>
  )
}
