import { useState } from 'react'

/**
 * Exibe a logo oficial da seguradora quando disponível em
 * /public/brand/partners/{slug}.svg — caso o arquivo não exista,
 * mostra um selo padronizado com o nome da seguradora, mantendo o
 * layout pronto para receber a logo oficial futuramente.
 */
export default function PartnerLogo({ name, slug, className = '' }) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div
      className={`group flex items-center justify-center h-24 px-6 bg-white border border-slate-200 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary-light ${className}`}
      title={name}
    >
      {!imgFailed ? (
        <img
          src={`/brand/partners/${slug}.svg`}
          alt={name}
          className="max-h-10 max-w-[85%] w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span className="text-sm font-bold text-slate-500 tracking-wide text-center group-hover:text-primary transition-colors">
          {name}
        </span>
      )}
    </div>
  )
}
