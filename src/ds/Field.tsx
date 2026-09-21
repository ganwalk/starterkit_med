import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import type { IconSvgElement } from '@hugeicons/react'
import { cn } from '@/lib/cn'

const CONTROL =
  'h-10 w-full rounded-md bg-card border border-subtle px-3 text-body text-primary transition-base placeholder:text-faint hover:border-line-strong focus:border-accent focus:outline-none'

export interface FieldProps {
  label: string
  hint?: string
  error?: string
  children: (id: string) => ReactNode
}

export function Field({ label, hint, error, children }: FieldProps) {
  const id = useId()
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-secondary text-sm font-medium">
        {label}
      </label>
      {children(id)}
      {error ? (
        <p className="text-danger text-xs">{error}</p>
      ) : (
        hint && <p className="text-faint text-xs">{hint}</p>
      )}
    </div>
  )
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: IconSvgElement
}

export function Input({ icon, className, ...props }: InputProps) {
  if (!icon) return <input className={cn(CONTROL, className)} {...props} />

  return (
    <div className="relative">
      <HugeiconsIcon
        icon={icon}
        size={18}
        strokeWidth={1.5}
        className="text-faint pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
      />
      <input className={cn(CONTROL, 'pl-10', className)} {...props} />
    </div>
  )
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(CONTROL, 'cursor-pointer pr-8', className)} {...props}>
      {children}
    </select>
  )
}

export interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  /** Esconde o rótulo visualmente, mantendo-o para leitor de tela */
  hideLabel?: boolean
}

/**
 * `flex w-fit`, nunca `inline-flex`: elemento inline ignora margem vertical,
 * então três Switch dentro de um `space-y-4` ficavam lado a lado na mesma
 * linha, cada rótulo por baixo do trilho do seguinte. `w-fit` mantém o alvo
 * do tamanho do conteúdo — em bloco de largura total, metade do clique cai
 * num vazio à direita do rótulo.
 */
export function Switch({ checked, onChange, label, hideLabel = false }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={hideLabel ? label : undefined}
      onClick={() => onChange(!checked)}
      className="flex min-h-[var(--target-min)] w-fit items-center gap-2.5 text-left"
    >
      <span
        className={cn(
          'relative h-6 w-10 shrink-0 rounded-pill transition-base',
          checked ? 'bg-accent' : 'bg-line-strong',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-base',
            checked ? 'left-[1.125rem]' : 'left-0.5',
          )}
        />
      </span>
      {!hideLabel && <span className="text-secondary text-sm">{label}</span>}
    </button>
  )
}
