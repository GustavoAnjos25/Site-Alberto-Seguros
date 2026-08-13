// Dados oficiais de contato da Alberto Seguros.
// Não invente ou altere estes dados — eles são a fonte única usada em
// WhatsAppButton, Footer e na página de Contato.

export const CONTACT = {
  whatsappDisplay: '(47) 99929-7888',
  // Número em formato internacional, sem espaços/símbolos, para o link wa.me
  whatsappNumber: '5547999297888',
  email: 'albertolseguros@albertoseguros.com',
}

export const whatsappLink = (message = 'Olá! Gostaria de solicitar uma cotação com a Alberto Seguros.') =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`

export const mailtoLink = () => `mailto:${CONTACT.email}`
