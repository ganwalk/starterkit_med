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

/**
 * Tabela no desktop, lista de cartões no celular.
 *
 * Cinco colunas não cabem em 390px, e a saída fácil — rolar de lado — larga
 * metade da informação fora da tela e faz o usuário caçar a barra. Abaixo de
 * `sm` cada linha vira um cartão: a primeira coluna é o título e as demais
 * viram pares de rótulo e valor. Nada rola de lado em nenhuma largura.
 */
export function Table<T>({
  colunas,
  linhas,
  chaveDe,
  onLinhaClick,
  label,
  vazio,
}: TableProps<T>) {
  if (linhas.length === 0 && vazio) return <>{vazio}</>

  const [principal, ...secundarias] = colunas

  return (
    <>
      {/* Celular: cartões empilhados */}
      <ul className="divide-subtle divide-y sm:hidden" aria-label={label}>
        {linhas.map((linha) => {
          const Conteudo = (
            <>
              <div className="text-primary text-sm font-medium">{principal.render(linha)}</div>
              <dl className="mt-2.5 space-y-1.5">
                {secundarias.map((coluna) => (
                  <div key={coluna.chave} className="flex items-baseline justify-between gap-3">
                    <dt className="text-muted shrink-0 text-xs">{coluna.titulo}</dt>
                    <dd
                      className={cn(
                        'text-primary min-w-0 text-right text-sm',
                        coluna.numerico && 'tabular',
                      )}
                    >
                      {coluna.render(linha)}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          )

          return (
            <li key={chaveDe(linha)}>
              {onLinhaClick ? (
                <button
                  onClick={() => onLinhaClick(linha)}
                  className="hover:bg-hover w-full px-4 py-3.5 text-left transition-base"
                >
                  {Conteudo}
                </button>
              ) : (
                <div className="px-4 py-3.5">{Conteudo}</div>
              )}
            </li>
          )
        })}
      </ul>

      {/* Tablet e desktop: tabela de verdade */}
      <table className="hidden w-full border-collapse text-left sm:table">
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
    </>
  )
}
