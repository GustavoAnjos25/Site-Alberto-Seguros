import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import PartnerLogo from '../components/PartnerLogo'
import { insurers } from '../data/insurers'

export default function Home() {
  const location = useLocation()

  // Permite links como /#cotacao chegarem direto ao formulário.
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
      }
    }
  }, [location.hash])

  return (
    <>
      <Hero />
      <Stats />

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Nossos Parceiros</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Trabalhamos com as principais seguradoras do Brasil para oferecer a melhor opção para você.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {insurers.slice(0, 7).map((insurer) => (
              <PartnerLogo key={insurer.slug} name={insurer.name} slug={insurer.slug} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/parceiros" className="btn-primary">
              Ver todos os parceiros
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Conheça a Alberto Seguros</h2>
          <p className="text-slate-500 leading-relaxed mb-8 max-w-2xl mx-auto">
            Mais de 30 anos oferecendo atendimento próximo e soluções em seguros para famílias e empresas em Joinville e região.
          </p>
          <Link to="/empresa" className="btn-secondary inline-flex items-center gap-2 bg-white border-2 border-primary text-primary font-semibold px-8 py-3.5 rounded-2xl hover:bg-primary hover:text-white transition-colors">
            Saiba mais sobre nós
          </Link>
        </div>
      </section>
    </>
  )
}
