import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

const trustStrip = [
  { value: '+30', label: 'anos de mercado' },
  { value: '+2.000', label: 'clientes atendidos' },
  { value: '15+', label: 'seguradoras parceiras' },
  { value: '5,0', label: 'avaliação no Google' },
]

const highlights = [
  'Mais de 30 anos de atuação no mercado segurador',
  'Parcerias com as principais seguradoras do Brasil',
  'Atendimento próximo, pensado para cada cliente',
]

const pilares = [
  {
    title: 'Missão',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    text: 'Conteúdo a ser definido pela Alberto Seguros.',
  },
  {
    title: 'Visão',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" /><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      </svg>
    ),
    text: 'Conteúdo a ser definido pela Alberto Seguros.',
  },
  {
    title: 'Valores',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    text: 'Conteúdo a ser definido pela Alberto Seguros.',
  },
]

const diferenciais = [
  {
    title: 'Mais de 30 anos de experiência',
    text: 'Tradição e know-how no mercado segurador.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
  },
  {
    title: 'Atendimento personalizado',
    text: 'Cada cliente é único e recebe atenção exclusiva.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    title: 'Principais seguradoras do mercado',
    text: 'Parcerias com as melhores do Brasil.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Cotação sem compromisso',
    text: 'Receba sua proposta e decida com tranquilidade.',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
]

export default function Empresa() {
  return (
    <>
      <PageHeader
        eyebrow="A Empresa"
        title="Tradição, confiança e proteção há mais de 30 anos"
        subtitle="A Alberto Seguros é uma corretora dedicada a proteger o que mais importa para famílias e empresas em Joinville e região, com atendimento próximo e as principais seguradoras do Brasil."
      />

      {/* Faixa de confiança — números reais já utilizados no site, em formato mais discreto */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {trustStrip.map((s) => (
            <div key={s.label} className="text-center sm:text-left sm:border-l sm:first:border-l-0 sm:pl-6 sm:first:pl-0 border-slate-100">
              <div className="text-2xl sm:text-3xl font-extrabold text-primary leading-none mb-1">{s.value}</div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* História / Experiência */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <span className="section-eyebrow">Nossa Trajetória</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 leading-tight">
              Décadas de experiência cuidando do que é importante para você
            </h2>
            <p className="text-slate-500 leading-relaxed italic mb-6">
              [Conteúdo institucional a ser fornecido pela Alberto Seguros — história da corretora, marcos e trajetória ao longo dos mais de 30 anos de atuação.]
            </p>
            <ul className="space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-sm text-slate-600 leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Elemento visual decorativo — reforça a marca sem depender de fotos/ícones genéricos */}
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full pointer-events-none" aria-hidden="true" />
            <div className="relative bg-gradient-to-br from-primary-dark via-primary to-accent rounded-[2.5rem_1rem_2.5rem_1rem] p-10 sm:p-12 text-center text-white shadow-xl overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 0%, transparent 45%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.25) 0%, transparent 40%)'
              }} />
              <div className="relative">
                <svg className="w-10 h-10 mx-auto mb-4 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <div className="text-6xl sm:text-7xl font-extrabold leading-none mb-2">+30</div>
                <div className="text-sm uppercase tracking-widest text-white/80 font-semibold">anos de experiência</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-eyebrow">Nossos Pilares</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Missão, Visão e Valores</h2>
            <p className="text-slate-500">Os princípios que guiam nosso trabalho todos os dias</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {pilares.map((p) => (
              <div key={p.title} className="card-surface text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
                  {p.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-400 italic">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-eyebrow">Por que a Alberto Seguros</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Nossos Diferenciais</h2>
            <p className="text-slate-500">O que nos torna a escolha certa para proteger o que é importante para você</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {diferenciais.map((d) => (
              <div key={d.title} className="card-surface">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                  {d.icon}
                </div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">{d.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atendimento */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <span className="section-eyebrow">Atendimento</span>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Estamos por perto quando você precisa</h2>
          <p className="text-slate-500 leading-relaxed italic">
            [Conteúdo a ser fornecido pela Alberto Seguros — horários, canais de atendimento e informações adicionais sobre como funciona o suporte aos clientes.]
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative bg-gradient-to-br from-primary-dark via-primary to-accent overflow-hidden py-16 px-6">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 15% 30%, rgba(255,255,255,0.3) 0%, transparent 45%), radial-gradient(circle at 85% 70%, rgba(255,255,255,0.2) 0%, transparent 40%)'
        }} />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Pronto para proteger o que é importante para você?</h2>
          <p className="text-white/85 mb-8">Faça sua cotação agora mesmo, sem compromisso, e conte com quem entende de seguros há mais de 30 anos.</p>
          <Link
            to="/seguros"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold text-sm uppercase tracking-wide px-8 py-3.5 rounded-2xl transition-all duration-300 hover:bg-slate-50 hover:-translate-y-0.5 shadow-lg"
          >
            Solicitar Cotação
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
