import type { AgendaStatus } from '@/ds'

export interface Profissional {
  id: string
  nome: string
  especialidade: string
  sala: string
}

export interface Agendamento {
  id: string
  /** Data no formato YYYY-MM-DD */
  data: string
  profissionalId: string
  /** 'HH:MM' no fuso da clínica */
  inicio: string
  /** minutos */
  duracao: number
  paciente: string
  tipo: string
  convenio: string
  status: AgendaStatus
  origem: string
  telefone: string
  sinal?: string
  /** Encaixe fora da grade regular */
  encaixe?: boolean
  observacao?: string
}

export const PROFISSIONAIS: Profissional[] = [
  { id: 'helena', nome: 'Dra. Helena Marques', especialidade: 'Clínica geral', sala: 'Sala 1' },
  { id: 'rafael', nome: 'Dr. Rafael Tavares', especialidade: 'Cardiologia', sala: 'Sala 2' },
  { id: 'camila', nome: 'Dra. Camila Nogueira', especialidade: 'Dermatologia', sala: 'Sala 3' },
  { id: 'bruno', nome: 'Dr. Bruno Salles', especialidade: 'Ortopedia', sala: 'Sala 4' },
]

export const HORA_INICIO = 8
export const HORA_FIM = 19
/** Granularidade da grade em minutos: 15 permite encaixe sem quebrar o alinhamento */
export const SLOT = 15

/** Dia de referência do protótipo: uma quinta-feira cheia, escrita à mão. */
export const DIA_BASE = '2026-09-24'

export const AGENDAMENTOS: Agendamento[] = [
  {
    id: 'a1',
    data: DIA_BASE,
    profissionalId: 'helena',
    inicio: '08:00',
    duracao: 30,
    paciente: 'Ana Beatriz Rocha',
    tipo: 'Retorno',
    convenio: 'Particular',
    status: 'chegou',
    origem: 'Instagram',
    telefone: '(62) 99812-4471',
    sinal: 'Pago via Pix',
  },
  {
    id: 'a2',
    data: DIA_BASE,
    profissionalId: 'helena',
    inicio: '08:30',
    duracao: 60,
    paciente: 'Carlos Eduardo Lima',
    tipo: 'Primeira consulta',
    convenio: 'Unimed',
    status: 'atendimento',
    origem: 'Indicação',
    telefone: '(62) 99145-2280',
  },
  {
    id: 'a3',
    data: DIA_BASE,
    profissionalId: 'helena',
    inicio: '10:00',
    duracao: 30,
    paciente: 'Mariana Duarte',
    tipo: 'Retorno',
    convenio: 'Particular',
    status: 'confirmado',
    origem: 'Site da clínica',
    telefone: '(62) 98877-1203',
    sinal: 'Pago via Pix',
  },
  {
    id: 'a4',
    data: DIA_BASE,
    profissionalId: 'helena',
    inicio: '10:45',
    duracao: 15,
    paciente: 'Sérgio Batista',
    tipo: 'Encaixe · avaliação',
    convenio: 'Particular',
    status: 'agendado',
    origem: 'WhatsApp',
    telefone: '(62) 99633-8890',
    encaixe: true,
    observacao: 'Encaixe pedido pela recepção às 9h12.',
  },
  {
    id: 'a5',
    data: DIA_BASE,
    profissionalId: 'helena',
    inicio: '11:00',
    duracao: 30,
    paciente: 'Juliana Prado',
    tipo: 'Retorno',
    convenio: 'Bradesco Saúde',
    status: 'faltou',
    origem: 'Google',
    telefone: '(62) 99001-7745',
  },
  {
    id: 'a6',
    data: DIA_BASE,
    profissionalId: 'helena',
    inicio: '14:00',
    duracao: 60,
    paciente: 'Roberto Nunes',
    tipo: 'Primeira consulta',
    convenio: 'Particular',
    status: 'agendado',
    origem: 'Instagram',
    telefone: '(62) 99554-1122',
  },
  {
    id: 'a7',
    data: DIA_BASE,
    profissionalId: 'helena',
    inicio: '15:30',
    duracao: 30,
    paciente: 'Letícia Campos',
    tipo: 'Retorno',
    convenio: 'Unimed',
    status: 'confirmado',
    origem: 'Indicação',
    telefone: '(62) 98120-6634',
  },

  {
    id: 'b1',
    data: DIA_BASE,
    profissionalId: 'rafael',
    inicio: '08:00',
    duracao: 60,
    paciente: 'Paulo Henrique Dias',
    tipo: 'Eletrocardiograma',
    convenio: 'Unimed',
    status: 'chegou',
    origem: 'Encaminhamento',
    telefone: '(62) 99777-3341',
  },
  {
    id: 'b2',
    data: DIA_BASE,
    profissionalId: 'rafael',
    inicio: '09:30',
    duracao: 30,
    paciente: 'Sandra Oliveira',
    tipo: 'Retorno',
    convenio: 'Particular',
    status: 'confirmado',
    origem: 'Site da clínica',
    telefone: '(62) 99223-8871',
    sinal: 'Pago via Pix',
  },
  {
    id: 'b3',
    data: DIA_BASE,
    profissionalId: 'rafael',
    inicio: '10:30',
    duracao: 30,
    paciente: 'Marcos Vinícius Reis',
    tipo: 'Primeira consulta',
    convenio: 'Amil',
    status: 'agendado',
    origem: 'Google',
    telefone: '(62) 98456-2019',
  },
  {
    id: 'b4',
    data: DIA_BASE,
    profissionalId: 'rafael',
    inicio: '14:30',
    duracao: 60,
    paciente: 'Fernanda Castro',
    tipo: 'Teste ergométrico',
    convenio: 'Unimed',
    status: 'confirmado',
    origem: 'Encaminhamento',
    telefone: '(62) 99312-4488',
  },
  {
    id: 'b5',
    data: DIA_BASE,
    profissionalId: 'rafael',
    inicio: '16:00',
    duracao: 30,
    paciente: 'Antônio Ferreira',
    tipo: 'Retorno',
    convenio: 'Particular',
    status: 'cancelado',
    origem: 'WhatsApp',
    telefone: '(62) 99880-5512',
    observacao: 'Cancelado pelo paciente com 3 dias de antecedência.',
  },

  {
    id: 'c1',
    data: DIA_BASE,
    profissionalId: 'camila',
    inicio: '09:00',
    duracao: 30,
    paciente: 'Isabela Moreira',
    tipo: 'Avaliação estética',
    convenio: 'Particular',
    status: 'atendimento',
    origem: 'Instagram',
    telefone: '(62) 99664-7781',
    sinal: 'Pago via Pix',
  },
  {
    id: 'c2',
    data: DIA_BASE,
    profissionalId: 'camila',
    inicio: '09:45',
    duracao: 45,
    paciente: 'Gustavo Almeida',
    tipo: 'Procedimento',
    convenio: 'Particular',
    status: 'confirmado',
    origem: 'Indicação',
    telefone: '(62) 99445-1123',
  },
  {
    id: 'c3',
    data: DIA_BASE,
    profissionalId: 'camila',
    inicio: '11:00',
    duracao: 30,
    paciente: 'Patrícia Souza',
    tipo: 'Retorno',
    convenio: 'SulAmérica',
    status: 'confirmado',
    origem: 'Site da clínica',
    telefone: '(62) 98221-9934',
  },
  {
    id: 'c4',
    data: DIA_BASE,
    profissionalId: 'camila',
    inicio: '15:00',
    duracao: 60,
    paciente: 'Renata Villaça',
    tipo: 'Procedimento',
    convenio: 'Particular',
    status: 'agendado',
    origem: 'Instagram',
    telefone: '(62) 99118-2245',
  },

  {
    id: 'd1',
    data: DIA_BASE,
    profissionalId: 'bruno',
    inicio: '08:30',
    duracao: 30,
    paciente: 'Thiago Barbosa',
    tipo: 'Retorno',
    convenio: 'Unimed',
    status: 'chegou',
    origem: 'Encaminhamento',
    telefone: '(62) 99772-3318',
  },
  {
    id: 'd2',
    data: DIA_BASE,
    profissionalId: 'bruno',
    inicio: '10:00',
    duracao: 30,
    paciente: 'Cláudia Mendes',
    tipo: 'Primeira consulta',
    convenio: 'Particular',
    status: 'confirmado',
    origem: 'Google',
    telefone: '(62) 99009-4471',
  },
  {
    id: 'd3',
    data: DIA_BASE,
    profissionalId: 'bruno',
    inicio: '13:30',
    duracao: 30,
    paciente: 'Eduardo Ramos',
    tipo: 'Retorno',
    convenio: 'Amil',
    status: 'agendado',
    origem: 'Indicação',
    telefone: '(62) 98334-7790',
  },
  {
    id: 'd4',
    data: DIA_BASE,
    profissionalId: 'bruno',
    inicio: '16:30',
    duracao: 60,
    paciente: 'Vanessa Coelho',
    tipo: 'Infiltração',
    convenio: 'Particular',
    status: 'confirmado',
    origem: 'Site da clínica',
    telefone: '(62) 99556-1187',
    sinal: 'Sinal de R$ 150 pago',
  },
]

/** Histórico de alterações — requisito §11.1, item 8 */
export const HISTORICO: Record<string, { quando: string; quem: string; oque: string }[]> = {
  a1: [
    { quando: 'Hoje, 07:58', quem: 'Recepção · Marina', oque: 'Check-in registrado' },
    { quando: 'Ontem, 18:02', quem: 'Paciente', oque: 'Confirmou pelo WhatsApp' },
    { quando: '12/09, 10:31', quem: 'Recepção · Marina', oque: 'Agendamento criado' },
  ],
}

export function paraMinutos(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function formatarFaixa(inicio: string, duracao: number): string {
  const fim = paraMinutos(inicio) + duracao
  const hh = String(Math.floor(fim / 60)).padStart(2, '0')
  const mm = String(fim % 60).padStart(2, '0')
  return `${inicio} – ${hh}:${mm}`
}

/* ===================================================================
   Agenda além do dia base

   O dia base é escrito à mão porque é a tela de demonstração. Os demais
   dias são gerados de forma determinística a partir da própria data: a
   mesma data sempre produz a mesma agenda, então a navegação por semana
   e por mês fica estável entre recarregamentos.
   =================================================================== */

const NOMES = [
  'Beatriz Almeida', 'Rodrigo Pires', 'Larissa Fontes', 'Marcelo Aguiar',
  'Tatiane Rezende', 'Vinícius Carvalho', 'Priscila Bastos', 'Otávio Lacerda',
  'Simone Andrade', 'Henrique Vasques', 'Débora Queiroz', 'Leandro Muniz',
  'Cristina Peixoto', 'Fábio Antunes', 'Adriana Cordeiro', 'Murilo Bezerra',
  'Elaine Siqueira', 'Gabriel Tormes', 'Natália Bandeira', 'Rogério Pacheco',
]
const TIPOS = ['Retorno', 'Primeira consulta', 'Avaliação', 'Procedimento']
const CONVENIOS = ['Particular', 'Unimed', 'Amil', 'SulAmérica', 'Bradesco Saúde']
const ORIGENS = ['Instagram', 'Indicação', 'Google', 'Site da clínica', 'WhatsApp']

/** PRNG determinístico: mesma semente, mesma sequência. */
function semente(texto: string): () => number {
  let h = 2166136261
  for (let i = 0; i < texto.length; i += 1) {
    h ^= texto.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return () => {
    h += 0x6d2b79f5
    let t = h
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const HOJE = DIA_BASE

function gerarDia(iso: string): Agendamento[] {
  const dia = new Date(`${iso}T12:00:00`).getDay()
  if (dia === 0) return [] // clínica fechada aos domingos

  const rnd = semente(iso)
  const gerados: Agendamento[] = []
  const passado = iso < HOJE
  const sabado = dia === 6

  for (const prof of PROFISSIONAIS) {
    // Alvo por profissional, calibrado pelo dia base escrito à mão
    // (4 a 7 consultas por dia). Sem alvo, o gerador enchia a agenda
    // e a visão de mês perdia a capacidade de distinguir dia cheio de vazio.
    const alvo = sabado ? 2 + Math.floor(rnd() * 2) : 4 + Math.floor(rnd() * 4)
    const limite = (sabado ? 13 : HORA_FIM) * 60
    const abertura = HORA_INICIO * 60

    const ocupados: { inicio: number; fim: number }[] = []

    for (let tentativa = 0; tentativa < alvo * 6 && ocupados.length < alvo; tentativa += 1) {
      const duracao = [30, 30, 30, 45, 60][Math.floor(rnd() * 5)]
      const vagas = Math.floor((limite - abertura - duracao) / SLOT)
      const inicio = abertura + Math.floor(rnd() * vagas) * SLOT
      const fim = inicio + duracao

      // Intervalo de almoço fica majoritariamente livre, como numa agenda real
      if (inicio >= 12 * 60 && inicio < 13 * 60 && rnd() < 0.8) continue
      if (ocupados.some((o) => inicio < o.fim && fim > o.inicio)) continue

      ocupados.push({ inicio, fim })

      // Dia passado já tem desfecho; dia futuro ainda está por acontecer
      const statusPassado: AgendaStatus[] = [
        'confirmado', 'confirmado', 'confirmado', 'confirmado', 'faltou', 'cancelado',
      ]
      const statusFuturo: AgendaStatus[] = [
        'agendado', 'agendado', 'confirmado', 'confirmado', 'confirmado', 'confirmado',
      ]
      const status = (passado ? statusPassado : statusFuturo)[Math.floor(rnd() * 6)]

      gerados.push({
        id: `g-${iso}-${prof.id}-${inicio}`,
        data: iso,
        profissionalId: prof.id,
        inicio: `${String(Math.floor(inicio / 60)).padStart(2, '0')}:${String(inicio % 60).padStart(2, '0')}`,
        duracao,
        paciente: NOMES[Math.floor(rnd() * NOMES.length)],
        tipo: TIPOS[Math.floor(rnd() * TIPOS.length)],
        convenio: CONVENIOS[Math.floor(rnd() * CONVENIOS.length)],
        status,
        origem: ORIGENS[Math.floor(rnd() * ORIGENS.length)],
        telefone: `(62) 9${Math.floor(rnd() * 9000 + 1000)}-${Math.floor(rnd() * 9000 + 1000)}`,
      })
    }
  }
  return gerados.sort((a, b) => paraMinutos(a.inicio) - paraMinutos(b.inicio))
}

const cache = new Map<string, Agendamento[]>()

/** Agendamentos de um dia. O dia base vem escrito à mão; o resto é gerado. */
export function agendamentosDoDia(iso: string): Agendamento[] {
  if (iso === DIA_BASE) return AGENDAMENTOS
  if (!cache.has(iso)) cache.set(iso, gerarDia(iso))
  return cache.get(iso)!
}

export function isoDe(data: Date): string {
  return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`
}
