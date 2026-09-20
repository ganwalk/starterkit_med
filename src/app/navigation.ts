import {
  Analytics01Icon,
  Calendar03Icon,
  CustomerSupportIcon,
  DatabaseImportIcon,
  FlowConnectionIcon,
  Invoice01Icon,
  PaintBoardIcon,
  QrCode01Icon,
  SecurityCheckIcon,
  UserMultiple02Icon,
  WhatsappIcon,
} from '@hugeicons/core-free-icons'
import type { IconSvgElement } from '@hugeicons/react'

export interface NavItem {
  to: string
  label: string
  icon: IconSvgElement
  /** Fase do roadmap em que a iniciativa entra (§4 e §13 do escopo) */
  fase: 1 | 2 | 3
  /** Seção do documento de escopo que originou a tela */
  origem: string
}

export interface NavGroup {
  titulo: string
  itens: NavItem[]
}

/**
 * Cada item existe porque uma iniciativa do documento de escopo pede.
 * A propriedade `origem` mantém esse rastro para ninguém adicionar tela
 * sem lastro no plano.
 */
export const NAV: NavGroup[] = [
  {
    titulo: 'Operação',
    itens: [
      { to: '/agenda', label: 'Agenda', icon: Calendar03Icon, fase: 1, origem: '§11.1' },
      { to: '/recepcao', label: 'Recepção', icon: QrCode01Icon, fase: 2, origem: '§4 check-in e fila' },
      { to: '/pacientes', label: 'Pacientes', icon: UserMultiple02Icon, fase: 1, origem: '§13 cadastro único' },
      { to: '/conversas', label: 'Conversas', icon: WhatsappIcon, fase: 1, origem: '§13 WhatsApp oficial' },
    ],
  },
  {
    titulo: 'Crescimento',
    itens: [
      { to: '/funil', label: 'Funil', icon: FlowConnectionIcon, fase: 1, origem: '§13 funil da jornada' },
      { to: '/indicadores', label: 'Indicadores', icon: Analytics01Icon, fase: 1, origem: '§4 dashboards' },
      { to: '/financeiro', label: 'Financeiro', icon: Invoice01Icon, fase: 1, origem: '§4 financeiro básico' },
    ],
  },
  {
    titulo: 'Plataforma',
    itens: [
      { to: '/migracao', label: 'Migração', icon: DatabaseImportIcon, fase: 1, origem: '§11.2' },
      { to: '/marca', label: 'Motor de marca', icon: PaintBoardIcon, fase: 1, origem: '§9 e §13' },
      { to: '/suporte', label: 'Suporte 24h', icon: CustomerSupportIcon, fase: 1, origem: '§11.3' },
      { to: '/seguranca', label: 'Acesso e auditoria', icon: SecurityCheckIcon, fase: 1, origem: '§8 LGPD' },
    ],
  },
]

export const NAV_FLAT: NavItem[] = NAV.flatMap((g) => g.itens)
