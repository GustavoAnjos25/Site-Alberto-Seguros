export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="relative bg-gradient-to-br from-primary-dark via-primary to-accent overflow-hidden pt-32 pb-20 px-6">
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 15% 30%, rgba(255,255,255,0.3) 0%, transparent 45%),
                           radial-gradient(circle at 85% 70%, rgba(255,255,255,0.2) 0%, transparent 40%)`
        }}
      />
      {/* Marca d'água discreta de escudo, reforçando confiança sem poluir a composição */}
      <svg
        className="absolute -right-10 -bottom-16 w-72 h-72 text-white/[0.06] pointer-events-none hidden sm:block"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.7" aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-semibold uppercase tracking-wide mb-5 border border-white/20">
            {eyebrow}
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white leading-[1.15] mb-4 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
