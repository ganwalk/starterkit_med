import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export interface Column<T> {
  chave: string
  titulo: string
  /** Alinhamento à direita para números, conforme leitura tabular */
  numerico?: boolean
  largura?: string
  render: (linha: T) => ReactNode
}

export interface TableProps<T> {
  colunas: Column<T>[]
  linhas: T[]
  chaveDe: (linha: T) => string
  onLinhaClick?: (linha: T) => void
  /** Rótulo acessível da tabela */
  label: string
  vazio?: ReactNode
}

export function Table<T>({
  colunas,
  linhas,
  chaveDe,
  onLinhaClick,
  label,
  vazio,
}: TableProps<T>) {
  if (linhas.length === 0 && vazio) return <>{vazio}</>

  return (
    // overflow-x-auto no wrapper: em telas estreitas a tabela rola sozinha
    // em vez de empurrar a página e criar scroll horizontal global.
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse text-left">
        <caption className="sr-only">{label}</caption>
        <thead>
          <tr className="border-subtle border-b">
            {colunas.map((coluna) => (
              <th
                key={coluna.chave}
                scope="col"
                style={{ width: coluna.largura }}
                className={cn(
                  'text-muted px-4 py-2.5 text-2xs font-semibold tracking-wide uppercase',
                  coluna.numerico && 'text-right',
                )}
              >
                {coluna.titulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha) => (
            <tr
              key={chaveDe(linha)}
              onClick={onLinhaClick ? () => onLinhaClick(linha) : undefined}
              className={cn(
                'border-subtle border-b last:border-0',
                onLinhaClick && 'hover:bg-hover cursor-pointer transition-base',
              )}
            >
              {colunas.map((coluna) => (
                <td
                  key={coluna.chave}
                  className={cn(
                    'text-primary px-4 py-3 text-sm align-middle',
                    coluna.numerico && 'text-right tabular',
                  )}
                >
                  {coluna.render(linha)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
