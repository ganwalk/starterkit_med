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
 * Navegação em pílula com o item ativo em preto sólido (princípio 4).
 * O ativo não usa a cor da marca de propósito: funciona igual em toda clínica.
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
      role="tablist"
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
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              'rounded-pill font-medium transition-base whitespace-nowrap',
              size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm',
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
