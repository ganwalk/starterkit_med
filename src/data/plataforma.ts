import type { AgendaStatus } from '@/ds'

/* ------------------------------------------------------------- Pacientes */

export interface Paciente {
  id: string
  nome: string
  telefone: string
  convenio: string
  ultimaConsulta: string
  proximaConsulta: string | null
  origem: string
  /** Meses desde a última consulta, usado na reativação */
  inatividade: number
  consentimentoMarketing: boolean
}

export const PACIENTES: Paciente[] = [
  { id: 'p1', nome: 'Ana Beatriz Rocha', telefone: '(62) 99812-4471', convenio: 'Particular', ultimaConsulta: '12/08/2026', proximaConsulta: '24/09/2026', origem: 'Instagram', inatividade: 1, consentimentoMarketing: true },
  { id: 'p2', nome: 'Carlos Eduardo Lima', telefone: '(62) 99145-2280', convenio: 'Unimed', ultimaConsulta: '03/06/2026', proximaConsulta: '24/09/2026', origem: 'Indicação', inatividade: 3, consentimentoMarketing: true },
  { id: 'p3', nome: 'Mariana Duarte', telefone: '(62) 98877-1203', convenio: 'Particular', ultimaConsulta: '20/07/2026', proximaConsulta: '24/09/2026', origem: 'Site da clínica', inatividade: 2, consentimentoMarketing: false },
  { id: 'p4', nome: 'Juliana Prado', telefone: '(62) 99001-7745', convenio: 'Bradesco Saúde', ultimaConsulta: '15/03/2026', proximaConsulta: null, origem: 'Google', inatividade: 6, consentimentoMarketing: true },
  { id: 'p5', nome: 'Roberto Nunes', telefone: '(62) 99554-1122', convenio: 'Particular', ultimaConsulta: '02/02/2026', proximaConsulta: '24/09/2026', origem: 'Instagram', inatividade: 7, consentimentoMarketing: true },
  { id: 'p6', nome: 'Patrícia Souza', telefone: '(62) 98221-9934', convenio: 'SulAmérica', ultimaConsulta: '30/01/2026', proximaConsulta: null, origem: 'Site da clínica', inatividade: 8, consentimentoMarketing: false },
  { id: 'p7', nome: 'Thiago Barbosa', telefone: '(62) 99772-3318', convenio: 'Unimed', ultimaConsulta: '11/09/2026', proximaConsulta: '24/09/2026', origem: 'Encaminhamento', inatividade: 0, consentimentoMarketing: true },
  { id: 'p8', nome: 'Vanessa Coelho', telefone: '(62) 99556-1187', convenio: 'Particular', ultimaConsulta: '22/12/2025', proximaConsulta: '24/09/2026', origem: 'Site da clínica', inatividade: 9, consentimentoMarketing: true },
  { id: 'p9', nome: 'Eduardo Ramos', telefone: '(62) 98334-7790', convenio: 'Amil', ultimaConsulta: '05/05/2026', proximaConsulta: null, origem: 'Indicação', inatividade: 4, consentimentoMarketing: true },
  { id: 'p10', nome: 'Isabela Moreira', telefone: '(62) 99664-7781', convenio: 'Particular', ultimaConsulta: '18/08/2026', proximaConsulta: '24/09/2026', origem: 'Instagram', inatividade: 1, consentimentoMarketing: true },
]

/* ----------------------------------------------------- Funil da jornada */

export type EtapaFunil = 'novo' | 'contato' | 'agendado' | 'compareceu' | 'perdido'

export const ETAPAS: { id: EtapaFunil; titulo: string; descricao: string }[] = [
  { id: 'novo', titulo: 'Novo lead', descricao: 'Chegou e ainda não foi contatado' },
  { id: 'contato', titulo: 'Em contato', descricao: 'Conversa aberta, sem horário' },
  { id: 'agendado', titulo: 'Agendado', descricao: 'Tem horário marcado' },
  { id: 'compareceu', titulo: 'Compareceu', descricao: 'Consulta realizada' },
  { id: 'perdido', titulo: 'Perdido', descricao: 'Não respondeu ou desistiu' },
]

export interface Lead {
  id: string
  nome: string
  telefone: string
  origem: string
  etapa: EtapaFunil
  /** Horas desde a última interação — vira alerta quando passa do SLA */
  horasParado: number
  valorEstimado: number
  tarefa?: string
}

export const LEADS: Lead[] = [
  { id: 'l1', nome: 'Fernanda Castro', telefone: '(62) 99312-4488', origem: 'Instagram', etapa: 'novo', horasParado: 2, valorEstimado: 350, tarefa: 'Primeiro contato' },
  { id: 'l2', nome: 'Marcos Vinícius', telefone: '(62) 98456-2019', origem: 'Google', etapa: 'novo', horasParado: 26, valorEstimado: 350, tarefa: 'Primeiro contato atrasado' },
  { id: 'l3', nome: 'Sandra Oliveira', telefone: '(62) 99223-8871', origem: 'Indicação', etapa: 'contato', horasParado: 5, valorEstimado: 500 },
  { id: 'l4', nome: 'Paulo Henrique', telefone: '(62) 99777-3341', origem: 'Site da clínica', etapa: 'contato', horasParado: 49, valorEstimado: 350, tarefa: 'Retomar conversa' },
  { id: 'l5', nome: 'Gustavo Almeida', telefone: '(62) 99445-1123', origem: 'Instagram', etapa: 'agendado', horasParado: 12, valorEstimado: 800 },
  { id: 'l6', nome: 'Renata Villaça', telefone: '(62) 99118-2245', origem: 'Instagram', etapa: 'agendado', horasParado: 3, valorEstimado: 800 },
  { id: 'l7', nome: 'Cláudia Mendes', telefone: '(62) 99009-4471', origem: 'Google', etapa: 'compareceu', horasParado: 20, valorEstimado: 350 },
  { id: 'l8', nome: 'Antônio Ferreira', telefone: '(62) 99880-5512', origem: 'WhatsApp', etapa: 'perdido', horasParado: 120, valorEstimado: 350 },
]

/* ------------------------------------------------------------ Conversas */

export interface Mensagem {
  de: 'paciente' | 'clinica' | 'bot'
  texto: string
  hora: string
}

export interface Conversa {
  id: string
  paciente: string
  telefone: string
  ultimaMensagem: string
  hora: string
  naoLidas: number
  /** Conversa que o bot ainda atende, ou que já passou para humano */
  comBot: boolean
  aguardandoHumano: boolean
  mensagens: Mensagem[]
}

export const CONVERSAS: Conversa[] = [
  {
    id: 'c1',
    paciente: 'Fernanda Castro',
    telefone: '(62) 99312-4488',
    ultimaMensagem: 'Consigo remarcar para sexta?',
    hora: '10:12',
    naoLidas: 2,
    comBot: false,
    aguardandoHumano: true,
    mensagens: [
      { de: 'bot', texto: 'Olá! Sou o assistente da clínica. Posso ajudar com agendamento, confirmação ou remarcação.', hora: '10:05' },
      { de: 'paciente', texto: 'Oi, tenho consulta quinta 14h30', hora: '10:08' },
      { de: 'bot', texto: 'Confirmei aqui: quinta, 24 de setembro, 14:30, com a Dra. Helena Marques.', hora: '10:08' },
      { de: 'paciente', texto: 'Consigo remarcar para sexta?', hora: '10:12' },
      { de: 'bot', texto: 'Vou transferir para a recepção, que consegue ver as opções com você.', hora: '10:12' },
    ],
  },
  {
    id: 'c2',
    paciente: 'Thiago Barbosa',
    telefone: '(62) 99772-3318',
    ultimaMensagem: 'Confirmado, obrigado!',
    hora: '09:40',
    naoLidas: 0,
    comBot: true,
    aguardandoHumano: false,
    mensagens: [
      { de: 'clinica', texto: 'Olá Thiago! Sua consulta é amanhã às 08:30 com o Dr. Bruno Salles. Responda 1 para confirmar, 2 para cancelar ou 3 para remarcar.', hora: '09:38' },
      { de: 'paciente', texto: '1', hora: '09:40' },
      { de: 'bot', texto: 'Presença confirmada. Até amanhã!', hora: '09:40' },
      { de: 'paciente', texto: 'Confirmado, obrigado!', hora: '09:40' },
    ],
  },
  {
    id: 'c3',
    paciente: 'Juliana Prado',
    telefone: '(62) 99001-7745',
    ultimaMensagem: 'Quanto custa a consulta?',
    hora: '08:55',
    naoLidas: 1,
    comBot: false,
    aguardandoHumano: true,
    mensagens: [
      { de: 'paciente', texto: 'Bom dia, vocês atendem Bradesco?', hora: '08:52' },
      { de: 'bot', texto: 'Sim, atendemos Bradesco Saúde. Quer que eu veja os horários disponíveis?', hora: '08:53' },
      { de: 'paciente', texto: 'Quanto custa a consulta?', hora: '08:55' },
    ],
  },
  {
    id: 'c4',
    paciente: 'Sandra Oliveira',
    telefone: '(62) 99223-8871',
    ultimaMensagem: 'Pode ser 11h30 então',
    hora: 'Ontem',
    naoLidas: 0,
    comBot: true,
    aguardandoHumano: false,
    mensagens: [
      { de: 'paciente', texto: 'Queria marcar com o Dr. Rafael', hora: 'Ontem' },
      { de: 'bot', texto: 'Tenho 09:30 e 11:30 na quinta. Qual prefere?', hora: 'Ontem' },
      { de: 'paciente', texto: 'Pode ser 11h30 então', hora: 'Ontem' },
    ],
  },
]

/* ------------------------------------------------------------ Migração */

export interface OrigemMigracao {
  id: string
  sistema: string
  registros: number
  migrados: number
  falhas: number
  status: 'concluido' | 'rodando' | 'pendente' | 'erro'
}

export const MIGRACAO: OrigemMigracao[] = [
  { id: 'm1', sistema: 'Pacientes', registros: 4820, migrados: 4820, falhas: 0, status: 'concluido' },
  { id: 'm2', sistema: 'Agendamentos (histórico)', registros: 18344, migrados: 18344, falhas: 0, status: 'concluido' },
  { id: 'm3', sistema: 'Agendamentos (futuros)', registros: 412, migrados: 412, falhas: 0, status: 'concluido' },
  { id: 'm4', sistema: 'Lançamentos financeiros', registros: 9106, migrados: 9038, falhas: 68, status: 'rodando' },
  { id: 'm5', sistema: 'Anexos e documentos', registros: 2731, migrados: 0, falhas: 0, status: 'pendente' },
  { id: 'm6', sistema: 'Histórico clínico (somente leitura)', registros: 15992, migrados: 0, falhas: 0, status: 'pendente' },
]

/* --------------------------------------------------------- Suporte 24h */

export type Severidade = 'critica' | 'alta' | 'normal'

export interface Chamado {
  id: string
  clinica: string
  assunto: string
  severidade: Severidade
  abertoHa: string
  slaMinutos: number
  decorridoMinutos: number
  responsavel: string
  status: 'aberto' | 'em_atendimento' | 'resolvido'
}

/** SLA por severidade conforme §11.3 do escopo */
export const SLA_MINUTOS: Record<Severidade, number> = {
  critica: 15,
  alta: 60,
  normal: 240,
}

export const SEVERIDADE_LABEL: Record<Severidade, string> = {
  critica: 'Crítica',
  alta: 'Alta',
  normal: 'Normal',
}

export const CHAMADOS: Chamado[] = [
  { id: '#1042', clinica: 'Clínica Vida', assunto: 'Agenda não carrega no celular da recepção', severidade: 'critica', abertoHa: '6 min', slaMinutos: 15, decorridoMinutos: 6, responsavel: 'Armando', status: 'em_atendimento' },
  { id: '#1041', clinica: 'Instituto Corpus', assunto: 'Confirmação por WhatsApp não gravou status', severidade: 'alta', abertoHa: '38 min', slaMinutos: 60, decorridoMinutos: 38, responsavel: 'Diogo', status: 'em_atendimento' },
  { id: '#1040', clinica: 'Derma Lumina', assunto: 'Como configurar horário de almoço do profissional', severidade: 'normal', abertoHa: '1 h 20', slaMinutos: 240, decorridoMinutos: 80, responsavel: 'Bot', status: 'aberto' },
  { id: '#1039', clinica: 'Ampla Saúde', assunto: 'Relatório de conciliação com divergência de 3 lançamentos', severidade: 'alta', abertoHa: '55 min', slaMinutos: 60, decorridoMinutos: 55, responsavel: 'Diogo', status: 'aberto' },
  { id: '#1038', clinica: 'Clínica Vida', assunto: 'Trocar logo do portal do paciente', severidade: 'normal', abertoHa: '3 h', slaMinutos: 240, decorridoMinutos: 180, responsavel: 'Armando', status: 'resolvido' },
]

/* ------------------------------------------------------- Fila da recepção */

export interface NaFila {
  id: string
  paciente: string
  profissional: string
  horario: string
  status: AgendaStatus
  esperaMinutos: number
  checkin: 'qrcode' | 'recepcao' | 'pendente'
}

export const FILA: NaFila[] = [
  { id: 'f1', paciente: 'Ana Beatriz Rocha', profissional: 'Dra. Helena Marques', horario: '08:00', status: 'atendimento', esperaMinutos: 0, checkin: 'qrcode' },
  { id: 'f2', paciente: 'Paulo Henrique Dias', profissional: 'Dr. Rafael Tavares', horario: '08:00', status: 'chegou', esperaMinutos: 22, checkin: 'recepcao' },
  { id: 'f3', paciente: 'Thiago Barbosa', profissional: 'Dr. Bruno Salles', horario: '08:30', status: 'chegou', esperaMinutos: 9, checkin: 'qrcode' },
  { id: 'f4', paciente: 'Isabela Moreira', profissional: 'Dra. Camila Nogueira', horario: '09:00', status: 'atendimento', esperaMinutos: 0, checkin: 'recepcao' },
  { id: 'f5', paciente: 'Sandra Oliveira', profissional: 'Dr. Rafael Tavares', horario: '09:30', status: 'confirmado', esperaMinutos: 0, checkin: 'pendente' },
  { id: 'f6', paciente: 'Gustavo Almeida', profissional: 'Dra. Camila Nogueira', horario: '09:45', status: 'confirmado', esperaMinutos: 0, checkin: 'pendente' },
]

/* ------------------------------------------------------------ Financeiro */

export interface Lancamento {
  id: string
  paciente: string
  descricao: string
  valor: number
  forma: 'Pix' | 'Cartão' | 'Dinheiro' | 'Convênio'
  status: 'pago' | 'pendente' | 'sinal'
  data: string
}

export const LANCAMENTOS: Lancamento[] = [
  { id: 'v1', paciente: 'Ana Beatriz Rocha', descricao: 'Retorno', valor: 250, forma: 'Pix', status: 'pago', data: '24/09' },
  { id: 'v2', paciente: 'Carlos Eduardo Lima', descricao: 'Primeira consulta', valor: 400, forma: 'Convênio', status: 'pendente', data: '24/09' },
  { id: 'v3', paciente: 'Vanessa Coelho', descricao: 'Infiltração — sinal', valor: 150, forma: 'Pix', status: 'sinal', data: '24/09' },
  { id: 'v4', paciente: 'Isabela Moreira', descricao: 'Avaliação estética', valor: 320, forma: 'Cartão', status: 'pago', data: '24/09' },
  { id: 'v5', paciente: 'Renata Villaça', descricao: 'Procedimento', valor: 1200, forma: 'Pix', status: 'sinal', data: '24/09' },
  { id: 'v6', paciente: 'Mariana Duarte', descricao: 'Retorno', valor: 250, forma: 'Dinheiro', status: 'pago', data: '24/09' },
  { id: 'v7', paciente: 'Fernanda Castro', descricao: 'Teste ergométrico', valor: 480, forma: 'Convênio', status: 'pendente', data: '24/09' },
]

/* ------------------------------------------------- Acesso e auditoria */

export interface Papel {
  id: string
  nome: string
  pessoas: number
  permissoes: string[]
}

export const PAPEIS: Papel[] = [
  { id: 'r1', nome: 'Recepção', pessoas: 3, permissoes: ['Agenda', 'Pacientes', 'Conversas', 'Check-in'] },
  { id: 'r2', nome: 'Profissional', pessoas: 4, permissoes: ['Agenda própria', 'Pacientes atendidos'] },
  { id: 'r3', nome: 'Gestão', pessoas: 1, permissoes: ['Tudo', 'Financeiro', 'Indicadores', 'Exportar dados'] },
  { id: 'r4', nome: 'Suporte Level', pessoas: 3, permissoes: ['Acesso temporário com registro'] },
]

export interface EventoAuditoria {
  quando: string
  quem: string
  oque: string
  tone?: 'neutral' | 'success' | 'danger' | 'accent'
}

export const AUDITORIA: EventoAuditoria[] = [
  { quando: 'Hoje, 10:14', quem: 'Marina Prado (Recepção)', oque: 'Exportou lista de pacientes em CSV', tone: 'accent' },
  { quando: 'Hoje, 09:32', quem: 'Suporte Level · Armando', oque: 'Acesso temporário concedido pela gestão, expira em 2 h', tone: 'danger' },
  { quando: 'Hoje, 08:58', quem: 'Ana Beatriz Rocha (paciente)', oque: 'Retirou consentimento de marketing pelo portal', tone: 'neutral' },
  { quando: 'Ontem, 18:40', quem: 'Dra. Helena Marques', oque: 'Alterou horário de atendimento das terças', tone: 'neutral' },
  { quando: 'Ontem, 14:02', quem: 'Sistema', oque: 'Backup diário concluído e verificado', tone: 'success' },
]
