// Opção SEM BACKEND - usando EmailJS
// 1. Crie conta em https://emailjs.com
// 2. Crie um serviço de e-mail
// 3. Crie um template
// 4. Substitua os valores abaixo

// import emailjs from '@emailjs/browser';

const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'SEU_PUBLIC_KEY_AQUI',
  SERVICE_ID: 'SEU_SERVICE_ID_AQUI',
  TEMPLATE_ID: 'SEU_TEMPLATE_ID_AQUI',
};

export async function sendCotacaoEmailJS(data) {
  // Descomente após instalar: npm install @emailjs/browser
  // const templateParams = { ...data };
  // return emailjs.send(CONFIG.SERVICE_ID, CONFIG.TEMPLATE_ID, templateParams, CONFIG.PUBLIC_KEY);
  throw new Error('Configure o EmailJS em src/services/emailjsService.js antes de usar');
}
