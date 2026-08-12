import QuoteForm from './QuoteForm'

export default function QuoteSection() {
  return (
    <section className="relative z-10 px-6" id="cotacao">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="grid lg:grid-cols-[1fr_380px]">
          <QuoteForm showHeading />
          <Differentials />
        </div>
      </div>
    </section>
  )
}

export function Differentials() {
  return (
    <div className="hidden lg:flex flex-col justify-center p-10 bg-gradient-to-b from-primary to-primary-dark text-white">
      <h3 className="text-xl font-bold mb-8 leading-snug">
        Por que escolher a<br />Alberto Seguros?
      </h3>

      <div className="flex items-start gap-4 mb-6">
        <div className="w-11 h-11 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
          </svg>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-1">Mais de 30 anos de experiência</h4>
          <p className="text-xs text-white/75 leading-relaxed">Tradição e know-how no mercado segurador.</p>
        </div>
      </div>

      <div className="flex items-start gap-4 mb-6">
        <div className="w-11 h-11 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" />
          </svg>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-1">Atendimento personalizado</h4>
          <p className="text-xs text-white/75 leading-relaxed">Cada cliente é único e recebe atenção exclusiva.</p>
        </div>
      </div>

      <div className="flex items-start gap-4 mb-6">
        <div className="w-11 h-11 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 12 15 16 10" />
          </svg>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-1">Principais seguradoras do mercado</h4>
          <p className="text-xs text-white/75 leading-relaxed">Parcerias com as melhores do Brasil.</p>
        </div>
      </div>

      <div className="flex items-start gap-4 mb-6">
        <div className="w-11 h-11 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" />
          </svg>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-1">Cotação sem compromisso</h4>
          <p className="text-xs text-white/75 leading-relaxed">Receba sua proposta e decida com tranquilidade.</p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/20">
        <div className="flex gap-1 mb-2">
          {[1, 2, 3, 4, 5].map(i => (
            <svg key={i} className="w-5 h-5 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
        <p className="text-sm font-semibold">
          <span className="text-2xl font-extrabold">5,0</span> avaliação máxima no Google
        </p>
      </div>
    </div>
  )
}
