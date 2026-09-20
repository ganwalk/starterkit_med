import { cn } from '@/lib/cn'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'

const SIZES: Record<AvatarSize, string> = {
  xs: 'size-6 text-[9px]',
  sm: 'size-8 text-2xs',
  md: 'size-10 text-xs',
  lg: 'size-14 text-body',
}

/** Paleta estável por nome: a mesma pessoa tem sempre a mesma cor */
const SURFACES = [
  'bg-[var(--blue-100)] text-[var(--blue-600)]',
  'bg-[var(--green-100)] text-[var(--green-600)]',
  'bg-[var(--violet-100)] text-[var(--violet-600)]',
  'bg-[var(--amber-100)] text-[var(--amber-600)]',
  'bg-[var(--red-100)] text-[var(--red-600)]',
]

function initials(nome: string): string {
  const parts = nome.replace(/^(Dr|Dra)\.?\s+/i, '').trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function surfaceFor(nome: string): string {
  let hash = 0
  for (let i = 0; i < nome.length; i += 1) hash = (hash + nome.charCodeAt(i)) % SURFACES.length
  return SURFACES[hash]
}

export interface AvatarProps {
  nome: string
  size?: AvatarSize
  className?: string
  /** Anel de destaque quando a pessoa está selecionada na agenda */
  active?: boolean
}

/** Avatar é conteúdo, não enfeite (princípio 9) */
export function Avatar({ nome, size = 'md', className, active = false }: AvatarProps) {
  return (
    <span
      title={nome}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-semibold select-none',
        SIZES[size],
        surfaceFor(nome),
        active && 'ring-2 ring-accent ring-offset-2 ring-offset-[var(--surface-card)]',
        className,
      )}
    >
      {initials(nome)}
    </span>
  )
}

export function AvatarGroup({
  nomes,
  size = 'sm',
  max = 4,
}: {
  nomes: string[]
  size?: AvatarSize
  max?: number
}) {
  const visible = nomes.slice(0, max)
  const rest = nomes.length - visible.length

  return (
    <div className="flex items-center">
      {visible.map((nome) => (
        <Avatar
          key={nome}
          nome={nome}
          size={size}
          className="-ml-2 ring-2 ring-[var(--surface-card)] first:ml-0"
        />
      ))}
      {rest > 0 && (
        <span
          className={cn(
            'bg-sunken text-secondary -ml-2 inline-flex items-center justify-center rounded-full font-semibold ring-2 ring-[var(--surface-card)]',
            SIZES[size],
          )}
        >
          +{rest}
        </span>
      )}
    </div>
  )
}
