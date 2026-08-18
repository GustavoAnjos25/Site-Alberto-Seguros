import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { CONTACT, whatsappLink, mailtoLink } from '../data/contact'

const canais = [
  {
    title: 'E-mail',
    value: CONTACT.email,
    href: mailtoLink(),
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16v16H4z" opacity="0"/>
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>
      </svg>
    ),
  },
  {
    title: 'WhatsApp',
    value: CONTACT.whatsappDisplay,
    href: whatsappLink(),
    external: true,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.4 8.4 0 0 1-4-1L3 20l1-5.4a8.4 8.4 0 0 1-1-4A8.5 8.5 0 0 1 11.5 2a8.5 8.5 0 0 1 8.5 8.5z"/>
      </svg>
    ),
  },
  {
    title: 'Localização',
    value: 'Joinville - SC',
    href: null,
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
]

export default function Contato() {
  return (
    <>
      <PageHeader
        eyebrow="Contato"
        title="Fale Conosco"
        subtitle="Estamos prontos para te ajudar a encontrar a proteção ideal. Escolha o canal que preferir."
      />

      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {canais.map((c) => {
              const Wrapper = c.href ? 'a' : 'div'
              return (
                <Wrapper
                  key={c.title}
                  {...(c.href ? { href: c.href } : {})}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="min-w-0 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 text-primary">
                    {c.icon}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{c.title}</h4>
                  <p className="text-sm text-slate-500 break-all px-1">{c.value}</p>
                </Wrapper>
              )
            })}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
            <p className="text-slate-500 mb-2 italic text-sm">
              [Horário de atendimento e demais canais a serem informados pela Alberto Seguros.]
            </p>
            <h3 className="text-xl font-bold text-slate-900 mb-4 mt-4">Prefere já solicitar uma cotação?</h3>
            <Link to="/seguros" className="btn-primary">
              Solicitar Cotação
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
