import type { HTMLAttributes, ReactNode } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import type { IconSvgElement } from '@hugeicons/react'
import { cn } from '@/lib/cn'
import { IconButton } from './Button'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Densidade: 'compacta' para agenda e tabelas, 'confortável' para dashboard */
  padding?: 'none' | 'compact' | 'comfortable'
  elevation?: 'flat' | 'sm' | 'md' | 'lg'
}

const PADDING = {
  none: '',
  compact: 'p-4',
  comfortable: 'p-6',
}

const ELEVATION = {
  flat: 'shadow-none border border-subtle',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
}

export function Card({
  padding = 'comfortable',
  elevation = 'sm',
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn('bg-card rounded-xl', PADDING[padding], ELEVATION[elevation], className)}
      {...props}
    >
      {children}
    </div>
  )
}

export interface CardHeaderProps {
  title: string
  icon?: IconSvgElement
  /** Legenda curta abaixo do título. Não use para repetir o título (princípio 11) */
  caption?: string
  action?: { icon: IconSvgElement; label: string; onClick?: () => void }
  children?: ReactNode
}

export function CardHeader({ title, icon, caption, action, children }: CardHeaderProps) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {icon && (
            <HugeiconsIcon
              icon={icon}
              size={18}
              strokeWidth={1.5}
              className="text-secondary shrink-0"
            />
          )}
          <h3 className="text-h4 text-primary truncate font-semibold">{title}</h3>
        </div>
        {caption && <p className="text-muted text-sm mt-1">{caption}</p>}
      </div>
      {children}
      {action && (
        <IconButton
          icon={action.icon}
          label={action.label}
          size="sm"
          onClick={action.onClick}
          className="shrink-0"
        />
      )}
    </div>
  )
}
