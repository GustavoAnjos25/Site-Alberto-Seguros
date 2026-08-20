const { Resend } = require('resend');

// Destinatário: usa RESEND_TO_EMAIL quando configurada na Vercel; se não
// estiver definida (ou vier vazia/mal formatada), cai para o endereço fixo
// abaixo — assim o envio nunca fica "sem destino" por falta de configuração.
const DESTINATARIO_PADRAO = 'albertolseguros@albertoseguros.com';

// Remetente padrão enquanto o domínio albertoseguros.com não estiver
// verificado no Resend (ou se RESEND_FROM_EMAIL vier vazia/mal formatada).
const REMETENTE_PADRAO = 'Alberto Seguros <onboarding@resend.dev>';

const resend = new Resend(process.env.RESEND_API_KEY);

// ---------------------------------------------------------------------------
// Validação/normalização de e-mail — usado tanto nos dados do formulário
// quanto nas variáveis de ambiente RESEND_TO_EMAIL / RESEND_FROM_EMAIL.
// ---------------------------------------------------------------------------

function isValidEmailFormat(v) {
  return typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

/**
 * Resolve o endereço de destino a partir de RESEND_TO_EMAIL.
 * Aceita um e-mail simples ("nome@dominio.com"). Se a variável não existir
 * ou não for um e-mail válido, usa o padrão fixo e registra um aviso (sem
 * nunca expor a API key).
 */
function resolveDestinatario() {
  const raw = process.env.RESEND_TO_EMAIL;
  if (!raw || !raw.trim()) {
    return DESTINATARIO_PADRAO;
  }
  const trimmed = raw.trim();
  if (isValidEmailFormat(trimmed)) {
    return trimmed;
  }
  console.warn(
    `[cotacao] RESEND_TO_EMAIL definida mas com formato inválido ("${trimmed}"). ` +
    `Usando o destinatário padrão (${DESTINATARIO_PADRAO}) para não perder a cotação.`
  );
  return DESTINATARIO_PADRAO;
}

/**
 * Resolve o remetente a partir de RESEND_FROM_EMAIL.
 * Aceita tanto "nome@dominio.com" quanto o formato "Nome <nome@dominio.com>",
 * que é o exigido pelo Resend quando se quer exibir um nome de exibição.
 * Se vier só "Nome email@dominio.com" (sem os sinais < >, um erro comum ao
 * colar no painel da Vercel), o valor é corrigido automaticamente.
 * Se não for possível validar, cai para o remetente padrão do Resend.
 */
function resolveRemetente() {
  const raw = process.env.RESEND_FROM_EMAIL;
  if (!raw || !raw.trim()) {
    return REMETENTE_PADRAO;
  }
  const trimmed = raw.trim();

  // Já está no formato correto: "Nome <email@dominio.com>"
  const bracketMatch = trimmed.match(/^(.*)<([^<>]+)>$/);
  if (bracketMatch) {
    const email = bracketMatch[2].trim();
    if (isValidEmailFormat(email)) return trimmed;
    console.warn(`[cotacao] RESEND_FROM_EMAIL com e-mail inválido dentro de "<...>" ("${trimmed}"). Usando remetente padrão.`);
    return REMETENTE_PADRAO;
  }

  // Só um e-mail, sem nome de exibição: "email@dominio.com"
  if (isValidEmailFormat(trimmed)) {
    return trimmed;
  }

  // Formato comum de erro: "Nome email@dominio.com" (sem os < >).
  // Extrai o último "token" se ele parecer um e-mail e reconstrói no
  // formato correto, em vez de deixar o envio falhar por causa disso.
  const parts = trimmed.split(/\s+/);
  const lastToken = parts[parts.length - 1];
  if (parts.length > 1 && isValidEmailFormat(lastToken)) {
    const displayName = parts.slice(0, -1).join(' ');
    const fixed = `${displayName} <${lastToken}>`;
    console.warn(
      `[cotacao] RESEND_FROM_EMAIL sem os sinais "<" ">" ao redor do e-mail ("${trimmed}"). ` +
      `Corrigido automaticamente para "${fixed}". Ajuste a variável na Vercel para evitar este aviso.`
    );
    return fixed;
  }

  console.warn(`[cotacao] RESEND_FROM_EMAIL com formato não reconhecido ("${trimmed}"). Usando remetente padrão.`);
  return REMETENTE_PADRAO;
}

const TIPO_LABELS = {
  auto: 'Automóvel',
  moto: 'Moto',
  residencial: 'Residencial',
  vida: 'Vida',
  saude: 'Saúde',
  viagem: 'Viagem',
  empresarial: 'Empresarial',
  outro: 'Outro',
};

const TIPOS_VALIDOS = Object.keys(TIPO_LABELS);

// ---------------------------------------------------------------------------
// Validação e sanitização básica dos dados recebidos
// ---------------------------------------------------------------------------

function isNonEmptyString(v, maxLen = 500) {
  return typeof v === 'string' && v.trim().length > 0 && v.length <= maxLen;
}

function validatePayload(body) {
  const errors = [];

  if (!body || typeof body !== 'object') {
    return ['Dados inválidos.'];
  }

  if (!isNonEmptyString(body.tipo_seguro) || !TIPOS_VALIDOS.includes(body.tipo_seguro)) {
    errors.push('Tipo de seguro inválido.');
  }
  if (!isNonEmptyString(body.nome, 200)) errors.push('Nome é obrigatório.');
  if (!isNonEmptyString(body.cpf, 20)) errors.push('CPF é obrigatório.');
  if (!isNonEmptyString(body.cep, 15)) errors.push('CEP é obrigatório.');
  if (!isNonEmptyString(body.whatsapp, 20)) errors.push('WhatsApp é obrigatório.');
  if (body.email && (typeof body.email !== 'string' || body.email.length > 200 || !isValidEmailFormat(body.email))) {
    errors.push('E-mail inválido.');
  }

  // Proteção simples contra payloads anormalmente grandes (abuso/spam).
  const totalSize = JSON.stringify(body).length;
  if (totalSize > 20000) errors.push('Requisição muito grande.');

  return errors;
}

// ---------------------------------------------------------------------------
// Montagem das seções de campos específicos por tipo de seguro — só inclui
// o que o cliente realmente preencheu, respeitando os caminhos condicionais
// (0km sim/não, já possui seguro sim/não etc.)
// ---------------------------------------------------------------------------

function buildFieldSections(data) {
  const { tipo_seguro: tipo } = data;
  const sections = [];

  if (tipo === 'auto' || tipo === 'moto') {
    const prefix = tipo;
    const zeroKm = data[`veiculo_0km_${prefix}`];
    const fields = [];

    if (zeroKm) fields.push(['0 km', zeroKm]);
    if (zeroKm === 'Sim' && data[`chassi_${prefix}`]) fields.push(['Chassi', data[`chassi_${prefix}`]]);
    if (zeroKm === 'Não' && data[`placa_${prefix}`]) fields.push(['Placa', data[`placa_${prefix}`]]);
    if (data[`estado_civil_${prefix}`]) fields.push(['Estado civil', data[`estado_civil_${prefix}`]]);
    if (prefix === 'auto' && data.filhos_auto) fields.push(['Filho(s) menor(es) de 26 anos', data.filhos_auto]);
    if (data[`possui_seguro_${prefix}`]) fields.push(['Já possui seguro', data[`possui_seguro_${prefix}`]]);
    if (data[`possui_seguro_${prefix}`] === 'Sim' && data[`bonus_${prefix}`]) fields.push(['Bônus', data[`bonus_${prefix}`]]);

    if (fields.length) {
      sections.push([tipo === 'auto' ? 'Informações do veículo' : 'Informações da moto', fields]);
    }
  }

  if (tipo === 'residencial') {
    const fields = [];
    if (data.numero) fields.push(['Número', data.numero]);
    if (data.complemento) fields.push(['Complemento', data.complemento]);
    if (data.tipo_imovel) fields.push(['Tipo do imóvel', data.tipo_imovel]);
    if (data.utilizacao) fields.push(['Utilização', data.utilizacao]);
    if (data.possui_seguro_residencial) fields.push(['Já possui seguro', data.possui_seguro_residencial]);
    if (data.possui_seguro_residencial === 'Sim' && data.bonus_residencial) fields.push(['Bônus', data.bonus_residencial]);
    if (fields.length) sections.push(['Informações do imóvel', fields]);
  }

  if (tipo === 'vida') {
    const fields = [];
    if (data.data_nascimento_vida) fields.push(['Data de nascimento', data.data_nascimento_vida]);
    if (data.profissao) fields.push(['Profissão', data.profissao]);
    if (fields.length) sections.push(['Informações pessoais', fields]);
  }

  if (tipo === 'saude') {
    const fields = [];
    const tipoPessoa = data.tipo_pessoa_saude;
    if (tipoPessoa) fields.push(['Tipo de pessoa', tipoPessoa === 'pj' ? 'Pessoa Jurídica' : 'Pessoa Física']);
    if (data.quantidade_vidas) fields.push(['Quantidade de vidas', data.quantidade_vidas]);
    if (data.data_nascimento_titular) fields.push(['Data de nascimento do titular', data.data_nascimento_titular]);
    if (tipoPessoa === 'pj' && data.cnpj_saude) fields.push(['CNPJ', data.cnpj_saude]);
    if (tipoPessoa === 'pj' && data.quantidade_funcionarios) fields.push(['Quantidade de funcionários', data.quantidade_funcionarios]);
    if (fields.length) sections.push(['Informações do plano de saúde', fields]);
  }

  if (tipo === 'viagem') {
    const fields = [];
    if (data.pais_destino) fields.push(['País de destino', data.pais_destino]);
    if (data.data_ida) fields.push(['Data de ida', data.data_ida]);
    if (data.data_volta) fields.push(['Data de volta', data.data_volta]);
    if (data.quantidade_viajantes) fields.push(['Quantidade de viajantes', data.quantidade_viajantes]);
    if (fields.length) sections.push(['Informações da viagem', fields]);
  }

  if (tipo === 'empresarial') {
    const fields = [];
    if (data.nome_empresa) fields.push(['Nome da empresa', data.nome_empresa]);
    if (data.cnpj_empresarial) fields.push(['CNPJ', data.cnpj_empresarial]);
    if (data.ramo_atividade) fields.push(['Ramo de atividade', data.ramo_atividade]);
    if (fields.length) sections.push(['Informações da empresa', fields]);
  }

  return sections;
}

// ---------------------------------------------------------------------------
// E-mail em HTML (com fallback em texto puro)
// ---------------------------------------------------------------------------

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderFieldRowsHtml(fields) {
  return fields
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:6px 0;color:#64748b;font-size:14px;width:220px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:6px 0;color:#0f172a;font-size:14px;font-weight:600;vertical-align:top;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('');
}

function renderSectionHtml(title, fields) {
  if (!fields.length) return '';
  return `
    <tr>
      <td style="padding:0 0 4px;">
        <p style="margin:24px 0 10px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#1a4b8c;">${escapeHtml(title)}</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e2e8f0;padding-top:4px;">
          ${renderFieldRowsHtml(fields)}
        </table>
      </td>
    </tr>`;
}

function buildEmail(data, origem) {
  const tipoLabel = TIPO_LABELS[data.tipo_seguro] || data.tipo_seguro;

  const clienteFields = [
    ['Nome', data.nome],
    ['CPF', data.cpf],
    ['WhatsApp', data.whatsapp],
    ['E-mail', data.email || 'Não informado'],
    ['CEP', data.cep],
  ];

  const seguroFields = [['Tipo', tipoLabel]];

  const fieldSections = buildFieldSections(data);

  const subject = `Nova cotação pelo site — ${tipoLabel.toUpperCase()}`;

  const html = `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:linear-gradient(135deg,#0f2d56,#1a4b8c);padding:28px 32px;">
                <p style="margin:0;color:#ffffff;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;opacity:0.85;">Alberto Seguros</p>
                <h1 style="margin:6px 0 0;color:#ffffff;font-size:22px;">Nova cotação pelo site</h1>
                <p style="margin:8px 0 0;color:#ffffff;font-size:13px;opacity:0.85;">Origem: ${escapeHtml(origem)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${renderSectionHtml('Dados do cliente', clienteFields)}
                  ${renderSectionHtml('Seguro solicitado', seguroFields)}
                  ${fieldSections.map(([title, fields]) => renderSectionHtml(title, fields)).join('')}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e2e8f0;padding-top:20px;">
                  <tr>
                    <td>
                      <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#0f172a;">Alberto Seguros</p>
                      <p style="margin:0;font-size:12px;color:#64748b;">WhatsApp: (47) 99929-7888</p>
                      <p style="margin:0;font-size:12px;color:#64748b;">E-mail: albertolseguros@albertoseguros.com</p>
                      <p style="margin:12px 0 0;font-size:11px;color:#94a3b8;">Recebido em ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;

  const textLines = [
    'NOVA COTAÇÃO PELO SITE',
    `Origem: ${origem}`,
    '',
    'Dados do cliente',
    ...clienteFields.map(([l, v]) => `${l}: ${v}`),
    '',
    'Seguro solicitado',
    ...seguroFields.map(([l, v]) => `${l}: ${v}`),
    ...fieldSections.flatMap(([title, fields]) => ['', title, ...fields.map(([l, v]) => `${l}: ${v}`)]),
    '',
    'Alberto Seguros',
    'WhatsApp: (47) 99929-7888',
    'E-mail: albertolseguros@albertoseguros.com',
  ];

  return { subject, html, text: textLines.join('\n') };
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Método não permitido.' });

  const body = req.body || {};

  // Honeypot: campo invisível que só bots preenchem. Responde como se
  // tivesse dado certo, mas não envia nada — não revela ao bot que foi
  // identificado.
  if (isNonEmptyString(body.hp_website)) {
    return res.status(200).json({ success: true, message: 'Cotação enviada com sucesso!' });
  }

  const errors = validatePayload(body);
  if (errors.length) {
    return res.status(400).json({ success: false, message: errors[0] });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[cotacao] RESEND_API_KEY não configurada nas variáveis de ambiente.');
    return res.status(500).json({ success: false, message: 'Não foi possível enviar sua cotação.' });
  }

  const origem = isNonEmptyString(body.origem, 60) ? body.origem : 'Site';

  const remetente = resolveRemetente();
  const destinatario = resolveDestinatario();

  try {
    const { subject, html, text } = buildEmail(body, origem);

    console.log(`[cotacao] Enviando e-mail — de: "${remetente}" | para: "${destinatario}" | tipo: ${body.tipo_seguro} | origem: ${origem}`);

    const { data, error } = await resend.emails.send({
      from: remetente,
      to: destinatario,
      replyTo: isValidEmailFormat(body.email || '') ? body.email : undefined,
      subject,
      html,
      text,
    });

    if (error) {
      // Loga o erro real do Resend (nome, mensagem, status) para diagnóstico
      // no painel da Vercel — nunca inclui a API key, só a resposta da API.
      console.error('[cotacao] Resend recusou o envio:', {
        name: error.name,
        message: error.message,
        statusCode: error.statusCode,
        from: remetente,
        to: destinatario,
      });
      return res.status(502).json({ success: false, message: 'Não foi possível enviar sua cotação.' });
    }

    console.log(`[cotacao] E-mail enviado com sucesso. id: ${data && data.id}`);
    return res.status(200).json({ success: true, message: 'Cotação enviada com sucesso!' });
  } catch (err) {
    console.error('[cotacao] Erro inesperado ao enviar cotação:', {
      message: err && err.message,
      name: err && err.name,
      from: remetente,
      to: destinatario,
    });
    return res.status(500).json({ success: false, message: 'Não foi possível enviar sua cotação.' });
  }
};

// Exports nomeados adicionais — usados apenas pelos testes locais deste
// arquivo (tests/*.js). O Vercel só chama a função default acima; isso não
// afeta o comportamento em produção.
module.exports.buildEmail = buildEmail;
module.exports.buildFieldSections = buildFieldSections;
module.exports.validatePayload = validatePayload;
module.exports.TIPO_LABELS = TIPO_LABELS;
module.exports.resolveDestinatario = resolveDestinatario;
module.exports.resolveRemetente = resolveRemetente;
