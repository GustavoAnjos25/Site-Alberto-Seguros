// Serviço de envio de e-mails
// Detecta automaticamente se está em produção ou desenvolvimento

const API_URL = import.meta.env.VITE_API_URL || '';

export async function sendCotacao(data) {
  const url = API_URL 
    ? `${API_URL}/api/cotacao` 
    : '/api/cotacao';

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Erro ao enviar cotação');
  }

  return res.json();
}
