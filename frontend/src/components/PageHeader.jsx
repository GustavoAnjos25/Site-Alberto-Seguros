export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="relative bg-gradient-to-br from-primary-dark via-primary to-accent overflow-hidden pt-32 pb-16 px-6">
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 15% 30%, rgba(255,255,255,0.3) 0%, transparent 45%),
                           radial-gradient(circle at 85% 70%, rgba(255,255,255,0.2) 0%, transparent 40%)`
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-semibold uppercase tracking-wide mb-5 border border-white/20">
            {eyebrow}
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight">
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
