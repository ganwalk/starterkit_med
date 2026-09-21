/**
 * Catálogo de clínicas para a prova de conceito de white label.
 * Cada tenant é só um conjunto de parâmetros — nenhum componente conhece
 * clínica nenhuma (§9: "customização vira parâmetro, nunca fork").
 */
export interface Tenant {
  id: string
  /** Nome comercial da clínica, usado no portal do paciente e nas mensagens */
  nome: string
  /** Marca curta para o cabeçalho do app */
  marca: string
  /** Domínio próprio da clínica */
  dominio: string
  /** Especialidade dominante, só para dar realismo aos dados de exemplo */
  especialidade: string
  /** Cor do acento, espelha --brand-500 do tema CSS correspondente */
  amostra: string
}

export const TENANTS: Tenant[] = [
  {
    id: 'aurora',
    nome: 'Aurora',
    marca: 'Aurora',
    dominio: 'aurora.app',
    especialidade: 'Clínica geral',
    amostra: '#2f5fe0',
  },
  {
    id: 'vida',
    nome: 'Clínica Vida',
    marca: 'Vida',
    dominio: 'clinicavida.com.br',
    especialidade: 'Clínica geral',
    amostra: '#0d9488',
  },
  {
    id: 'corpus',
    nome: 'Instituto Corpus',
    marca: 'Corpus',
    dominio: 'institutocorpus.com.br',
    especialidade: 'Ortopedia',
    amostra: '#5b46d9',
  },
  {
    id: 'lumina',
    nome: 'Derma Lumina',
    marca: 'Lumina',
    dominio: 'dermalumina.com.br',
    especialidade: 'Dermatologia',
    amostra: '#d6336c',
  },
  {
    id: 'ampla',
    nome: 'Ampla Saúde',
    marca: 'Ampla',
    dominio: 'amplasaude.com.br',
    especialidade: 'Multiespecialidade',
    amostra: '#b45f06',
  },
]

export const DEFAULT_TENANT = TENANTS[0]
