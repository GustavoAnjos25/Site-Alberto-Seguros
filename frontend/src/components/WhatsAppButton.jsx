import { whatsappLink } from '../data/contact'

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Alberto Seguros pelo WhatsApp"
      title="Falar no WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:brightness-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 animate-whatsapp-pulse"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.892.526 3.66 1.438 5.166L2 22l4.958-1.412A9.953 9.953 0 0 0 12.001 22C17.524 22 22 17.523 22 12S17.524 2 12.001 2zm0 18.2a8.166 8.166 0 0 1-4.412-1.284l-.316-.19-3.11.886.897-3.06-.207-.315A8.19 8.19 0 1 1 20.2 12c0 4.522-3.678 8.2-8.199 8.2z"/>
      </svg>
    </a>
  )
}
