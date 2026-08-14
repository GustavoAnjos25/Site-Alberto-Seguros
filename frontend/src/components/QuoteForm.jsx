import { useState } from 'react'
import toast from 'react-hot-toast'
import { usePixel } from '../hooks/usePixel'
import { formatCPF, formatCEP, formatPhone, formatCNPJ, validateCPF, validateCEP, validatePhone } from '../utils/formatters'
import { sendCotacao } from '../services/emailService.js'

const insuranceTypes = [
  { id: 'auto', label: 'Automóvel' },
  { id: 'moto', label: 'Moto' },
  { id: 'residencial', label: 'Residencial' },
  { id: 'vida', label: 'Vida' },
  { id: 'saude', label: 'Saúde' },
  { id: 'viagem', label: 'Viagem' },
  { id: 'empresarial', label: 'Empresarial' },
  { id: 'outro', label: 'Outro' },
]

const estadoCivilOptions = ['Solteiro', 'Casado', 'União Estável', 'Divorciado', 'Viúvo']
const simNaoOptions = ['Sim', 'Não']
const tipoImovelOptions = ['Casa', 'Apartamento', 'Sobrado', 'Geminado']
const utilizacaoOptions = ['Habitual', 'Veraneio']
const bonusVeiculoOptions = Array.from({ length: 11 }, (_, i) => String(i)) // 0 a 10
const bonusResidencialOptions = Array.from({ length: 6 }, (_, i) => String(i)) // 0 a 5

function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
      <circle cx="6.5" cy="16.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </svg>
  )
}

function MotoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function HealthIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

function PlaneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M2 12h20" />
      <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
      <path d="M12 2v10" />
      <path d="m12 2 4 4" />
      <path d="m12 2-4 4" />
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

function DotsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )
}

const iconMap = {
  auto: CarIcon,
  moto: MotoIcon,
  residencial: HomeIcon,
  vida: HeartIcon,
  saude: HealthIcon,
  viagem: PlaneIcon,
  empresarial: BuildingIcon,
  outro: DotsIcon,
}

const initialFormData = {
  nome: '', cpf: '', cep: '', whatsapp: '', email: '',
  veiculo_0km_auto: '', chassi_auto: '', placa_auto: '', estado_civil_auto: '', filhos_auto: '', possui_seguro_auto: '', bonus_auto: '',
  veiculo_0km_moto: '', chassi_moto: '', placa_moto: '', estado_civil_moto: '', possui_seguro_moto: '', bonus_moto: '',
  numero: '', complemento: '', tipo_imovel: '', utilizacao: '', possui_seguro_residencial: '', bonus_residencial: '',
  data_nascimento_vida: '', profissao: '',
  tipo_pessoa_saude: '', quantidade_vidas: '', data_nascimento_titular: '',
  cnpj_saude: '', quantidade_funcionarios: '',
  pais_destino: '', data_ida: '', data_volta: '', quantidade_viajantes: '',
  nome_empresa: '', cnpj_empresarial: '', ramo_atividade: '',
}

/**
 * Formulário de cotação da Alberto Seguros.
 *
 * Componente reutilizável: usado tanto de forma compacta na primeira dobra
 * da Home (integrado ao Hero) quanto na página completa de Seguros/Cotações.
 *
 * Props:
 * - compact: reduz paddings/tamanhos para caber ao lado do Hero.
 * - showHeading: exibe (ou não) o título "Solicite sua Cotação".
 * - onSuccess: callback opcional chamado após envio com sucesso.
 */
export default function QuoteForm({ compact = false, showHeading = true, className = '' }) {
  const { track } = usePixel()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [tipoSeguro, setTipoSeguro] = useState('')
  const [tipoPessoaSaude, setTipoPessoaSaude] = useState('')
  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleSelectInsurance = (id) => {
    setTipoSeguro(id)
    track(`seguro_${id}`)
    if (errors.tipo_seguro) setErrors(prev => ({ ...prev, tipo_seguro: '' }))
  }

  // Pergunta "O veículo é 0 km?" — controla se pedimos chassi ou placa.
  const handleZeroKm = (type, value) => {
    setFormData(prev => ({
      ...prev,
      [`veiculo_0km_${type}`]: value,
      // Limpa o campo que não será mais usado, evitando enviar dado obsoleto.
      ...(value === 'Sim' ? { [`placa_${type}`]: '' } : { [`chassi_${type}`]: '' }),
    }))
    track(`radio_veiculo_0km_${type}_${value.toLowerCase()}`)
    setErrors(prev => ({ ...prev, [`veiculo_0km_${type}`]: '', [`placa_${type}`]: '', [`chassi_${type}`]: '' }))
  }

  // Pergunta "Já possui seguro?" — controla a exibição do campo de bônus.
  const handlePossuiSeguro = (field, bonusField, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(value === 'Não' ? { [bonusField]: '' } : {}),
    }))
    track(`radio_${field}_${value.toLowerCase()}`)
  }

  const validate = () => {
    const newErrors = {}
    if (!tipoSeguro) newErrors.tipo_seguro = 'Selecione um tipo de seguro'
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório'
    if (!formData.cpf || !validateCPF(formData.cpf)) newErrors.cpf = 'CPF inválido'
    if (!formData.cep || !validateCEP(formData.cep)) newErrors.cep = 'CEP inválido'
    if (!formData.whatsapp || !validatePhone(formData.whatsapp)) newErrors.whatsapp = 'WhatsApp inválido'

    if (tipoSeguro === 'auto') {
      if (!formData.veiculo_0km_auto) newErrors.veiculo_0km_auto = 'Informe se o veículo é 0 km'
      if (formData.veiculo_0km_auto === 'Sim' && !formData.chassi_auto) newErrors.chassi_auto = 'Chassi é obrigatório'
      if (formData.veiculo_0km_auto === 'Não' && !formData.placa_auto) newErrors.placa_auto = 'Placa é obrigatória'
      if (!formData.estado_civil_auto) newErrors.estado_civil_auto = 'Estado civil é obrigatório'
    }
    if (tipoSeguro === 'moto') {
      if (!formData.veiculo_0km_moto) newErrors.veiculo_0km_moto = 'Informe se a moto é 0 km'
      if (formData.veiculo_0km_moto === 'Sim' && !formData.chassi_moto) newErrors.chassi_moto = 'Chassi é obrigatório'
      if (formData.veiculo_0km_moto === 'Não' && !formData.placa_moto) newErrors.placa_moto = 'Placa é obrigatória'
      if (!formData.estado_civil_moto) newErrors.estado_civil_moto = 'Estado civil é obrigatório'
    }
    if (tipoSeguro === 'residencial') {
      if (!formData.numero) newErrors.numero = 'Número é obrigatório'
    }
    if (tipoSeguro === 'vida') {
      if (!formData.data_nascimento_vida) newErrors.data_nascimento_vida = 'Data de nascimento é obrigatória'
      if (!formData.profissao) newErrors.profissao = 'Profissão é obrigatória'
    }
    if (tipoSeguro === 'saude') {
      if (!formData.quantidade_vidas) newErrors.quantidade_vidas = 'Quantidade de vidas é obrigatória'
      if (!formData.data_nascimento_titular) newErrors.data_nascimento_titular = 'Data de nascimento é obrigatória'
      if (tipoPessoaSaude === 'pj') {
        if (!formData.cnpj_saude) newErrors.cnpj_saude = 'CNPJ é obrigatório'
        if (!formData.quantidade_funcionarios) newErrors.quantidade_funcionarios = 'Quantidade de funcionários é obrigatória'
      }
    }
    if (tipoSeguro === 'viagem') {
      if (!formData.pais_destino) newErrors.pais_destino = 'País de destino é obrigatório'
      if (!formData.data_ida) newErrors.data_ida = 'Data de ida é obrigatória'
      if (!formData.data_volta) newErrors.data_volta = 'Data de volta é obrigatória'
      if (!formData.quantidade_viajantes) newErrors.quantidade_viajantes = 'Quantidade de viajantes é obrigatória'
    }
    if (tipoSeguro === 'empresarial') {
      if (!formData.nome_empresa) newErrors.nome_empresa = 'Nome da empresa é obrigatório'
      if (!formData.cnpj_empresarial) newErrors.cnpj_empresarial = 'CNPJ é obrigatório'
      if (!formData.ramo_atividade) newErrors.ramo_atividade = 'Ramo de atividade é obrigatório'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      toast.error('Preencha todos os campos obrigatórios')
      return
    }

    setLoading(true)
    try {
      const payload = { ...formData, tipo_seguro: tipoSeguro }
      const data = await sendCotacao(payload)
      if (data.success) {
        setSubmitted(true)
        toast.success('Cotação enviada com sucesso!')
        track('formulario_enviado', { tipo_seguro: tipoSeguro })
      } else {
        toast.error(data.message || 'Erro ao enviar')
      }
    } catch (err) {
      toast.error('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSubmitted(false)
    setTipoSeguro('')
    setTipoPessoaSaude('')
    setFormData(initialFormData)
    setErrors({})
  }

  const inputProps = (field, formatter = null) => ({
    value: formData[field],
    onChange: (e) => {
      const val = formatter ? formatter(e.target.value) : e.target.value
      handleChange(field, val)
    },
    onFocus: () => track(`campo_${field}`),
    className: `form-input ${compact ? 'form-input-compact' : ''} ${errors[field] ? 'error' : ''}`,
    'data-pixel': `campo_${field}`,
  })

  const radioProps = (name, value) => ({
    type: 'radio',
    name,
    value,
    checked: formData[name] === value,
    onChange: () => {
      handleChange(name, value)
      track(`radio_${name}_${value.toLowerCase().replace(/\s/g, '_')}`)
    },
    'data-pixel': `radio_${name}_${value.toLowerCase().replace(/\s/g, '_')}`,
  })

  const cardPad = compact ? 'px-5 sm:px-6 pt-2 pb-6 sm:pb-7' : 'p-10 lg:p-12'
  const blockPad = compact ? 'p-4 sm:p-5' : 'p-6 sm:p-7'
  const gapY = compact ? 'mb-5' : 'mb-6'

  if (submitted) {
    return (
      <div className={`text-center ${compact ? 'py-10 px-4' : 'py-20 px-6'} animate-fade-in ${className}`}>
        <div className={`${compact ? 'w-14 h-14' : 'w-20 h-20'} bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 animate-scale-in`}>
          <svg className={compact ? 'w-7 h-7 text-white' : 'w-10 h-10 text-white'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className={`${compact ? 'text-lg' : 'text-2xl'} font-bold text-slate-900 mb-2`}>Sua solicitação foi enviada com sucesso!</h3>
        <p className="text-slate-500 max-w-md mx-auto mb-6 text-sm">
          Em breve nossa equipe entrará em contato para apresentar sua cotação.
        </p>
        <button onClick={resetForm} className="btn-secondary bg-slate-100 text-slate-700 font-semibold px-8 py-3.5 rounded-2xl hover:bg-slate-200 transition-colors">
          Enviar nova cotação
        </button>
      </div>
    )
  }

  return (
    <div className={className} data-quote-form>
      {showHeading && (
        <div className={compact
          ? 'text-center px-5 sm:px-6 pt-7 sm:pt-8 pb-3'
          : 'text-center pt-12 pb-8 px-6 bg-gradient-to-b from-slate-50 to-white'
        }>
          <div className={`inline-flex items-center justify-center ${compact ? 'w-10 h-10 mb-2.5' : 'w-14 h-14 mb-4'} bg-primary/10 rounded-xl text-primary`}>
            <svg className={compact ? 'w-5 h-5' : 'w-7 h-7'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h2 className={`${compact ? 'text-xl' : 'text-3xl'} font-bold text-slate-900 mb-2`}>Solicite sua Cotação</h2>
          {!compact && (
            <p className="text-slate-500 max-w-xl mx-auto">
              Preencha as informações abaixo. Nossa equipe fará uma cotação personalizada e entrará em contato o mais breve possível.
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className={cardPad}>
        <div className={gapY}>
          <label className="form-label">Qual seguro você procura? <span className="text-red-500">*</span></label>
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3`}>
            {insuranceTypes.map((type) => {
              const Icon = iconMap[type.id]
              return (
                <div
                  key={type.id}
                  className={`insurance-card ${compact ? 'p-3.5' : 'p-4'} ${tipoSeguro === type.id ? 'selected' : ''}`}
                  onClick={() => handleSelectInsurance(type.id)}
                  data-pixel={`seguro_${type.id}`}
                >
                  <div className={`w-9 h-9 mx-auto mb-1.5 rounded-lg flex items-center justify-center transition-colors ${
                    tipoSeguro === type.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <Icon />
                  </div>
                  <div className={`text-[11px] font-semibold uppercase tracking-wide ${tipoSeguro === type.id ? 'text-primary' : 'text-slate-600'}`}>
                    {type.label}
                  </div>
                </div>
              )
            })}
          </div>
          {errors.tipo_seguro && <p className="text-red-500 text-sm mt-2">{errors.tipo_seguro}</p>}
        </div>

        <div className={gapY}>
          <label className="form-label">Nome Completo <span className="text-red-500">*</span></label>
          <input {...inputProps('nome')} placeholder="Digite seu nome completo" />
          {errors.nome && <p className="text-red-500 text-sm mt-2">{errors.nome}</p>}
        </div>

        <div className={`grid sm:grid-cols-2 gap-4 ${gapY}`}>
          <div>
            <label className="form-label">CPF <span className="text-red-500">*</span></label>
            <input {...inputProps('cpf', formatCPF)} placeholder="000.000.000-00" maxLength={14} />
            {errors.cpf && <p className="text-red-500 text-sm mt-2">{errors.cpf}</p>}
          </div>
          <div>
            <label className="form-label">CEP <span className="text-red-500">*</span></label>
            <input {...inputProps('cep', formatCEP)} placeholder="00000-000" maxLength={9} />
            {errors.cep && <p className="text-red-500 text-sm mt-2">{errors.cep}</p>}
          </div>
        </div>

        <div className={`grid sm:grid-cols-2 gap-4 ${gapY}`}>
          <div>
            <label className="form-label">WhatsApp <span className="text-red-500">*</span></label>
            <input {...inputProps('whatsapp', formatPhone)} placeholder="(00) 00000-0000" maxLength={15} />
            {errors.whatsapp && <p className="text-red-500 text-sm mt-2">{errors.whatsapp}</p>}
          </div>
          <div>
            <label className="form-label">E-mail <span className="text-slate-400 font-normal normal-case">(Opcional)</span></label>
            <input {...inputProps('email')} type="email" placeholder="seu@email.com" />
          </div>
        </div>

        {tipoSeguro === 'auto' && (
          <div className={`animate-fade-in ${blockPad} bg-slate-50 rounded-xl border border-slate-200 ${gapY}`}>
            <h4 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wide mb-4">
              <span className="w-1 h-4 bg-primary rounded-full" />
              Informações do Veículo
            </h4>

            <div className="mb-4">
              <label className="form-label">O veículo é 0 km? <span className="text-red-500">*</span></label>
              <div className="flex flex-wrap gap-3">
                {simNaoOptions.map(opt => (
                  <div key={opt} className="radio-option">
                    <input
                      type="radio"
                      name="veiculo_0km_auto"
                      value={opt}
                      checked={formData.veiculo_0km_auto === opt}
                      onChange={() => handleZeroKm('auto', opt)}
                      id={`zerokm_auto_${opt}`}
                      data-pixel={`radio_veiculo_0km_auto_${opt.toLowerCase()}`}
                    />
                    <label htmlFor={`zerokm_auto_${opt}`}>{opt}</label>
                  </div>
                ))}
              </div>
              {errors.veiculo_0km_auto && <p className="text-red-500 text-sm mt-2">{errors.veiculo_0km_auto}</p>}
            </div>

            {formData.veiculo_0km_auto === 'Sim' && (
              <div className="mb-4 animate-fade-in">
                <label className="form-label">Informe o chassi do veículo <span className="text-red-500">*</span></label>
                <input {...inputProps('chassi_auto')} placeholder="9BW..." maxLength={17} />
                {errors.chassi_auto && <p className="text-red-500 text-sm mt-2">{errors.chassi_auto}</p>}
              </div>
            )}

            {formData.veiculo_0km_auto === 'Não' && (
              <div className="mb-4 animate-fade-in">
                <label className="form-label">Informe a placa do veículo <span className="text-red-500">*</span></label>
                <input {...inputProps('placa_auto')} placeholder="ABC1D23" maxLength={7} />
                {errors.placa_auto && <p className="text-red-500 text-sm mt-2">{errors.placa_auto}</p>}
              </div>
            )}

            <div className="mb-4">
              <label className="form-label">Estado Civil <span className="text-red-500">*</span></label>
              <div className="flex flex-wrap gap-3">
                {estadoCivilOptions.map(opt => (
                  <div key={opt} className="radio-option">
                    <input {...radioProps('estado_civil_auto', opt)} id={`ec_auto_${opt}`} />
                    <label htmlFor={`ec_auto_${opt}`}>{opt}</label>
                  </div>
                ))}
              </div>
              {errors.estado_civil_auto && <p className="text-red-500 text-sm mt-2">{errors.estado_civil_auto}</p>}
            </div>

            <div className="mb-4">
              <label className="form-label">Algum filho menor de 26 anos mora com você?</label>
              <div className="flex flex-wrap gap-3">
                {simNaoOptions.map(opt => (
                  <div key={opt} className="radio-option">
                    <input {...radioProps('filhos_auto', opt)} id={`filhos_auto_${opt}`} />
                    <label htmlFor={`filhos_auto_${opt}`}>{opt}</label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">Já possui seguro?</label>
              <div className="flex flex-wrap gap-3">
                {simNaoOptions.map(opt => (
                  <div key={opt} className="radio-option">
                    <input
                      type="radio"
                      name="possui_seguro_auto"
                      value={opt}
                      checked={formData.possui_seguro_auto === opt}
                      onChange={() => handlePossuiSeguro('possui_seguro_auto', 'bonus_auto', opt)}
                      id={`possui_auto_${opt}`}
                      data-pixel={`radio_possui_seguro_auto_${opt.toLowerCase()}`}
                    />
                    <label htmlFor={`possui_auto_${opt}`}>{opt}</label>
                  </div>
                ))}
              </div>
            </div>

            {formData.possui_seguro_auto === 'Sim' && (
              <div className="mt-4 animate-fade-in">
                <label className="form-label">Qual é o seu bônus?</label>
                <select
                  value={formData.bonus_auto}
                  onChange={(e) => handleChange('bonus_auto', e.target.value)}
                  className={`form-input ${compact ? 'form-input-compact' : ''}`}
                >
                  <option value="">Selecione</option>
                  {bonusVeiculoOptions.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            )}
          </div>
        )}

        {tipoSeguro === 'moto' && (
          <div className={`animate-fade-in ${blockPad} bg-slate-50 rounded-xl border border-slate-200 ${gapY}`}>
            <h4 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wide mb-4">
              <span className="w-1 h-4 bg-primary rounded-full" />
              Informações da Moto
            </h4>

            <div className="mb-4">
              <label className="form-label">O veículo é 0 km? <span className="text-red-500">*</span></label>
              <div className="flex flex-wrap gap-3">
                {simNaoOptions.map(opt => (
                  <div key={opt} className="radio-option">
                    <input
                      type="radio"
                      name="veiculo_0km_moto"
                      value={opt}
                      checked={formData.veiculo_0km_moto === opt}
                      onChange={() => handleZeroKm('moto', opt)}
                      id={`zerokm_moto_${opt}`}
                      data-pixel={`radio_veiculo_0km_moto_${opt.toLowerCase()}`}
                    />
                    <label htmlFor={`zerokm_moto_${opt}`}>{opt}</label>
                  </div>
                ))}
              </div>
              {errors.veiculo_0km_moto && <p className="text-red-500 text-sm mt-2">{errors.veiculo_0km_moto}</p>}
            </div>

            {formData.veiculo_0km_moto === 'Sim' && (
              <div className="mb-4 animate-fade-in">
                <label className="form-label">Informe o chassi do veículo <span className="text-red-500">*</span></label>
                <input {...inputProps('chassi_moto')} placeholder="9BW..." maxLength={17} />
                {errors.chassi_moto && <p className="text-red-500 text-sm mt-2">{errors.chassi_moto}</p>}
              </div>
            )}

            {formData.veiculo_0km_moto === 'Não' && (
              <div className="mb-4 animate-fade-in">
                <label className="form-label">Informe a placa do veículo <span className="text-red-500">*</span></label>
                <input {...inputProps('placa_moto')} placeholder="ABC1D23" maxLength={7} />
                {errors.placa_moto && <p className="text-red-500 text-sm mt-2">{errors.placa_moto}</p>}
              </div>
            )}

            <div className="mb-4">
              <label className="form-label">Estado Civil <span className="text-red-500">*</span></label>
              <div className="flex flex-wrap gap-3">
                {estadoCivilOptions.map(opt => (
                  <div key={opt} className="radio-option">
                    <input {...radioProps('estado_civil_moto', opt)} id={`ec_moto_${opt}`} />
                    <label htmlFor={`ec_moto_${opt}`}>{opt}</label>
                  </div>
                ))}
              </div>
              {errors.estado_civil_moto && <p className="text-red-500 text-sm mt-2">{errors.estado_civil_moto}</p>}
            </div>

            <div>
              <label className="form-label">Já possui seguro?</label>
              <div className="flex flex-wrap gap-3">
                {simNaoOptions.map(opt => (
                  <div key={opt} className="radio-option">
                    <input
                      type="radio"
                      name="possui_seguro_moto"
                      value={opt}
                      checked={formData.possui_seguro_moto === opt}
                      onChange={() => handlePossuiSeguro('possui_seguro_moto', 'bonus_moto', opt)}
                      id={`possui_moto_${opt}`}
                      data-pixel={`radio_possui_seguro_moto_${opt.toLowerCase()}`}
                    />
                    <label htmlFor={`possui_moto_${opt}`}>{opt}</label>
                  </div>
                ))}
              </div>
            </div>

            {formData.possui_seguro_moto === 'Sim' && (
              <div className="mt-4 animate-fade-in">
                <label className="form-label">Qual é o seu bônus?</label>
                <select
                  value={formData.bonus_moto}
                  onChange={(e) => handleChange('bonus_moto', e.target.value)}
                  className={`form-input ${compact ? 'form-input-compact' : ''}`}
                >
                  <option value="">Selecione</option>
                  {bonusVeiculoOptions.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            )}
          </div>
        )}

        {tipoSeguro === 'residencial' && (
          <div className={`animate-fade-in ${blockPad} bg-slate-50 rounded-xl border border-slate-200 ${gapY}`}>
            <h4 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wide mb-4">
              <span className="w-1 h-4 bg-primary rounded-full" />
              Informações do Imóvel
            </h4>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="form-label">Número <span className="text-red-500">*</span></label>
                <input {...inputProps('numero')} placeholder="123" />
                {errors.numero && <p className="text-red-500 text-sm mt-2">{errors.numero}</p>}
              </div>
              <div>
                <label className="form-label">Complemento <span className="text-slate-400 font-normal normal-case">(Opcional)</span></label>
                <input {...inputProps('complemento')} placeholder="Apto 101" />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Tipo do Imóvel</label>
              <div className="flex flex-wrap gap-3">
                {tipoImovelOptions.map(opt => (
                  <div key={opt} className="radio-option">
                    <input {...radioProps('tipo_imovel', opt)} id={`tipo_${opt}`} />
                    <label htmlFor={`tipo_${opt}`}>{opt}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Utilização do Imóvel</label>
              <div className="flex flex-wrap gap-3">
                {utilizacaoOptions.map(opt => (
                  <div key={opt} className="radio-option">
                    <input {...radioProps('utilizacao', opt)} id={`util_${opt}`} />
                    <label htmlFor={`util_${opt}`}>{opt}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="form-label">Já possui seguro?</label>
              <div className="flex flex-wrap gap-3">
                {simNaoOptions.map(opt => (
                  <div key={opt} className="radio-option">
                    <input
                      type="radio"
                      name="possui_seguro_residencial"
                      value={opt}
                      checked={formData.possui_seguro_residencial === opt}
                      onChange={() => handlePossuiSeguro('possui_seguro_residencial', 'bonus_residencial', opt)}
                      id={`possui_resid_${opt}`}
                      data-pixel={`radio_possui_seguro_residencial_${opt.toLowerCase()}`}
                    />
                    <label htmlFor={`possui_resid_${opt}`}>{opt}</label>
                  </div>
                ))}
              </div>
            </div>

            {formData.possui_seguro_residencial === 'Sim' && (
              <div className="mt-4 animate-fade-in">
                <label className="form-label">Qual é o seu bônus?</label>
                <select
                  value={formData.bonus_residencial}
                  onChange={(e) => handleChange('bonus_residencial', e.target.value)}
                  className={`form-input ${compact ? 'form-input-compact' : ''}`}
                >
                  <option value="">Selecione</option>
                  {bonusResidencialOptions.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            )}
          </div>
        )}

        {tipoSeguro === 'vida' && (
          <div className={`animate-fade-in ${blockPad} bg-slate-50 rounded-xl border border-slate-200 ${gapY}`}>
            <h4 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wide mb-4">
              <span className="w-1 h-4 bg-primary rounded-full" />
              Informações Pessoais
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Data de Nascimento <span className="text-red-500">*</span></label>
                <input {...inputProps('data_nascimento_vida')} type="date" />
                {errors.data_nascimento_vida && <p className="text-red-500 text-sm mt-2">{errors.data_nascimento_vida}</p>}
              </div>
              <div>
                <label className="form-label">Profissão <span className="text-red-500">*</span></label>
                <input {...inputProps('profissao')} placeholder="Sua profissão" />
                {errors.profissao && <p className="text-red-500 text-sm mt-2">{errors.profissao}</p>}
              </div>
            </div>
          </div>
        )}

        {tipoSeguro === 'saude' && (
          <div className={`animate-fade-in ${blockPad} bg-slate-50 rounded-xl border border-slate-200 ${gapY}`}>
            <h4 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wide mb-4">
              <span className="w-1 h-4 bg-primary rounded-full" />
              Informações do Plano de Saúde
            </h4>
            <div className="mb-4">
              <label className="form-label">Pessoa Física ou Jurídica?</label>
              <div className="flex flex-wrap gap-3">
                {['PF', 'PJ'].map(opt => (
                  <div key={opt} className="radio-option">
                    <input
                      type="radio"
                      name="tipo_pessoa_saude"
                      value={opt.toLowerCase()}
                      checked={tipoPessoaSaude === opt.toLowerCase()}
                      onChange={() => {
                        setTipoPessoaSaude(opt.toLowerCase())
                        handleChange('tipo_pessoa_saude', opt.toLowerCase())
                        track(`radio_tipo_pessoa_saude_${opt.toLowerCase()}`)
                      }}
                      id={`saude_${opt.toLowerCase()}`}
                      data-pixel={`radio_tipo_pessoa_saude_${opt.toLowerCase()}`}
                    />
                    <label htmlFor={`saude_${opt.toLowerCase()}`}>{opt}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="form-label">Quantidade de Vidas <span className="text-red-500">*</span></label>
                <input {...inputProps('quantidade_vidas')} type="number" min="1" placeholder="1" />
                {errors.quantidade_vidas && <p className="text-red-500 text-sm mt-2">{errors.quantidade_vidas}</p>}
              </div>
              <div>
                <label className="form-label">Data de Nascimento do Titular <span className="text-red-500">*</span></label>
                <input {...inputProps('data_nascimento_titular')} type="date" />
                {errors.data_nascimento_titular && <p className="text-red-500 text-sm mt-2">{errors.data_nascimento_titular}</p>}
              </div>
            </div>
            {tipoPessoaSaude === 'pj' && (
              <div className="animate-fade-in grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">CNPJ <span className="text-red-500">*</span></label>
                  <input {...inputProps('cnpj_saude', formatCNPJ)} placeholder="00.000.000/0000-00" maxLength={18} />
                  {errors.cnpj_saude && <p className="text-red-500 text-sm mt-2">{errors.cnpj_saude}</p>}
                </div>
                <div>
                  <label className="form-label">Quantidade de Funcionários <span className="text-red-500">*</span></label>
                  <input {...inputProps('quantidade_funcionarios')} type="number" min="1" placeholder="1" />
                  {errors.quantidade_funcionarios && <p className="text-red-500 text-sm mt-2">{errors.quantidade_funcionarios}</p>}
                </div>
              </div>
            )}
          </div>
        )}

        {tipoSeguro === 'viagem' && (
          <div className={`animate-fade-in ${blockPad} bg-slate-50 rounded-xl border border-slate-200 ${gapY}`}>
            <h4 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wide mb-4">
              <span className="w-1 h-4 bg-primary rounded-full" />
              Informações da Viagem
            </h4>
            <div className="mb-4">
              <label className="form-label">País de Destino <span className="text-red-500">*</span></label>
              <input {...inputProps('pais_destino')} placeholder="Ex: Estados Unidos" />
              {errors.pais_destino && <p className="text-red-500 text-sm mt-2">{errors.pais_destino}</p>}
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="form-label">Data de Ida <span className="text-red-500">*</span></label>
                <input {...inputProps('data_ida')} type="date" />
                {errors.data_ida && <p className="text-red-500 text-sm mt-2">{errors.data_ida}</p>}
              </div>
              <div>
                <label className="form-label">Data de Volta <span className="text-red-500">*</span></label>
                <input {...inputProps('data_volta')} type="date" />
                {errors.data_volta && <p className="text-red-500 text-sm mt-2">{errors.data_volta}</p>}
              </div>
              <div>
                <label className="form-label">Qtd. Viajantes <span className="text-red-500">*</span></label>
                <input {...inputProps('quantidade_viajantes')} type="number" min="1" placeholder="1" />
                {errors.quantidade_viajantes && <p className="text-red-500 text-sm mt-2">{errors.quantidade_viajantes}</p>}
              </div>
            </div>
          </div>
        )}

        {tipoSeguro === 'empresarial' && (
          <div className={`animate-fade-in ${blockPad} bg-slate-50 rounded-xl border border-slate-200 ${gapY}`}>
            <h4 className="flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wide mb-4">
              <span className="w-1 h-4 bg-primary rounded-full" />
              Informações da Empresa
            </h4>
            <div className="mb-4">
              <label className="form-label">Nome da Empresa <span className="text-red-500">*</span></label>
              <input {...inputProps('nome_empresa')} placeholder="Nome da empresa" />
              {errors.nome_empresa && <p className="text-red-500 text-sm mt-2">{errors.nome_empresa}</p>}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">CNPJ <span className="text-red-500">*</span></label>
                <input {...inputProps('cnpj_empresarial', formatCNPJ)} placeholder="00.000.000/0000-00" maxLength={18} />
                {errors.cnpj_empresarial && <p className="text-red-500 text-sm mt-2">{errors.cnpj_empresarial}</p>}
              </div>
              <div>
                <label className="form-label">Ramo de Atividade <span className="text-red-500">*</span></label>
                <input {...inputProps('ramo_atividade')} placeholder="Ex: Comércio" />
                {errors.ramo_atividade && <p className="text-red-500 text-sm mt-2">{errors.ramo_atividade}</p>}
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Enviando...
            </>
          ) : (
            'Receber minha cotação'
          )}
        </button>
        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-400">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Seus dados estão seguros conosco.
        </div>
      </form>
    </div>
  )
}
