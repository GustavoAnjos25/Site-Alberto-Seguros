process.env.RESEND_API_KEY = 're_test_fake_key_for_local_testing';

const handler = require('../api/cotacao.js');
const { buildFieldSections, buildEmail, validatePayload, resolveDestinatario, resolveRemetente } = handler;

let passed = 0;
let failed = 0;

function check(label, condition) {
  if (condition) {
    passed++;
    console.log(`  OK  ${label}`);
  } else {
    failed++;
    console.log(`  FAIL  ${label}`);
  }
}

function section(title) {
  console.log(`\n=== ${title} ===`);
}

// ---------------------------------------------------------------------------
// Base client fields shared by every scenario
// ---------------------------------------------------------------------------
const baseClient = {
  nome: 'João da Silva',
  cpf: '123.456.789-09',
  cep: '89200-000',
  whatsapp: '(47) 99999-9999',
  email: 'cliente@email.com',
};

// ---------------------------------------------------------------------------
// 1. AUTOMÓVEL — 0km = Sim (chassi, já possui seguro, bônus)
// ---------------------------------------------------------------------------
section('Automóvel — 0km = Sim + já possui seguro + bônus');
{
  const data = {
    ...baseClient,
    tipo_seguro: 'auto',
    veiculo_0km_auto: 'Sim',
    chassi_auto: '9BWZZZ377VT004251',
    placa_auto: '', // não deveria aparecer
    estado_civil_auto: 'Casado',
    filhos_auto: 'Não',
    possui_seguro_auto: 'Sim',
    bonus_auto: '7',
  };
  const sections = buildFieldSections(data);
  const [title, fields] = sections[0];
  const fieldMap = Object.fromEntries(fields);
  check('título da seção é "Informações do veículo"', title === 'Informações do veículo');
  check('0 km = Sim presente', fieldMap['0 km'] === 'Sim');
  check('Chassi presente e correto', fieldMap['Chassi'] === '9BWZZZ377VT004251');
  check('Placa NÃO aparece (0km=Sim)', !('Placa' in fieldMap));
  check('Estado civil presente', fieldMap['Estado civil'] === 'Casado');
  check('Já possui seguro = Sim', fieldMap['Já possui seguro'] === 'Sim');
  check('Bônus presente', fieldMap['Bônus'] === '7');

  const { subject } = buildEmail(data, 'Home');
  check('Assunto correto', subject === 'Nova cotação pelo site — AUTOMÓVEL');
}

// ---------------------------------------------------------------------------
// 2. AUTOMÓVEL usado — 0km = Não (placa, já possui seguro, bônus)
// ---------------------------------------------------------------------------
section('Automóvel usado — 0km = Não + já possui seguro + bônus');
{
  const data = {
    ...baseClient,
    tipo_seguro: 'auto',
    veiculo_0km_auto: 'Não',
    chassi_auto: '',
    placa_auto: 'ABC1D23',
    estado_civil_auto: 'Solteiro',
    filhos_auto: 'Sim',
    possui_seguro_auto: 'Sim',
    bonus_auto: '10',
  };
  const [, fields] = buildFieldSections(data)[0];
  const fieldMap = Object.fromEntries(fields);
  check('0 km = Não', fieldMap['0 km'] === 'Não');
  check('Placa presente e correta', fieldMap['Placa'] === 'ABC1D23');
  check('Chassi NÃO aparece (0km=Não)', !('Chassi' in fieldMap));
  check('Filhos presente', fieldMap['Filho(s) menor(es) de 26 anos'] === 'Sim');
  check('Bônus presente (0 a 10)', fieldMap['Bônus'] === '10');
}

// ---------------------------------------------------------------------------
// 3. AUTOMÓVEL — já possui seguro = Não (bônus NÃO deve aparecer)
// ---------------------------------------------------------------------------
section('Automóvel — já possui seguro = Não (bônus omitido)');
{
  const data = {
    ...baseClient,
    tipo_seguro: 'auto',
    veiculo_0km_auto: 'Sim',
    chassi_auto: '9BWZZZ377VT004251',
    estado_civil_auto: 'Viúvo',
    possui_seguro_auto: 'Não',
    bonus_auto: '', // vazio, não deveria aparecer mesmo se tivesse valor
  };
  const [, fields] = buildFieldSections(data)[0];
  const fieldMap = Object.fromEntries(fields);
  check('Já possui seguro = Não', fieldMap['Já possui seguro'] === 'Não');
  check('Bônus NÃO aparece quando já possui seguro = Não', !('Bônus' in fieldMap));
}

// ---------------------------------------------------------------------------
// 4. MOTO — 0km, chassi/placa, já possui seguro, bônus
// ---------------------------------------------------------------------------
section('Moto — 0km = Sim + já possui seguro + bônus');
{
  const data = {
    ...baseClient,
    tipo_seguro: 'moto',
    veiculo_0km_moto: 'Sim',
    chassi_moto: '9C6JC4110KR012345',
    estado_civil_moto: 'União Estável',
    possui_seguro_moto: 'Sim',
    bonus_moto: '3',
  };
  const [title, fields] = buildFieldSections(data)[0];
  const fieldMap = Object.fromEntries(fields);
  check('título "Informações da moto"', title === 'Informações da moto');
  check('Chassi presente', fieldMap['Chassi'] === '9C6JC4110KR012345');
  check('Filhos NÃO aparece pra moto (campo não existe nesse tipo)', !('Filho(s) menor(es) de 26 anos' in fieldMap));
  check('Bônus presente', fieldMap['Bônus'] === '3');

  const { subject } = buildEmail(data, 'Seguros / Cotações');
  check('Assunto correto (MOTO)', subject === 'Nova cotação pelo site — MOTO');
}

section('Moto — 0km = Não (placa)');
{
  const data = {
    ...baseClient,
    tipo_seguro: 'moto',
    veiculo_0km_moto: 'Não',
    placa_moto: 'XYZ9K88',
    estado_civil_moto: 'Divorciado',
    possui_seguro_moto: 'Não',
  };
  const [, fields] = buildFieldSections(data)[0];
  const fieldMap = Object.fromEntries(fields);
  check('Placa presente', fieldMap['Placa'] === 'XYZ9K88');
  check('Chassi ausente', !('Chassi' in fieldMap));
  check('Bônus ausente (não possui seguro)', !('Bônus' in fieldMap));
}

// ---------------------------------------------------------------------------
// 5. RESIDENCIAL — já possui seguro, bônus 0-5
// ---------------------------------------------------------------------------
section('Residencial — já possui seguro = Sim + bônus 0-5');
{
  const data = {
    ...baseClient,
    tipo_seguro: 'residencial',
    numero: '123',
    complemento: 'Apto 45',
    tipo_imovel: 'Apartamento',
    utilizacao: 'Habitual',
    possui_seguro_residencial: 'Sim',
    bonus_residencial: '5',
  };
  const [title, fields] = buildFieldSections(data)[0];
  const fieldMap = Object.fromEntries(fields);
  check('título "Informações do imóvel"', title === 'Informações do imóvel');
  check('Número presente', fieldMap['Número'] === '123');
  check('Bônus residencial presente (max 5)', fieldMap['Bônus'] === '5');

  const { subject } = buildEmail(data, 'Home');
  check('Assunto correto (RESIDENCIAL)', subject === 'Nova cotação pelo site — RESIDENCIAL');
}

section('Residencial — já possui seguro = Não (bônus omitido)');
{
  const data = {
    ...baseClient,
    tipo_seguro: 'residencial',
    numero: '456',
    tipo_imovel: 'Casa',
    utilizacao: 'Veraneio',
    possui_seguro_residencial: 'Não',
  };
  const [, fields] = buildFieldSections(data)[0];
  const fieldMap = Object.fromEntries(fields);
  check('Bônus ausente', !('Bônus' in fieldMap));
  check('Complemento ausente (não preenchido)', !('Complemento' in fieldMap));
}

// ---------------------------------------------------------------------------
// 6. Outros tipos: Vida, Saúde (PF e PJ), Viagem, Empresarial, Outro
// ---------------------------------------------------------------------------
section('Vida');
{
  const data = { ...baseClient, tipo_seguro: 'vida', data_nascimento_vida: '1990-05-10', profissao: 'Engenheiro' };
  const [, fields] = buildFieldSections(data)[0];
  const fieldMap = Object.fromEntries(fields);
  check('Data de nascimento presente', fieldMap['Data de nascimento'] === '1990-05-10');
  check('Profissão presente', fieldMap['Profissão'] === 'Engenheiro');
}

section('Saúde — Pessoa Física');
{
  const data = {
    ...baseClient, tipo_seguro: 'saude', tipo_pessoa_saude: 'pf',
    quantidade_vidas: '2', data_nascimento_titular: '1985-01-01',
  };
  const [, fields] = buildFieldSections(data)[0];
  const fieldMap = Object.fromEntries(fields);
  check('Tipo de pessoa = Pessoa Física', fieldMap['Tipo de pessoa'] === 'Pessoa Física');
  check('CNPJ NÃO aparece para PF', !('CNPJ' in fieldMap));
}

section('Saúde — Pessoa Jurídica');
{
  const data = {
    ...baseClient, tipo_seguro: 'saude', tipo_pessoa_saude: 'pj',
    quantidade_vidas: '15', data_nascimento_titular: '1985-01-01',
    cnpj_saude: '12.345.678/0001-90', quantidade_funcionarios: '15',
  };
  const [, fields] = buildFieldSections(data)[0];
  const fieldMap = Object.fromEntries(fields);
  check('Tipo de pessoa = Pessoa Jurídica', fieldMap['Tipo de pessoa'] === 'Pessoa Jurídica');
  check('CNPJ presente para PJ', fieldMap['CNPJ'] === '12.345.678/0001-90');
  check('Quantidade de funcionários presente', fieldMap['Quantidade de funcionários'] === '15');
}

section('Viagem');
{
  const data = {
    ...baseClient, tipo_seguro: 'viagem', pais_destino: 'Portugal',
    data_ida: '2026-12-01', data_volta: '2026-12-20', quantidade_viajantes: '2',
  };
  const [, fields] = buildFieldSections(data)[0];
  const fieldMap = Object.fromEntries(fields);
  check('País de destino presente', fieldMap['País de destino'] === 'Portugal');
  check('Quantidade de viajantes presente', fieldMap['Quantidade de viajantes'] === '2');
}

section('Empresarial');
{
  const data = {
    ...baseClient, tipo_seguro: 'empresarial', nome_empresa: 'ACME Ltda',
    cnpj_empresarial: '98.765.432/0001-10', ramo_atividade: 'Comércio',
  };
  const [, fields] = buildFieldSections(data)[0];
  const fieldMap = Object.fromEntries(fields);
  check('Nome da empresa presente', fieldMap['Nome da empresa'] === 'ACME Ltda');
  check('Ramo de atividade presente', fieldMap['Ramo de atividade'] === 'Comércio');
}

section('Outro (sem campos extras)');
{
  const data = { ...baseClient, tipo_seguro: 'outro' };
  const sections = buildFieldSections(data);
  check('Nenhuma seção extra para "Outro"', sections.length === 0);
  const { subject } = buildEmail(data, 'Home');
  check('Assunto correto (OUTRO)', subject === 'Nova cotação pelo site — OUTRO');
}

// ---------------------------------------------------------------------------
// 7. Dados do cliente / Origem sempre presentes
// ---------------------------------------------------------------------------
section('Dados do cliente e Origem no e-mail final');
{
  const data = { ...baseClient, tipo_seguro: 'auto', veiculo_0km_auto: 'Sim', chassi_auto: 'ABC123' };
  const { html, text } = buildEmail(data, 'Home');
  check('HTML contém nome do cliente', html.includes('João da Silva'));
  check('HTML contém CPF', html.includes('123.456.789-09'));
  check('HTML contém Origem: Home', html.includes('Origem: Home'));
  check('HTML contém contato da Alberto Seguros', html.includes('(47) 99929-7888') && html.includes('albertolseguros@albertoseguros.com'));
  check('Texto puro contém Origem: Home', text.includes('Origem: Home'));
  check('Texto puro contém NOVA COTAÇÃO PELO SITE', text.includes('NOVA COTAÇÃO PELO SITE'));
}

section('E-mail não informado mostra "Não informado"');
{
  const data = { ...baseClient, email: '', tipo_seguro: 'outro' };
  const { html } = buildEmail(data, 'Home');
  check('Mostra "Não informado" quando e-mail vazio', html.includes('Não informado'));
}

// ---------------------------------------------------------------------------
// 8. Escaping HTML (segurança básica contra injeção no corpo do e-mail)
// ---------------------------------------------------------------------------
section('Escaping de HTML nos campos');
{
  const data = { ...baseClient, nome: '<script>alert(1)</script>', tipo_seguro: 'outro' };
  const { html } = buildEmail(data, 'Home');
  check('Nome com HTML é escapado', !html.includes('<script>alert(1)</script>'));
  check('Versão escapada presente', html.includes('&lt;script&gt;'));
}

// ---------------------------------------------------------------------------
// 9. Validação — payloads inválidos são rejeitados
// ---------------------------------------------------------------------------
section('Validação de payload');
{
  check('Rejeita payload vazio', validatePayload({}).length > 0);
  check('Rejeita tipo_seguro inválido', validatePayload({ ...baseClient, tipo_seguro: 'foobar' }).length > 0);
  check('Rejeita sem nome', validatePayload({ ...baseClient, nome: '', tipo_seguro: 'outro' }).length > 0);
  check('Rejeita e-mail malformado', validatePayload({ ...baseClient, email: 'não-é-email', tipo_seguro: 'outro' }).length > 0);
  check('Aceita payload válido completo', validatePayload({ ...baseClient, tipo_seguro: 'outro' }).length === 0);
  check('Aceita sem e-mail (opcional)', validatePayload({ ...baseClient, email: '', tipo_seguro: 'outro' }).length === 0);
}

// ---------------------------------------------------------------------------
// 11. Resolução de RESEND_TO_EMAIL / RESEND_FROM_EMAIL a partir do ambiente
//     (bug relatado: envio parou de funcionar após configurar essas vars)
// ---------------------------------------------------------------------------
section('RESEND_TO_EMAIL / RESEND_FROM_EMAIL — resolução a partir do ambiente');
{
  const savedTo = process.env.RESEND_TO_EMAIL;
  const savedFrom = process.env.RESEND_FROM_EMAIL;

  // Sem as variáveis definidas -> usa os padrões fixos
  delete process.env.RESEND_TO_EMAIL;
  delete process.env.RESEND_FROM_EMAIL;
  check('Sem RESEND_TO_EMAIL, usa o padrão fixo', resolveDestinatario() === 'albertolseguros@albertoseguros.com');
  check('Sem RESEND_FROM_EMAIL, usa o remetente padrão do Resend', resolveRemetente() === 'Alberto Seguros <onboarding@resend.dev>');

  // Caso relatado pelo usuário: falta os sinais "<" ">" ao redor do e-mail
  process.env.RESEND_FROM_EMAIL = 'Alberto Seguros cotacoes@albertoseguros.com';
  check(
    'RESEND_FROM_EMAIL sem "< >" é corrigido automaticamente',
    resolveRemetente() === 'Alberto Seguros <cotacoes@albertoseguros.com>'
  );

  // Formato já correto, com "< >"
  process.env.RESEND_FROM_EMAIL = 'Alberto Seguros <cotacoes@albertoseguros.com>';
  check('RESEND_FROM_EMAIL já no formato correto é preservado', resolveRemetente() === 'Alberto Seguros <cotacoes@albertoseguros.com>');

  // Só o e-mail, sem nome de exibição
  process.env.RESEND_FROM_EMAIL = 'cotacoes@albertoseguros.com';
  check('RESEND_FROM_EMAIL só com e-mail (sem nome) é aceito', resolveRemetente() === 'cotacoes@albertoseguros.com');

  // Valor claramente inválido -> cai pro padrão, não derruba o envio
  process.env.RESEND_FROM_EMAIL = 'isso não é um email';
  check('RESEND_FROM_EMAIL inválido cai para o padrão', resolveRemetente() === 'Alberto Seguros <onboarding@resend.dev>');

  // RESEND_TO_EMAIL válido é usado
  process.env.RESEND_TO_EMAIL = 'destino@teste.com';
  check('RESEND_TO_EMAIL válido é usado como destinatário', resolveDestinatario() === 'destino@teste.com');

  // RESEND_TO_EMAIL inválido -> cai pro padrão fixo, não quebra o envio
  process.env.RESEND_TO_EMAIL = 'não é um email';
  check('RESEND_TO_EMAIL inválido cai para o padrão fixo', resolveDestinatario() === 'albertolseguros@albertoseguros.com');

  // RESEND_TO_EMAIL vazia (string em branco) -> cai pro padrão
  process.env.RESEND_TO_EMAIL = '   ';
  check('RESEND_TO_EMAIL em branco cai para o padrão fixo', resolveDestinatario() === 'albertolseguros@albertoseguros.com');

  // Restaura o ambiente original
  if (savedTo === undefined) delete process.env.RESEND_TO_EMAIL; else process.env.RESEND_TO_EMAIL = savedTo;
  if (savedFrom === undefined) delete process.env.RESEND_FROM_EMAIL; else process.env.RESEND_FROM_EMAIL = savedFrom;
}

// ---------------------------------------------------------------------------
// 10. Handler HTTP — mock de req/res
// ---------------------------------------------------------------------------
function mockRes() {
  const res = {
    statusCode: null,
    body: null,
    headers: {},
    setHeader(k, v) { this.headers[k] = v; },
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; },
    end() { return this; },
  };
  return res;
}

async function runHandlerTests() {
  section('Handler HTTP — métodos e validação');

  {
    const res = mockRes();
    await handler({ method: 'OPTIONS' }, res);
    check('OPTIONS retorna 200', res.statusCode === 200);
  }

  {
    const res = mockRes();
    await handler({ method: 'GET' }, res);
    check('GET retorna 405', res.statusCode === 405);
  }

  {
    const res = mockRes();
    await handler({ method: 'POST', body: {} }, res);
    check('POST vazio retorna 400', res.statusCode === 400);
    check('POST vazio: success=false', res.body.success === false);
  }

  {
    const res = mockRes();
    await handler({ method: 'POST', body: { ...baseClient, tipo_seguro: 'auto', hp_website: 'sou um bot' } }, res);
    check('Honeypot preenchido retorna 200 (engana o bot)', res.statusCode === 200);
    check('Honeypot: success=true sem enviar de verdade', res.body.success === true);
  }

  {
    // Payload válido -> deve tentar enviar via Resend. Sem rede/chave real
    // neste ambiente de teste, isso falha graciosamente (o importante é
    // NÃO travar e retornar uma mensagem amigável, sem stack trace).
    const res = mockRes();
    await handler({ method: 'POST', body: { ...baseClient, tipo_seguro: 'auto', veiculo_0km_auto: 'Sim', chassi_auto: 'ABC123', origem: 'Home' } }, res);
    check('Payload válido não derruba o handler (retornou algum status)', typeof res.statusCode === 'number');
    check('Nunca retorna erro técnico cru pro cliente', res.body && typeof res.body.message === 'string' && !res.body.message.includes('Error'));
    console.log(`     (status=${res.statusCode}, message="${res.body.message}") — esperado falhar aqui pois não há rede/chave real neste sandbox`);
  }

  {
    const res = mockRes();
    await handler({ method: 'POST', body: null }, res);
    check('body null não derruba o handler', typeof res.statusCode === 'number');
  }
}

runHandlerTests().then(() => {
  console.log(`\n\n${'='.repeat(50)}`);
  console.log(`RESULTADO: ${passed} passaram, ${failed} falharam`);
  console.log('='.repeat(50));
  if (failed > 0) process.exit(1);
});
