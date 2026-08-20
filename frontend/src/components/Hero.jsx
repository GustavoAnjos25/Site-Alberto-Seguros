import QuoteForm from './QuoteForm'

/**
 * FOTOGRAFIA UTILIZADA NO HERO — origem e licença
 * ------------------------------------------------
 * Banco de imagens: Unsplash
 * Página original:  https://unsplash.com/photos/man-in-white-shirt-carrying-girl-in-gray-shirt-Wr3comVZJxU
 * Fotógrafo:         Nathan Dumlao (@nate_dumlao) — https://unsplash.com/@nate_dumlao
 * Licença:           Unsplash License — uso comercial livre, sem necessidade de atribuição
 *                     https://unsplash.com/license
 * Arquivo servido diretamente do CDN oficial do Unsplash (images.unsplash.com).
 * Consulte também /IMAGE_CREDITS.md na raiz do projeto.
 */
const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=1200&q=80'

export default function Hero() {
  return (
    <section
      id="cotacao"
      className="relative bg-gradient-to-br from-primary-dark via-primary to-accent overflow-hidden pt-24 pb-12 lg:pt-24 lg:pb-16"
    >
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%)`
        }}
      />

      {/*
        IMPORTANTE — por que a estrutura é assim:
        O formulário NÃO usa row-span sobre texto+foto. Se ele espalhar por
        duas linhas do grid, o próprio CSS Grid é forçado a "esticar" essas
        linhas para caber o formulário inteiro — e isso empurra a foto para
        baixo (abre um vão) conforme o formulário cresce, mesmo com a foto
        tendo altura fixa. Por isso texto+foto ficam agrupados em UM único
        item de grid (coluna esquerda), completamente independente da altura
        do formulário (coluna direita). `display:contents` no wrapper permite
        reordenar texto/formulário/foto no mobile sem afetar esse isolamento
        no desktop.
      */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 lg:items-start gap-6 lg:gap-x-14">
        {/* Texto + foto — agrupados como UMA única coluna, com display:contents
            no mobile para permitir a ordem texto → formulário → foto */}
        <div className="contents lg:flex lg:flex-col lg:col-start-1">
          <div className="order-1 lg:order-none max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium mb-4 border border-white/20">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Mais de 30 anos de experiência
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-white leading-[1.05] mb-4 tracking-tight">
              PROTEGEMOS O QUE É MAIS IMPORTANTE PARA <span className="text-blue-300">VOCÊ.</span>
            </h1>

            <p className="text-base lg:text-lg text-white/85 leading-relaxed">
              Há mais de 30 anos trazendo tranquilidade e segurança para famílias e empresas em Joinville e região. Faça sua cotação agora mesmo, sem compromisso.
            </p>
          </div>

          {/* Fotografia — tamanho e posição fixos, nunca dependem da altura
              do formulário (não há row-span acoplando as duas colunas). */}
          <div className="order-3 lg:order-none relative h-52 sm:h-64 lg:h-72 xl:h-80 max-h-52 sm:max-h-64 lg:max-h-72 xl:max-h-80 overflow-hidden mt-6 lg:mt-8 flex-shrink-0">
            {/* Brilho suave atrás da foto, dá profundidade sem chamar atenção */}
            <div className="absolute -inset-4 lg:-inset-6 bg-blue-300/20 blur-3xl rounded-full pointer-events-none" aria-hidden="true" />

            <div
              className="relative w-full h-full overflow-hidden shadow-[0_20px_50px_-15px_rgba(6,20,45,0.55)]"
              style={{
                borderRadius: '2.5rem 1rem 2.5rem 1rem',
                WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, black 12%, black 100%)',
                maskImage: 'linear-gradient(180deg, transparent 0%, black 12%, black 100%)',
              }}
            >
              <img
                src={HERO_IMAGE_URL}
                alt="Pai carregando a filha no colo ao ar livre, transmitindo proteção e cuidado com a família"
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 25%' }}
                loading="lazy"
              />
              {/* Sobreposição azul da marca, para integrar a foto à paleta do Hero */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-primary-dark/10 to-transparent" />
              <div className="absolute inset-0 bg-primary-dark/10 mix-blend-multiply" />
            </div>
          </div>
        </div>

        {/* Formulário — coluna independente; pode crescer livremente para
            baixo sem afetar texto/foto na coluna ao lado. */}
        <div className="order-2 lg:order-none lg:col-start-2">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full">
            <QuoteForm compact showHeading origin="Home" />
          </div>
        </div>
      </div>
    </section>
  )
}
