exports.handler = async (event, context) => {
  const nodemailer = require('nodemailer');

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const data = JSON.parse(event.body);
  const { tipo_seguro, nome, cpf, cep, whatsapp, email, ...rest } = data;

  const tipoLabels = {
    auto: 'Automóvel', moto: 'Moto', residencial: 'Residencial',
    vida: 'Vida', saude: 'Plano de Saúde', viagem: 'Viagem',
    empresarial: 'Empresarial', outro: 'Outro',
  };

  let body = `SOLICITAÇÃO DE COTAÇÃO - ALBERTO SEGUROS\n${'='.repeat(40)}\n`;
  body += `Tipo de Seguro: ${tipoLabels[tipo_seguro] || tipo_seguro}\n`;
  body += `Nome: ${nome}\nCPF: ${cpf}\nCEP: ${cep}\nWhatsApp: ${whatsapp}\n`;
  body += `E-mail: ${email || 'Não informado'}\n`;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `\"Alberto Seguros\" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Nova Cotação - ${nome}`,
      text: body,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Enviado!' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: err.message }),
    };
  }
};
