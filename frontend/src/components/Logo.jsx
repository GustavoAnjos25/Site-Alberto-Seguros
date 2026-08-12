import { useState } from 'react'

/**
 * Componente de Logo da Alberto Seguros.
 *
 * Procura pelo arquivo oficial em /public/brand/logo-alberto-seguros.svg.
 * Caso o arquivo ainda não tenha sido adicionado ao projeto, exibe
 * automaticamente um selo (badge) com "A" + nome da corretora, mantendo
 * a proporção e o espaço reservados para quando a logo oficial for enviada.
 *
 * Para usar a logo oficial: adicione o arquivo em
 * frontend/public/brand/logo-alberto-seguros.svg (ou .png)
 * que ele passará a ser exibido automaticamente, sem nenhuma alteração de código.
 */
export default function Logo({ theme = 'light', size = 'md', className = '' }) {
  const [imgFailed, setImgFailed] = useState(false)

  const sizes = {
    sm: { badge: 'w-9 h-9 text-lg', title: 'text-sm', sub: 'text-[9px] tracking-[1.5px]', img: 'h-9' },
    md: { badge: 'w-12 h-12 text-2xl', title: 'text-lg', sub: 'text-xs tracking-[2px]', img: 'h-11' },
    lg: { badge: 'w-16 h-16 text-3xl', title: 'text-2xl', sub: 'text-sm tracking-[2.5px]', img: 'h-14' },
  }
  const s = sizes[size] || sizes.md

  if (!imgFailed) {
    return (
      <img
        src="/brand/logo-alberto-seguros.svg"
        alt="Alberto Seguros"
        className={`${s.img} w-auto object-contain ${className}`}
        onError={() => setImgFailed(true)}
      />
    )
  }

  const titleColor = theme === 'light' ? 'text-white' : 'text-primary'
  const subColor = theme === 'light' ? 'text-white/70' : 'text-slate-500'

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${s.badge} bg-primary rounded-full flex items-center justify-center text-white font-extrabold flex-shrink-0`}>
        A
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`font-bold ${s.title} ${titleColor} tracking-wide leading-tight`}>ALBERTO</span>
        <span className={`font-medium ${s.sub} uppercase ${subColor}`}>SEGUROS</span>
      </div>
    </div>
  )
}
