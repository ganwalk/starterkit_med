import { StatusDot } from '@/ds'
import type { AgendaStatus } from '@/ds'
import { cn } from '@/lib/cn'
import { agendamentosDoDia, isoDe } from '@/data/agenda'

const DIAS_CURTOS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

export interface VisaoMesProps {
  /** Qualquer data dentro do mês exibido */
  mes: Date
  hoje: string
  onVerDia: (iso: string) => void
}

/**
 * O mês não tenta mostrar consultas: mostra CARGA. A pergunta que se faz
 * nesta visão é "que dia tem espaço?" e "onde estão as faltas?", não
 * "quem é o paciente das 14h". Por isso cada célula traz o total, a
 * ocupação e os status em dose mínima.
 */
export function VisaoMes({ mes, hoje, onVerDia }: VisaoMesProps) {
  const primeiro = new Date(mes.getFullYear(), mes.getMonth(), 1)
  const ultimo = new Date(mes.getFullYear(), mes.getMonth() + 1, 0)

  // Semana começa na segunda: getDay() domingo=0 vira 6
  const deslocamento = (primeiro.getDay() + 6) % 7
  const inicioGrade = new Date(primeiro)
  inicioGrade.setDate(primeiro.getDate() - deslocamento)

  const totalCelulas = Math.ceil((deslocamento + ultimo.getDate()) / 7) * 7
  const celulas = Array.from({ length: totalCelulas }, (_, i) => {
    const d = new Date(inicioGrade)
    d.setDate(inicioGrade.getDate() + i)
    return d
  })

  // Pico do mês: base da barra de ocupação relativa
  const cargas = celulas.map(
    (d) => agendamentosDoDia(isoDe(d)).filter((a) => a.status !== 'cancelado').length,
  )
  const pico = Math.max(...cargas, 1)

  return (
    <>
      <div className="overflow-x-auto">
        <div className="min-w-[44rem]">
          <div className="grid grid-cols-7">
            {DIAS_CURTOS.map((dia) => (
              <div key={dia} className="text-muted px-2 pb-2 text-2xs font-semibold uppercase">
                {dia}
              </div>
            ))}
          </div>

          <div className="border-subtle grid grid-cols-7 overflow-hidden rounded-lg border">
            {celulas.map((data, i) => {
              const iso = isoDe(data)
              const doMes = data.getMonth() === mes.getMonth()
              const ehHoje = iso === hoje
              const domingo = data.getDay() === 0
              // Consulta cancelada não ocupa horário, então não é carga.
              // Contá-la inflaria o dia e tornaria a barra mentirosa.
              const itens = agendamentosDoDia(iso).filter((a) => a.status !== 'cancelado')

              const contagem: Record<string, number> = {
                faltou: itens.filter((a) => a.status === 'faltou').length,
                confirmado: itens.filter((a) =>
                  ['confirmado', 'chegou', 'atendimento'].includes(a.status),
                ).length,
                agendado: itens.filter((a) => a.status === 'agendado').length,
              }
              const ordem: AgendaStatus[] = ['faltou', 'confirmado', 'agendado']

              return (
                <button
                  key={iso}
                  onClick={() => onVerDia(iso)}
                  disabled={domingo}
                  className={cn(
                    'border-subtle min-h-[6.5rem] border-b border-l p-2 text-left transition-base',
                    i % 7 === 0 && 'border-l-0',
                    i >= totalCelulas - 7 && 'border-b-0',
                    !doMes && 'opacity-[var(--opacity-cancelled)]',
                    domingo ? 'bg-sunken cursor-default' : 'hover:bg-hover',
                  )}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={cn(
                        'flex size-6 items-center justify-center rounded-full text-xs font-semibold tabular',
                        ehHoje ? 'bg-active text-on-active' : 'text-primary',
                      )}
                    >
                      {data.getDate()}
                    </span>
                    {itens.length > 0 && (
                      <span className="text-muted text-2xs font-semibold tabular">
                        {itens.length}
                      </span>
                    )}
                  </div>

                  {domingo ? (
                    <p className="text-faint mt-3 text-2xs">Fechado</p>
                  ) : itens.length === 0 ? (
                    <p className="text-faint mt-3 text-2xs">Sem consultas</p>
                  ) : (
                    <>
                      {/* Ocupação relativa ao dia mais cheio do mês */}
                      <div className="bg-sunken mt-2 h-1 overflow-hidden rounded-pill">
                        <div
                          className="bg-accent h-full rounded-pill"
                          style={{ width: `${(itens.length / pico) * 100}%` }}
                        />
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-1">
                        {ordem
                          .filter((s) => contagem[s])
                          .map((s) => (
                            <span key={s} className="flex items-center gap-0.5" title={s}>
                              <StatusDot status={s} />
                              <span className="text-faint text-2xs tabular">{contagem[s]}</span>
                            </span>
                          ))}
                      </div>
                    </>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="text-faint mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
        <span>A barra mostra a ocupação em relação ao dia mais cheio do mês.</span>
        <span className="flex items-center gap-1.5">
          <StatusDot status="faltou" /> faltas
          <StatusDot status="confirmado" className="ml-2" /> confirmados
          <StatusDot status="agendado" className="ml-2" /> a confirmar
        </span>
      </div>
    </>
  )
}
