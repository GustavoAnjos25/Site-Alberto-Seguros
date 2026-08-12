import Logo from './Logo'
import QuoteForm from './QuoteForm'

export default function Hero() {
  return (
    <section
      id="cotacao"
      className="relative flex items-center bg-gradient-to-br from-primary-dark via-primary to-accent overflow-hidden pt-24 pb-10 lg:pt-28 lg:pb-14"
    >
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%)`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* Lado esquerdo: apresentação */}
        <div className="max-w-xl">
          <Logo theme="light" size="md" className="mb-6" />

          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium mb-5 border border-white/20">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Mais de 30 anos de experiência
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.1] mb-4 tracking-tight">
            PROTEGEMOS O QUE É MAIS IMPORTANTE PARA <span className="text-blue-300">VOCÊ.</span>
          </h1>

          <p className="text-base lg:text-lg text-white/85 leading-relaxed mb-6">
            Há mais de 30 anos trazendo tranquilidade e segurança para famílias e empresas em Joinville e região. Faça sua cotação agora mesmo, sem compromisso.
          </p>

          <div className="hidden sm:flex flex-wrap gap-6 lg:gap-8">
            {[
              { icon: 'user', text: 'Atendimento\npersonalizado' },
              { icon: 'shield', text: 'As melhores\nseguradoras' },
              { icon: 'users', text: 'Soluções para\nvocê e sua família' },
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
        </div>

        {/* Lado direito: formulário de cotação, já visível na primeira dobra */}
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <QuoteForm compact showHeading />
          </div>
        </div>
      </div>
    </section>
  )
}
