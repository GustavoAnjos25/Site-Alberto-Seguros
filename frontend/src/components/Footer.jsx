import { Link } from 'react-router-dom'
import Logo from './Logo'
import { CONTACT, whatsappLink, mailtoLink } from '../data/contact'

const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'A Empresa', to: '/empresa' },
  { label: 'Seguros / Cotações', to: '/seguros' },
  { label: 'Parceiros', to: '/parceiros' },
  { label: 'Contato', to: '/contato' },
]

const insuranceLinks = ['Automóvel', 'Moto', 'Residencial', 'Vida', 'Saúde', 'Viagem', 'Empresarial']

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-white pt-16 pb-6 px-6">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-dark via-primary to-accent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <Logo theme="light" size="md" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Há mais de 30 anos protegendo o que é mais importante para você, sua família e sua empresa.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary-light uppercase tracking-wide bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              +30 anos de experiência
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-white">Navegação</h4>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-slate-400 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-white">Seguros</h4>
            <ul className="space-y-3">
              {insuranceLinks.map(link => (
                <li key={link}>
                  <Link to="/seguros" className="text-sm text-slate-400 hover:text-white transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-white">Contato</h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-primary-light flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Joinville - SC
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-primary-light flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.4 8.4 0 0 1-4-1L3 20l1-5.4a8.4 8.4 0 0 1-1-4A8.5 8.5 0 0 1 11.5 2a8.5 8.5 0 0 1 8.5 8.5z"/>
                </svg>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {CONTACT.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5 min-w-0">
                <svg className="w-4 h-4 text-primary-light flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>
                </svg>
                <a href={mailtoLink()} className="hover:text-white transition-colors text-xs break-all leading-snug min-w-0">
                  {CONTACT.email}
                </a>
              </li>
              <li className="pt-2">
                <Link to="/seguros" className="btn-primary text-xs py-2.5 px-5">
                  Solicitar Cotação
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Alberto Seguros. Todos os direitos reservados.
          </p>
          <div className="flex gap-3">
            {['facebook', 'instagram', 'linkedin'].map(social => (
              <a
                key={social}
                href="#"
                aria-label={`Alberto Seguros no ${social}`}
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {social === 'facebook' && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>}
                  {social === 'instagram' && <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>}
                  {social === 'linkedin' && <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
