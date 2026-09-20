import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import type { IconSvgElement } from '@hugeicons/react'
import { cn } from '@/lib/cn'

type Variant = 'accent' | 'active' | 'subtle' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  // Acento da clínica: a única cor de marca em botão
  accent: 'bg-accent text-accent-contrast hover:bg-accent-hover shadow-xs',
  // Preto = estado ativo/selecionado, igual em qualquer clínica (princípio 4)
  active: 'bg-active text-on-active hover:opacity-90 shadow-xs',
  subtle: 'bg-card text-primary shadow-sm hover:bg-hover',
  ghost: 'bg-transparent text-secondary hover:bg-hover hover:text-primary',
  danger: 'bg-danger-soft text-danger hover:brightness-97',
}

const SIZES: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-body gap-2',
  lg: 'h-12 px-6 text-body gap-2',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  icon?: IconSvgElement
  iconRight?: IconSvgElement
  children?: ReactNode
}

export function Button({
  variant = 'subtle',
  size = 'md',
  icon,
  iconRight,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-pill font-medium transition-base',
        'disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {icon && <HugeiconsIcon icon={icon} size={18} strokeWidth={1.5} />}
      {children}
      {iconRight && <HugeiconsIcon icon={iconRight} size={18} strokeWidth={1.5} />}
    </button>
  )
}

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconSvgElement
  /** Obrigatório: ícone nunca aparece sem rótulo acessível */
  label: string
  variant?: Variant | 'outline'
  size?: Size
}

const ICON_SIZES: Record<Size, string> = {
  sm: 'size-9',
  md: 'size-10',
  lg: 'size-12',
}

/** Ação secundária padrão do sistema: círculo fantasma (princípio 8) */
export function IconButton({
  icon,
  label,
  variant = 'outline',
  size = 'md',
  className,
  ...props
}: IconButtonProps) {
  const styles =
    variant === 'outline'
      ? 'bg-card text-secondary border border-subtle hover:text-primary hover:border-line-strong'
      : VARIANTS[variant]

  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full transition-base',
        'disabled:cursor-not-allowed disabled:opacity-45',
        styles,
        ICON_SIZES[size],
        className,
      )}
      {...props}
    >
      <HugeiconsIcon icon={icon} size={size === 'sm' ? 16 : 20} strokeWidth={1.5} />
    </button>
  )
}
