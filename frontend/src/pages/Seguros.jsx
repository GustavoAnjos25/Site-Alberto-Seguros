import PageHeader from '../components/PageHeader'
import QuoteSection from '../components/QuoteSection'

export default function Seguros() {
  return (
    <>
      <PageHeader
        eyebrow="Seguros e Cotações"
        title="Encontre o seguro ideal para você"
        subtitle="Automóvel, moto, residencial, vida, saúde, viagem ou empresarial — preencha o formulário e receba uma cotação personalizada, sem compromisso."
      />
      <div className="-mt-10 pb-20">
        <QuoteSection />
      </div>
    </>
  )
}
