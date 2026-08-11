export default function Stats() {
  const stats = [
    {
      icon: 'award',
      number: '+30',
      label: 'anos de experiência no mercado segurador',
    },
    {
      icon: 'users',
      number: '+2.000',
      label: 'clientes satisfeitos em Joinville e região',
    },
    {
      icon: 'shield',
      number: '15+',
      label: 'seguradoras parceiras as melhores do Brasil',
    },
    {
      icon: 'star',
      number: '5,0',
      label: 'avaliação máxima no Google',
    },
  ]

  const iconMap = {
    award: <path d="M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M12 2v2"/><path d="M12 8v14"/><path d="m4.93 10.93 1.41 1.41"/><path d="m17.66 10.93-1.41 1.41"/><path d="M6 18l-2 4h16l-2-4"/>,
    users: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
  }

  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Nossos Números</h2>
          <p className="text-slate-500">Resultados que comprovam nossa dedicação</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-8 rounded-2xl text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {iconMap[stat.icon]}
                </svg>
              </div>
              <div className="text-4xl font-extrabold text-primary leading-none mb-2">{stat.number}</div>
              <div className="text-sm text-slate-500 font-medium leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
