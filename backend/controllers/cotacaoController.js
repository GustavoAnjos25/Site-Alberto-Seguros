const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function formatSection(title, fields) {
  const lines = Object.entries(fields)
    .filter(([_, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `  ${k}: ${v}`);

  if (lines.length === 0) return '';
  return `\n${title}\n${'='.repeat(title.length)}\n${lines.join('\n')}`;
}

function buildEmailBody(data) {
  const { tipo_seguro, nome, cpf, cep, whatsapp, email, ...rest } = data;

  const tipoLabels = {
    auto: 'Automóvel',
    moto: 'Moto',
    residencial: 'Residencial',
    vida: 'Vida',
    saude: 'Plano de Saúde',
    viagem: 'Viagem',
    empresarial: 'Empresarial',
    outro: 'Outro',
  };

  let body = `SOLICITAÇÃO DE COTAÇÃO - ALBERTO SEGUROS`;
  body += `\n${'='.repeat(40)}`;
  body += formatSection('Dados Pessoais', {
    'Tipo de Seguro': tipoLabels[tipo_seguro] || tipo_seguro,
    'Nome': nome,
    'CPF': cpf,
    'CEP': cep,
    'WhatsApp': whatsapp,
    'E-mail': email || 'Não informado',
  });

  // Campos específicos por tipo
  if (tipo_seguro === 'auto' || tipo_seguro === 'moto') {
    const prefix = tipo_seguro === 'auto' ? 'auto' : 'moto';
    body += formatSection(
      tipo_seguro === 'auto' ? 'Informações do Veículo' : 'Informações da Moto',
      {
        'Placa': rest[`placa_${prefix}`],
        'Estado Civil': rest[`estado_civil_${prefix}`],
        'Filhos menores de 26 anos': rest.filhos_auto,
        'Já possui seguro': rest[`possui_seguro_${prefix}`],
      }
    );
  }

  if (tipo_seguro === 'residencial') {
    body += formatSection('Informações do Imóvel', {
      'Número': rest.numero,
      'Complemento': rest.complemento,
      'Tipo do Imóvel': rest.tipo_imovel,
      'Utilização': rest.utilizacao,
    });
  }

  if (tipo_seguro === 'vida') {
    body += formatSection('Informações Pessoais', {
      'Data de Nascimento': rest.data_nascimento_vida,
      'Profissão': rest.profissao,
    });
  }

  if (tipo_seguro === 'saude') {
    const tipoPessoa = rest.tipo_pessoa_saude;
    const saudeFields = {
      'Tipo de Pessoa': tipoPessoa === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica',
      'Quantidade de Vidas': rest.quantidade_vidas,
      'Data de Nascimento do Titular': rest.data_nascimento_titular,
    };
    if (tipoPessoa === 'pj') {
      saudeFields['CNPJ'] = rest.cnpj_saude;
      saudeFields['Quantidade de Funcionários'] = rest.quantidade_funcionarios;
    }
    body += formatSection('Informações do Plano de Saúde', saudeFields);
  }

  if (tipo_seguro === 'viagem') {
    body += formatSection('Informações da Viagem', {
      'País de Destino': rest.pais_destino,
      'Data de Ida': rest.data_ida,
      'Data de Volta': rest.data_volta,
      'Quantidade de Viajantes': rest.quantidade_viajantes,
    });
  }

  if (tipo_seguro === 'empresarial') {
    body += formatSection('Informações da Empresa', {
      'Nome da Empresa': rest.nome_empresa,
      'CNPJ': rest.cnpj_empresarial,
      'Ramo de Atividade': rest.ramo_atividade,
    });
  }

  body += `\n\n---\nEnviado em: ${new Date().toLocaleString('pt-BR')}`;
  return body;
}

async function sendCotacao(req, res) {
  try {
    const emailBody = buildEmailBody(req.body);

    await transporter.sendMail({
      from: `"Alberto Seguros" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Nova Solicitação de Cotação - ${req.body.nome}`,
      text: emailBody,
      html: `<pre style="font-family: monospace; font-size: 14px; line-height: 1.6;">${emailBody.replace(/\n/g, '<br>')}</pre>`,
    });

    res.json({
      success: true,
      message: 'Cotação enviada com sucesso!',
    });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao enviar cotação. Tente novamente.',
    });
  }
}

module.exports = { sendCotacao };
