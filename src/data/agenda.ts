import type { AgendaStatus } from '@/ds'

export interface Profissional {
  id: string
  nome: string
  especialidade: string
  sala: string
}

export interface Agendamento {
  id: string
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

export const AGENDAMENTOS: Agendamento[] = [
  {
    id: 'a1',
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
