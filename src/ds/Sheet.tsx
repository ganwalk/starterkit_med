import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { cn } from '@/lib/cn'
import { IconButton } from './Button'

const FOCAVEIS =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

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
  const painel = useRef<HTMLDivElement>(null)
  const gatilho = useRef<HTMLElement | null>(null)
  const tituloId = useId()

  /**
   * Gestão de foco. A auditoria de teclado mostrou que, sem isto, o foco
   * escapava do painel em 22 de 25 tabs: quem navega sem mouse abria o
   * formulário e o Tab levava para a agenda atrás, sem volta.
   */
  useEffect(() => {
    if (!open) return

    // Guarda quem abriu, para devolver o foco ao fechar
    gatilho.current = document.activeElement as HTMLElement | null

    // Leva o foco para dentro do painel, no primeiro controle útil
    const entrar = window.setTimeout(() => {
      const alvos = painel.current?.querySelectorAll<HTMLElement>(FOCAVEIS)
      if (alvos?.length) {
        // Pula o botão de fechar: o primeiro campo é o que a pessoa quer
        const preferido = alvos.length > 1 ? alvos[1] : alvos[0]
        preferido.focus()
      } else {
        painel.current?.focus()
      }
    }, 60)

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') {
        evento.preventDefault()
        onClose()
        return
      }
      if (evento.key !== 'Tab') return

      const alvos = painel.current?.querySelectorAll<HTMLElement>(FOCAVEIS)
      if (!alvos?.length) return

      const primeiro = alvos[0]
      const ultimo = alvos[alvos.length - 1]
      const atual = document.activeElement

      // Circula dentro do painel em vez de vazar para o fundo
      if (evento.shiftKey && (atual === primeiro || !painel.current?.contains(atual))) {
        evento.preventDefault()
        ultimo.focus()
      } else if (!evento.shiftKey && (atual === ultimo || !painel.current?.contains(atual))) {
        evento.preventDefault()
        primeiro.focus()
      }
    }

    document.addEventListener('keydown', aoTeclar)
    // Trava o scroll do fundo: rolar a página atrás de um painel aberto
    // desorienta, e no celular tira o painel da vista
    const overflowAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.clearTimeout(entrar)
      document.removeEventListener('keydown', aoTeclar)
      document.body.style.overflow = overflowAnterior
      // Devolve o foco a quem abriu
      gatilho.current?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  /**
   * Portal para o body. Sem isto, qualquer ancestral com `transform` vira
   * containing block e o `position: fixed` do painel passa a ancorar nele:
   * foi o que a animação de entrada da página causou, jogando o topo do
   * painel 122px para baixo no celular.
   */
  return createPortal(
    <div className="fixed inset-0 z-50 flex">
      <button
        aria-label="Fechar"
        tabIndex={-1}
        onClick={onClose}
        className="animate-fade-in absolute inset-0 bg-[rgba(12,14,19,0.28)] backdrop-blur-[2px]"
      />

      <div
        ref={painel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        tabIndex={-1}
        className={cn(
          'bg-card relative flex flex-col shadow-xl focus:outline-none',
          position === 'side'
            ? 'animate-slide-in-right ml-auto h-full w-full max-w-[26rem] rounded-l-2xl'
            : 'animate-scale-in m-auto w-full max-w-lg rounded-2xl',
        )}
      >
        <header className="flex items-start justify-between gap-4 p-6 pb-4">
          <div className="min-w-0">
            <h2 id={tituloId} className="text-h3 text-primary font-semibold">
              {title}
            </h2>
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
    </div>,
    document.body,
  )
}
