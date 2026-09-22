import { cn } from '@/lib/cn'

/** Status do paciente na agenda — escopo §11.1 item 3 do documento de mercado */
export type AgendaStatus =
  | 'agendado'
  | 'confirmado'
  | 'chegou'
  | 'atendimento'
  | 'faltou'
  | 'cancelado'

export const STATUS_LABEL: Record<AgendaStatus, string> = {
  agendado: 'Agendado',
  confirmado: 'Confirmado',
  chegou: 'Chegou',
  atendimento: 'Em atendimento',
  faltou: 'Faltou',
  cancelado: 'Cancelado',
}

const STATUS_STYLE: Record<AgendaStatus, string> = {
  agendado: 'text-[var(--status-agendado-fg)] bg-[var(--status-agendado-bg)]',
  confirmado: 'text-[var(--status-confirmado-fg)] bg-[var(--status-confirmado-bg)]',
  chegou: 'text-[var(--status-chegou-fg)] bg-[var(--status-chegou-bg)]',
  atendimento: 'text-[var(--status-atendimento-fg)] bg-[var(--status-atendimento-bg)]',
  faltou: 'text-[var(--status-faltou-fg)] bg-[var(--status-faltou-bg)]',
  cancelado: 'text-[var(--status-cancelado-fg)] bg-[var(--status-cancelado-bg)]',
}

const STATUS_DOT: Record<AgendaStatus, string> = {
  agendado: 'bg-[var(--status-agendado-fg)]',
  confirmado: 'bg-[var(--status-confirmado-fg)]',
  chegou: 'bg-[var(--status-chegou-fg)]',
  atendimento: 'bg-[var(--status-atendimento-fg)]',
  faltou: 'bg-[var(--status-faltou-fg)]',
  // Anel vazado, não disco: "agendado" e "cancelado" são o mesmo neutro, e
  // sem forma própria os dois estados ficavam indistinguíveis onde a bolinha
  // aparece sozinha. Distinguir por forma também funciona para quem não
  // separa as duas cores.
  cancelado: 'border-[1.5px] border-[var(--status-cancelado-fg)]',
}

export function StatusDot({ status, className }: { status: AgendaStatus; className?: string }) {
  return <span className={cn('size-2 shrink-0 rounded-full', STATUS_DOT[status], className)} />
}

export interface StatusPillProps {
  status: AgendaStatus
  /** Sem rótulo: só a bolinha, para linhas densas da agenda */
  compact?: boolean
  className?: string
}

/** Cor semântica em dose mínima (princípio 7) */
export function StatusPill({ status, compact = false, className }: StatusPillProps) {
  if (compact) {
    return (
      <span className={cn('inline-flex items-center gap-1.5', className)} title={STATUS_LABEL[status]}>
        <StatusDot status={status} />
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-2xs font-semibold whitespace-nowrap',
        STATUS_STYLE[status],
        className,
      )}
    >
      <StatusDot status={status} />
      {STATUS_LABEL[status]}
    </span>
  )
}

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'

const BADGE_STYLE: Record<BadgeTone, string> = {
  neutral: 'bg-sunken text-secondary',
  accent: 'bg-accent-soft text-accent-text',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
  info: 'bg-info-soft text-info',
}

export function Badge({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: BadgeTone
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill px-2.5 py-1 text-2xs font-semibold whitespace-nowrap',
        BADGE_STYLE[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
