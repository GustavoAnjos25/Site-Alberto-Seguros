import { Link } from 'react-router-dom'

/**
 * FOTOGRAFIA UTILIZADA NESTA PÁGINA — origem e licença
 * ------------------------------------------------------
 * Banco de imagens: Unsplash
 * Página original:  https://unsplash.com/photos/two-professionals-shaking-hands-across-a-table-jEpZNyFSQwQ
 * Fotógrafo:         Vitaly Gariev (@silverkblack) — https://unsplash.com/@silverkblack
 * Licença:           Unsplash License — uso comercial livre, sem necessidade de atribuição
 *                     https://unsplash.com/license
 * Arquivo servido diretamente do CDN oficial do Unsplash (images.unsplash.com).
 * Consulte também /IMAGE_CREDITS.md na raiz do projeto.
 */
const TRUST_IMAGE_URL =
  'https://images.unsplash.com/photo-1758518730384-be3d205838e8?auto=format&fit=crop&w=1600&q=80'

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

const jornada = ['Experiência', 'Confiança', 'Relacionamento', 'Proteção']

const pilares = [
  {
    title: 'Missão',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    text: 'Conteúdo a ser definido pela Alberto Seguros.',
  },
  {
    title: 'Visão',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="12" cy="12" r="3" /><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      </svg>
    ),
    text: 'Conteúdo a ser definido pela Alberto Seguros.',
  },
  {
    title: 'Valores',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
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
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
  },
  {
    title: 'Atendimento personalizado',
    text: 'Cada cliente é único e recebe atenção exclusiva.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    title: 'Principais seguradoras do mercado',
    text: 'Parcerias com as melhores do Brasil.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Cotação sem compromisso',
    text: 'Receba sua proposta e decida com tranquilidade.',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
]

export default function Empresa() {
  return (
    <>
      {/* ============ HERO — azul escuro ============ */}
      <section className="relative bg-gradient-to-br from-primary-dark via-primary to-accent overflow-hidden pt-40 pb-32 px-6">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 15% 30%, rgba(255,255,255,0.3) 0%, transparent 45%),
                           radial-gradient(circle at 85% 70%, rgba(255,255,255,0.2) 0%, transparent 40%)`
        }} />
        <svg
          className="absolute -right-16 -bottom-20 w-80 h-80 text-white/[0.07] pointer-events-none hidden sm:block"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6" aria-hidden="true"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-semibold uppercase tracking-wide mb-9 border border-white/20">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            A Empresa
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.15] tracking-tight mb-10">
            Tradição, confiança e proteção há mais de 30 anos
          </h1>
          <p className="text-white/80 text-base sm:text-lg leading-loose max-w-xl mx-auto">
            A Alberto Seguros é uma corretora dedicada a proteger o que mais importa
            para famílias e empresas em Joinville e região, com atendimento próximo
            e as principais seguradoras do Brasil.
          </p>
        </div>
      </section>

      {/* ============ FAIXA DE CONFIANÇA — branco ============ */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-y-8">
          {trustStrip.map((s) => (
            <div key={s.label} className="text-center sm:border-l sm:first:border-l-0 sm:px-6 border-slate-100">
              <div className="text-3xl font-extrabold text-primary leading-none mb-1.5">{s.value}</div>
              <div className="text-[13px] text-slate-500 font-medium leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ NOSSA TRAJETÓRIA — azul muito claro ============ */}
      <section className="py-24 px-6 bg-gradient-to-b from-blue-50/70 via-blue-50/40 to-white">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
          <div className="max-w-md">
            <span className="section-eyebrow">Nossa Trajetória</span>
            <h2 className="text-[28px] sm:text-3xl font-bold text-slate-900 mb-5 leading-[1.25] tracking-tight">
              Décadas de experiência cuidando do que é importante para você
            </h2>
            <p className="text-slate-500 text-[15px] leading-relaxed italic mb-7">
              [Conteúdo institucional a ser fornecido pela Alberto Seguros — história
              da corretora, marcos e trajetória ao longo dos mais de 30 anos de atuação.]
            </p>
            <ul className="space-y-4 mb-8">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-[15px] text-slate-600 leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>

            {/* Conceito visual, sem inventar cronologia/fatos */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
              {jornada.map((etapa, i) => (
                <span key={etapa} className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                    {etapa}
                  </span>
                  {i < jornada.length - 1 && (
                    <svg className="w-3.5 h-3.5 text-primary/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Elemento visual premium — moldura + padrão sutil, não apenas um card azul */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-6 bg-primary/10 blur-3xl rounded-full pointer-events-none" aria-hidden="true" />
            <div className="absolute -inset-3 border border-primary/15 rounded-[2.5rem_1rem_2.5rem_1rem] pointer-events-none" aria-hidden="true" />
            <div className="relative bg-gradient-to-br from-primary-dark via-primary to-accent rounded-[2.5rem_1rem_2.5rem_1rem] p-12 text-center text-white shadow-xl overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                  backgroundSize: '18px 18px',
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mx-auto mb-5 border border-white/20">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className="text-6xl sm:text-7xl font-extrabold leading-none mb-2 tracking-tight">+30</div>
                <div className="text-[13px] uppercase tracking-[0.2em] text-white/80 font-semibold">anos de experiência</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MISSÃO, VISÃO E VALORES — branco ============ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-lg mx-auto mb-16">
            <span className="section-eyebrow">Nossos Pilares</span>
            <h2 className="text-[28px] sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">Missão, Visão e Valores</h2>
            <p className="text-slate-500 text-[15px] leading-relaxed">Os princípios que guiam nosso trabalho todos os dias</p>
          </div>
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {pilares.map((p) => (
              <div key={p.title} className="text-center px-6 py-8 sm:py-0">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-5 text-primary">
                  {p.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2.5 tracking-tight">{p.title}</h3>
                <p className="text-sm text-slate-400 italic leading-relaxed max-w-[220px] mx-auto">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DIFERENCIAIS — bloco editorial azul ============ */}
      <section className="relative bg-gradient-to-br from-primary-dark via-primary to-accent overflow-hidden py-24 px-6">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 10% 20%, rgba(255,255,255,0.25) 0%, transparent 40%),
                           radial-gradient(circle at 90% 80%, rgba(255,255,255,0.2) 0%, transparent 40%)`
        }} />
        <div className="relative max-w-5xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
          <div className="lg:pr-6">
            <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5 border border-white/20">
              Por que a Alberto Seguros
            </span>
            <h2 className="text-[28px] sm:text-3xl font-bold text-white leading-[1.25] tracking-tight mb-4">
              O que nos torna a escolha certa para proteger o que é importante para você
            </h2>
            <p className="text-white/75 text-[15px] leading-relaxed max-w-sm">
              Combinamos experiência de mercado com atendimento próximo, para que cada
              cliente tenha a cobertura certa, sem complicação.
            </p>
          </div>

          <div className="space-y-1">
            {diferenciais.map((d, i) => (
              <div key={d.title} className={`flex items-start gap-4 py-5 ${i > 0 ? 'border-t border-white/10' : ''}`}>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                  {d.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide mb-1">{d.title}</h4>
                  <p className="text-sm text-white/70 leading-relaxed">{d.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FOTOGRAFIA — branco ============ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-[2.5rem_1rem_2.5rem_1rem] overflow-hidden shadow-2xl h-72 sm:h-96">
            <img
              src={TRUST_IMAGE_URL}
              alt="Aperto de mãos entre profissionais, representando confiança e relacionamento próximo com o cliente"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
              <p className="text-white text-xl sm:text-2xl font-bold max-w-md leading-snug tracking-tight">
                Relacionamentos duradouros, construídos com confiança.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ATENDIMENTO — azul muito claro ============ */}
      <section className="py-20 px-6 bg-blue-50/50">
        <div className="max-w-xl mx-auto text-center">
          <span className="section-eyebrow">Atendimento</span>
          <h2 className="text-2xl sm:text-[28px] font-bold text-slate-900 mb-4 tracking-tight">Estamos por perto quando você precisa</h2>
          <p className="text-slate-500 text-[15px] leading-relaxed italic">
            [Conteúdo a ser fornecido pela Alberto Seguros — horários, canais de
            atendimento e informações adicionais sobre como funciona o suporte aos clientes.]
          </p>
        </div>
      </section>

      {/* ============ CTA FINAL — azul escuro ============ */}
      <section className="relative bg-gradient-to-br from-primary-dark via-primary to-accent overflow-hidden py-20 px-6">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 15% 30%, rgba(255,255,255,0.3) 0%, transparent 45%), radial-gradient(circle at 85% 70%, rgba(255,255,255,0.2) 0%, transparent 40%)'
        }} />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-[28px] sm:text-3xl font-bold text-white mb-4 leading-[1.25] tracking-tight">
            Pronto para proteger o que é importante para você?
          </h2>
          <p className="text-white/80 text-[15px] sm:text-base leading-relaxed mb-9 max-w-md mx-auto">
            Faça sua cotação agora mesmo, sem compromisso, e conte com quem entende
            de seguros há mais de 30 anos.
          </p>
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
