import { useState } from 'react'
import type { ReactNode } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import type { IconSvgElement } from '@hugeicons/react'
import { cn } from '@/lib/cn'

/* ------------------------------------------------------------------ Tabs */

export interface TabItem {
  id: string
  label: string
  icon?: IconSvgElement
  contador?: number
}

export interface TabsProps {
  itens: TabItem[]
  ativo: string
  onChange: (id: string) => void
  label: string
}

/** Abas com sublinhado: para navegação dentro de uma tela, ao contrário do
 *  Segmented, que alterna a visão de um mesmo conteúdo. */
export function Tabs({ itens, ativo, onChange, label }: TabsProps) {
  return (
    <div role="tablist" aria-label={label} className="border-subtle flex gap-1 overflow-x-auto border-b">
      {itens.map((item) => {
        const selecionado = item.id === ativo
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={selecionado}
            onClick={() => onChange(item.id)}
            className={cn(
              'relative flex min-h-[var(--target-comfortable)] shrink-0 items-center gap-2 px-3 text-sm font-medium transition-base',
              selecionado ? 'text-primary' : 'text-muted hover:text-primary',
            )}
          >
            {item.icon && <HugeiconsIcon icon={item.icon} size={16} strokeWidth={1.5} />}
            {item.label}
            {item.contador !== undefined && (
              <span
                className={cn(
                  'rounded-pill px-1.5 text-2xs font-bold tabular',
                  selecionado ? 'bg-active text-on-active' : 'bg-sunken text-muted',
                )}
              >
                {item.contador}
              </span>
            )}
            {selecionado && (
              <span className="bg-active absolute inset-x-2 -bottom-px h-0.5 rounded-pill" />
            )}
          </button>
        )
      })}
    </div>
  )
}

/* ---------------------------------------------------------------- Toolbar */

/** Faixa de filtros acima de uma lista. Rola no eixo X em tela estreita. */
export function Toolbar({ children, fim }: { children: ReactNode; fim?: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <div className="flex min-w-0 flex-wrap items-center gap-2">{children}</div>
      {fim && <div className="ml-auto flex flex-wrap items-center gap-2">{fim}</div>}
    </div>
  )
}

/* -------------------------------------------------------------- Accordion */

export function Accordion({
  titulo,
  children,
  aberto: abertoInicial = false,
}: {
  titulo: ReactNode
  children: ReactNode
  aberto?: boolean
}) {
  const [aberto, setAberto] = useState(abertoInicial)
  return (
    <div className="border-subtle border-b last:border-0">
      <button
        onClick={() => setAberto(!aberto)}
        aria-expanded={aberto}
        className="flex min-h-[var(--target-comfortable)] w-full items-center justify-between gap-3 py-3 text-left"
      >
        <span className="text-primary min-w-0 text-sm font-medium">{titulo}</span>
        <span
          className={cn('text-faint shrink-0 text-xs transition-base', aberto && 'rotate-180')}
          aria-hidden
        >
          ▾
        </span>
      </button>
      {aberto && <div className="pb-4">{children}</div>}
    </div>
  )
}

/* ------------------------------------------------------------- DataList */

/** Lista de pares rótulo/valor. Padrão em painel de detalhe e ficha. */
export function DataList({ itens }: { itens: [string, ReactNode][] }) {
  return (
    <dl className="space-y-3">
      {itens.map(([chave, valor]) => (
        <div key={chave} className="flex items-start justify-between gap-4">
          <dt className="text-muted shrink-0 text-sm">{chave}</dt>
          <dd className="text-primary min-w-0 text-right text-sm font-medium">{valor}</dd>
        </div>
      ))}
    </dl>
  )
}

/* -------------------------------------------------------------- Timeline */

export interface TimelineEvent {
  quando: string
  quem: string
  oque: string
  tone?: 'neutral' | 'success' | 'danger' | 'accent'
}

const DOT_TONE = {
  neutral: 'bg-line-strong',
  success: 'bg-success',
  danger: 'bg-danger',
  accent: 'bg-accent',
}

/** Histórico de alterações — requisito §11.1 item 8 do escopo */
export function Timeline({ eventos }: { eventos: TimelineEvent[] }) {
  return (
    <ol className="relative space-y-4">
      {eventos.map((evento, index) => (
        <li key={index} className="relative flex gap-3">
          <span className="relative flex shrink-0 flex-col items-center">
            <span
              className={cn('mt-1.5 size-2 shrink-0 rounded-full', DOT_TONE[evento.tone ?? 'neutral'])}
            />
            {index < eventos.length - 1 && (
              <span className="bg-subtle absolute top-4 h-[calc(100%+0.5rem)] w-px" aria-hidden />
            )}
          </span>
          <div className="min-w-0 pb-1">
            <p className="text-primary text-sm">{evento.oque}</p>
            <p className="text-faint text-xs">
              {evento.quando} · {evento.quem}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
