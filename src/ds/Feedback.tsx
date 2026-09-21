import type { ReactNode } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import type { IconSvgElement } from '@hugeicons/react'
import { cn } from '@/lib/cn'

/* ---------------------------------------------------------------- Alert */

export type AlertTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral'

const ALERT_STYLE: Record<AlertTone, string> = {
  info: 'bg-info-soft text-info',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
  neutral: 'bg-sunken text-secondary',
}

export interface AlertProps {
  tone?: AlertTone
  icon?: IconSvgElement
  titulo?: string
  children: ReactNode
  acao?: ReactNode
  className?: string
}

export function Alert({ tone = 'info', icon, titulo, children, acao, className }: AlertProps) {
  return (
    <div
      className={cn('flex items-start gap-3 rounded-lg p-4', ALERT_STYLE[tone], className)}
      role="status"
    >
      {icon && (
        <HugeiconsIcon icon={icon} size={18} strokeWidth={1.5} className="mt-0.5 shrink-0" />
      )}
      <div className="min-w-0 flex-1">
        {titulo && <p className="text-sm font-semibold">{titulo}</p>}
        <div className={cn('text-sm', titulo && 'mt-1 opacity-90')}>{children}</div>
      </div>
      {acao && <div className="shrink-0">{acao}</div>}
    </div>
  )
}

/* ----------------------------------------------------------- EmptyState */

export interface EmptyStateProps {
  icon?: IconSvgElement
  titulo: string
  /** Diga o próximo passo, não só que está vazio */
  descricao: string
  acao?: ReactNode
}

export function EmptyState({ icon, titulo, descricao, acao }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      {icon && (
        <div className="bg-sunken text-faint mb-4 flex size-12 items-center justify-center rounded-full">
          <HugeiconsIcon icon={icon} size={22} strokeWidth={1.5} />
        </div>
      )}
      <p className="text-primary text-h4 font-semibold">{titulo}</p>
      <p className="text-secondary mt-1.5 max-w-sm text-sm">{descricao}</p>
      {acao && <div className="mt-5">{acao}</div>}
    </div>
  )
}

/* ------------------------------------------------------------- Progress */

export interface ProgressProps {
  valor: number
  max?: number
  label: string
  tone?: 'accent' | 'success' | 'warning' | 'danger'
  /** Mostra o número ao lado da barra */
  mostrarValor?: boolean
}

const PROGRESS_TONE = {
  accent: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
}

export function Progress({
  valor,
  max = 100,
  label,
  tone = 'accent',
  mostrarValor = false,
}: ProgressProps) {
  const pct = Math.min(Math.round((valor / max) * 100), 100)
  return (
    <div className="flex items-center gap-3">
      <div
        role="progressbar"
        aria-valuenow={valor}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className="bg-sunken h-1.5 min-w-0 flex-1 overflow-hidden rounded-pill"
      >
        <div
          className={cn('h-full rounded-pill transition-base', PROGRESS_TONE[tone])}
          style={{ width: `${pct}%` }}
        />
      </div>
      {mostrarValor && (
        <span className="text-secondary w-10 shrink-0 text-right text-xs tabular">{pct}%</span>
      )}
    </div>
  )
}

/* -------------------------------------------------------------- Stepper */

export interface Step {
  id: string
  titulo: string
}

export function Stepper({ steps, atual }: { steps: Step[]; atual: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
      {steps.map((step, index) => {
        const feito = index < atual
        const ativo = index === atual
        return (
          <li key={step.id} className="flex items-center gap-2">
            <span
              className={cn(
                'flex size-6 shrink-0 items-center justify-center rounded-full text-2xs font-bold',
                feito && 'bg-success-soft text-success',
                ativo && 'bg-active text-on-active',
                // text-muted, não text-faint: sobre o fundo rebaixado o faint
                // media 4.42:1 e reprovava
                !feito && !ativo && 'bg-sunken text-muted',
              )}
              aria-hidden
            >
              {feito ? '✓' : index + 1}
            </span>
            <span
              className={cn(
                'text-sm whitespace-nowrap',
                ativo ? 'text-primary font-semibold' : 'text-muted',
              )}
            >
              {step.titulo}
            </span>
            {index < steps.length - 1 && (
              <span className="bg-line mx-1 hidden h-px w-6 sm:block" aria-hidden />
            )}
          </li>
        )
      })}
    </ol>
  )
}

/* ------------------------------------------------------------- Skeleton */

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('bg-sunken animate-pulse rounded-md', className)}
      aria-hidden
    />
  )
}
