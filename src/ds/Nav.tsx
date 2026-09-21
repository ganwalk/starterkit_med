import { cn } from '@/lib/cn'

export interface SegmentedOption<T extends string> {
  value: T
  label: string
}

export interface SegmentedProps<T extends string> {
  options: SegmentedOption<T>[]
  value: T
  onChange: (value: T) => void
  label: string
  size?: 'sm' | 'md'
}

/**
 * Controle segmentado: escolhe uma entre N lentes do mesmo conteúdo.
 *
 * Usa `role="group"` com `aria-pressed` em cada botão, e não `role="tab"`.
 * Aba exige um `tabpanel` correspondente, e a auditoria de leitor de tela
 * mostrou o sistema anunciando "aba" sem painel que a acompanhasse. Botão
 * de alternância descreve o que isto é de verdade e continua alcançável
 * por Tab, sem roving tabindex.
 *
 * O item ativo é preto, não a cor da marca (ver direcao-visual, princípio 4).
 */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
  size = 'md',
}: SegmentedProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        'bg-sunken inline-flex items-center rounded-pill',
        size === 'sm' ? 'gap-0.5 p-0.5' : 'gap-1 p-1',
      )}
    >
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              'rounded-pill font-medium whitespace-nowrap transition-base',
              size === 'sm'
                ? 'min-h-[var(--target-min)] px-3.5 text-xs'
                : 'min-h-[var(--target-comfortable)] px-4 text-sm',
              selected
                ? 'bg-active text-on-active shadow-xs'
                : 'text-secondary hover:text-primary',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
