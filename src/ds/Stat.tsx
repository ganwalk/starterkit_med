import { cn } from '@/lib/cn'

export type Trend = 'up' | 'down' | 'flat'

export interface SparklineProps {
  values: number[]
  /** Semântica da série, define a cor das barras */
  tone?: 'neutral' | 'success' | 'danger' | 'accent'
  className?: string
}

const TONE_BAR: Record<NonNullable<SparklineProps['tone']>, string> = {
  neutral: 'bg-line-strong',
  success: 'bg-success',
  danger: 'bg-danger',
  accent: 'bg-accent',
}

/** Micro-gráfico de barra fina, sem eixo nem grade (princípio 10) */
export function Sparkline({ values, tone = 'neutral', className }: SparklineProps) {
  const max = Math.max(...values, 1)
  return (
    <div
      className={cn('flex h-10 items-end gap-[2px]', className)}
      role="img"
      aria-label={`Série de ${values.length} pontos`}
    >
      {values.map((value, index) => (
        <span
          key={index}
          className={cn('w-[3px] shrink-0 rounded-full opacity-70', TONE_BAR[tone])}
          style={{ height: `${Math.max((value / max) * 100, 6)}%` }}
        />
      ))}
    </div>
  )
}

export interface StatProps {
  /** Rótulo do indicador. É o título, não uma eyebrow */
  label: string
  value: string
  /** Contexto que o rótulo não carrega — ex.: "vs. 30 dias anteriores" */
  hint?: string
  delta?: { value: string; trend: Trend }
  series?: number[]
  tone?: SparklineProps['tone']
}

const TREND_STYLES: Record<Trend, string> = {
  up: 'text-success bg-success-soft',
  down: 'text-danger bg-danger-soft',
  flat: 'text-muted bg-sunken',
}

const TREND_GLYPH: Record<Trend, string> = { up: '↑', down: '↓', flat: '→' }

/** Numeral grande em peso fino — a hierarquia é o dado (princípio 5) */
export function Stat({ label, value, hint, delta, series, tone = 'neutral' }: StatProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <p className="text-secondary text-sm font-medium">{label}</p>
        {delta && (
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-2xs font-semibold',
              TREND_STYLES[delta.trend],
            )}
          >
            <span aria-hidden>{TREND_GLYPH[delta.trend]}</span>
            {delta.value}
          </span>
        )}
      </div>

      <p className="numeral text-primary mt-3 text-[2.75rem]">{value}</p>
      {hint && <p className="text-faint text-xs mt-1">{hint}</p>}

      {series && <Sparkline values={series} tone={tone} className="mt-auto pt-4" />}
    </div>
  )
}
