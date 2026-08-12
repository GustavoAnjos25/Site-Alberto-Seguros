import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

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
  { title: 'Mais de 30 anos de experiência', text: 'Tradição e know-how no mercado segurador.' },
  { title: 'Atendimento personalizado', text: 'Cada cliente é único e recebe atenção exclusiva.' },
  { title: 'Principais seguradoras do mercado', text: 'Parcerias com as melhores do Brasil.' },
  { title: 'Cotação sem compromisso', text: 'Receba sua proposta e decida com tranquilidade.' },
]

export default function Empresa() {
  return (
    <>
      <PageHeader
        eyebrow="A Empresa"
        title="Sobre a Alberto Seguros"
        subtitle="Mais de 30 anos trazendo tranquilidade e segurança para famílias e empresas em Joinville e região."
      />

      {/* História */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Nossa História</h2>
          <p className="text-slate-500 leading-relaxed italic">
            [Conteúdo institucional a ser fornecido pela Alberto Seguros — história da corretora, marcos e trajetória ao longo dos mais de 30 anos de atuação.]
          </p>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Missão, Visão e Valores</h2>
            <p className="text-slate-500">Os pilares que guiam nosso trabalho todos os dias</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {pilares.map((p) => (
              <div key={p.title} className="bg-white p-8 rounded-2xl text-center shadow-sm">
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
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Nossos Diferenciais</h2>
            <p className="text-slate-500">O que nos torna a escolha certa para proteger o que é importante para você</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {diferenciais.map((d) => (
              <div key={d.title} className="p-6 rounded-2xl border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <h4 className="text-sm font-bold text-primary uppercase tracking-wide mb-2">{d.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atendimento */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Atendimento</h2>
          <p className="text-slate-500 leading-relaxed italic mb-8">
            [Conteúdo a ser fornecido pela Alberto Seguros — horários, canais de atendimento e informações adicionais sobre como funciona o suporte aos clientes.]
          </p>
          <Link to="/contato" className="btn-primary">
            Fale com a gente
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
