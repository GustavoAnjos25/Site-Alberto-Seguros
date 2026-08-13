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
    <footer className="bg-slate-900 text-white pt-16 pb-6 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <Logo theme="light" size="sm" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Há mais de 30 anos protegendo o que é mais importante para você, sua família e sua empresa.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5">Navegação</h4>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-slate-400 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5">Seguros</h4>
            <ul className="space-y-3">
              {insuranceLinks.map(link => (
                <li key={link}>
                  <Link to="/seguros" className="text-sm text-slate-400 hover:text-white transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-5">Contato</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>Joinville - SC</li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp: {CONTACT.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={mailtoLink()} className="hover:text-white transition-colors">
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
