export default function Hero() {
  return (
    <section className="relative min-h-[520px] flex items-center bg-gradient-to-br from-primary-dark via-primary to-accent overflow-hidden pt-20">
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%)`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 w-full grid lg:grid-cols-2 gap-16 items-center">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium mb-6 border border-white/20">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Mais de 30 anos de experiência
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
            PROTEGEMOS<br/>
            O QUE É MAIS<br/>
            IMPORTANTE<br/>
            PARA <span className="text-blue-300">VOCÊ.</span>
          </h1>

          <p className="text-lg text-white/85 leading-relaxed mb-8">
            Há mais de 30 anos trazendo tranquilidade e segurança para famílias e empresas em Joinville e região.
          </p>

          <div className="flex flex-wrap gap-8 mb-10">
            {[
              { icon: 'user', text: 'Atendimento
personalizado' },
              { icon: 'shield', text: 'As melhores
seguradoras' },
              { icon: 'users', text: 'Soluções para
você e sua família' },
            ].map((f) => (
              <div key={f.icon} className="flex items-center gap-3 text-white/90 text-sm font-medium">
                <div className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  {f.icon === 'user' && (
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  )}
                  {f.icon === 'shield' && (
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  )}
                  {f.icon === 'users' && (
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  )}
                </div>
                <span className="whitespace-pre-line leading-snug">{f.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="#cotacao" className="btn-primary text-base px-10 py-4">
              Solicitar Cotação
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
            <a href="#planos" className="btn-outline text-base px-8 py-4">
              Conheça Nossos Planos
            </a>
          </div>
        </div>

        <div className="hidden lg:flex justify-center items-center relative">
          <div className="relative w-full max-w-lg">
            <div className="absolute -inset-5 bg-blue-400/20 rounded-full blur-3xl" />
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=500&fit=crop" 
              alt="Profissionais Alberto Seguros"
              className="relative w-full h-auto rounded-2xl shadow-2xl object-cover"
            />
            <div className="absolute -bottom-5 -left-5 bg-white p-5 rounded-xl shadow-xl flex items-center gap-3">
              <div className="text-3xl font-extrabold text-primary leading-none">30+</div>
              <div className="text-xs text-slate-500 font-medium leading-tight">Anos de<br/>experiência</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
