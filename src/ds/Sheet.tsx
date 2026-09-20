import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { cn } from '@/lib/cn'
import { IconButton } from './Button'

export interface SheetProps {
  open: boolean
  onClose: () => void
  title: string
  /** Informação que o título não carrega — ex.: nome da clínica, horário */
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
  /** 'side' para detalhe de agendamento, 'center' para confirmação */
  position?: 'side' | 'center'
}

export function Sheet({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  position = 'side',
}: SheetProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label={title}>
      <button
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(12,14,19,0.28)] backdrop-blur-[2px]"
      />

      <div
        className={cn(
          'bg-card relative flex flex-col shadow-xl',
          position === 'side'
            ? 'ml-auto h-full w-full max-w-[26rem] rounded-l-2xl'
            : 'm-auto w-full max-w-lg rounded-2xl',
        )}
      >
        <header className="flex items-start justify-between gap-4 p-6 pb-4">
          <div className="min-w-0">
            <h2 className="text-h3 text-primary font-semibold">{title}</h2>
            {subtitle && <p className="text-muted text-sm mt-0.5">{subtitle}</p>}
          </div>
          <IconButton icon={Cancel01Icon} label="Fechar" size="sm" onClick={onClose} />
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6">{children}</div>

        {footer && (
          <footer className="border-subtle flex items-center justify-end gap-2 border-t p-4">
            {footer}
          </footer>
        )}
      </div>
    </div>
  )
}
