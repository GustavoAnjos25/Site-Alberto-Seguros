import { useState } from 'react'

/**
 * Logo oficial da Alberto Seguros.
 *
 * Usa SEMPRE o arquivo exato fornecido (/public/brand/logo-alberto-seguros.png
 * — ícone + nome já desenhados juntos), sem recriar texto, sem recortar,
 * sem substituir por versão própria.
 *
 * A única adaptação é puramente técnica: como a imagem tem o nome escrito em
 * azul-marinho (feito para fundo claro), colocamos uma "plaquinha" branca
 * atrás dela quando o fundo é escuro (header transparente sobre o Hero,
 * rodapé) para o logo continuar legível — a imagem em si nunca é alterada.
 */
export default function Logo({ theme = 'light', size = 'md', className = '' }) {
  const [imgFailed, setImgFailed] = useState(false)

  const sizes = {
    sm: 'h-12',
    md: 'h-16',
    lg: 'h-20',
  }
  const h = sizes[size] || sizes.md

  if (imgFailed) {
    // Fallback apenas se o arquivo for removido do projeto por engano.
    const titleColor = theme === 'light' ? 'text-white' : 'text-primary'
    const subColor = theme === 'light' ? 'text-white/70' : 'text-slate-500'
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center text-white font-extrabold flex-shrink-0">
          A
        </div>
        <div className="flex flex-col leading-tight">
          <span className={`font-bold text-lg ${titleColor} tracking-wide leading-tight`}>ALBERTO</span>
          <span className={`font-medium text-xs uppercase tracking-[2px] ${subColor}`}>SEGUROS</span>
        </div>
      </div>
    )
  }

  const img = (
    <img
      src="/brand/logo-alberto-seguros.png"
      alt="Alberto Seguros"
      className={`${h} w-auto object-contain`}
      onError={() => setImgFailed(true)}
    />
  )

  if (theme === 'light') {
    // Fundo escuro atrás do logo: plaquinha branca só para legibilidade,
    // a imagem do logo em si continua 100% intacta.
    return (
      <div className={`inline-flex items-center bg-white/95 backdrop-blur-sm rounded-xl px-2.5 py-1.5 shadow-sm ${className}`}>
        {img}
      </div>
    )
  }

  return <div className={`inline-flex items-center ${className}`}>{img}</div>
}
