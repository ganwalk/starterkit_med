import type { ReactNode } from 'react'

export interface PageHeaderProps {
  titulo: string
  /** Linha de contexto que o título não carrega. Não repita o título aqui. */
  resumo?: string
  acoes?: ReactNode
  children?: ReactNode
}

/** Cabeçalho padrão de toda tela do app. Mantém a altura e o ritmo iguais. */
export function PageHeader({ titulo, resumo, acoes, children }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-h2 text-primary font-bold tracking-[-0.02em]">{titulo}</h1>
          {resumo && <p className="text-secondary mt-1 text-sm">{resumo}</p>}
        </div>
        {acoes && <div className="flex flex-wrap items-center gap-2">{acoes}</div>}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}

/** Container padrão de página: largura máxima e respiro iguais em toda tela. */
export function PageBody({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">{children}</div>
}
