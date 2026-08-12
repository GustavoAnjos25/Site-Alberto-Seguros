import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import PartnerLogo from '../components/PartnerLogo'
import { insurers } from '../data/insurers'

export default function Parceiros() {
  return (
    <>
      <PageHeader
        eyebrow="Parceiros"
        title="Nossos Parceiros"
        subtitle="A Alberto Seguros trabalha com diversas seguradoras para oferecer diferentes opções e o melhor custo-benefício para cada cliente."
      />

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {insurers.map((insurer) => (
              <PartnerLogo key={insurer.slug} name={insurer.name} slug={insurer.slug} />
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 mt-8 italic">
            As marcas exibidas pertencem às respectivas seguradoras parceiras. Logos oficiais serão adicionadas conforme disponibilizadas.
          </p>

          <div className="text-center mt-10">
            <Link to="/seguros" className="btn-primary">
              Solicitar Cotação
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
